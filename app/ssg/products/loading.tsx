import { ProductsGridSkeleton } from "@/app/components/ProductsGridSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-soft via-background to-brand-green-soft">
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <ProductsGridSkeleton />
      </main>
    </div>
  );
}
