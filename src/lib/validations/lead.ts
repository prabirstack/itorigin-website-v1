import { z } from "zod";

export const leadStatusSchema = z.enum([
  "new",
  "contacted",
  "qualified",
  "converted",
  "lost",
]);

export const leadSourceSchema = z.enum([
  "contact_form",
  "newsletter",
  "download",
  "chat",
  "referral",
  "other",
]);

export const createLeadSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: leadSourceSchema.optional().default("contact_form"),
});

export const updateLeadSchema = z.object({
  status: leadStatusSchema.optional(),
  notes: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  service: z.string().optional(),
});

export const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type SubscribeInput = z.infer<typeof subscribeSchema>;
