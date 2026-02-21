import type { Metadata } from "next";
import { StoreLanding } from "@/app/components/StoreLanding";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — SSR",
};

export default function SsrPage() {
  return (
    <StoreLanding
      modeLabel="SSR"
      modeDescription="(GitHub Pages) Versi static export untuk demo SSR."
      productsHref="/ssr/products"
      ctaClassName="inline-flex h-11 items-center justify-center rounded-xl bg-brand-orange px-5 text-sm font-semibold text-white"
    />
  );
}
