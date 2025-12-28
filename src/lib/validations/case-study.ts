import { z } from "zod";

export const metricSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
});

export const createCaseStudySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  client: z.string().min(1, "Client name is required").max(200),
  industry: z.string().min(1, "Industry is required").max(100),
  challenge: z.string().min(1, "Challenge description is required"),
  solution: z.string().min(1, "Solution description is required"),
  results: z.array(z.string()).default([]),
  metrics: z.array(metricSchema).default([]),
  services: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  order: z.number().int().default(0),
  coverImage: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
  metaTitle: z.string().max(60).nullable().optional(),
  metaDescription: z.string().max(160).nullable().optional(),
});

export const updateCaseStudySchema = createCaseStudySchema.partial().extend({
  id: z.string().optional(),
});

export const caseStudyQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  industry: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  featured: z.coerce.boolean().optional(),
});

export type CreateCaseStudyInput = z.infer<typeof createCaseStudySchema>;
export type UpdateCaseStudyInput = z.infer<typeof updateCaseStudySchema>;
export type CaseStudyQueryInput = z.infer<typeof caseStudyQuerySchema>;
