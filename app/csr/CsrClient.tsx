"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  DummyJsonProduct,
  DummyJsonProductsResponse,
} from "@/app/lib/dummyjson";
import { ProductsListClient } from "@/app/components/ProductsListClient";
import { useCart } from "@/app/state/cart";

export function CsrClient(props: { backHref?: string } = {}) {
  const cart = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<DummyJsonProduct[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const url = new URL("/api/products", window.location.origin);
        url.searchParams.set("limit", "24");
        url.searchParams.set("skip", "0");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-soft via-background to-brand-green-soft">
      <header className="border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground/80">CSR</div>
              <h1 className="text-2xl font-semibold tracking-tight">Client-Side Rendering</h1>
              <p className="mt-1 text-sm text-foreground/70">Data diambil di browser.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/30">
                Cart: {cart.count}
              </div>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
                onClick={cart.clear}
              >
                Clear cart
              </button>
              <Link
                href="/cart"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
              >
                Cart
              </Link>
              <Link
                href={props.backHref ?? "/"}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        {loading ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 text-sm font-medium dark:border-white/10 dark:bg-black/30">
            Loading products...
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white/70 p-6 text-sm dark:border-white/10 dark:bg-black/30">
            <div className="font-semibold text-brand-orange">Gagal memuat data</div>
            <div className="mt-1 text-foreground/70">{error}</div>
            <div className="mt-3 text-xs text-foreground/60">
              Coba refresh. Pastikan dev server berjalan dan endpoint /api/products bisa diakses.
            </div>
          </div>
        ) : (
          <ProductsListClient initialProducts={products} />
        )}

        {cart.items.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Keranjang (Context API)</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-black/30"
                >
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="mt-2 text-xs text-foreground/70">
                    Qty: <span className="font-semibold">{item.qty}</span> • Price: ${item.price}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="text-xs text-foreground/70">id: {item.id}</div>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-orange px-3 text-xs font-semibold text-white"
                      onClick={() => cart.remove(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-black/10 bg-white/70 p-5 text-sm font-medium dark:border-white/10 dark:bg-black/30">
              Subtotal: <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
