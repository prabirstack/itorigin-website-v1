"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Building2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  useSettings,
  getPhoneLink,
  getEmailLink,
  getActiveOffices,
  getOfficeAddress,
  type OfficeLocation,
} from "@/components/providers/settings-provider";

const officeTypeIcons: Record<OfficeLocation["type"], string> = {
  headquarters: "HQ",
  regional: "REG",
  offshore: "VC",
  branch: "BR",
};

function OfficeCard({ office, index }: { office: OfficeLocation; index: number }) {
  const address = getOfficeAddress(office);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-4 sm:p-5">
          {/* Office Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <span className="text-xs font-bold">{officeTypeIcons[office.type]}</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm sm:text-base">
                  {office.label}
                </h4>
                <span className="text-xs text-muted-foreground capitalize">
                  {office.type === "offshore" ? "Offshore / VC Office" : `${office.type} Office`}
                </span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div className="flex-1">
              {office.mapLink ? (
                <a
                  href={office.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {address}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-sm text-foreground">{address}</span>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            {office.phone && (
              <a
                href={getPhoneLink(office.phone)}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{office.phone}</span>
              </a>
            )}
            {office.email && (
              <a
                href={getEmailLink(office.email)}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{office.email}</span>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ContactInfo() {
  const { settings } = useSettings();

  const phone = settings?.phone || "+1 (234) 567-890";
  const email = settings?.email || "info@itorigin.com";
  const businessHours = settings?.businessHours || "Mon-Fri 9:00 AM - 6:00 PM";

  // Get active office locations
  const activeOffices = getActiveOffices(settings);

  // Fallback to legacy address if no offices configured
  const useLegacyAddress = activeOffices.length === 0;
  const legacyAddress = useLegacyAddress
    ? `${settings?.addressLine1 || "123 Cybersecurity Avenue"}, ${settings?.city || "Mumbai"} - ${settings?.postalCode || "400001"}`
    : null;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
          Contact Information
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          {activeOffices.length > 1
            ? "Connect with us at any of our locations"
            : "Connect with us through your preferred channel"}
        </p>
      </div>

      {/* Office Locations Grid */}
      {activeOffices.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Our Offices
          </h4>
          <div
            className={`grid gap-4 ${
              activeOffices.length === 1
                ? "grid-cols-1"
                : activeOffices.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {activeOffices.map((office, index) => (
              <OfficeCard key={office.id} office={office} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Legacy Address Fallback */}
      {useLegacyAddress && legacyAddress && (
        <motion.div whileHover={{ scale: 1.02 }} className="group mb-4">
          <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Headquarters
                  </div>
                  <div className="text-foreground font-medium">{legacyAddress}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* General Contact Info */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          General Contact
        </h4>

        <motion.div whileHover={{ scale: 1.02 }} className="group">
          <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-4 sm:p-5">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Phone</div>
                    <a
                      href={getPhoneLink(phone)}
                      className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                    <a
                      href={getEmailLink(email)}
                      className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Hours */}
        <motion.div whileHover={{ scale: 1.02 }} className="group">
          <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Business Hours</div>
                  <div className="text-sm text-foreground font-medium">{businessHours}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
