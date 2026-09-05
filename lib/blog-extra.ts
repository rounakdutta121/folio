/** Additional long-tail SEO posts (merged into the blog index). */
export const extraBlogPosts = [
  {
    slug: "gst-invoice-vs-service-desk-billing",
    title:
      "GST invoice software vs a service desk: pick the job before the tool",
    description:
      "Indian search is full of GST billing apps. Here is how to tell when you need filing/inventory software—and when a free quote-to-invoice desk with UPI confirmation is enough.",
    date: "2026-09-04",
    readingMinutes: 11,
    tags: ["GST", "buying guide"],
    image: "/marketing/svc-quotes.jpg",
    sections: [
      {
        eyebrow: "Intent mismatch",
        title: "“GST invoice” often means three different jobs.",
        lead:
          "Filing, retail billing, and service collections get mashed into one query—and the wrong tool wastes a quarter.",
        paragraphs: [
          "If you need HSN libraries, stock, e-way bills, and GSTR exports as the weekly job, choose Vyapar, Tally, myBillBook, or Zoho Books. Those products are built for that gravity.",
          "If your pain is quoting a service, converting to an invoice, sharing a UPI QR, and knowing who claimed paid, you need a money trail—not an ERP. Folio is explicit about that limit so you do not buy the wrong promise.",
        ],
        takeaways: [
          "Match the tool to the weekly pain, not the loudest keyword",
          "Folio is not a GST filing product",
          "You can still label tax on documents when you charge it",
        ],
      },
      {
        eyebrow: "Decision",
        title: "A simple filter for service businesses.",
        paragraphs: [
          "Ask: do I sell countable stock across a counter, or do I sell jobs with estimates? Stock → GST billing suite. Jobs → quote-to-invoice desk. Many owners need both: Folio for client-facing documents, CA tools for returns.",
          "Read Folio’s pricing and FAQ for the honest free forever stance, then try one real client on a public link before you migrate history.",
        ],
        insights: [
          {
            title: "Stay with GST suites when",
            body: "Inventory, multi-counter retail, or filing automation is the core job.",
          },
          {
            title: "Try Folio when",
            body: "WhatsApp + Excel is your invoicing stack and UPI is how you collect.",
          },
        ],
      },
    ],
  },
  {
    slug: "confirm-upi-payment-on-invoice",
    title: "How to confirm a UPI payment on an invoice without screenshot chaos",
    description:
      "A practical SOP for Indian service desks: share one invoice link with QR, let clients claim payment, verify the bank alert, then confirm—or reject.",
    date: "2026-09-03",
    readingMinutes: 10,
    tags: ["payments", "UPI", "operations"],
    image: "/blog/qr-pay.jpg",
    sections: [
      {
        eyebrow: "SOP",
        title: "Due → claim → verify → confirm.",
        paragraphs: [
          "Put the invoice link in the chase message—not a gallery QR. When the client pays, they can mark paid and leave a UTR. Your board turns to awaiting confirmation.",
          "Match the claim to a UPI alert or statement line within a same-day SLA when possible. Confirm only when money is real. Reject wrong amounts and keep the document honest.",
        ],
        takeaways: [
          "Never treat claim as settled",
          "Pause reminders after claim; switch to verification",
          "Log the event so “I paid Tuesday” is checkable",
        ],
      },
      {
        eyebrow: "Why it works",
        title: "Confirmation is a control, not a nicety.",
        paragraphs: [
          "Gateway webhooks are powerful and heavy. Local desks already collect on UPI. Folio’s bet is operational memory on top of rails you trust—see the UPI QR invoice guide and the QR confirmation article for the product view.",
        ],
      },
    ],
  },
  {
    slug: "invoice-payment-reminder-templates",
    title: "Invoice payment reminder templates for WhatsApp (India)",
    description:
      "Copy-paste WhatsApp reminder templates for issued, before-due, and overdue invoices—amount, due date, one link, calm tone.",
    date: "2026-09-02",
    readingMinutes: 9,
    tags: ["WhatsApp", "collections", "templates"],
    image: "/blog/whatsapp.jpg",
    sections: [
      {
        eyebrow: "Templates",
        title: "Reuse the skeleton. Personalize only the facts.",
        lead: "Consistency gets paid. Improvised guilt does not.",
        paragraphs: [
          "Issued: “Hi {Name}, sharing invoice {#} for ₹{Amount}, due {Date}. Pay via the link (QR inside): {Link}. Thank you — {Your name}.”",
          "Before due: “Friendly reminder: invoice {#} for ₹{Amount} is due {Date}. Link: {Link}. Happy to clarify anything on the lines.”",
          "Overdue: “Hi {Name}, invoice {#} for ₹{Amount} was due {Date} and is still open. Please pay here: {Link}. Confirm once done so we can close it.”",
        ],
        takeaways: [
          "One link per message",
          "Stop chasing after claim; start confirming",
          "Log reminders so teammates do not double-ping",
        ],
      },
      {
        eyebrow: "Product",
        title: "Pair templates with a real invoice page.",
        paragraphs: [
          "Templates fail when the link opens a PDF that does not show QR. Folio keeps amount, due date, and QR on one public page. Pair this kit with the WhatsApp reminders guide for tone and cadence.",
        ],
      },
    ],
  },
  {
    slug: "freelancer-upi-invoice-india",
    title: "Freelancer invoice with UPI in India: a clean weekly setup",
    description:
      "How Indian freelancers can send quotes, convert to invoices, collect on UPI QR, and confirm payments without freemium invoice limits.",
    date: "2026-08-28",
    readingMinutes: 10,
    tags: ["freelancers", "UPI", "invoicing"],
    image: "/marketing/svc-audience.jpg",
    sections: [
      {
        eyebrow: "Weekly loop",
        title: "Four moves freelancers actually need.",
        paragraphs: [
          "Create the client once. Quote with readable lines. Convert after accept. Share the invoice link with QR. Confirm when UPI lands.",
          "Skip rebuilding Canva invoices and pasting UPI IDs into every chat. See Folio for freelancers for the positioning page, and open a free desk to run one real job.",
        ],
        takeaways: [
          "Public links beat attachments on weak networks",
          "Free forever matters when volume is spiky",
          "Claim/confirm replaces screenshot archaeology",
        ],
      },
    ],
  },
  {
    slug: "estimate-to-invoice-checklist",
    title: "Estimate to invoice checklist for service businesses",
    description:
      "A practical checklist to move from quotation to invoice without retyping lines, losing discounts, or confusing clients.",
    date: "2026-08-25",
    readingMinutes: 8,
    tags: ["invoicing", "operations", "checklist"],
    image: "/marketing/svc-convert.jpg",
    sections: [
      {
        eyebrow: "Checklist",
        title: "Before you hit convert.",
        takeaways: [
          "Lines a non-accountant can read aloud",
          "Tax only if you actually charge it on that job",
          "Valid-until on the estimate",
          "Client accepted on the record (not vibes)",
          "Convert—do not recreate in a blank invoice",
          "Due date + payment QR on the invoice page",
          "Reminder logged with one link",
        ],
        paragraphs: [
          "Retyping is where margin disappears. Folio’s convert step exists so the commercial promise stays continuous. Deep dive: quote to invoice without spreadsheets.",
        ],
      },
    ],
  },
  {
    slug: "free-invoice-generator-india-traps",
    title: "Free invoice generators in India: traps to avoid",
    description:
      "No-login generators are fine for one PDF. Service businesses need clients, convert, public QR links, and payment confirmation—here is what “free” should include.",
    date: "2026-08-22",
    readingMinutes: 9,
    tags: ["buying guide", "free tools"],
    image: "/blog/free.jpg",
    sections: [
      {
        eyebrow: "Traps",
        title: "Pretty PDF ≠ paid invoice.",
        paragraphs: [
          "Browser generators that spit a PDF without client history, public links, or payment status push you back to WhatsApp for the hard part: getting paid.",
          "Freemium suites that meter reminders or public links fail the Monday test. Use the free invoicing checklist post and Folio pricing to judge the money path—not the template gallery.",
        ],
        insights: [
          {
            title: "OK for",
            body: "One-off personal invoices with no follow-up.",
          },
          {
            title: "Not OK for",
            body: "Ongoing service work with UPI chase and disputes.",
          },
        ],
      },
    ],
  },
];
