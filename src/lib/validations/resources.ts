import { z } from "zod";

export const resourceTypeSchema = z.enum([
  "whitepaper",
  "ebook",
  "guide",
  "report",
  "template",
  "checklist",
  "case-study",
  "infographic",
  "toolkit",
  "other"
]);

export const resourceStatusSchema = z.enum([
  "draft",
  "published",
  "archived"
]);

export const createResourceSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().min(1, "Description is required").max(2000, "Description is too long"),
  shortDescription: z.string().max(500).optional(),
  type: resourceTypeSchema.default("whitepaper"),
  category: z.string().min(1, "Category is required").default("Uncategorized"),
  status: resourceStatusSchema.default("draft"),

  // File details
  fileUrl: z.string().url().optional().or(z.literal("")),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),

  // Display metadata
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  pages: z.number().min(1).optional(),
  readTime: z.string().optional(),

  // SEO & Marketing
  topics: z.array(z.string()).default([]),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),

  // Tracking
  featured: z.boolean().default(false),
  publishDate: z.string().datetime().optional(),
});

export const updateResourceSchema = createResourceSchema.partial().extend({
  id: z.string().uuid(),
});

export const resourceQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  type: resourceTypeSchema.optional(),
  category: z.string().optional(),
  status: resourceStatusSchema.optional(),
  featured: z.coerce.boolean().optional(),
});

export const downloadResourceSchema = z.object({
  resourceId: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
});

export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
export type ResourceQueryInput = z.infer<typeof resourceQuerySchema>;
export type DownloadResourceInput = z.infer<typeof downloadResourceSchema>;
