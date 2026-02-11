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

export interface OfficeLocation {
  id: string;
  type: "headquarters" | "regional" | "offshore" | "branch";
  label: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
  phone?: string | null;
  email?: string | null;
  mapLink?: string | null;
  mapEmbedUrl?: string | null;
  isActive: boolean;
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
  officeLocations: OfficeLocation[] | null;
  footerLocationsLimit: number | null;
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

// Default settings for fallback (empty defaults - actual data comes from database)
const defaultSettings: SiteSettings = {
  companyName: "IT Origin",
  tagline: null,
  description: null,
  email: "connect@itorigin.com",
  phone: "",
  whatsapp: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  postalCode: null,
  country: null,
  officeLocations: null,
  footerLocationsLimit: null,
  businessHours: null,
  timezone: null,
  socialLinks: null,
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

// Helper function to get office address string
export function getOfficeAddress(office: OfficeLocation): string {
  const parts = [
    office.addressLine1,
    office.addressLine2,
    office.city,
    office.state,
    office.postalCode,
    office.country,
  ].filter(Boolean);
  return parts.join(", ");
}

// Helper function to get active office locations
export function getActiveOffices(settings: SiteSettings | null): OfficeLocation[] {
  if (!settings?.officeLocations) return [];
  return settings.officeLocations.filter((office) => office.isActive);
}
