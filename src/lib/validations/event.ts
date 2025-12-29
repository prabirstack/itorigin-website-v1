import { z } from "zod";

const speakerSchema = z.object({
  name: z.string().min(1, "Speaker name is required"),
  role: z.string().min(1, "Speaker role is required"),
  company: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional(),
  linkedin: z.string().url("Must be a valid LinkedIn URL").optional(),
});

const agendaItemSchema = z.object({
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export const createEventSchema = z.object({
  // Basic info
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().max(300).nullable().optional(),

  // Event details
  type: z.enum(["webinar", "workshop", "conference", "meetup", "training"]).default("webinar"),
  status: z.enum(["draft", "upcoming", "live", "completed", "cancelled"]).default("draft"),

  // Date and time
  startDate: z.string().or(z.date()).transform((val) => new Date(val)),
  endDate: z.string().or(z.date()).transform((val) => new Date(val)).nullable().optional(),
  timezone: z.string().default("Asia/Kolkata"),
  duration: z.number().int().positive().nullable().optional(),

  // Location
  isVirtual: z.boolean().default(true),
  location: z.string().nullable().optional(),
  meetingUrl: z.string().url("Must be a valid URL").nullable().optional(),
  meetingId: z.string().nullable().optional(),
  meetingPassword: z.string().nullable().optional(),

  // Media
  coverImage: z.string().url("Must be a valid URL").nullable().optional(),
  thumbnailImage: z.string().url("Must be a valid URL").nullable().optional(),
  recordingUrl: z.string().url("Must be a valid URL").nullable().optional(),

  // Speakers
  speakers: z.array(speakerSchema).default([]),

  // Registration
  requiresRegistration: z.boolean().default(true),
  maxAttendees: z.number().int().positive().nullable().optional(),
  registrationDeadline: z.string().or(z.date()).transform((val) => new Date(val)).nullable().optional(),

  // Content
  agenda: z.array(agendaItemSchema).default([]),

  // Categorization
  topics: z.array(z.string()).default([]),
  targetAudience: z.string().nullable().optional(),

  // Display
  featured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),

  // SEO
  metaTitle: z.string().max(60).nullable().optional(),
  metaDescription: z.string().max(160).nullable().optional(),
});

export const updateEventSchema = createEventSchema.partial().extend({
  id: z.string().optional(),
});

export const eventQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  type: z.enum(["webinar", "workshop", "conference", "meetup", "training"]).optional(),
  status: z.enum(["draft", "upcoming", "live", "completed", "cancelled"]).optional(),
  featured: z.coerce.boolean().optional(),
  upcoming: z.coerce.boolean().optional(), // filter for future events only
});

export const eventRegistrationSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  jobTitle: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type EventQueryInput = z.infer<typeof eventQuerySchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
