"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  DummyJsonProduct,
  DummyJsonProductsResponse,
} from "@/app/lib/dummyjson";
import { ProductCard } from "@/app/components/ProductCard";
import { useFavorites } from "@/app/state/favorites";

export function CsrClient() {
  const favorites = useFavorites();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<DummyJsonProduct[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL("https://dummyjson.com/products");
        url.searchParams.set("limit", "24");
        url.searchParams.set("skip", "0");
        url.searchParams.set("select", "id,title,price,thumbnail,rating");

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = (await res.json()) as DummyJsonProductsResponse;
        setProducts(json.products);
      } catch (e) {
        if (controller.signal.aborted) return;
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void run();

    return () => {
      controller.abort();
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-purple-soft via-background to-brand-orange-soft">
      <header className="border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground/80">CSR</div>
              <h1 className="text-2xl font-semibold tracking-tight">Client-Side Rendering</h1>
              <p className="mt-1 text-sm text-foreground/70">
                Data di-fetch di browser (useEffect). Ada loading, error handling, dan filter (useState).
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/30">
                Favorites: {favorites.count}
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
                onClick={favorites.clear}
              >
                Clear favorites
              </button>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Cari produk (local state)</span>
            <input
              className="h-12 w-full max-w-md rounded-xl border border-black/10 bg-background px-4 outline-none ring-brand-purple/20 focus:ring-4 dark:border-white/10"
              placeholder="mis. iphone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div className="text-sm text-foreground/70">
            Menampilkan <span className="font-semibold">{filtered.length}</span> item
          </div>
        </div>

        {loading ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 text-sm font-medium dark:border-white/10 dark:bg-black/30">
            Loading products...
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 text-sm dark:border-white/10 dark:bg-black/30">
            <div className="font-semibold text-brand-orange">Gagal memuat data</div>
            <div className="mt-1 text-foreground/70">{error}</div>
            <div className="mt-3 text-xs text-foreground/60">
              Coba refresh. Pastikan internet aktif dan DummyJSON bisa diakses.
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {favorites.items.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Favorites (Context API)</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favorites.items.map((f) => (
                <div
                  key={f.id}
                  className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-black/30"
                >
                  <div className="text-sm font-semibold">{f.title}</div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="text-xs text-foreground/70">id: {f.id}</div>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-orange px-3 text-xs font-semibold text-white"
                      onClick={() => favorites.remove(f.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
