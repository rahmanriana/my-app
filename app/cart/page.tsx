"use client";

import Link from "next/link";
import { useCart } from "@/app/state/cart";

export default function CartPage() {
  const cart = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-soft via-background to-brand-green-soft">
      <header className="border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-sm font-semibold text-foreground/80">Cart</div>
            <h1 className="text-2xl font-semibold tracking-tight">Keranjang</h1>
            <p className="mt-1 text-sm text-foreground/70">
              Total item: <span className="font-semibold">{cart.count}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
              onClick={cart.clear}
              disabled={!cart.items.length}
            >
              Clear cart
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        {cart.items.length ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-black/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-background">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.thumbnail ?? "/store-hero.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/store-hero.svg";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{item.title}</div>
                      <div className="mt-1 text-xs text-foreground/70">
                        ${item.price} • Qty: <span className="font-semibold">{item.qty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
                        onClick={() => cart.setQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <div className="min-w-10 text-center text-sm font-semibold">
                        {item.qty}
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
                        onClick={() => cart.setQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>

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

            <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-5 text-sm font-medium dark:border-white/10 dark:bg-black/30">
              Subtotal: <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 text-sm font-medium dark:border-white/10 dark:bg-black/30">
            Keranjang masih kosong. Silakan buka halaman produk dan klik tombol <span className="font-semibold">Tambah</span>.
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/ssg/products"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
          >
            Lihat Produk (SSG)
          </Link>
          <Link
            href="/ssr/products"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
          >
            Lihat Produk (SSR)
          </Link>
          <Link
            href="/csr/products"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
          >
            Lihat Produk (CSR)
          </Link>
        </div>
      </main>
    </div>
  );
}
