import { z } from "zod";

export const socialLinksSchema = z.object({
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
});

export const updateSettingsSchema = z.object({
  // Company Info
  companyName: z.string().min(1).optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),

  // Contact Details
  email: z.string().email().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),

  // Address
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),

  // Business Hours
  businessHours: z.string().optional(),
  timezone: z.string().optional(),

  // Social Links
  socialLinks: socialLinksSchema.optional(),

  // Additional Links
  calendlyUrl: z.string().url().optional().or(z.literal("")),
  supportEmail: z.string().email().optional().or(z.literal("")),
  salesEmail: z.string().email().optional().or(z.literal("")),

  // Google Maps
  mapEmbedUrl: z.string().optional(),
  mapLink: z.string().url().optional().or(z.literal("")),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
