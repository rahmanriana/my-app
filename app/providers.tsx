"use client";

import { FavoritesProvider } from "@/app/state/favorites";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
