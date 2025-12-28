"use client";

import React from "react";
import { Container } from "@/components/common/container";
import { FooterBrand } from "./footer-brand";
import { FooterLinks } from "./footer-links";
import { FooterNewsletter } from "./footer-newsletter";
import { FooterStats } from "./footer-stats";
import { FooterBottom } from "./footer-bottom";

export function SiteFooter() {
  return (
    <footer className="relative bg-background border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />

      <div className="relative">
        {/* Main Footer Content */}
        <Container className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <FooterBrand />
            <FooterLinks />
            <FooterNewsletter />
          </div>
        </Container>

        {/* Stats Section */}
        <FooterStats />

        {/* Bottom Bar */}
        <FooterBottom />
      </div>

      {/* Custom CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </footer>
  );
}

export default SiteFooter;
