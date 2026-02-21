import Link from "next/link";
import type { Metadata } from "next";
import { StoreLanding } from "@/app/components/StoreLanding";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — CSR",
};

export default function CsrPage() {
  return (
    <StoreLanding
      modeLabel="CSR"
      modeDescription="Halaman katalog diambil di browser setelah halaman terbuka."
      productsHref="/csr/products"
      ctaClassName="inline-flex h-11 items-center justify-center rounded-xl bg-brand-green px-5 text-sm font-semibold text-white"
    />
  );
}
