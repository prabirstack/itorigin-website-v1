import { db } from "@/db";
import { emailCampaigns } from "@/db/schema";
import { nanoid } from "nanoid";

const sampleCampaigns = [
  {
    id: nanoid(),
    name: "Welcome to IT Origin Newsletter",
    subject: "Welcome to IT Origin - Your Cybersecurity Partner",
    previewText: "Thank you for subscribing to our newsletter",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to IT Origin!</h1>
        <p>Thank you for subscribing to our newsletter. You'll receive the latest cybersecurity insights, tips, and updates directly in your inbox.</p>
        <h2>What to Expect:</h2>
        <ul>
          <li>Weekly security tips and best practices</li>
          <li>Industry news and threat updates</li>
          <li>Exclusive content and resources</li>
          <li>Early access to whitepapers and guides</li>
        </ul>
        <p>Stay secure,<br>The IT Origin Team</p>
      </div>
    `,
    status: "sent" as const,
    campaignType: "welcome" as const,
    totalRecipients: 150,
    sentCount: 148,
    openCount: 95,
    clickCount: 42,
    sentAt: new Date("2024-12-01"),
  },
  {
    id: nanoid(),
    name: "December Security Newsletter",
    subject: "Top 10 Cybersecurity Trends for 2025",
    previewText: "Prepare your organization for the future",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">December Security Newsletter</h1>
        <p>As we approach the new year, it's crucial to understand the emerging cybersecurity trends that will shape 2025.</p>
        <h2>In This Issue:</h2>
        <ul>
          <li>AI-Powered Threat Detection</li>
          <li>Zero Trust Architecture Adoption</li>
          <li>Cloud Security Best Practices</li>
          <li>Ransomware Prevention Strategies</li>
        </ul>
        <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Read More</a>
      </div>
    `,
    status: "sent" as const,
    campaignType: "monthly" as const,
    recurringDay: 15,
    isRecurringActive: true,
    totalRecipients: 250,
    sentCount: 245,
    openCount: 156,
    clickCount: 78,
    sentAt: new Date("2024-12-15"),
    lastSentAt: new Date("2024-12-15"),
  },
  {
    id: nanoid(),
    name: "Holiday Security Reminder",
    subject: "Stay Safe This Holiday Season - Security Tips",
    previewText: "Protect yourself from holiday scams",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Holiday Security Alert</h1>
        <p>The holiday season is prime time for cybercriminals. Here's how to stay protected:</p>
        <h2>Essential Tips:</h2>
        <ol>
          <li>Be wary of too-good-to-be-true deals</li>
          <li>Verify sender emails before clicking links</li>
          <li>Use secure payment methods</li>
          <li>Monitor your accounts regularly</li>
          <li>Keep software updated</li>
        </ol>
        <p>If you suspect any suspicious activity, contact our team immediately.</p>
      </div>
    `,
    status: "sent" as const,
    campaignType: "one-time" as const,
    totalRecipients: 300,
    sentCount: 295,
    openCount: 201,
    clickCount: 89,
    sentAt: new Date("2024-12-20"),
  },
  {
    id: nanoid(),
    name: "New Year Security Audit Offer",
    subject: "Start 2025 with a Free Security Assessment",
    previewText: "Limited time offer for our subscribers",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">New Year Special Offer!</h1>
        <p>Start 2025 on the right foot with a comprehensive security assessment.</p>
        <h2>What's Included:</h2>
        <ul>
          <li>Complete infrastructure review</li>
          <li>Vulnerability assessment</li>
          <li>Security policy evaluation</li>
          <li>Customized recommendations report</li>
        </ul>
        <p style="font-size: 24px; font-weight: bold; color: #16a34a;">Limited Time: 50% Off!</p>
        <a href="#" style="display: inline-block; padding: 15px 30px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Schedule Your Assessment</a>
      </div>
    `,
    status: "scheduled" as const,
    campaignType: "one-time" as const,
    scheduledAt: new Date("2025-01-02T09:00:00"),
    totalRecipients: 0,
  },
  {
    id: nanoid(),
    name: "January Monthly Newsletter",
    subject: "Cybersecurity in 2025: What You Need to Know",
    previewText: "New year, new threats, new solutions",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">January Newsletter</h1>
        <p>Happy New Year! Here's what's new in the cybersecurity landscape.</p>
        <h2>Highlights:</h2>
        <ul>
          <li>New compliance requirements for 2025</li>
          <li>Emerging threats to watch</li>
          <li>Technology updates and patches</li>
          <li>Upcoming webinars and events</li>
        </ul>
      </div>
    `,
    status: "draft" as const,
    campaignType: "monthly" as const,
    recurringDay: 15,
    isRecurringActive: true,
  },
];

async function seedCampaigns() {
  console.log("Seeding campaigns...");

  for (const campaign of sampleCampaigns) {
    await db.insert(emailCampaigns).values(campaign).onConflictDoNothing();
  }

  console.log(`Seeded ${sampleCampaigns.length} campaigns`);
}

seedCampaigns()
  .then(() => {
    console.log("Campaigns seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding campaigns:", error);
    process.exit(1);
  });
