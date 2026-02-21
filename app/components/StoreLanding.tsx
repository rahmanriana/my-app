import Link from "next/link";

export function StoreLanding(props: {
  modeLabel: "SSG" | "SSR" | "CSR";
  modeDescription: string;
  productsHref: string;
  ctaClassName: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-blue-soft via-background to-brand-green-soft">
      <header className="border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-sm font-semibold text-foreground/80">{props.modeLabel}</div>
            <h1 className="text-2xl font-semibold tracking-tight">Rahman Store</h1>
            <p className="mt-1 text-sm text-foreground/70">{props.modeDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
            >
              Cart
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 text-sm font-semibold dark:border-white/10 dark:bg-black/30"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <section className="rounded-[2rem] border border-black/10 bg-white/70 p-7 backdrop-blur dark:border-white/10 dark:bg-black/30">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-background/70 px-4 py-2 text-xs font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/20">
                <span className="h-2 w-2 rounded-full bg-brand-orange" />
                Official Store
              </div>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Rahman Store — belanja yang enak dilihat.
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-base leading-7 text-foreground/70">
                Koleksi produk populer dengan tampilan rapi. Tambahkan ke Keranjang, lalu lanjutkan
                cek produk kapan saja.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full bg-brand-blue-soft px-4 py-2 text-xs font-semibold text-brand-blue">
                  Katalog rapi
                </div>
                <div className="rounded-full bg-brand-orange-soft px-4 py-2 text-xs font-semibold text-brand-orange">
                  Pencarian cepat
                </div>
                <div className="rounded-full bg-brand-green-soft px-4 py-2 text-xs font-semibold text-brand-green">
                  Keranjang
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href={props.productsHref} className={props.ctaClassName}>
                  Lihat Produk
                </Link>
                <div className="text-xs text-foreground/60">{props.modeLabel} mode</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-background/60 dark:border-white/10 dark:bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/rahman-store-logo.svg"
                alt="Rahman Store"
                className="h-[260px] w-full object-contain p-10 sm:h-[300px]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <div className="text-sm font-semibold tracking-tight">Katalog produk</div>
            <div className="mt-2 text-sm leading-6 text-foreground/70">
              Produk ditata rapi, tinggal scroll dan pilih yang cocok.
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <div className="text-sm font-semibold tracking-tight">Keranjang</div>
            <div className="mt-2 text-sm leading-6 text-foreground/70">
              Tambah produk ke keranjang, lalu cek rekapnya.
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-black/10 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-black/30">
            <div className="text-sm font-semibold tracking-tight">Nyaman dipakai</div>
            <div className="mt-2 text-sm leading-6 text-foreground/70">
              Kalau data lagi dimuat / gagal, informasinya tetap jelas.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
