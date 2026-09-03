"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

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
    <motion.header
      className="folio-nav sticky top-0 z-30"
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
        <motion.div whileHover={reduce ? undefined : { scale: 1.03 }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-yellow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="" className="h-8 w-8 rounded-md" />
            Folio
          </Link>
        </motion.div>

        <nav className="nav-desktop hidden items-center gap-4 text-sm md:flex">
          {LINKS.map((l, i) => (
            <motion.div
              key={l.href}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              whileHover={reduce ? undefined : { y: -2 }}
            >
              <Link
                href={l.href}
                className={
                  pathname === l.href
                    ? "font-bold text-white"
                    : "hover:text-white"
                }
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            <Link href="/enter" className="folio-btn-ghost">
              Start free
            </Link>
          </motion.div>
          <Link href="/enter?mode=in" className="hover:text-white">
            Sign in
          </Link>
        </nav>

        <button
          type="button"
          className="folio-btn-ghost folio-menu-toggle px-3 py-2"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <motion.div
          className="border-t-2 border-yellow bg-[#3b0764] px-3 py-4 md:hidden"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-3 text-base font-semibold text-yellow"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/enter"
                className="mt-2 block rounded-lg bg-yellow px-3 py-3 text-center text-base font-bold text-[#1a0b12]"
                onClick={() => setOpen(false)}
              >
                Start free
              </Link>
            </li>
            <li>
              <Link
                href="/enter?mode=in"
                className="block rounded-lg px-3 py-3 text-base font-semibold text-yellow"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            </li>
          </ul>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
