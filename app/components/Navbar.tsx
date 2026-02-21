"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCartOptional } from "@/app/state/cart";
import { getBasePath, withBasePath } from "@/app/lib/basePath";

type NavItem = {
  label: string;
  href: string;
};

export function Navbar() {
  const cart = useCartOptional();
  const pathname = usePathname() ?? "/";

  const basePath = getBasePath();

  const normalizedPathname = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || "/"
    : pathname;

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
          className="group inline-flex items-center gap-3 font-semibold tracking-tight"
          aria-label="Rahman Store"
        >
          <span className="inline-flex h-9 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath("/rahman-store-logo.svg")}
              alt="Rahman Store"
              className="h-9 w-auto"
              loading="eager"
            />
          </span>
          <span className="text-lg">Rahman Store</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            (() => {
              const isActive =
                normalizedPathname === item.href ||
                (item.href !== "/" && normalizedPathname.startsWith(`${item.href}/`));
              const baseClass =
                "text-foreground/80 transition-colors hover:text-foreground";
              const activeClass = "text-foreground font-semibold underline underline-offset-8 decoration-brand-orange";

              return (
            <Link
              key={item.href}
              href={item.href}
                  className={isActive ? activeClass : baseClass}
                  aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
              );
            })()
          ))}
          {cart ? (
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/30"
            >
              Cart: {cart.count}
            </Link>
          ) : null}
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
              (() => {
                const isActive =
                  normalizedPathname === item.href ||
                  (item.href !== "/" && normalizedPathname.startsWith(`${item.href}/`));
                const baseClass =
                  "rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]";
                const activeClass =
                  "rounded-xl px-3 py-2 text-sm font-semibold text-foreground underline underline-offset-8 decoration-brand-orange";

                return (
              <Link
                key={item.href}
                href={item.href}
                    className={isActive ? activeClass : baseClass}
                    aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
                );
              })()
            ))}
            {cart ? (
              <Link
                href="/cart"
                className="mt-2 rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-foreground/80 dark:border-white/10 dark:bg-black/30"
                onClick={() => setOpen(false)}
              >
                Cart: {cart.count}
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
