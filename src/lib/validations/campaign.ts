import { z } from "zod";

// Attachment schema
export const attachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  size: z.number().positive(),
  type: z.string(),
});

// Social links schema
export const socialLinksSchema = z.object({
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
}).optional();

export const createCampaignSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  subject: z.string().min(1, "Subject is required").max(200),
  previewText: z.string().max(200).optional(),
  htmlContent: z.string().min(1, "Content is required"),
  campaignType: z.enum(["one-time", "monthly", "welcome"]).default("one-time"),
  // For monthly newsletters: day of month (1-28)
  recurringDay: z.number().min(1).max(28).optional().nullable(),
  isRecurringActive: z.boolean().optional().default(false),
  attachments: z.array(attachmentSchema).optional().default([]),
  socialLinks: socialLinksSchema,
});

export const updateCampaignSchema = createCampaignSchema.partial().extend({
  status: z.enum(["draft", "scheduled", "cancelled"]).optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
});

export type Attachment = z.infer<typeof attachmentSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;
