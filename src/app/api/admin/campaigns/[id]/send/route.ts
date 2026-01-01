import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { emailCampaigns, emailSends, subscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin, handleAuthError } from "@/lib/auth-utils";
import { resend as getResend } from "@/lib/email";
import { nanoid } from "nanoid";

type Params = Promise<{ id: string }>;

// Helper function to generate social links HTML footer
function generateSocialLinksFooter(socialLinks: Record<string, string>): string {
  const iconStyles = `
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 0 8px;
    text-decoration: none;
  `;

  const socialIcons: Record<string, string> = {
    facebook: "📘",
    twitter: "🐦",
    linkedin: "💼",
    instagram: "📷",
    youtube: "🎬",
    website: "🌐",
  };

  const links = Object.entries(socialLinks)
    .filter(([, url]) => url && url.trim() !== "")
    .map(([platform, url]) => {
      const icon = socialIcons[platform] || "🔗";
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="${iconStyles}" title="${platform}">${icon}</a>`;
    })
    .join("");

  if (!links) return "";

  return `
    <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee; margin-top: 30px;">
      <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Connect with us</p>
      ${links}
    </div>
  `;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    // Get campaign (use standard query for Neon pooler compatibility)
    const campaignResult = await db
      .select()
      .from(emailCampaigns)
      .where(eq(emailCampaigns.id, id))
      .limit(1);

    if (campaignResult.length === 0) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    const campaign = campaignResult[0];

    if (campaign.status === "sent" || campaign.status === "sending") {
      return NextResponse.json(
        { error: "Campaign has already been sent" },
        { status: 400 }
      );
    }

    // Get all confirmed subscribers (use standard query for Neon pooler compatibility)
    const confirmedSubscribers = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.confirmed, true));

    if (confirmedSubscribers.length === 0) {
      return NextResponse.json(
        { error: "No confirmed subscribers to send to" },
        { status: 400 }
      );
    }

    // Update campaign status to sending
    await db
      .update(emailCampaigns)
      .set({
        status: "sending",
        totalRecipients: confirmedSubscribers.length,
        updatedAt: new Date(),
      })
      .where(eq(emailCampaigns.id, id));

    // Send emails in batches (Resend has rate limits)
    let sentCount = 0;
    let bounceCount = 0;
    const batchSize = 10;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://itorigin.in";

    for (let i = 0; i < confirmedSubscribers.length; i += batchSize) {
      const batch = confirmedSubscribers.slice(i, i + batchSize);

      const sendPromises = batch.map(async (subscriber) => {
        try {
          // Replace unsubscribe placeholder
          const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe/${subscriber.unsubscribeToken}`;
          let htmlWithUnsubscribe = campaign.htmlContent
            .replace(/{{unsubscribe_url}}/g, unsubscribeUrl)
            .replace(/{{name}}/g, subscriber.name || "Subscriber")
            .replace(/{{email}}/g, subscriber.email);

          // Add social links footer if available
          const socialLinks = campaign.socialLinks as Record<string, string> | null;
          if (socialLinks && Object.values(socialLinks).some(Boolean)) {
            const socialFooter = generateSocialLinksFooter(socialLinks);
            htmlWithUnsubscribe = htmlWithUnsubscribe.replace(
              /{{social_links}}/g,
              socialFooter
            );
          } else {
            htmlWithUnsubscribe = htmlWithUnsubscribe.replace(/{{social_links}}/g, "");
          }

          // Build email options
          const emailOptions: {
            from: string;
            to: string;
            subject: string;
            html: string;
            attachments?: { filename: string; path: string }[];
          } = {
            from: process.env.FROM_EMAIL || "IT Origin <noreply@itorigin.in>",
            to: subscriber.email,
            subject: campaign.subject,
            html: htmlWithUnsubscribe,
          };

          // Add attachments if available
          const attachments = campaign.attachments as { name: string; url: string }[] | null;
          if (attachments && attachments.length > 0) {
            emailOptions.attachments = attachments.map((att) => ({
              filename: att.name,
              path: att.url,
            }));
          }

          const { error } = await getResend().emails.send(emailOptions);

          // Create email send record
          await db.insert(emailSends).values({
            id: nanoid(),
            campaignId: id,
            subscriberId: subscriber.id,
            sentAt: error ? null : new Date(),
            bouncedAt: error ? new Date() : null,
          });

          return error ? { bounced: true } : { sent: true };
        } catch {
          return { bounced: true };
        }
      });

      const results = await Promise.all(sendPromises);
      sentCount += results.filter((r) => r.sent).length;
      bounceCount += results.filter((r) => r.bounced).length;

      // Update progress
      await db
        .update(emailCampaigns)
        .set({
          sentCount,
          bounceCount,
          updatedAt: new Date(),
        })
        .where(eq(emailCampaigns.id, id));
    }

    // Mark campaign as sent
    await db
      .update(emailCampaigns)
      .set({
        status: "sent",
        sentAt: new Date(),
        sentCount,
        bounceCount,
        metrics: {
          bounceRate: (bounceCount / confirmedSubscribers.length) * 100,
        },
        updatedAt: new Date(),
      })
      .where(eq(emailCampaigns.id, id));

    return NextResponse.json({
      success: true,
      totalRecipients: confirmedSubscribers.length,
      sentCount,
      bounceCount,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Failed to send campaign:", error);
    return NextResponse.json(
      { error: "Failed to send campaign" },
      { status: 500 }
    );
  }
}
