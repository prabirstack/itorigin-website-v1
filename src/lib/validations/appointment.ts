import { z } from "zod";

export const createAppointmentSchema = z.object({
  // Appointment details
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).nullable().optional(),
  type: z.enum(["consultation", "demo", "discovery", "follow_up", "support", "training"]).default("consultation"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled", "no_show", "rescheduled"]).default("pending"),

  // Date and time
  scheduledAt: z.string().or(z.date()).transform((val) => new Date(val)),
  duration: z.number().int().positive().default(30),
  timezone: z.string().default("Asia/Kolkata"),

  // Client info
  clientName: z.string().min(2, "Client name is required").max(100),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().max(20).nullable().optional(),
  clientCompany: z.string().max(100).nullable().optional(),
  clientJobTitle: z.string().max(100).nullable().optional(),

  // Meeting details
  isVirtual: z.boolean().default(true),
  meetingUrl: z.string().url("Must be a valid URL").nullable().optional(),
  meetingId: z.string().nullable().optional(),
  location: z.string().nullable().optional(),

  // Assigned staff
  assignedTo: z.string().nullable().optional(),
  assignedEmail: z.string().email("Invalid email").nullable().optional(),

  // Service context
  serviceInterest: z.string().nullable().optional(),
  leadSource: z.string().nullable().optional(),

  // Notes
  clientNotes: z.string().max(2000).nullable().optional(),
  internalNotes: z.string().max(2000).nullable().optional(),
});

export const updateAppointmentSchema = createAppointmentSchema.partial().extend({
  id: z.string().optional(),
  meetingNotes: z.string().max(5000).nullable().optional(),
  cancelReason: z.string().max(500).nullable().optional(),
});

export const appointmentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  type: z.enum(["consultation", "demo", "discovery", "follow_up", "support", "training"]).optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled", "no_show", "rescheduled"]).optional(),
  upcoming: z.coerce.boolean().optional(),
  assignedTo: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const rescheduleAppointmentSchema = z.object({
  scheduledAt: z.string().or(z.date()).transform((val) => new Date(val)),
  reason: z.string().max(500).optional(),
});

export const cancelAppointmentSchema = z.object({
  reason: z.string().min(1, "Cancellation reason is required").max(500),
});

export const bookAppointmentSchema = z.object({
  // Appointment details
  type: z.enum(["consultation", "demo", "discovery", "follow_up", "support", "training"]).default("consultation"),
  scheduledAt: z.string().or(z.date()).transform((val) => new Date(val)),
  duration: z.number().int().positive().default(30),
  timezone: z.string().default("Asia/Kolkata"),

  // Client info
  clientName: z.string().min(2, "Name is required").max(100),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().max(20).optional(),
  clientCompany: z.string().max(100).optional(),
  clientJobTitle: z.string().max(100).optional(),

  // Context
  serviceInterest: z.string().optional(),
  clientNotes: z.string().max(2000).optional(),
  leadSource: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type AppointmentQueryInput = z.infer<typeof appointmentQuerySchema>;
export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;
