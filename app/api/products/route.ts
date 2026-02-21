import { NextResponse } from "next/server";
import type { DummyJsonProductsResponse } from "@/app/lib/dummyjson";

export const runtime = "nodejs";

function toInt(value: string | null, fallback: number) {
  const n = value ? Number.parseInt(value, 10) : Number.NaN;
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  const limit = Math.max(1, Math.min(100, toInt(url.searchParams.get("limit"), 24)));
  const skip = Math.max(0, toInt(url.searchParams.get("skip"), 0));

  const upstream = new URL("https://dummyjson.com/products");
  upstream.searchParams.set("limit", String(limit));
  upstream.searchParams.set("skip", String(skip));

  const res = await fetch(upstream.toString(), { cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json(
      { message: `Upstream failed: ${res.status}` },
      { status: 502 },
    );
  }

  const payload = (await res.json()) as DummyJsonProductsResponse;
  return NextResponse.json(payload, {
    headers: {
      // CSR should always see fresh data (and prevents stale demo behavior)
      "Cache-Control": "no-store",
    },
  });
}
