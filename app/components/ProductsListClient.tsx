"use client";

import { useMemo, useState } from "react";
import type { DummyJsonProduct } from "@/app/lib/dummyjson";
import { ProductCard } from "@/app/components/ProductCard";
import { useCartOptional } from "@/app/state/cart";

type SortMode = "default" | "price-asc" | "price-desc";

export function ProductsListClient(props: {
  initialProducts: DummyJsonProduct[];
  initialQuery?: string;
}) {
  const cart = useCartOptional();
  const [query, setQuery] = useState(props.initialQuery ?? "");
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of props.initialProducts) {
      if (p.category && typeof p.category === "string") set.add(p.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [props.initialProducts]);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = props.initialProducts.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q);
      const matchesCategory =
        category === "all" || (p.category ? p.category === category : false);
      return matchesQuery && matchesCategory;
    });

    if (sortMode === "default") return filtered;

    const copy = [...filtered];
    copy.sort((a, b) => {
      const pa = typeof a.price === "number" ? a.price : 0;
      const pb = typeof b.price === "number" ? b.price : 0;
      return sortMode === "price-asc" ? pa - pb : pb - pa;
    });
    return copy;
  }, [props.initialProducts, query, sortMode, category]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Cari produk</span>
          <input
            className="h-12 w-full max-w-md rounded-xl border border-black/10 bg-background px-4 outline-none ring-brand-blue/20 focus:ring-4 dark:border-white/10"
            placeholder="mis. iphone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Kategori</span>
            <select
              className="h-12 w-full min-w-[220px] rounded-xl border border-black/10 bg-background px-4 outline-none ring-brand-blue/20 focus:ring-4 dark:border-white/10"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Semua kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm">
            <span className="font-medium">Urutkan</span>
            <select
              className="h-12 w-full min-w-[220px] rounded-xl border border-black/10 bg-background px-4 outline-none ring-brand-orange/20 focus:ring-4 dark:border-white/10"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Harga: termurah → termahal</option>
              <option value="price-desc">Harga: termahal → termurah</option>
            </select>
          </label>

          <div className="text-sm text-foreground/70">
            Menampilkan <span className="font-semibold">{filteredAndSorted.length}</span> item
            {cart ? (
              <>
                {" "}• Cart: <span className="font-semibold">{cart.count}</span>
                {" "}• Subtotal: <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
