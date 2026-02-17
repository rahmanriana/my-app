"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useFavorites } from "@/app/state/favorites";

type NavItem = {
  label: string;
  href: string;
};

export function Navbar() {
  const favorites = useFavorites();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "SSG", href: "/ssg" },
      { label: "SSR", href: "/ssr" },
      { label: "CSR", href: "/csr" },
    ],
    [],
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Rendering Demo"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-purple text-white shadow-sm">
            NX
          </span>
          <span className="text-lg">
            Next.js <span className="text-brand-orange">Rendering</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/30">
            Favorites: {favorites.count}
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-foreground transition-colors hover:bg-white md:hidden dark:border-white/10 dark:bg-black/30"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            {open ? (
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-background md:hidden dark:border-white/10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/30">
              Favorites: {favorites.count}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
