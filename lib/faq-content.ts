export type FaqItem = {
  question: string;
  answer: string;
};

export const coreFaqs: FaqItem[] = [
  {
    question: "Is Folio really free forever?",
    answer:
      "Yes. Every account gets the full quote → invoice → QR → claim/confirm path at ₹0. There is no freemium meter on clients, documents, public links, or payment confirmation.",
  },
  {
    question: "Does Folio process UPI or card payments?",
    answer:
      "No. Clients pay using your existing UPI QR or bank details. Folio shows the QR on the public invoice and records claim/confirm statuses. Money moves on rails outside Folio—no gateway fees from us.",
  },
  {
    question: "Is Folio a GST filing or accounting tool?",
    answer:
      "No. Folio is a service-desk money trail: quotes, invoices, public links, and payment confirmation. It is not Tally, not a GST portal exporter, and not inventory billing software. Use it beside your CA workflow, not as a replacement for statutory filing.",
  },
  {
    question: "Can I put a UPI QR on invoices?",
    answer:
      "Yes. Upload the QR you already use once in settings. Folio places it on public invoice pages so clients can scan and pay in any UPI app, then tap that they paid for you to confirm.",
  },
  {
    question: "What is claim vs confirm?",
    answer:
      "Claim means the client says they paid. Confirm means you verified money in your bank or UPI alerts and closed the trail. Claim alone is never treated as settled.",
  },
  {
    question: "Who is Folio for?",
    answer:
      "Indian freelancers, clinics, studios, tutors, contractors, and agencies that quote work, send invoices, collect via UPI/QR, and chase payments on WhatsApp—without needing retail inventory or full accounting software.",
  },
  {
    question: "Do clients need a Folio account to pay?",
    answer:
      "No. They open your public document link on a phone, see the amount and QR, pay in their own app, and can mark that they paid. No client signup wall.",
  },
  {
    question: "How do WhatsApp reminders work?",
    answer:
      "Folio helps you send calm, structured reminder copy with amount, due date, and one invoice link. You control the chase; Folio keeps the document and status trail consistent.",
  },
  {
    question: "Where is Folio operated from?",
    answer:
      "Folio is operated from Chandigarh, India. Contact us by email or the contact form for product, partnership, or support questions.",
  },
  {
    question: "Can I convert a quote into an invoice?",
    answer:
      "Yes. When a client accepts, convert the quote so the same line items become the invoice—no retyping. That convert-not-recreate habit is the core of Folio’s money path.",
  },
];
