"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "cart:v1";

const CartContext = createContext<CartContextValue | null>(null);

function safeParseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((x) => x && typeof x === "object")
      .map((x) => x as Partial<CartItem>)
      .filter(
        (x) =>
          typeof x.id === "number" &&
          typeof x.title === "string" &&
          typeof x.price === "number" &&
          typeof x.qty === "number" &&
          x.qty > 0,
      )
      .map((x) => ({
        id: x.id as number,
        title: x.title as string,
        price: x.price as number,
        thumbnail: x.thumbnail,
        qty: x.qty as number,
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return safeParseCart(window.localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    const q = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx === -1) return [{ ...item, qty: q }, ...prev];
      const next = [...prev];
      next[idx] = { ...next[idx], qty: next[idx].qty + q };
      return next;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    const q = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0;
    setItems((prev) => {
      if (q <= 0) return prev.filter((x) => x.id !== id);
      return prev.map((x) => (x.id === id ? { ...x, qty: q } : x));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, x) => sum + (Number.isFinite(x.qty) ? x.qty : 0), 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, x) => sum + x.price * x.qty, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, count, subtotal, add, remove, setQty, clear }),
    [items, count, subtotal, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function useCartOptional() {
  return useContext(CartContext);
}
