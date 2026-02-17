import Link from "next/link";
import { getProducts } from "@/app/lib/dummyjson";
import { ProductCard } from "@/app/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — SSG",
};

export default async function SsgPage() {
  const data = await getProducts({ limit: 12, skip: 0, cache: "force-cache" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-purple-soft via-background to-brand-orange-soft">
      <header className="border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-sm font-semibold text-foreground/80">SSG</div>
            <h1 className="text-2xl font-semibold tracking-tight">Static Site Generation</h1>
            <p className="mt-1 text-sm text-foreground/70">
              Data di-fetch saat build dan jadi halaman statis.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
