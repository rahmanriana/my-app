import type { Metadata } from "next";
import { CsrClient } from "./CsrClient";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — CSR",
};

export default function CsrPage() {
  return <CsrClient />;
}
