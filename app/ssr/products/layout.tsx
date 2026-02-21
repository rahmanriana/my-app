import { Providers } from "@/app/providers";

export default function SsrProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
