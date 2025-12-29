import { z } from "zod";

export const createTestimonialSchema = z.object({
  // Author information
  authorName: z.string().min(2, "Author name must be at least 2 characters").max(100),
  authorRole: z.string().min(2, "Role is required").max(100),
  authorCompany: z.string().min(2, "Company is required").max(100),
  authorImage: z.string().url("Must be a valid URL").nullable().optional(),
  authorEmail: z.string().email("Must be a valid email").nullable().optional(),
  authorLinkedin: z.string().url("Must be a valid LinkedIn URL").nullable().optional(),

  // Content
  quote: z.string().min(10, "Quote must be at least 10 characters").max(2000),
  rating: z.number().int().min(1).max(5).default(5),

  // Categorization
  industry: z.string().max(100).nullable().optional(),
  serviceUsed: z.string().max(100).nullable().optional(),

  // Display settings
  featured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),

  // Verification
  verified: z.boolean().default(false),

  // Metadata
  source: z.string().max(50).nullable().optional(),
  externalUrl: z.string().url("Must be a valid URL").nullable().optional(),
});

export const updateTestimonialSchema = createTestimonialSchema.partial().extend({
  id: z.string().optional(),
});

export const testimonialQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  featured: z.coerce.boolean().optional(),
  verified: z.coerce.boolean().optional(),
  industry: z.string().optional(),
});

export const bulkActionSchema = z.object({
  ids: z.array(z.string()).min(1, "At least one ID is required"),
  action: z.enum(["approve", "reject", "delete", "feature", "unfeature", "verify"]),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type TestimonialQueryInput = z.infer<typeof testimonialQuerySchema>;
export type BulkActionInput = z.infer<typeof bulkActionSchema>;
