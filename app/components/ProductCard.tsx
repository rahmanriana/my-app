"use client";

import { useMemo, useState } from "react";
import { useCartOptional } from "@/app/state/cart";
import type { DummyJsonProduct } from "@/app/lib/dummyjson";

export function ProductCard({ product }: { product: DummyJsonProduct }) {
  const cart = useCartOptional();

  const [imgSrc, setImgSrc] = useState<string | undefined>(product.thumbnail);

  const cartItem = useMemo(
    () => ({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    }),
    [product.id, product.price, product.thumbnail, product.title],
  );

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
        {cart ? (
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-brand-orange px-3 text-xs font-semibold text-white"
            onClick={() => cart.add(cartItem, 1)}
          >
            Tambah
          </button>
        ) : null}
      </div>

      {imgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={product.title}
          className="mt-4 h-40 w-full rounded-2xl object-cover"
          loading="lazy"
          onError={() => setImgSrc("/store-hero.svg")}
        />
      ) : (
        <div className="mt-4 flex h-40 items-center justify-center rounded-2xl bg-background text-xs text-foreground/60">
          No image
        </div>
      )}
    </div>
  );
}
