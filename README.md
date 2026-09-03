# Folio

Quote → invoice → QR pay. Free for every account. No AI. No subscriptions.

## Local

1. Copy `env.example` to `.env` (SQLite is already set).
2. `npx prisma db push`
3. `npx prisma generate`
4. `npm run dev`

Open [http://localhost:3000](http://localhost:3000). Create a desk, add a client, issue a quote, convert, upload a payment QR in Settings.

## Vercel

1. Create a [Neon](https://neon.tech) Postgres database.
2. In `prisma/schema.prisma` set `provider = "postgresql"` and point `DATABASE_URL` at Neon.
3. `npx prisma db push` (or migrate) against Neon.
4. Vercel project env:

```
DATABASE_URL=
AUTH_SECRET=   # long random string
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
BLOB_READ_WRITE_TOKEN=   # Vercel Blob, for QR/logo
RESEND_API_KEY=          # optional reminders by email
RESEND_FROM=
```

5. Deploy. WhatsApp reminders work without Resend.

Without Blob, uploads save under `/public/uploads` (fine locally; use Blob on Vercel).
