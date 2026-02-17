export type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  rating?: number;
};

export type DummyJsonProductsResponse = {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
};

export async function getProducts(params?: {
  limit?: number;
  skip?: number;
  signal?: AbortSignal;
  cache?: RequestCache;
  next?: { revalidate?: number };
}) {
  const limit = params?.limit ?? 12;
  const skip = params?.skip ?? 0;

  const url = new URL("https://dummyjson.com/products");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  url.searchParams.set("select", "id,title,price,thumbnail,rating");

  const res = await fetch(url.toString(), {
    signal: params?.signal,
    cache: params?.cache,
    // Next.js server fetch options (ignored in browser)
    next: params?.next,
  });

  if (!res.ok) {
    throw new Error(`DummyJSON request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as DummyJsonProductsResponse;
}
