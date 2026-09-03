import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { MarketingMotionEffects } from "@/components/marketing/MarketingMotionEffects";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="folio-app-shell min-h-screen">
      <MarketingMotionEffects />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
