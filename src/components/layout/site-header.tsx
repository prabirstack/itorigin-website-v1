"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { DesktopNav } from "./desktop-nav";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { Logo } from "../common/logo";

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();

  // Transform scroll position to progress (0 to 1)
  const scrollProgress = useTransform(scrollY, [0, 300], [0, 1]);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
          : "bg-transparent backdrop-blur-none"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1],
        delay: 0.3
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with scale animation */}
<Logo />

          {/* Desktop Navigation with stagger animation */}
          <motion.div
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <DesktopNav />
          </motion.div>

          {/* Right Side Actions */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* CTA Button - Hidden on mobile */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/25 overflow-hidden"
              >
                <span className="relative z-10">Secure Now</span>
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Navigation */}
            <MobileNav />
          </motion.div>
        </div>
      </div>

      {/* Animated scroll progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-primary/80 to-primary origin-left"
        style={{
          scaleX: scrollProgress,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />3

      {/* Subtle bottom glow when scrolled */}
      {isScrolled && (
        <motion.div
          className="absolute -bottom-px left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.header>
  );
};
