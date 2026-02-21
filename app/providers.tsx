"use client";

import { CartProvider } from "@/app/state/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
