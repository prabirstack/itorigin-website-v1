"use client";

import React, { useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Shield,
  FileCheck,
  Users,
  Award,
  Clock,
  Globe,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  CheckCircle,
} from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { Container } from "../common/container";
import Image from "next/image";

interface FooterSection {
  title: string;
  links: { name: string; href: string; isNew?: boolean }[];
}

const footerSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { name: "Managed SOC Services", href: "/services/managed-soc-services" },
      { name: "Offensive Security", href: "/services/offensive-security" },
      { name: "Penetration Testing", href: "/services/penetration-testing" },
      { name: "Vulnerability Assessment", href: "/services/vulnerability-assessment" },
      { name: "GRC Services", href: "/services/grc-services" },
      { name: "Security Auditing", href: "/services/security-audit", isNew: true },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Careers", href: "/careers" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blogs" },
      { name: "News & Events", href: "/news" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Security Center", href: "/security" },
      { name: "Best Practices", href: "/best-practices" },
      { name: "Whitepapers", href: "/whitepapers" },
      { name: "Webinars", href: "/webinars", isNew: true },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
      { name: "SLA", href: "/sla" },
      { name: "Security Policy", href: "/security-policy" },
    ],
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/company/it-origin",
    color: "hover:text-blue-600",
  },
  {
    name: "X (formerly Twitter)",
    icon: RiTwitterXFill,
    href: "https://twitter.com/itorigin",
    color: "hover:text-foreground",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/itorigin",
    color: "hover:text-blue-500",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/itorigin",
    color: "hover:text-pink-500",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@itorigin",
    color: "hover:text-red-500",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/itorigin",
    color: "hover:text-gray-400",
  },
];

const stats = [
  { icon: Shield, label: "Security Incidents Prevented", value: "10,000+" },
  { icon: Users, label: "Enterprise Clients", value: "500+" },
  { icon: Globe, label: "Countries Served", value: "25+" },
  { icon: Award, label: "Security Certifications", value: "50+" },
];

export const SiteFooter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <footer className="relative bg-background border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />

      <div className="relative">
        {/* Main Footer Content */}
        <Container className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-8">
              {/* Logo and Description */}
              <div className="space-y-4">
                {/* <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-primary/20 rounded-lg rotate-6" />
                    <div className="relative flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                      <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">IT Origin</h3>
                    <p className="text-sm text-muted-foreground">Cybersecurity Excellence</p>
                  </div>
                </div> */}
                {/* Logo */}
                <Link href={"/"}>
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

                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Leading cybersecurity solutions provider offering comprehensive SOC services,
                  offensive security testing, and GRC consulting to protect your digital assets and
                  ensure compliance.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Get in Touch</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <a href="mailto:info@itorigin.com">info@itorigin.com</a>
                  </div>
                  <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mt-0.5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p>123 Cybersecurity Avenue</p>
                      <p>Tech District, Mumbai 400001</p>
                      <p>Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center w-10 h-10 bg-muted hover:bg-primary rounded-lg text-muted-foreground hover:text-primary-foreground transition-all duration-200 ${social.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Links Sections */}
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

            {/* Newsletter Subscription */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Get the latest cybersecurity insights, threat intelligence, and product updates.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-muted-foreground"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoading || isSubscribed}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all duration-200 ${
                      isSubscribed
                        ? "bg-green-500 text-white"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : isSubscribed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>

                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-600 dark:text-green-400"
                  >
                    ✅ Successfully subscribed!
                  </motion.p>
                )}

                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and consent to receive updates from IT Origin.
                </p>
              </form>

              {/* Security Badges */}
              <div className="space-y-4">
                <h5 className="font-medium text-foreground text-sm">Security & Compliance</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">ISO 27001</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">SOC 2</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <FileCheck className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">GDPR</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">HIPAA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Stats Section */}
        <div className="border-t border-border bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center space-y-2"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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
};
