import { Navbar } from "./components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Rendering Demo — Home",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-purple-soft via-background to-brand-orange-soft">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-foreground/80 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            Tugas Next.js • Rendering + API + State
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Demo Teknik Rendering Modern
            <span className="text-brand-purple"> </span>
            <span className="text-brand-purple">(SSG, SSR, CSR)</span>
          </h1>

          <p className="max-w-2xl text-pretty text-lg leading-8 text-foreground/70">
            Aplikasi ini mengambil data produk dari API publik DummyJSON dan menampilkan
            perbedaan teknik rendering: SSG (static), SSR (konsep server render), dan CSR (fetch di browser).
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/ssg"
              className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30"
            >
              <div className="inline-flex items-center rounded-full bg-brand-purple-soft px-3 py-1 text-xs font-semibold text-brand-purple">
                SSG
              </div>
              <div className="mt-4 text-lg font-semibold tracking-tight">Static Site Generation</div>
              <div className="mt-2 text-sm leading-6 text-foreground/70">
                Fetch saat build, hasilnya halaman statis.
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
                Di GitHub Pages (static export), halaman ini jadi statis saat build.
              </div>
            </Link>

            <Link
              href="/csr"
              className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30"
            >
              <div className="inline-flex items-center rounded-full bg-brand-purple-soft px-3 py-1 text-xs font-semibold text-brand-purple">
                CSR
              </div>
              <div className="mt-4 text-lg font-semibold tracking-tight">Client-Side Rendering</div>
              <div className="mt-2 text-sm leading-6 text-foreground/70">
                Fetch di browser (useEffect) + loading/error + filter (useState).
              </div>
            </Link>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <div className="text-sm font-semibold tracking-tight">State Management</div>
            <div className="mt-2 text-sm leading-6 text-foreground/70">
              - Local state: input pencarian di halaman CSR.<br />
              - Context API: Favorites global (lihat counter di navbar dan toggle di kartu).
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
