import Link from "next/link";
import { getProducts } from "@/app/lib/dummyjson";
import { ProductsListClient } from "@/app/components/ProductsListClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — SSR Products",
};

export default async function SsrProductsPage() {
  const data = await getProducts({ limit: 24, skip: 0, cache: "no-store" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-soft via-background to-brand-green-soft">
      <header className="border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-sm font-semibold text-foreground/80">SSR</div>
            <h1 className="text-2xl font-semibold tracking-tight">Produk</h1>
            <p className="mt-1 text-sm text-foreground/70">Data diambil tiap request.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
            >
              Cart
            </Link>
            <Link
              href="/ssr"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <ProductsListClient initialProducts={data.products} />
      </main>
    </div>
  );
}
