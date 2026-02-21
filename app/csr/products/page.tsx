import type { Metadata } from "next";
import { CsrClient } from "../CsrClient";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — CSR Products",
};

export default function CsrProductsPage() {
  return <CsrClient backHref="/csr" />;
}
