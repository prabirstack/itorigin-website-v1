import React from "react";
import Link from "next/link";
import { footerSections } from "@/lib/data/footer-data";

export function FooterLinks() {
  return (
    <div className="lg:col-span-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
              {section.title}
            </h4>
            <nav className="space-y-3">
              {section.links.map((link) => (
                <div key={link.name} className="flex items-center space-x-2">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                  {link.isNew && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      New
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}
