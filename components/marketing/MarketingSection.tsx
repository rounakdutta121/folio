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
  scrim?: "heavy" | "medium" | "light";
};

const SCRIMS = {
  heavy: "rgba(26, 10, 46, 0.78)",
  medium: "rgba(26, 10, 46, 0.68)",
  light: "rgba(26, 10, 46, 0.55)",
} as const;

export function MarketingSection({
  children,
  variant,
  image,
  solid = "#2a1540",
  align = "left",
  size = "content",
  id,
  className = "",
  scrim = "medium",
}: Props) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <motion.section
      id={id}
      className={`mkt-section mkt-section--${size} mkt-section--${align} ${className}`}
      style={variant === "solid" ? { backgroundColor: solid } : undefined}
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
            style={{
              background: `linear-gradient(180deg, ${SCRIMS[scrim]} 0%, rgba(26, 10, 46, 0.92) 100%)`,
            }}
            aria-hidden
          />
        </>
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
