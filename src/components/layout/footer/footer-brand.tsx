"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
import { footerSocialLinks } from "@/lib/data/footer-data";
import { iconMap } from "@/lib/icon-map";

export function FooterBrand() {
  return (
    <div className="lg:col-span-4 space-y-8">
      {/* Logo and Description */}
      <div className="space-y-4">
        <Link href="/">
          <div className="relative w-32 h-10">
            {/* Light mode logo */}
            <Image
              src="/images/logo/logo-dark.webp"
              alt="Logo Light"
              fill
              className="block dark:hidden object-contain"
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
          {footerSocialLinks.map((social) => {
            const IconComponent = iconMap[social.iconName];
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-10 h-10 bg-muted hover:bg-primary rounded-lg text-muted-foreground hover:text-primary-foreground transition-all duration-200 ${social.hoverColor}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
              </motion.a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
