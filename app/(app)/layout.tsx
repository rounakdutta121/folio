import { redirect } from "next/navigation";
import { AppNav } from "@/components/folio/AppNav";
import { LiveRefresh } from "@/components/folio/LiveRefresh";
import { requireBusiness } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  return (
    <div className="folio-app-shell text-ink">
      <LiveRefresh />
      <AppNav studio={ctx.business.name} />
      <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}
