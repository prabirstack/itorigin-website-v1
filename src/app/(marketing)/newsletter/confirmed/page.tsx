import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterConfirmedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Subscription Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for confirming your email. You&apos;re now subscribed to our
          newsletter and will receive the latest cybersecurity insights and updates.
        </p>
        <Button asChild>
          <Link href="/blogs">Explore Our Blog</Link>
        </Button>
      </div>
    </div>
  );
}
