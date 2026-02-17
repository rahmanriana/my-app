import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — SSG/SSR/CSR",
  description:
    "Demo Next.js App Router: SSG, SSR, CSR, integrasi API publik DummyJSON, dan state management (useState + Context).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
