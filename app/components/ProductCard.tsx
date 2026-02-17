"use client";

import { useMemo } from "react";
import { useFavorites } from "@/app/state/favorites";
import type { DummyJsonProduct } from "@/app/lib/dummyjson";

export function ProductCard({ product }: { product: DummyJsonProduct }) {
  const favorites = useFavorites();

  const favItem = useMemo(
    () => ({ id: product.id, title: product.title, thumbnail: product.thumbnail }),
    [product.id, product.thumbnail, product.title],
  );

  const isFav = favorites.isFavorite(product.id);

  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-black/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{product.title}</div>
          <div className="mt-1 text-xs text-foreground/70">
            ${product.price}{" "}
            {typeof product.rating === "number" ? (
              <span className="ml-2">• rating {product.rating.toFixed(1)}</span>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          className={
            isFav
              ? "inline-flex h-9 items-center justify-center rounded-xl bg-brand-purple px-3 text-xs font-semibold text-white"
              : "inline-flex h-9 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-3 text-xs font-semibold text-foreground/90 dark:border-white/10 dark:bg-black/30"
          }
          onClick={() => favorites.toggle(favItem)}
          aria-pressed={isFav}
        >
          {isFav ? "Favorited" : "Favorite"}
        </button>
      </div>

      {product.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.thumbnail}
          alt={product.title}
          className="mt-4 h-40 w-full rounded-2xl object-cover"
          loading="lazy"
        />
      ) : (
        <div className="mt-4 flex h-40 items-center justify-center rounded-2xl bg-background text-xs text-foreground/60">
          No image
        </div>
      )}
    </div>
  );
}
