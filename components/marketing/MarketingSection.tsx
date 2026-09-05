"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Stagger, StaggerItem, fadeIn } from "@/components/marketing/Motion";

type Align = "center" | "left" | "right";
type Size = "hero" | "band" | "content";

type Props = {
  children: ReactNode;
  variant: "image" | "solid";
  image?: string;
  solid?: string;
  align?: Align;
  size?: Size;
  id?: string;
  className?: string;
  scrim?: "heavy" | "medium" | "light" | "veil";
};

const SCRIMS = {
  heavy:
    "linear-gradient(115deg, rgba(7, 19, 31, 0.72) 0%, rgba(7, 19, 31, 0.45) 48%, rgba(7, 19, 31, 0.28) 100%)",
  medium:
    "linear-gradient(115deg, rgba(7, 19, 31, 0.62) 0%, rgba(7, 19, 31, 0.38) 52%, rgba(7, 19, 31, 0.22) 100%)",
  light:
    "linear-gradient(115deg, rgba(7, 19, 31, 0.48) 0%, rgba(7, 19, 31, 0.28) 55%, rgba(7, 19, 31, 0.14) 100%)",
  veil:
    "linear-gradient(180deg, rgba(7, 19, 31, 0.42) 0%, rgba(7, 19, 31, 0.58) 55%, rgba(7, 19, 31, 0.72) 100%)",
} as const;

/** Electric textures matched to post-hero section shades */
const ELECTRIC_BY_SOLID: Record<string, string> = {
  "#07131f": "/marketing/electric-deep.jpg",
  "#0a1c2b": "/marketing/electric-mid.jpg",
  "#0c2233": "/marketing/electric-panel.jpg",
  "#0f766e": "/marketing/electric-teal.jpg",
};

export function MarketingSection({
  children,
  variant,
  image,
  solid = "#07131f",
  align = "left",
  size = "content",
  id,
  className = "",
  scrim = "heavy",
}: Props) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);
  const scrimKey = scrim in SCRIMS ? scrim : "heavy";
  const electric =
    variant === "solid" ? ELECTRIC_BY_SOLID[solid.toLowerCase()] : undefined;

  return (
    <motion.section
      id={id}
      className={`mkt-section mkt-section--${size} mkt-section--${align}${
        electric ? " mkt-section--electric" : ""
      } ${className}`}
      style={
        variant === "solid"
          ? {
              backgroundColor: solid,
              ...(electric
                ? {
                    backgroundImage: `url(${electric})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : null),
            }
          : undefined
      }
      initial={reduce ? false : { opacity: 0.72 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5 }}
    >
      {variant === "image" && image ? (
        <>
          <motion.div
            className="mkt-section__media"
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden
            variants={fadeIn}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, amount: 0.1 }}
          />
          <div
            className="mkt-section__scrim"
            style={{ background: SCRIMS[scrimKey as keyof typeof SCRIMS] }}
            aria-hidden
          />
        </>
      ) : null}
      {electric ? (
        <div className="mkt-section__electric-veil" aria-hidden />
      ) : null}
      <div className="mkt-section__inner">
        <Stagger className="mkt-prose mkt-animate-scope">
          {items.map((child, i) => (
            <StaggerItem key={i} variant={i === 0 ? "up" : "scale"}>
              {child}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </motion.section>
  );
}
