import { z } from "zod";

export const createServiceSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  title: z.string().min(1, "Title is required").max(200),
  shortDescription: z.string().max(300).optional(),
  description: z.string().min(1, "Description is required"),
  iconName: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  features: z.array(z.string()).optional().default([]),
  benefits: z.array(z.string()).optional().default([]),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  bgPattern: z.string().optional(),
  active: z.boolean().optional().default(true),
  displayOrder: z.number().int().min(0).optional().default(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
