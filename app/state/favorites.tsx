"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type FavoriteItem = {
  id: number;
  title: string;
  thumbnail?: string;
};

type FavoritesContextValue = {
  items: FavoriteItem[];
  count: number;
  isFavorite: (id: number) => boolean;
  add: (item: FavoriteItem) => void;
  remove: (id: number) => void;
  toggle: (item: FavoriteItem) => void;
  clear: () => void;
};

const STORAGE_KEY = "favorites:v1";

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function safeParseFavorites(raw: string | null): FavoriteItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x === "object")
      .map((x) => x as FavoriteItem)
      .filter((x) => typeof x.id === "number" && typeof x.title === "string");
  } catch {
    return [];
  }
}

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<FavoriteItem[]>(() => {
    if (typeof window === "undefined") return [];
    return safeParseFavorites(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isFavorite = useCallback(
    (id: number) => items.some((x) => x.id === id),
    [items],
  );

  const add = useCallback((item: FavoriteItem) => {
    setItems((prev) => {
      if (prev.some((x) => x.id === item.id)) return prev;
      return [item, ...prev];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const toggle = useCallback((item: FavoriteItem) => {
    setItems((prev) => {
      if (prev.some((x) => x.id === item.id)) {
        return prev.filter((x) => x.id !== item.id);
      }
      return [item, ...prev];
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      items,
      count: items.length,
      isFavorite,
      add,
      remove,
      toggle,
      clear,
    }),
    [items, isFavorite, add, remove, toggle, clear],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
