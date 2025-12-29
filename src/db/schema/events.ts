import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const eventTypeEnum = pgEnum("event_type", [
  "webinar",
  "workshop",
  "conference",
  "meetup",
  "training",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "draft",
  "upcoming",
  "live",
  "completed",
  "cancelled",
]);

export const events = pgTable("events", {
  id: text("id").primaryKey(),

  // Basic info
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),

  // Event details
  type: eventTypeEnum("type").notNull().default("webinar"),
  status: eventStatusEnum("status").notNull().default("draft"),

  // Date and time
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  timezone: text("timezone").notNull().default("Asia/Kolkata"),
  duration: integer("duration"), // in minutes

  // Location
  isVirtual: boolean("is_virtual").notNull().default(true),
  location: text("location"), // physical location if not virtual
  meetingUrl: text("meeting_url"), // Zoom/Teams/Meet link
  meetingId: text("meeting_id"),
  meetingPassword: text("meeting_password"),

  // Media
  coverImage: text("cover_image"),
  thumbnailImage: text("thumbnail_image"),
  recordingUrl: text("recording_url"), // after event ends

  // Speakers/Hosts
  speakers: jsonb("speakers").$type<{
    name: string;
    role: string;
    company?: string;
    bio?: string;
    image?: string;
    linkedin?: string;
  }[]>().default([]),

  // Registration
  requiresRegistration: boolean("requires_registration").notNull().default(true),
  maxAttendees: integer("max_attendees"),
  registrationDeadline: timestamp("registration_deadline"),

  // Content
  agenda: jsonb("agenda").$type<{
    time: string;
    title: string;
    description?: string;
  }[]>().default([]),

  // Categorization
  topics: jsonb("topics").$type<string[]>().default([]),
  targetAudience: text("target_audience"),

  // Display
  featured: boolean("featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),

  // SEO
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  publishedAt: timestamp("published_at"),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),

  // Attendee info
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  jobTitle: text("job_title"),

  // Status
  attended: boolean("attended").notNull().default(false),
  cancelledAt: timestamp("cancelled_at"),

  // Engagement
  reminderSent: boolean("reminder_sent").notNull().default(false),
  followUpSent: boolean("follow_up_sent").notNull().default(false),

  // Source
  source: text("source"), // how they found the event

  // Timestamps
  registeredAt: timestamp("registered_at").notNull().defaultNow(),
});

// Relations
export const eventsRelations = relations(events, ({ many }) => ({
  registrations: many(eventRegistrations),
}));

export const eventRegistrationsRelations = relations(eventRegistrations, ({ one }) => ({
  event: one(events, {
    fields: [eventRegistrations.eventId],
    references: [events.id],
  }),
}));

// Types
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type NewEventRegistration = typeof eventRegistrations.$inferInsert;
