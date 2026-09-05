export type BlogInsight = {
  title: string;
  body: string;
};

export type BlogSection = {
  eyebrow: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  insights?: BlogInsight[];
  takeaways?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  image: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "quote-to-invoice-without-spreadsheets",
    title:
      "How to move from spreadsheet quotes to paid invoices without losing the thread",
    description:
      "Most payment delays start when a quote lives in WhatsApp and the invoice lives in Excel. Folio keeps one document trail from estimate to paid.",
    date: "2026-08-12",
    readingMinutes: 14,
    tags: ["invoicing", "operations"],
    image: "/blog/spreadsheet.jpg",
    sections: [
      {
        eyebrow: "The real problem",
        title: "Payment delays are usually story failures—not cash shortages.",
        lead:
          "If you run a clinic, studio, contractor crew, or agency, you already know the pattern: a price is agreed in chat, numbers land in a sheet, and a PDF arrives days later with a different total.",
        paragraphs: [
          "Clients rarely refuse to pay because they enjoy conflict. They refuse—or stall—because the commercial story broke. The WhatsApp thread said one amount. The spreadsheet said another. The PDF introduced tax nobody mentioned. By the time you chase, both sides are defending a different version of the truth.",
          "A quote and an invoice are the same commercial promise at two moments in time. When those moments live in different tools, you invent disputes. The fix is not “be more careful with Excel.” The fix is one trail: same lines, same numbering logic, same public page, same payment status.",
        ],
        insights: [
          {
            title: "Broken trail symptom",
            body: "You retype line items more than once for the same job.",
          },
          {
            title: "Broken trail symptom",
            body: "Clients ask “which amount is final?” after you already “agreed.”",
          },
          {
            title: "Broken trail symptom",
            body: "Payment proof lives in screenshots while the invoice lives elsewhere.",
          },
        ],
      },
      {
        eyebrow: "Design principle",
        title: "One folio. Two moments. Zero retyping.",
        lead:
          "Treat the estimate and the bill as chapters of one document—not as unrelated files.",
        paragraphs: [
          "Folio’s design is intentionally narrow: one numbered folio that begins as a quote, converts into an invoice when accepted, and then carries your payment QR on a public link. Convert means lock the accepted lines forward. It does not mean open a blank invoice and hope you remember the discount you promised on Tuesday.",
          "Retyping is where margin disappears. A mistyped quantity, a forgotten addon, a tax line added “because the template had it” — each edit is a quiet renegotiation. Teams that convert instead of recreate stop arguing about arithmetic and start arguing only about scope changes (which deserve a new document).",
        ],
        takeaways: [
          "Write line items a non-accountant can read out loud.",
          "Add tax only if you actually charge it on that job.",
          "Set valid-until on quotes and due dates on invoices.",
          "When the client accepts, convert—do not recreate.",
        ],
      },
      {
        eyebrow: "Operating system",
        title: "Statuses beat spreadsheets for weekly cash work.",
        paragraphs: [
          "Payment tracking does not need a bank feed on day one. It needs a shared status language: draft, sent, accepted, due, client claims paid, money received (or rejected back to due). That yellow “awaiting confirmation” state is the entire product for many owners who reconcile UPI by eye.",
          "Accounting exports can come later. Keep the customer-facing truth in one place so every reminder, every link, and every confirmation points at the same document. Excel can remain your ledger workbook; it should not remain the only place the client’s promise exists.",
        ],
        insights: [
          {
            title: "Due",
            body: "Invoice is live. Client can open the link and see your QR.",
          },
          {
            title: "Claimed",
            body: "Client says they paid. You verify against bank alerts—not memory.",
          },
          {
            title: "Confirmed",
            body: "Money is in. The trail closes cleanly for both sides.",
          },
        ],
      },
      {
        eyebrow: "Migration plan",
        title: "Leave spreadsheets without a big-bang cutover.",
        lead:
          "Move the next ten jobs—not your entire history—into a single document trail.",
        paragraphs: [
          "Week one: create clients for active work only. Issue quotes from Folio instead of chat price lists. Share the public link. Practice acceptance as a real event.",
          "Week two: convert every accepted quote. Stop issuing “fresh” invoices for already-quoted work. Upload your payment QR once in settings and leave it alone.",
          "Week three: run reminders from the invoice page. Log claims and confirmations. Compare how many fewer “which PDF?” messages you receive. That delta is your ROI—no vanity dashboard required.",
        ],
        takeaways: [
          "Do not migrate five years of Excel on day one.",
          "Train one habit: convert after accept.",
          "Keep Excel for accounting exports if needed—not for client truth.",
          "Measure fewer disputes, not more charts.",
        ],
      },
      {
        eyebrow: "Insight",
        title: "What “professional” actually means to a paying client.",
        paragraphs: [
          "Professional is not a watermark. Professional is a stable total, a clear due date, a payment method that works on a phone, and a human who confirms receipt without making the client prove they exist.",
          "If your process still requires the client to screenshot a UPI success screen and you to scroll WhatsApp at midnight, you do not have a collections problem—you have a document system problem. Fix the trail; collections get quieter.",
        ],
      },
    ],
  },
  {
    slug: "qr-payments-and-invoice-confirmation",
    title:
      "QR payments on invoices: why confirmation beats automatic capture for local businesses",
    description:
      "UPI and QR rails already move money. What businesses lack is a shared record of who claimed payment and when the owner verified it.",
    date: "2026-08-20",
    readingMinutes: 13,
    tags: ["payments", "UPI"],
    image: "/blog/qr-pay.jpg",
    sections: [
      {
        eyebrow: "Context",
        title: "India already solved rail. Operations did not catch up.",
        lead:
          "UPI and QR codes move money in seconds. Month-end still dies in screenshot archaeology.",
        paragraphs: [
          "Automatic payment gateways are powerful—and heavy. KYC, settlement delays, MDR fees, chargebacks, and a second dashboard to babysit. Many clinics, tutors, contractors, and studios already collect through a printed QR, a static UPI ID, or a business app they trust.",
          "The missing piece is not another processor. It is operational memory: who claimed payment, on which invoice, with what reference, and when the owner verified the bank credit. Without that memory, every polite client becomes a case file.",
        ],
        insights: [
          {
            title: "Gateway path",
            body: "Fees + KYC + webhooks. Great at scale; heavy for day-one local service work.",
          },
          {
            title: "QR + confirm path",
            body: "Use the rails you already have. Add claim/confirm statuses humans can run.",
          },
          {
            title: "Hybrid later",
            body: "Keep the same statuses when you add Razorpay or Stripe. Confirmation is a business concept.",
          },
        ],
      },
      {
        eyebrow: "How Folio does it",
        title: "Your QR is a stamp. Confirmation is the seal.",
        paragraphs: [
          "Upload the QR you already use. Folio places it on the public invoice page. The client pays in their own bank or UPI app—exactly as they do at a kirana counter. Then they tap “I have paid” and can leave a UTR or last four digits.",
          "Your board lights yellow: awaiting confirmation. You match the claim to a bank alert or statement line and mark money received—or reject and send the invoice back to due. That loop is slower than webhook magic by a few seconds of attention, and faster than hunting photos in WhatsApp media at month end.",
        ],
        takeaways: [
          "One QR in settings beats pasting images into every chat.",
          "Ask for UTR only as a helper—not as a guilt trip.",
          "Reject is a feature: wrong amount claims should not close the books.",
          "Log events so “I paid last Tuesday” is checkable.",
        ],
      },
      {
        eyebrow: "Fraud and fairness",
        title: "Claim is cheap. Confirmation is the control.",
        lead:
          "Anyone can say they paid. Only you should stamp money received.",
        paragraphs: [
          "A claim without confirmation is a polite notification, not a receipt. Train your team: never stop work-status ambiguity until confirmation. Never continue aggressive reminders after a claim—switch to verification mode.",
          "Partial payments happen. Scope changes happen. The discipline is the same: issue a clear document, collect against that document, confirm against the bank, and open a new document when the commercial promise changes. Silent edits after a QR was shared destroy trust faster than late fees.",
        ],
        insights: [
          {
            title: "After claim",
            body: "Pause reminders. Verify bank. Confirm or reject within a defined SLA (same day if possible).",
          },
          {
            title: "Wrong amount",
            body: "Reject, message the delta, keep the trail honest.",
          },
          {
            title: "Scope change",
            body: "New quote or invoice—do not silently mutate a live link.",
          },
        ],
      },
      {
        eyebrow: "Collections rhythm",
        title: "Remind the link, not the relationship.",
        paragraphs: [
          "A WhatsApp-ready message with amount, due date, and one invoice link beats “bhai payment?” every time. Pair external reminders with internal due-soon notices so you act before the relationship cools.",
          "When you eventually add a gateway, keep claim/confirm language in your ops brain. APIs change. Business statuses should not. Folio’s bet is that confirmation remains useful even when automation arrives.",
        ],
        takeaways: [
          "One link per chase message.",
          "Stop chasing after claim; start confirming.",
          "Measure days-to-confirm, not vanity “digital transformation” slides.",
        ],
      },
    ],
  },
  {
    slug: "free-invoicing-software-for-service-businesses",
    title:
      "What “free invoicing software” should actually include for service businesses",
    description:
      "Free plans that hide reminders, public links, or client history are demos. Here is a practical checklist for clinics, contractors, tutors, and agencies.",
    date: "2026-09-01",
    readingMinutes: 15,
    tags: ["buying guide", "SaaS"],
    image: "/blog/free.jpg",
    sections: [
      {
        eyebrow: "Buying filter",
        title: "Free is useless if the weekly pain is locked.",
        lead:
          "If creating a client, sending a quote, converting to invoice, sharing a link, chasing payment, or confirming receipt requires a paid seat—you will bounce back to WhatsApp.",
        paragraphs: [
          "Freemium demos love beautiful dashboards and limited “3 invoices / month” traps. Service businesses do not fail for lack of charts. They fail when the money path is metered. Judge free tools by whether the painful weekly loop is unlocked end-to-end.",
          "Folio ships free for every account on purpose. Auth keeps documents private; it is not a feature meter. That is both a product stance and an SEO promise: no fake freemium wall on the core path from quote to confirmed paid.",
        ],
        insights: [
          {
            title: "Must be free",
            body: "Clients, quotes, convert, public invoice link, QR, claim/confirm, basic reminders.",
          },
          {
            title: "Nice later",
            body: "Accounting exports, multi-entity GST packs, advanced automations.",
          },
          {
            title: "Red flag",
            body: "Public links or reminders gated behind annual plans.",
          },
        ],
      },
      {
        eyebrow: "Checklist",
        title: "The service-business invoice stack—item by item.",
        paragraphs: [
          "Client records need phone and email, not just a display name. Quotes need draft/sent states and a public accept/decline path. Invoices need stable numbering, optional tax labels (GST or none), due dates, and a payment trail humans can audit.",
          "Fancy forecasting is optional. Clear statuses are not. If you cannot answer “who owes what, who claimed paid, what is confirmed” in under a minute, the software is entertainment.",
        ],
        takeaways: [
          "Client list without duplicates becoming ghosts.",
          "Public quote accept/decline on mobile.",
          "One-click convert quote → invoice.",
          "Payment QR on the invoice page.",
          "Claim paid / confirm received event history.",
          "Reminder logging so you do not double-ping.",
        ],
      },
      {
        eyebrow: "Mobile truth",
        title: "Your client pays in a lobby—not at a desktop.",
        paragraphs: [
          "Public pages must be thumb-friendly. If the QR is buried under marketing fluff, the client will skip payment “for later,” which often means never. Test your own invoice link on a mid-range Android phone with one hand.",
          "Also test contrast and load time on weak networks. A beautiful PDF attachment that fails to open in WhatsApp is not a payment method.",
        ],
        insights: [
          {
            title: "Pass",
            body: "Open link → see amount → see QR → pay → tap I’ve paid in under a minute.",
          },
          {
            title: "Fail",
            body: "Forced signup for the payer, tiny QR, or totals that require pinch-zoom archaeology.",
          },
        ],
      },
      {
        eyebrow: "Audit trail",
        title: "Memory is not a controls system.",
        lead:
          "When a client says they paid last Tuesday, you should not rely on vibes.",
        paragraphs: [
          "Demand an event ledger: issued, reminded, claimed, confirmed, rejected. Arguments shrink when both sides can see the same timeline. This is the quiet feature that prevents support tickets from polite customers.",
          "If a vendor cannot show you that trail on the free plan, assume you will rebuild it in a notebook—and you already know how that ends.",
        ],
        takeaways: [
          "Prefer tools that log human confirmation, not only gateway webhooks.",
          "Prefer stable public URLs over emailed PDF versions.",
          "Prefer convert-over-retype workflows.",
        ],
      },
      {
        eyebrow: "Decision",
        title: "Choose the tool that makes next Monday quieter.",
        paragraphs: [
          "Run a one-week trial with real clients—not sample data. Count disputes, retypes, and “which file?” messages. The winning stack is the one that reduces those counts while staying free on the money path.",
          "Folio is built for that test. If your Monday still needs five apps to send one invoice, keep looking—or simplify until one desk holds the trail.",
        ],
      },
    ],
  },
  {
    slug: "whatsapp-invoice-reminders-that-do-not-annoy",
    title:
      "WhatsApp invoice reminders that get paid without sounding desperate",
    description:
      "Reminder copy matters. Pair a clear amount and due date with one link, one ask, and a calm tone.",
    date: "2026-09-05",
    readingMinutes: 12,
    tags: ["collections", "WhatsApp"],
    image: "/blog/whatsapp.jpg",
    sections: [
      {
        eyebrow: "Tone",
        title: "Aggressive reminders train clients to ignore you.",
        lead:
          "Vague reminders train them to negotiate. Specific reminders get paid.",
        paragraphs: [
          "Collections copy is a product surface. Caps-lock urgency, guilt, and daily pings signal desperation more than professionalism. The middle path is boring on purpose: name, document number, amount, due date, one link, one next step.",
          "Folio’s reminder template uses placeholders so every chase is consistent. Open WhatsApp with the message prefilled, or send email when Resend is configured. Log that a reminder happened so two teammates do not ping the same morning.",
        ],
        insights: [
          {
            title: "Bad",
            body: "“Sir?? payment pending since long pls do needful asap!!!!”",
          },
          {
            title: "Better",
            body: "Name + invoice # + amount + due date + link + one ask.",
          },
          {
            title: "Best",
            body: "Same structure every time, logged, stopped after claim.",
          },
        ],
      },
      {
        eyebrow: "Cadence",
        title: "Timing beats volume.",
        paragraphs: [
          "A practical cadence for service work: remind when issued (soft), two days before due (clear), and once the day after overdue (firm). Between windows, work the relationship offline if needed—do not spam.",
          "If the client claims payment, stop reminding and start confirming. Continuing to chase after “I’ve paid” is how you create support tickets out of polite customers.",
        ],
        takeaways: [
          "Issue → soft note with link.",
          "T-2 days → clear due reminder.",
          "T+1 overdue → firm, still polite, still one link.",
          "On claim → verify, don’t nag.",
        ],
      },
      {
        eyebrow: "Copy kit",
        title: "Reuse a skeleton—personalize only the facts.",
        lead:
          "Consistency builds trust. Improvised poetry does not improve DSO.",
        paragraphs: [
          "Skeleton: greeting + invoice reference + amount + due date + payment instruction (open link / scan QR) + appreciation + your name. Add one sentence of context only when scope was unusual.",
          "Avoid stacking three PDFs, two UPI IDs, and a Google Drive folder in one message. One public invoice link is the entire ask. If totals change, issue a new document—do not silently edit a link already chased.",
        ],
        insights: [
          {
            title: "Issued",
            body: "“Sharing invoice #… amount… due… link… thank you.”",
          },
          {
            title: "Before due",
            body: "“Friendly reminder: due on… link… happy to help if anything looks off.”",
          },
          {
            title: "Overdue",
            body: "“Invoice #… was due… amount still open… link… please confirm once paid.”",
          },
        ],
      },
      {
        eyebrow: "Team rules",
        title: "Make reminders a system, not a personality trait.",
        paragraphs: [
          "Write who is allowed to remind, from which number, and how claims are handed to whoever confirms bank entries. Without rules, your most anxious teammate becomes the collections department—and burns relationships.",
          "Measure reminder-to-claim time and claim-to-confirm time. Those two numbers teach you more than vanity “messages sent” counts.",
        ],
        takeaways: [
          "Log every reminder.",
          "One owner per invoice chase.",
          "Never change totals after a reminder without a new document.",
          "Celebrate confirmations, not message volume.",
        ],
      },
    ],
  },
  {
    slug: "organic-seo-for-local-service-tools",
    title: "Organic SEO for tools that serve local service businesses",
    description:
      "Ranking for invoicing and quoting intent means answering real jobs-to-be-done with durable pages—not stuffing keywords into a thin landing page.",
    date: "2026-09-10",
    readingMinutes: 16,
    tags: ["SEO", "content"],
    image: "/blog/seo.jpg",
    sections: [
      {
        eyebrow: "Intent",
        title: "These searchers are not browsing. They are stuck.",
        lead:
          "Queries like “free invoice with UPI QR” or “convert quote to invoice online” arrive with urgency—and embarrassment.",
        paragraphs: [
          "Your page should speak to that urgency with structure: problem, method, proof, next step. Feature grids that could belong to any SaaS brand fail this test. Owners want to know how Monday changes.",
          "Folio’s marketing pages are written as long, full-width guides with unique positioning: money documents with a status trail, claim-versus-confirm payment tracking, and free access to the full path. That is more indexable—and more useful—than a generic purple pricing table.",
        ],
        insights: [
          {
            title: "Transactional intent",
            body: "Ready to try a tool. Clear CTA, free path, no fake gate.",
          },
          {
            title: "Commercial investigation",
            body: "Comparing approaches. Checklists, tradeoffs, honest limits.",
          },
          {
            title: "Educational intent",
            body: "Learning ops. Long sectional guides with takeaways.",
          },
        ],
      },
      {
        eyebrow: "IA",
        title: "One primary intent per URL.",
        paragraphs: [
          "Home owns brand + category. Services owns workflow help. About owns trust and stance. Blog owns long-tail education. Contact owns human conversion. When every page tries to rank for everything, none of them deserve a featured snippet.",
          "Internal links should move readers from education to action: blog section → services step → start free. Do not orphan educational content from the product.",
        ],
        takeaways: [
          "Map each URL to one job-to-be-done.",
          "Use descriptive titles that match how owners talk.",
          "Canonical URLs, sitemap, robots that protect private app routes.",
          "Update posts when the product changes—living docs rank longer.",
        ],
      },
      {
        eyebrow: "On-page",
        title: "Full-width sections beat walls of text—and beat thin cards.",
        lead:
          "Scannable sections help humans and help search engines understand topical coverage.",
        paragraphs: [
          "Break guides into problem → principle → method → checklist → pitfalls → next step. Use insight tiles and takeaway lists. Keep brand voice concrete. Avoid keyword stuffing; prefer phrases owners actually type and say on calls.",
          "Technical basics still matter: fast mobile pages, readable contrast, Open Graph, JSON-LD for articles, and internal links that are not an afterthought.",
        ],
        insights: [
          {
            title: "Thin page",
            body: "300 words, stock hero, five logos, zero operational detail.",
          },
          {
            title: "Durable page",
            body: "Sectional guide, unique POV, clear CTA, updated when product ships.",
          },
        ],
      },
      {
        eyebrow: "Content ops",
        title: "Five strong articles beat twenty clones.",
        paragraphs: [
          "Publish steadily on jobs-to-be-done: quote-to-invoice, QR confirmation, reminder tone, free-plan checklists, local SEO for tools. Refresh when workflows change. Measure assisted signups from organic landing pages—not only raw rankings.",
          "If a post cannot earn a place in your own sales conversation, it will not earn a place in Google’s either. Write for the owner who still has grease, chalk, or clinic soap on their hands.",
        ],
        takeaways: [
          "Prioritize depth over publishing calendar vanity.",
          "Tie every post to a product CTA without hard-selling mid-sentence.",
          "Revisit top posts quarterly with real support questions as fuel.",
        ],
      },
      {
        eyebrow: "Proof",
        title: "Positioning is an SEO asset.",
        paragraphs: [
          "Generic “AI-powered all-in-one finance suite” pages compete with giants and sound like everyone else. Specific positioning—“claim paid is not money received,” “convert don’t retype,” “QR you already use”—creates phrases searchers remember and type.",
          "Build the site like a desk manual for local service money work. Rankings follow usefulness more often than they follow adjective density.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function allPosts() {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
