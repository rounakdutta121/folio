"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { Stagger, StaggerItem } from "@/components/marketing/Motion";

export function SiteFooter() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      className="border-t-4 border-yellow bg-[#1a0a2e] text-[#fde68a]"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Stagger className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <StaggerItem>
          <p className="text-xl font-bold text-yellow">{site.name}</p>
          <p className="mt-2 text-sm text-[#fdba74]">{site.tagline}</p>
          <p className="mt-4 text-sm text-[#fdba74]">
            Free quote-to-invoice software with QR payment confirmation for
            service businesses.
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="font-bold text-yellow">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/enter" className="hover:text-white">
                Open a free desk
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </StaggerItem>
        <StaggerItem>
          <p className="font-bold text-yellow">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms &amp; conditions
              </Link>
            </li>
          </ul>
        </StaggerItem>
        <StaggerItem>
          <p className="font-bold text-yellow">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-[#fdba74]">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone}`} className="hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
        </StaggerItem>
      </Stagger>
      <div className="border-t border-yellow/40 px-4 py-4 text-center text-xs text-[#fdba74]">
        <p>
          © {new Date().getFullYear()} {site.name}. Free for every account.
        </p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/privacy" className="hover:text-yellow">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="hover:text-yellow">
            Terms
          </Link>
          <span aria-hidden>·</span>
          <span>
            Developed by{" "}
            <a
              href={site.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow underline-offset-2 hover:underline"
            >
              {site.developer.name}
            </a>
          </span>
        </p>
      </div>
    </motion.footer>
  );
}
