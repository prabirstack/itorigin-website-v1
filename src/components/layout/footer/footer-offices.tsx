"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useSettings, getPhoneLink, getEmailLink, getActiveOffices, type OfficeLocation } from "@/components/providers/settings-provider";

export function FooterOffices() {
  const { settings } = useSettings();

  const activeOffices = getActiveOffices(settings);

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

  const offices = activeOffices.length > 0 ? activeOffices : (legacyAddress ? [legacyAddress] : []);

  // Only render the full-width grid when there are multiple offices
  if (offices.length <= 1) return null;

  return (
    <div className="mt-8 pt-8 border-t border-border/40">
      <h4 className="font-semibold text-foreground mb-4">Our Offices</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offices.map((office) => (
          <div
            key={office.id}
            className="flex items-start space-x-3 text-sm text-muted-foreground p-4 rounded-xl bg-muted/30 border border-border/40"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg mt-0.5 shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-xs mb-1">{office.label}</p>
              <p>{office.addressLine1}</p>
              {office.addressLine2 && <p>{office.addressLine2}</p>}
              <p>{office.city} {office.postalCode}</p>
              {(office.state || office.country) && (
                <p>{[office.state, office.country].filter(Boolean).join(", ")}</p>
              )}
              {(office.phone || office.email) && (
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
  );
}
