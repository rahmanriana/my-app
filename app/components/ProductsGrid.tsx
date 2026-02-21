import { getProducts } from "@/app/lib/dummyjson";
import { ProductCard } from "@/app/components/ProductCard";

export async function ProductsGrid(props: {
  cache: RequestCache;
  delayMs?: number;
}) {
  if (props.delayMs && props.delayMs > 0) {
    await new Promise((r) => setTimeout(r, props.delayMs));
  }

  const data = await getProducts({ limit: 12, skip: 0, cache: props.cache });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
