import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
  "rescheduled",
]);

export const appointmentTypeEnum = pgEnum("appointment_type", [
  "consultation",
  "demo",
  "discovery",
  "follow_up",
  "support",
  "training",
]);

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey(),

  // Appointment details
  title: text("title").notNull(),
  description: text("description"),
  type: appointmentTypeEnum("type").notNull().default("consultation"),
  status: appointmentStatusEnum("status").notNull().default("pending"),

  // Date and time
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").notNull().default(30), // in minutes
  timezone: text("timezone").notNull().default("Asia/Kolkata"),

  // Client info
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  clientCompany: text("client_company"),
  clientJobTitle: text("client_job_title"),

  // Meeting details
  isVirtual: boolean("is_virtual").notNull().default(true),
  meetingUrl: text("meeting_url"),
  meetingId: text("meeting_id"),
  location: text("location"), // for in-person meetings

  // Assigned staff
  assignedTo: text("assigned_to"), // admin user ID or name
  assignedEmail: text("assigned_email"),

  // Service context
  serviceInterest: text("service_interest"), // which service they're interested in
  leadSource: text("lead_source"), // how they found us

  // Notes
  clientNotes: text("client_notes"), // notes from the client during booking
  internalNotes: text("internal_notes"), // internal team notes
  meetingNotes: text("meeting_notes"), // notes from the meeting

  // Reminders
  reminderSentAt: timestamp("reminder_sent_at"),
  followUpSentAt: timestamp("follow_up_sent_at"),

  // Rescheduling tracking
  originalScheduledAt: timestamp("original_scheduled_at"),
  rescheduledCount: integer("rescheduled_count").notNull().default(0),
  cancelReason: text("cancel_reason"),

  // Calendly integration (optional)
  calendlyEventUri: text("calendly_event_uri"),
  calendlyInviteeUri: text("calendly_invitee_uri"),

  // Timestamps
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  confirmedAt: timestamp("confirmed_at"),
  completedAt: timestamp("completed_at"),
  cancelledAt: timestamp("cancelled_at"),
});

// Relations can be extended to connect to leads
export const appointmentsRelations = relations(appointments, ({}) => ({}));

// Types
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
