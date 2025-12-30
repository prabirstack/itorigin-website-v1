import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z.string().min(1, "Slug is required").max(200, "Slug is too long"),
  excerpt: z.string().max(500, "Excerpt is too long").optional(),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Invalid image URL").optional().or(z.literal("")),
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  // When true, slug won't auto-update when title changes
  slugLocked: z.boolean().optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const publishPostSchema = z.object({
  publish: z.boolean(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
