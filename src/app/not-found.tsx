"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Shield } from "lucide-react";
import { Container } from "@/components/common/container";

export default function NotFound() {
  const quickLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Shield },
    { name: "Contact", href: "/contact", icon: Search },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Graphic */}
          <div className="mb-8">
            <div className="relative inline-block">
              <span className="text-[150px] md:text-[200px] font-black text-primary/10 leading-none select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-20 h-20 md:w-28 md:h-28 text-primary" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Don&apos;t worry, even the best security systems have blind spots.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <button
              onClick={() => typeof window !== 'undefined' && window.history.back()}
              className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Or try one of these pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 rounded-lg bg-accent hover:bg-primary/10 transition-colors inline-flex items-center gap-2 text-sm font-medium"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-muted-foreground">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>.
          </p>
        </div>
      </Container>
    </div>
  );
}
