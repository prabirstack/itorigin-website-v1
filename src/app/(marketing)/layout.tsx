import { Topbar } from "@/components/layout/topbar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { ChatSupport } from "@/components/layout/chat-support";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background font-sans">
      <Topbar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <ScrollToTop />
      <ChatSupport />
      <SiteFooter />
    </div>
  );
}
