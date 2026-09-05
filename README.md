# Folio

Quote → invoice → QR pay. Free for every account. No AI. No subscriptions.

## Local

1. Copy `env.example` to `.env`.
2. `npx prisma db push`
3. `npx prisma generate`
4. `npm run dev`

Open [http://localhost:3000](http://localhost:3000). Create a desk, add a client, issue a quote, convert, upload a payment QR in Settings.

## Vercel / production SEO

Set **`NEXT_PUBLIC_APP_URL`** to your live HTTPS origin (e.g. `https://your-domain.com`). Canonicals, `sitemap.xml`, Open Graph URLs, and JSON-LD all use this value—localhost in production will hurt indexing.

After deploy:

1. Verify the domain in Google Search Console.
2. Submit `https://your-domain.com/sitemap.xml`.
3. Request indexing for `/`, `/services`, `/pricing`, `/upi-qr-invoice`, and top blog posts.

`/enter` is `noindex` so signup does not compete with the home page in SERPs.

## Vercel env

```
DATABASE_URL=
AUTH_SECRET=   # long random string
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
BLOB_READ_WRITE_TOKEN=   # Vercel Blob, for QR/logo
RESEND_API_KEY=          # optional reminders by email
RESEND_FROM=
GOOGLE_APPS_SCRIPT_CONTACT_URL=  # optional contact form mailer
```

Deploy. WhatsApp reminders work without Resend.

Without Blob, uploads save under `/public/uploads` (fine locally; use Blob on Vercel).
