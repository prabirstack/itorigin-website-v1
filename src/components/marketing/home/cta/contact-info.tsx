"use client";

import React from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSettings, getPhoneLink, getEmailLink } from "@/components/providers/settings-provider";

interface ContactInfoItem {
  id: string;
  type: string;
  value: string;
  icon: React.ElementType;
  link?: string;
}

export function ContactInfo() {
  const { settings } = useSettings();

  const phone = settings?.phone || "+1 (234) 567-890";
  const email = settings?.email || "info@itorigin.com";
  const addressLine1 = settings?.addressLine1 || "123 Cybersecurity Avenue";
  const city = settings?.city || "Mumbai";
  const postalCode = settings?.postalCode || "400001";
  const businessHours = settings?.businessHours || "Mon-Fri 9:00 AM - 6:00 PM";

  const contactItems: ContactInfoItem[] = [
    {
      id: "address",
      type: "Headquarters",
      value: `${addressLine1}, ${city} - ${postalCode}`,
      icon: MapPin,
    },
    {
      id: "phone",
      type: "Phone",
      value: phone,
      icon: Phone,
      link: getPhoneLink(phone),
    },
    {
      id: "email",
      type: "Email",
      value: email,
      icon: Mail,
      link: getEmailLink(email),
    },
    {
      id: "hours",
      type: "Business Hours",
      value: businessHours,
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary-foreground" />
          </div>
          Contact Information
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          Connect with us through your preferred channel
        </p>
      </div>

      <div className="space-y-4">
        {contactItems.map((info) => {
          const Icon = info.icon;
          return (
            <motion.div key={info.id} whileHover={{ scale: 1.02 }} className="group">
              <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {info.type}
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-foreground font-medium">{info.value}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
