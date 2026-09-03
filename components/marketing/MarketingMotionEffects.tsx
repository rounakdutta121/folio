"use client";

import { useEffect } from "react";
import { animate, stagger, useReducedMotion } from "framer-motion";

/**
 * Animates nested marketing cards/tiles when their parent section enters view.
 */
export function MarketingMotionEffects() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const selector =
      ".mkt-step-tile, .mkt-status-flow__item, .mkt-principle-grid > li, .mkt-pair, .mkt-split-panel, .mkt-blog-takeaways, .mkt-blog-copy > p";

    const seen = new WeakSet<Element>();

    const run = (root: Element) => {
      const nodes = Array.from(root.querySelectorAll(selector)).filter(
        (el) => !seen.has(el),
      );
      if (!nodes.length) return;
      nodes.forEach((el) => seen.add(el));

      animate(
        nodes,
        { opacity: [0, 1], y: [16, 0] },
        {
          duration: 0.45,
          delay: stagger(0.055, { startDelay: 0.04 }),
          ease: [0.22, 1, 0.36, 1],
        },
      );
    };

    const sections = document.querySelectorAll(".mkt-section");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reduce]);

  return null;
}
