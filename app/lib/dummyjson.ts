export type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  rating?: number;
  category?: string;
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
  cache?: RequestCache;
}) {
  const limit = params?.limit ?? 12;
  const skip = params?.skip ?? 0;

  const url = new URL("https://dummyjson.com/products");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  const res = await fetch(url.toString(), {
    cache: params?.cache,
  });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

  const payload = (await res.json()) as DummyJsonProductsResponse;
  return payload;
}
