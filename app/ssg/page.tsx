import type { Metadata } from "next";
import { StoreLanding } from "@/app/components/StoreLanding";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — SSG",
};

export default function SsgPage() {
  return (
    <StoreLanding
      modeLabel="SSG"
      modeDescription="Halaman katalog dibangun statis dan di-cache."
      productsHref="/ssg/products"
      ctaClassName="inline-flex h-11 items-center justify-center rounded-xl bg-brand-blue px-5 text-sm font-semibold text-white"
    />
  );
}
