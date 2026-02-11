"use client";

import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  ExternalLink,
  Globe,
} from "lucide-react";
import {
  useSettings,
  getPhoneLink,
  getEmailLink,
  getActiveOffices,
  getOfficeAddress,
  type OfficeLocation,
} from "@/components/providers/settings-provider";

function OfficeCard({ office, index, className = "" }: { office: OfficeLocation; index: number; className?: string }) {
  const address = getOfficeAddress(office);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`group relative p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors shrink-0">
          <Building2 className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground text-sm">{office.label}</h4>
          <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider">
            {office.type === "headquarters" ? "HQ" : office.country?.toLowerCase() === "india" ? "Branch" : "VC Office"}
          </span>
        </div>
      </div>

      {office.mapLink ? (
        <a
          href={office.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-1.5 leading-relaxed mb-2"
        >
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span className="flex-1">{address}</span>
          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ) : (
        <p className="text-sm text-muted-foreground flex items-start gap-1.5 leading-relaxed mb-2">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          {address}
        </p>
      )}

      {(office.phone || office.email) && (
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-1">
          {office.phone && (
            <a
              href={getPhoneLink(office.phone)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3 h-3" />
              {office.phone}
            </a>
          )}
          {office.email && (
            <a
              href={getEmailLink(office.email)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3 h-3" />
              {office.email}
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function ContactInfo() {
  const { settings } = useSettings();

  const phone = settings?.phone || "+91-7439490434";
  const email = settings?.email || "connect@itorigin.com";
  const businessHours = settings?.businessHours || "Mon-Fri 9:00 AM - 6:00 PM";

  const activeOffices = getActiveOffices(settings);

  const useLegacyAddress = activeOffices.length === 0;
  const legacyAddress = useLegacyAddress
    ? `${settings?.addressLine1 || "8/14, Sahid Nagar, Wing-A"}, ${settings?.city || "Kolkata"} - ${settings?.postalCode || "700078"}`
    : null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <Globe className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h3 className="text-2xl font-black text-foreground mb-2">
          Contact Information
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {activeOffices.length > 1
            ? "Connect with us at any of our global locations"
            : "Reach out through your preferred channel"}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* Phone - top left */}
        <a
          href={getPhoneLink(phone)}
          className="group flex flex-col justify-center p-4 sm:p-5 rounded-2xl border border-border/50 bg-card/40 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors mb-3">
            <Phone className="w-5 h-5" />
          </div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Phone</p>
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-all">
            {phone}
          </p>
        </a>

        {/* Email - top right */}
        <a
          href={getEmailLink(email)}
          className="group flex flex-col justify-center p-4 sm:p-5 rounded-2xl border border-border/50 bg-card/40 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Email</p>
          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-all">
            {email}
          </p>
        </a>

        {/* Business Hours - spans full width */}
        <div className="col-span-2 flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-border/50 bg-primary/5 hover:bg-primary/8 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Business Hours</p>
            <p className="text-sm font-semibold text-foreground">{businessHours}</p>
          </div>
        </div>

        {/* Office Locations - each spans full width */}
        {activeOffices.map((office, index) => (
          <OfficeCard key={office.id} office={office} index={index} className="col-span-2" />
        ))}

        {/* Legacy Address Fallback */}
        {useLegacyAddress && legacyAddress && (
          <div className="col-span-2 p-5 rounded-2xl border border-border/50 bg-card/40">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Headquarters</p>
                <p className="text-sm text-foreground font-medium">{legacyAddress}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
