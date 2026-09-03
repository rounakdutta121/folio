"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions";
import { NotificationBell } from "@/components/folio/NotificationBell";

const LINKS = [
  { href: "/desk", label: "Board" },
  { href: "/clients", label: "Clients" },
  { href: "/quotes", label: "Quotes" },
  { href: "/invoices", label: "Invoices" },
  { href: "/notifications", label: "Notifications" },
  { href: "/settings", label: "Settings" },
] as const;

export function AppNav({ studio }: { studio: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="folio-nav sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-3.5">
        <Link
          href="/desk"
          className="shrink-0 text-lg font-semibold tracking-tight text-yellow"
        >
          Folio
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <NotificationBell />
          <span className="folio-chip max-w-[7.5rem]">{studio}</span>
          <button
            type="button"
            className="folio-btn-ghost px-3 py-2"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <nav className="nav-desktop hidden items-center gap-x-4 text-sm md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? "font-bold text-white"
                  : "hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
          <NotificationBell />
          <span className="folio-chip">{studio}</span>
          <form action={signOut}>
            <button type="submit" className="hover:text-white">
              Sign out
            </button>
          </form>
        </nav>
      </div>

      {open ? (
        <div className="border-t-2 border-yellow bg-[#3b0764] px-3 py-4 md:hidden">
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-yellow hover:bg-purple-900 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <form action={signOut}>
                <button
                  type="submit"
                  className="w-full rounded-lg px-3 py-3 text-left text-base font-semibold text-yellow hover:bg-purple-900 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
