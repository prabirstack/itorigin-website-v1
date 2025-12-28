import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

export function FooterBottom() {
  return (
    <div className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} IT Origin. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/site-index"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Site Index
            </Link>
            <Link
              href="/accessibility"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Accessibility
            </Link>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <span>Made in</span>
              <span className="text-red-500">♥</span>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
