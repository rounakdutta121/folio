import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  align?: "center" | "left";
};

/** Section intro used across marketing pages */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  children,
  align = "left",
}: Props) {
  return (
    <header
      className={
        align === "left" ? "mkt-section-head mkt-section-head--left" : "mkt-section-head"
      }
    >
      <p className="mkt-section-head__eyebrow">{eyebrow}</p>
      <h2 className="mkt-section-head__title">{title}</h2>
      {lead ? <p className="mkt-section-head__lead">{lead}</p> : null}
      {children}
    </header>
  );
}
