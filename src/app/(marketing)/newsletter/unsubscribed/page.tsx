import Link from "next/link";
import { MailX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterUnsubscribedPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <MailX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Unsubscribed</h1>
        <p className="text-muted-foreground mb-8">
          You&apos;ve been successfully unsubscribed from our newsletter.
          We&apos;re sorry to see you go!
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Changed your mind? You can always subscribe again from our website.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
