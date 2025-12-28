"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string | null;
  description: string | null;
  email: string;
  phone: string;
  whatsapp: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  businessHours: string | null;
  timezone: string | null;
  socialLinks: SocialLinks | null;
  calendlyUrl: string | null;
  supportEmail: string | null;
  salesEmail: string | null;
  mapLink: string | null;
}

interface SettingsContextType {
  settings: SiteSettings | null;
  isLoading: boolean;
}

// Default settings for fallback
const defaultSettings: SiteSettings = {
  companyName: "IT Origin",
  tagline: "Cybersecurity Excellence",
  description: "Leading cybersecurity solutions provider",
  email: "info@itorigin.com",
  phone: "+1 (234) 567-890",
  whatsapp: null,
  addressLine1: "123 Cybersecurity Avenue",
  addressLine2: "Tech District",
  city: "Mumbai",
  state: "Maharashtra",
  postalCode: "400001",
  country: "India",
  businessHours: "Mon-Fri 9:00 AM - 6:00 PM",
  timezone: "IST",
  socialLinks: {
    twitter: "https://twitter.com/itorigin",
    linkedin: "https://linkedin.com/company/itorigin",
    github: "https://github.com/itorigin",
  },
  calendlyUrl: null,
  supportEmail: null,
  salesEmail: null,
  mapLink: null,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        // Keep default settings on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Helper function to get full address string
export function getFullAddress(settings: SiteSettings | null): string {
  if (!settings) return "";
  const parts = [
    settings.addressLine1,
    settings.addressLine2,
    settings.city,
    settings.state,
    settings.postalCode,
    settings.country,
  ].filter(Boolean);
  return parts.join(", ");
}

// Helper function to get formatted phone link
export function getPhoneLink(phone: string | null): string {
  if (!phone) return "";
  return `tel:${phone.replace(/\s/g, "")}`;
}

// Helper function to get formatted email link
export function getEmailLink(email: string | null): string {
  if (!email) return "";
  return `mailto:${email}`;
}
