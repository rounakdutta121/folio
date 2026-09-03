import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

/** Centered section intro used across marketing pages */
export function SectionHeading({ eyebrow, title, lead, children }: Props) {
  return (
    <header className="mkt-section-head">
      <p className="mkt-section-head__eyebrow">{eyebrow}</p>
      <h2 className="mkt-section-head__title">{title}</h2>
      {lead ? <p className="mkt-section-head__lead">{lead}</p> : null}
      {children}
    </header>
  );
}
