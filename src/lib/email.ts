import { Resend } from "resend";
import { NewsletterConfirmEmail } from "@/components/emails/newsletter-confirm";
import { NewsletterWelcomeEmail } from "@/components/emails/newsletter-welcome";
import { ContactNotificationEmail } from "@/components/emails/contact-notification";

// Lazy initialization to avoid build-time errors
let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = process.env.FROM_EMAIL || "IT Origin <noreply@itorigin.in>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@itorigin.in";

export interface SendEmailResult {
  success: boolean;
  error?: string;
  id?: string;
}

export async function sendNewsletterConfirmEmail(
  email: string,
  confirmUrl: string,
  name?: string
): Promise<SendEmailResult> {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Confirm your IT Origin newsletter subscription",
      react: NewsletterConfirmEmail({ confirmUrl, name }),
    });

    if (error) {
      console.error("Failed to send confirmation email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendNewsletterWelcomeEmail(
  email: string,
  unsubscribeUrl: string,
  name?: string
): Promise<SendEmailResult> {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to IT Origin - Your cybersecurity partner",
      react: NewsletterWelcomeEmail({ name, unsubscribeUrl }),
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function sendContactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}): Promise<SendEmailResult> {
  try {
    const resend = getResend();
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${data.name}`,
      react: ContactNotificationEmail({
        ...data,
        submittedAt: new Date().toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
        }),
      }),
    });

    if (error) {
      console.error("Failed to send contact notification:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: result?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export { getResend as resend };
