"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

export function NewsletterCTAInline() {
  return (
    <div className="p-8 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 my-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-black mb-2">Don&apos;t Miss Out on Security Insights</h3>
          <p className="text-muted-foreground">
            Join 10,000+ security professionals receiving weekly updates on the latest threats,
            best practices, and industry trends.
          </p>
        </div>

        <Link
          href="#newsletter-signup"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}
