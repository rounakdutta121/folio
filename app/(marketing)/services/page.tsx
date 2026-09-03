import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "Services — quote to invoice, QR pay links, payment confirmation",
  description:
    "Folio services for service businesses: client records, quotes with accept/decline, convert to invoice, QR payment pages, claim-vs-confirm tracking, and WhatsApp reminders—free.",
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "Folio services: the full quote-to-paid path",
    description:
      "From client desk to confirmed payment—without a processor middleman or subscription wall.",
    url: absoluteUrl("/services"),
  },
};

const SERVICES = [
  {
    id: "clients",
    title: "Client desk",
    lead: "Keep the people you bill in one place—name, phone, email—ready for the next quote.",
    detail:
      "Clean client records so every quote and invoice points at a real relationship, not a one-off PDF.",
    seo: "Client management for small business invoicing",
  },
  {
    id: "quotes",
    title: "Quotes clients can answer",
    lead: "Send a public quote link. They accept or decline without logging into your tools.",
    detail:
      "Valid-until dates, readable line items, and tax only when you charge it.",
    seo: "Online quote software with accept decline link",
  },
  {
    id: "convert",
    title: "Convert quote → invoice",
    lead: "Lock accepted lines into an invoice number. Stop retyping and silent total drift.",
    detail:
      "The document trail stays intact so collections refer to the same promise.",
    seo: "Convert quote to invoice online free",
  },
  {
    id: "qr",
    title: "Invoice pages with your QR",
    lead: "Upload the QR you already use. Clients pay in their bank app; Folio records the claim.",
    detail: "Built for UPI and local QR rails. No Folio cut. No mandatory gateway KYC.",
    seo: "Free invoice with QR / UPI payment link",
  },
  {
    id: "confirm",
    title: "Claim paid → confirm received",
    lead: "Yellow means awaiting your eyes. Match the claim to your bank alert, then stamp money received.",
    detail:
      "Reject sends the invoice back to due. Event history settles “I paid last Tuesday.”",
    seo: "Client payment confirmation for invoices",
  },
  {
    id: "remind",
    title: "Reminders that stay specific",
    lead: "WhatsApp-ready copy with amount, due date, and one link—logged so you do not double-ping.",
    detail:
      "Optional email when Resend is configured. Due-soon notices live on your desk.",
    seo: "WhatsApp invoice payment reminders",
  },
  {
    id: "board",
    title: "Live payment board",
    lead: "See due, claimed, and confirmed invoices in one place—without refreshing spreadsheets.",
    detail:
      "Notifications and live refresh keep the desk current while you confirm money as it lands.",
    seo: "Invoice status board for small business",
  },
] as const;

export default function ServicesPage() {
  const first = SERVICES.slice(0, 3);
  const rest = SERVICES.slice(3);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Folio services",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            description: s.lead,
            url: absoluteUrl(`/services#${s.id}`),
          })),
        }}
      />

      <MarketingSection
        variant="image"
        image="/marketing/qr.jpg"
        align="center"
        size="hero"
        scrim="heavy"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow">
          Services
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-black text-yellow sm:text-5xl">
          From estimate to confirmed money—opened for free.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#fdba74] sm:text-lg">
          One desk workflow for service businesses that collect through QR, UPI,
          and bank transfer.
        </p>
        <div className="mkt-cta-row">
          <Link href="/enter" className="folio-btn-ghost">
            Open your desk
          </Link>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="The path"
          title="Quote, convert, collect—without retyping."
          lead="Seven connected moves on one desk. Free on the full money path."
        />
        <div className="mkt-steps-row">
          {first.map((s, i) => (
            <article key={s.id} id={s.id} className="mkt-step-tile scroll-mt-24">
              <span className="mkt-step-tile__n">
                {String(i + 1).padStart(2, "0")} · {s.seo}
              </span>
              <h3 className="text-xl font-bold text-[#fff8e7]">{s.title}</h3>
              <p className="mt-2 text-sm font-medium text-[#fff8e7]">{s.lead}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74]">
                {s.detail}
              </p>
            </article>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#3b0764" size="content">
        <SectionHeading
          eyebrow="Payment trail"
          title="QR on the page. Confirmation in your hands."
        />
        <ul className="mkt-principle-grid">
          {rest.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-24">
              <p className="mkt-step-tile__n">
                {String(i + 4).padStart(2, "0")} · {s.seo}
              </p>
              <h3 className="text-lg font-bold text-yellow">{s.title}</h3>
              <p className="mt-2 text-sm font-medium text-[#fff8e7]">{s.lead}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#fdba74]">
                {s.detail}
              </p>
            </li>
          ))}
        </ul>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#1a0a2e" size="content">
        <SectionHeading
          eyebrow="Status flow"
          title="Due → claimed → confirmed."
          lead="The same three states every invoice should make obvious."
        />
        <div className="mkt-status-flow">
          {[
            { t: "Due", d: "Share the public invoice with your QR" },
            { t: "Claimed", d: "Client taps “I’ve paid” with optional UTR" },
            { t: "Confirmed", d: "You match the bank and stamp received" },
          ].map((s) => (
            <div key={s.t} className="mkt-status-flow__item">
              <p className="font-bold text-yellow">{s.t}</p>
              <p className="mt-1 text-sm text-[#fff8e7]">{s.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#2a1540" size="content">
        <SectionHeading
          eyebrow="In practice"
          title="Built around how service work actually closes."
        />
        <div className="mkt-split-panel">
          <div
            className="mkt-split-panel__visual"
            style={{ backgroundImage: "url(/marketing/workshop.jpg)" }}
            aria-hidden
          />
          <div className="mkt-split-panel__body">
            <ul className="space-y-3 text-[#fff8e7]">
              {[
                "Issue a quote from a phone or desk",
                "Client accepts on a public page",
                "Convert lines to an invoice in one click",
                "Remind with WhatsApp-ready copy, then confirm cash",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm sm:text-base">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection variant="solid" solid="#4c1d95" align="center" size="band">
        <SectionHeading
          eyebrow="Get started"
          title="Ready to stop retyping invoices?"
          lead="Create a free account, add one client, and send your first quote today."
        >
          <div className="mkt-cta-row" style={{ marginTop: "1.25rem" }}>
            <Link href="/enter" className="folio-btn-ghost">
              Start free
            </Link>
            <Link href="/contact" className="folio-btn-ink">
              Ask a question
            </Link>
          </div>
        </SectionHeading>
      </MarketingSection>
    </main>
  );
}
