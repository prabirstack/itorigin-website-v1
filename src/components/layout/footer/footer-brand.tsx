"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { RiTwitterXFill, RiFacebookFill, RiInstagramLine, RiYoutubeLine } from "react-icons/ri";
import { useSettings, getPhoneLink, getEmailLink } from "@/components/providers/settings-provider";

export function FooterBrand() {
  const { settings } = useSettings();

  const phone = settings?.phone || "+1 (234) 567-890";
  const email = settings?.email || "info@itorigin.com";
  const addressLine1 = settings?.addressLine1 || "123 Cybersecurity Avenue";
  const addressLine2 = settings?.addressLine2 || "Tech District";
  const city = settings?.city || "Mumbai";
  const postalCode = settings?.postalCode || "400001";
  const state = settings?.state || "Maharashtra";
  const country = settings?.country || "India";
  const description = settings?.description || "Leading cybersecurity solutions provider offering comprehensive SOC services, offensive security testing, and GRC consulting to protect your digital assets and ensure compliance.";
  const socialLinks = settings?.socialLinks || {};

  const socialIcons = [
    { name: "Twitter", icon: RiTwitterXFill, href: socialLinks.twitter, color: "hover:bg-[#1DA1F2]" },
    { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin, color: "hover:bg-[#0A66C2]" },
    { name: "GitHub", icon: Github, href: socialLinks.github, color: "hover:bg-[#333]" },
    { name: "Facebook", icon: RiFacebookFill, href: socialLinks.facebook, color: "hover:bg-[#1877F2]" },
    { name: "Instagram", icon: RiInstagramLine, href: socialLinks.instagram, color: "hover:bg-[#E4405F]" },
    { name: "YouTube", icon: RiYoutubeLine, href: socialLinks.youtube, color: "hover:bg-[#FF0000]" },
  ].filter(social => social.href);

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
          {description}
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
            <a href={getPhoneLink(phone)}>{phone}</a>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <a href={getEmailLink(email)}>{email}</a>
          </div>
          <div className="flex items-start space-x-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mt-0.5">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p>{addressLine1}</p>
              {addressLine2 && <p>{addressLine2}</p>}
              <p>{city} {postalCode}</p>
              <p>{state}, {country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      {socialIcons.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Follow Us</h4>
          <div className="flex space-x-3">
            {socialIcons.map((social) => {
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
                  aria-label={`Follow us on ${social.name}`}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
