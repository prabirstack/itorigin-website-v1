"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { DesktopNav } from "./desktop-nav";

import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm z-40"
          : "bg-background/30 backdrop-blur-sm text-white z-40"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ zIndex: 40 }} // Ensure header is below mobile nav
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={"/"}>
            {/* Logo */}
            <div className="relative w-32 h-10">
              {/* Light mode logo */}
              <Image
                src="/images/logo/logo-dark.webp"
                alt="Logo Light"
                fill
                className="block dark:hidden object-contain "
                priority
              />

              {/* Dark mode logo */}
              <Image
                src="/images/logo/logo-liight.webp"
                alt="Logo Dark"
                fill
                className="hidden dark:block object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <DesktopNav />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Contact Info - Hidden on mobile */}
            <div className="hidden xl:flex items-center space-x-4">
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="w-px h-4 bg-border" />
              <a
                href="mailto:info@itorigin.com"
                className="flex items-center space-x-2 text-sm text-foreground hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>info@itorigin.com</span>
              </a>
            </div>

            {/* CTA Button - Hidden on mobile */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex-nowrap"
              >
                Secure Now
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      />
    </motion.header>
  );
};
