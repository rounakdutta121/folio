import type { Metadata } from "next";
import Link from "next/link";
import { EnterForm } from "@/components/folio/EnterForm";
import { mktImg } from "@/lib/marketing-images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Create a free Folio desk",
  description:
    "Create your free Folio account to send quotes, convert to invoices, share your UPI QR, and confirm client payments. Sign-in for existing desks.",
  path: "/enter",
  noIndex: true,
});

export default async function EnterPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  const signIn = mode === "in";

  return (
    <main
      className="folio-app-shell flex min-h-screen items-center justify-center px-3 py-8 sm:px-4 sm:py-12"
      style={{
        backgroundImage: `linear-gradient(160deg, rgba(7,19,31,0.55), rgba(10,28,43,0.7)), url(${mktImg.enterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md folio-panel p-5 sm:p-8">
        <Link href="/" className="font-display text-lg font-bold text-ink">
          Folio
        </Link>
        <p className="mt-1 text-sm text-muted">Free forever — no plans</p>
        <h1 className="mt-6 text-2xl font-semibold">
          {signIn ? "Sign in" : "Create account"}
        </h1>
        <EnterForm mode={signIn ? "in" : "up"} />
        <p className="mt-6 text-sm text-muted">
          {signIn ? (
            <>
              New here?{" "}
              <Link href="/enter" className="text-accent hover:underline">
                Start free
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/enter?mode=in"
                className="text-accent hover:underline"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
