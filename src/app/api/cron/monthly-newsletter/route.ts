import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { emailCampaigns, emailSends, subscribers } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { resend as getResend } from "@/lib/email";
import { nanoid } from "nanoid";

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

// This endpoint is designed to be called by a cron job (e.g., Vercel Cron, external scheduler)
// It should be called daily to check for monthly newsletters that need to be sent
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (for security)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    const dayOfMonth = today.getDate();

    // Find all active monthly campaigns scheduled for today
    const monthlyCampaigns = await db.query.emailCampaigns.findMany({
      where: and(
        eq(emailCampaigns.campaignType, "monthly"),
        eq(emailCampaigns.isRecurringActive, true),
        eq(emailCampaigns.recurringDay, dayOfMonth)
      ),
    });

    if (monthlyCampaigns.length === 0) {
      return NextResponse.json({
        message: "No monthly campaigns scheduled for today",
        date: today.toISOString(),
        dayOfMonth,
      });
    }

    const results = [];

    for (const campaign of monthlyCampaigns) {
      // Check if already sent this month
      const lastSent = campaign.lastSentAt;
      if (lastSent) {
        const lastSentMonth = lastSent.getMonth();
        const lastSentYear = lastSent.getFullYear();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        if (lastSentMonth === currentMonth && lastSentYear === currentYear) {
          results.push({
            campaignId: campaign.id,
            name: campaign.name,
            status: "skipped",
            reason: "Already sent this month",
          });
          continue;
        }
      }

      // Get all confirmed subscribers
      const confirmedSubscribers = await db.query.subscribers.findMany({
        where: eq(subscribers.confirmed, true),
      });

      if (confirmedSubscribers.length === 0) {
        results.push({
          campaignId: campaign.id,
          name: campaign.name,
          status: "skipped",
          reason: "No confirmed subscribers",
        });
        continue;
      }

      // Update campaign status to sending
      await db
        .update(emailCampaigns)
        .set({
          status: "sending",
          totalRecipients: confirmedSubscribers.length,
          updatedAt: new Date(),
        })
        .where(eq(emailCampaigns.id, campaign.id));

      // Send emails in batches
      let sentCount = 0;
      let bounceCount = 0;
      const batchSize = 10;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://itorigin.in";

      for (let i = 0; i < confirmedSubscribers.length; i += batchSize) {
        const batch = confirmedSubscribers.slice(i, i + batchSize);

        const sendPromises = batch.map(async (subscriber) => {
          try {
            const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe/${subscriber.unsubscribeToken}`;
            let htmlWithUnsubscribe = campaign.htmlContent
              .replace(/{{unsubscribe_url}}/g, unsubscribeUrl)
              .replace(/{{name}}/g, subscriber.name || "Subscriber")
              .replace(/{{email}}/g, subscriber.email)
              .replace(/{{month}}/g, today.toLocaleString("default", { month: "long" }))
              .replace(/{{year}}/g, today.getFullYear().toString());

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

            const emailOptions: {
              from: string;
              to: string;
              subject: string;
              html: string;
              attachments?: { filename: string; path: string }[];
            } = {
              from: process.env.FROM_EMAIL || "IT Origin <noreply@itorigin.in>",
              to: subscriber.email,
              subject: campaign.subject
                .replace(/{{month}}/g, today.toLocaleString("default", { month: "long" }))
                .replace(/{{year}}/g, today.getFullYear().toString()),
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

            await db.insert(emailSends).values({
              id: nanoid(),
              campaignId: campaign.id,
              subscriberId: subscriber.id,
              sentAt: error ? null : new Date(),
              bouncedAt: error ? new Date() : null,
            });

            return error ? { bounced: true } : { sent: true };
          } catch {
            return { bounced: true };
          }
        });

        const batchResults = await Promise.all(sendPromises);
        sentCount += batchResults.filter((r) => r.sent).length;
        bounceCount += batchResults.filter((r) => r.bounced).length;
      }

      // Update campaign as sent
      await db
        .update(emailCampaigns)
        .set({
          status: "sent",
          lastSentAt: new Date(),
          sentAt: new Date(),
          sentCount,
          bounceCount,
          metrics: {
            bounceRate: (bounceCount / confirmedSubscribers.length) * 100,
          },
          updatedAt: new Date(),
        })
        .where(eq(emailCampaigns.id, campaign.id));

      // Reset status back to draft for next month (monthly recurring)
      await db
        .update(emailCampaigns)
        .set({
          status: "draft",
          updatedAt: new Date(),
        })
        .where(eq(emailCampaigns.id, campaign.id));

      results.push({
        campaignId: campaign.id,
        name: campaign.name,
        status: "sent",
        totalRecipients: confirmedSubscribers.length,
        sentCount,
        bounceCount,
      });
    }

    return NextResponse.json({
      success: true,
      date: today.toISOString(),
      dayOfMonth,
      campaignsProcessed: results.length,
      results,
    });
  } catch (error) {
    console.error("Monthly newsletter cron error:", error);
    return NextResponse.json(
      { error: "Failed to process monthly newsletters" },
      { status: 500 }
    );
  }
}
