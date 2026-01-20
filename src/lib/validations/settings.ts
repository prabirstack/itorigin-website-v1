import { z } from "zod";

// Helper for optional nullable strings
const optionalString = z.string().nullable().optional();

// Helper for optional nullable URLs (allows empty string or valid URL)
const optionalUrl = z.string().url().nullable().optional().or(z.literal(""));

// Helper for optional nullable emails (allows empty string or valid email)
const optionalEmail = z.string().email().nullable().optional().or(z.literal(""));

export const socialLinksSchema = z.object({
  twitter: optionalUrl,
  linkedin: optionalUrl,
  github: optionalUrl,
  facebook: optionalUrl,
  instagram: optionalUrl,
  youtube: optionalUrl,
}).nullable().optional();

// Office location schema for multiple addresses
export const officeLocationSchema = z.object({
  id: z.string(),
  type: z.enum(["headquarters", "regional", "offshore", "branch"]),
  label: z.string().min(1),
  addressLine1: z.string().min(1),
  addressLine2: optionalString,
  city: z.string().min(1),
  state: optionalString,
  postalCode: optionalString,
  country: z.string().min(1),
  phone: optionalString,
  email: optionalEmail,
  mapLink: optionalUrl,
  mapEmbedUrl: optionalString,
  isActive: z.boolean(),
});

export const officeLocationsSchema = z.array(officeLocationSchema).nullable().optional();

export const updateSettingsSchema = z.object({
  // Company Info
  companyName: z.string().min(1).optional(),
  tagline: optionalString,
  description: optionalString,

  // Contact Details
  email: z.string().email().optional(),
  phone: optionalString,
  whatsapp: optionalString,

  // Legacy Address (kept for backward compatibility)
  addressLine1: optionalString,
  addressLine2: optionalString,
  city: optionalString,
  state: optionalString,
  postalCode: optionalString,
  country: optionalString,

  // Multiple Office Locations
  officeLocations: officeLocationsSchema,

  // Business Hours
  businessHours: optionalString,
  timezone: optionalString,

  // Social Links
  socialLinks: socialLinksSchema,

  // Additional Links
  calendlyUrl: optionalUrl,
  supportEmail: optionalEmail,
  salesEmail: optionalEmail,

  // Google Maps (legacy)
  mapEmbedUrl: optionalString,
  mapLink: optionalUrl,
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
