import { redirect } from "next/navigation";
import { requireBusiness } from "@/lib/auth";
import { SettingsForm } from "@/components/folio/SettingsForm";

export default async function SettingsPage() {
  const ctx = await requireBusiness();
  if (!ctx) redirect("/enter");
  const b = ctx.business;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Business details and the payment QR shown on invoices.
      </p>
      <SettingsForm
        business={{
          name: b.name,
          currency: b.currency,
          taxLabel: b.taxLabel,
          taxRate: b.taxRate,
          defaultDueDays: b.defaultDueDays,
          payInstructions: b.payInstructions,
          reminderTemplate: b.reminderTemplate,
          logoUrl: b.logoUrl,
          paymentQrUrl: b.paymentQrUrl,
        }}
      />
    </div>
  );
}
