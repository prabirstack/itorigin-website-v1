"use client";

import React from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { RiTwitterXFill, RiFacebookFill, RiInstagramLine, RiYoutubeLine } from "react-icons/ri";
import { useSettings, getPhoneLink, getEmailLink, getActiveOffices, type OfficeLocation } from "@/components/providers/settings-provider";
import { Logo } from "@/components/common/logo";

export function FooterBrand() {
  const { settings } = useSettings();

  const phone = settings?.phone;
  const email = settings?.email;
  const description = settings?.description;
  const socialLinks = settings?.socialLinks || {};

  // Get active office locations from database (shows all active offices)
  const activeOffices = getActiveOffices(settings);

  // Fallback to legacy address fields if no office locations
  const legacyAddress: OfficeLocation | null = settings?.addressLine1 ? {
    id: "legacy",
    type: "headquarters",
    label: "Office",
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2,
    city: settings.city || "",
    state: settings.state,
    postalCode: settings.postalCode,
    country: settings.country || "",
    phone: settings.phone,
    email: settings.email,
    isActive: true,
  } : null;

  // Use office locations if available, otherwise use legacy address
  // All active offices are shown - use the Active toggle per office in admin to control visibility
  const offices = activeOffices.length > 0 ? activeOffices : (legacyAddress ? [legacyAddress] : []);

  const socialIcons = [
    { name: "Twitter", icon: RiTwitterXFill, href: socialLinks.twitter, color: "hover:bg-[#1DA1F2]" },
    { name: "LinkedIn", icon: Linkedin, href: socialLinks.linkedin, color: "hover:bg-[#0A66C2]" },
    { name: "Facebook", icon: RiFacebookFill, href: socialLinks.facebook, color: "hover:bg-[#1877F2]" },
    { name: "Instagram", icon: RiInstagramLine, href: socialLinks.instagram, color: "hover:bg-[#E4405F]" },
    { name: "YouTube", icon: RiYoutubeLine, href: socialLinks.youtube, color: "hover:bg-[#FF0000]" },
  ].filter(social => social.href);

  return (
    <div className="lg:col-span-4 space-y-8">
      {/* Logo and Description */}
      <div className="space-y-4">
        <Logo size="sm" animated={false} className="w-32 h-10" />

        <p className="text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Get in Touch</h4>
        <div className="space-y-3">
          {phone && (
            <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <a href={getPhoneLink(phone)}>{phone}</a>
            </div>
          )}
          {email && (
            <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <a href={getEmailLink(email)}>{email}</a>
            </div>
          )}
          {offices.map((office) => (
            <div key={office.id} className="flex items-start space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mt-0.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                {offices.length > 1 && (
                  <p className="font-medium text-foreground text-xs mb-1">{office.label}</p>
                )}
                <p>{office.addressLine1}</p>
                {office.addressLine2 && <p>{office.addressLine2}</p>}
                <p>{office.city} {office.postalCode}</p>
                {(office.state || office.country) && (
                  <p>{[office.state, office.country].filter(Boolean).join(", ")}</p>
                )}
                {/* Show office-specific contact info when multiple offices exist */}
                {offices.length > 1 && (office.phone || office.email) && (
                  <div className="mt-2 space-y-1 text-xs">
                    {office.phone && (
                      <a href={getPhoneLink(office.phone)} className="block hover:text-primary transition-colors">
                        {office.phone}
                      </a>
                    )}
                    {office.email && (
                      <a href={getEmailLink(office.email)} className="block hover:text-primary transition-colors">
                        {office.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
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
