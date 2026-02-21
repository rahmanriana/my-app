import { Navbar } from "./components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — Home",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-soft via-background to-brand-green-soft">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-foreground/80 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Tugas Next.js • Rendering + API + State
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Demo Teknik Rendering Modern
            <span className="text-brand-blue"> </span>
            <span className="text-brand-blue">(SSG, SSR, CSR)</span>
          </h1>

          <p className="max-w-2xl text-pretty text-lg leading-8 text-foreground/70">
            Aplikasi ini menampilkan perbedaan teknik rendering: SSG (static), SSR (server render), dan CSR
            (fetch di browser). Data produk diambil dari API publik DummyJSON dan ditampilkan dinamis.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/ssg"
              className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30"
            >
              <div className="inline-flex items-center rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-semibold text-brand-blue">
                SSG
              </div>
              <div className="mt-4 text-lg font-semibold tracking-tight">Static Site Generation</div>
              <div className="mt-2 text-sm leading-6 text-foreground/70">
                Halaman dibuat menjadi file statis saat build. Cocok untuk konten yang jarang berubah.
              </div>
            </Link>

            <Link
              href="/ssr"
              className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30"
            >
              <div className="inline-flex items-center rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-brand-orange">
                SSR
              </div>
              <div className="mt-4 text-lg font-semibold tracking-tight">Server-Side Rendering</div>
              <div className="mt-2 text-sm leading-6 text-foreground/70">
                HTML dirender di server pada setiap request. Cocok untuk data yang sering berubah.
              </div>
            </Link>

            <Link
              href="/csr"
              className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30"
            >
              <div className="inline-flex items-center rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                CSR
              </div>
              <div className="mt-4 text-lg font-semibold tracking-tight">Client-Side Rendering</div>
              <div className="mt-2 text-sm leading-6 text-foreground/70">
                HTML dasar tampil dulu, data produk diambil di browser (useEffect). Cocok untuk interaksi tinggi.
              </div>
            </Link>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <div className="text-sm font-semibold tracking-tight">State Management</div>
            <div className="mt-2 text-sm leading-6 text-foreground/70">
              - Local state: input pencarian + urutkan harga (termurah/termahal).<br />
              - Context API: Keranjang (Cart) global (lihat counter di navbar dan tombol Tambah).
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
