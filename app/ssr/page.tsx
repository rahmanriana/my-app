import type { Metadata } from "next";
import { StoreLanding } from "@/app/components/StoreLanding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — SSR",
};

export default function SsrPage() {
  return (
    <StoreLanding
      modeLabel="SSR"
      modeDescription="Halaman katalog dirender di server setiap request."
      productsHref="/ssr/products"
      ctaClassName="inline-flex h-11 items-center justify-center rounded-xl bg-brand-orange px-5 text-sm font-semibold text-white"
    />
  );
}
