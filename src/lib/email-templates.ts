export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: "newsletter" | "welcome" | "promotional" | "announcement" | "security";
  subject: string;
  previewText: string;
  htmlContent: string;
  thumbnail?: string;
}

const baseStyles = `
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; }
    .header p { color: #94a3b8; margin: 10px 0 0; font-size: 14px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1e3a5f; font-size: 22px; margin: 0 0 20px; }
    .content p { color: #4a5568; line-height: 1.7; margin: 0 0 16px; font-size: 15px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; }
    .btn:hover { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); }
    .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #64748b; font-size: 13px; margin: 0 0 10px; }
    .footer a { color: #3b82f6; text-decoration: none; }
    .social-links { margin: 20px 0; }
    .social-links a { display: inline-block; margin: 0 8px; color: #64748b; text-decoration: none; }
    .divider { height: 1px; background-color: #e2e8f0; margin: 30px 0; }
    .highlight-box { background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .highlight-box p { margin: 0; color: #1e40af; }
    .feature-grid { margin: 30px 0; }
    .feature-item { margin-bottom: 20px; padding: 20px; background-color: #f8fafc; border-radius: 8px; }
    .feature-item h3 { color: #1e3a5f; margin: 0 0 10px; font-size: 16px; }
    .feature-item p { margin: 0; font-size: 14px; }
    .stats-row { display: flex; justify-content: space-around; margin: 30px 0; text-align: center; }
    .stat-item { flex: 1; padding: 20px; }
    .stat-number { font-size: 32px; font-weight: 700; color: #3b82f6; }
    .stat-label { font-size: 13px; color: #64748b; margin-top: 5px; }
  </style>
`;

export const emailTemplates: EmailTemplate[] = [
  // Newsletter Templates
  {
    id: "newsletter-monthly",
    name: "Monthly Newsletter",
    description: "Professional monthly newsletter with sections for updates, tips, and highlights",
    category: "newsletter",
    subject: "{{month}} {{year}} Newsletter - Security Insights & Updates",
    previewText: "Your monthly dose of cybersecurity insights and industry updates",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>IT Origin</h1>
      <p>{{month}} {{year}} Newsletter</p>
    </div>

    <div class="content">
      <p>Hello {{name}},</p>

      <p>Welcome to our {{month}} newsletter! Here's your monthly roundup of cybersecurity insights, industry updates, and practical tips to keep your organization secure.</p>

      <div class="divider"></div>

      <h2>🔒 This Month's Security Highlights</h2>

      <div class="feature-item">
        <h3>Featured Article</h3>
        <p>Discover the latest trends in cybersecurity and how they affect your business. Our experts break down complex topics into actionable insights.</p>
      </div>

      <div class="feature-item">
        <h3>Security Tip of the Month</h3>
        <p>Enable multi-factor authentication (MFA) on all critical systems. This simple step can prevent up to 99.9% of automated attacks.</p>
      </div>

      <div class="feature-item">
        <h3>Industry News</h3>
        <p>Stay informed about the latest cybersecurity regulations, compliance requirements, and industry best practices.</p>
      </div>

      <div class="divider"></div>

      <div class="highlight-box">
        <p><strong>📅 Upcoming:</strong> Join our next webinar on advanced threat detection. Register now to secure your spot!</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://itorigin.in/blogs" class="btn">Read More on Our Blog</a>
      </div>

      <p>Have questions or need security assistance? Our team is always here to help.</p>

      <p>Stay secure,<br><strong>The IT Origin Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p>You're receiving this email because you subscribed to our newsletter.</p>
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in/privacy">Privacy Policy</a></p>
      <p>© {{year}} IT Origin. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
  },

  {
    id: "newsletter-weekly-digest",
    name: "Weekly Security Digest",
    description: "Compact weekly digest with top security news and tips",
    category: "newsletter",
    subject: "Weekly Security Digest - Top Stories This Week",
    previewText: "Your quick weekly summary of cybersecurity news",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header" style="padding: 30px;">
      <h1 style="font-size: 24px;">Weekly Security Digest</h1>
      <p>Week of {{month}} {{year}}</p>
    </div>

    <div class="content" style="padding: 30px;">
      <p>Hi {{name}},</p>

      <p>Here's your quick weekly summary of the most important cybersecurity news and updates.</p>

      <div class="feature-item">
        <h3>📰 Top Story</h3>
        <p>[Add your top story here - describe the most important security news of the week]</p>
      </div>

      <div class="feature-item">
        <h3>⚠️ Threat Alert</h3>
        <p>[Add any current threat alerts or vulnerabilities that organizations should be aware of]</p>
      </div>

      <div class="feature-item">
        <h3>💡 Quick Tip</h3>
        <p>[Add a quick, actionable security tip for the week]</p>
      </div>

      <div style="text-align: center; margin: 25px 0;">
        <a href="https://itorigin.in/blogs" class="btn" style="padding: 12px 28px;">Read Full Articles</a>
      </div>

      <p>Stay vigilant,<br><strong>IT Origin Security Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in">Visit Website</a></p>
    </div>
  </div>
</body>
</html>`,
  },

  // Welcome Templates
  {
    id: "welcome-subscriber",
    name: "Welcome New Subscriber",
    description: "Warm welcome email for new newsletter subscribers",
    category: "welcome",
    subject: "Welcome to IT Origin - Your Cybersecurity Partner",
    previewText: "Thank you for subscribing! Here's what to expect",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to IT Origin!</h1>
      <p>Your trusted cybersecurity partner</p>
    </div>

    <div class="content">
      <p>Hello {{name}},</p>

      <p>Thank you for subscribing to our newsletter! We're excited to have you join our community of security-conscious professionals.</p>

      <div class="highlight-box">
        <p><strong>🎉 You're all set!</strong> You'll now receive our latest security insights, industry updates, and exclusive content directly in your inbox.</p>
      </div>

      <h2>What to Expect</h2>

      <div class="feature-item">
        <h3>📧 Regular Updates</h3>
        <p>Monthly newsletters with curated security content, tips, and industry news.</p>
      </div>

      <div class="feature-item">
        <h3>🔐 Expert Insights</h3>
        <p>Deep dives into cybersecurity topics from our team of security professionals.</p>
      </div>

      <div class="feature-item">
        <h3>🎓 Learning Resources</h3>
        <p>Access to webinars, guides, and training materials to enhance your security knowledge.</p>
      </div>

      <div class="divider"></div>

      <h2>Get Started</h2>
      <p>While you wait for our next newsletter, explore our latest resources:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://itorigin.in/blogs" class="btn" style="margin: 5px;">Read Our Blog</a>
        <a href="https://itorigin.in/services" class="btn" style="margin: 5px; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">Our Services</a>
      </div>

      <p>Have questions? Feel free to reach out to us anytime at <a href="mailto:info@itorigin.in">info@itorigin.in</a>.</p>

      <p>Welcome aboard!<br><strong>The IT Origin Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p>You're receiving this because you subscribed at itorigin.in</p>
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in/privacy">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`,
  },

  // Promotional Templates
  {
    id: "promo-service",
    name: "Service Promotion",
    description: "Promote your cybersecurity services with a professional layout",
    category: "promotional",
    subject: "Strengthen Your Security Posture with IT Origin",
    previewText: "Discover our comprehensive cybersecurity solutions",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Protect Your Business</h1>
      <p>Comprehensive Cybersecurity Solutions</p>
    </div>

    <div class="content">
      <p>Hello {{name}},</p>

      <p>In today's digital landscape, cybersecurity isn't just an option—it's a necessity. IT Origin offers end-to-end security solutions tailored to your business needs.</p>

      <div class="highlight-box">
        <p><strong>🛡️ Special Offer:</strong> Get a FREE security assessment for your organization. Limited time offer!</p>
      </div>

      <h2>Our Services</h2>

      <div class="feature-item">
        <h3>🔍 Penetration Testing</h3>
        <p>Identify vulnerabilities before attackers do with our comprehensive penetration testing services.</p>
      </div>

      <div class="feature-item">
        <h3>📊 Security Audit</h3>
        <p>Get a complete assessment of your security posture with actionable recommendations.</p>
      </div>

      <div class="feature-item">
        <h3>🎯 Managed SOC</h3>
        <p>24/7 security monitoring and incident response to keep your business protected around the clock.</p>
      </div>

      <div class="feature-item">
        <h3>📋 GRC Services</h3>
        <p>Navigate compliance requirements with our governance, risk, and compliance expertise.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://itorigin.in/contact" class="btn">Get Your Free Assessment</a>
      </div>

      <p>Ready to strengthen your security? Let's talk.</p>

      <p>Best regards,<br><strong>The IT Origin Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in">Visit Website</a></p>
    </div>
  </div>
</body>
</html>`,
  },

  // Announcement Templates
  {
    id: "announcement-webinar",
    name: "Webinar Announcement",
    description: "Announce upcoming webinars and events",
    category: "announcement",
    subject: "You're Invited: [Webinar Title] - Register Now",
    previewText: "Join our upcoming webinar on cybersecurity",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header" style="background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%);">
      <h1>📺 Webinar Invitation</h1>
      <p>You're Invited to Learn with IT Origin</p>
    </div>

    <div class="content">
      <p>Hello {{name}},</p>

      <p>We're excited to invite you to our upcoming webinar!</p>

      <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 12px; padding: 30px; margin: 25px 0; text-align: center;">
        <h2 style="color: #5b21b6; margin: 0 0 15px;">[Webinar Title Here]</h2>
        <p style="font-size: 18px; color: #7c3aed; margin: 0;">📅 [Date] | ⏰ [Time] IST</p>
      </div>

      <h2>What You'll Learn</h2>

      <div class="feature-item">
        <h3>🎯 Topic 1</h3>
        <p>[Description of what attendees will learn about this topic]</p>
      </div>

      <div class="feature-item">
        <h3>🎯 Topic 2</h3>
        <p>[Description of what attendees will learn about this topic]</p>
      </div>

      <div class="feature-item">
        <h3>🎯 Topic 3</h3>
        <p>[Description of what attendees will learn about this topic]</p>
      </div>

      <div class="highlight-box" style="border-left-color: #7c3aed; background-color: #f5f3ff;">
        <p style="color: #5b21b6;"><strong>👤 Speaker:</strong> [Speaker Name], [Title] at IT Origin</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="[REGISTRATION_LINK]" class="btn" style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 16px 40px; font-size: 16px;">Register Now - It's Free!</a>
      </div>

      <p style="text-align: center; color: #64748b; font-size: 14px;">Limited spots available. Reserve yours today!</p>

      <p>See you there!<br><strong>The IT Origin Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in">Visit Website</a></p>
    </div>
  </div>
</body>
</html>`,
  },

  {
    id: "announcement-update",
    name: "Product/Service Update",
    description: "Announce new features or service updates",
    category: "announcement",
    subject: "What's New at IT Origin - Exciting Updates!",
    previewText: "Check out our latest improvements and features",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header" style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);">
      <h1>🚀 What's New</h1>
      <p>Latest Updates from IT Origin</p>
    </div>

    <div class="content">
      <p>Hello {{name}},</p>

      <p>We've been working hard to improve our services, and we're excited to share what's new!</p>

      <div class="divider"></div>

      <h2>✨ New Features</h2>

      <div class="feature-item">
        <h3>Feature 1</h3>
        <p>[Describe the new feature and its benefits to the user]</p>
      </div>

      <div class="feature-item">
        <h3>Feature 2</h3>
        <p>[Describe the new feature and its benefits to the user]</p>
      </div>

      <h2>🔧 Improvements</h2>

      <div class="feature-item">
        <h3>Improvement 1</h3>
        <p>[Describe what was improved and how it helps users]</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://itorigin.in" class="btn" style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);">Learn More</a>
      </div>

      <p>We'd love to hear your feedback! Reply to this email with any questions or suggestions.</p>

      <p>Best regards,<br><strong>The IT Origin Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in">Visit Website</a></p>
    </div>
  </div>
</body>
</html>`,
  },

  // Security Alert Templates
  {
    id: "security-alert",
    name: "Security Alert",
    description: "Urgent security alert or advisory notification",
    category: "security",
    subject: "🚨 Security Alert: Important Information for Your Organization",
    previewText: "Action required: Important security advisory",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body>
  <div class="container">
    <div class="header" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);">
      <h1>🚨 Security Alert</h1>
      <p>Important Security Advisory</p>
    </div>

    <div class="content">
      <p>Hello {{name}},</p>

      <div class="highlight-box" style="border-left-color: #dc2626; background-color: #fef2f2;">
        <p style="color: #991b1b;"><strong>⚠️ Priority: HIGH</strong></p>
        <p style="color: #991b1b; margin-top: 10px;">[Brief summary of the security issue or threat]</p>
      </div>

      <h2>What Happened</h2>
      <p>[Detailed explanation of the security issue, vulnerability, or threat that organizations should be aware of]</p>

      <h2>Who Is Affected</h2>
      <p>[Description of who may be impacted by this security issue]</p>

      <h2>Recommended Actions</h2>

      <div class="feature-item" style="border-left: 3px solid #dc2626;">
        <h3>1. Immediate Action</h3>
        <p>[First recommended action to take]</p>
      </div>

      <div class="feature-item" style="border-left: 3px solid #f59e0b;">
        <h3>2. Short-term Action</h3>
        <p>[Second recommended action to take]</p>
      </div>

      <div class="feature-item" style="border-left: 3px solid #10b981;">
        <h3>3. Long-term Prevention</h3>
        <p>[Third recommended action for ongoing protection]</p>
      </div>

      <div class="divider"></div>

      <h2>Need Help?</h2>
      <p>If you need assistance addressing this security issue, our team is ready to help.</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://itorigin.in/contact" class="btn" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);">Contact Our Security Team</a>
      </div>

      <p>Stay vigilant,<br><strong>IT Origin Security Team</strong></p>
    </div>

    <div class="footer">
      {{social_links}}
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in">Visit Website</a></p>
    </div>
  </div>
</body>
</html>`,
  },

  // Minimal/Simple Templates
  {
    id: "simple-text",
    name: "Simple Text Email",
    description: "Clean, minimal text-focused email template",
    category: "newsletter",
    subject: "A Quick Update from IT Origin",
    previewText: "A personal message from our team",
    htmlContent: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; }
    p { color: #374151; line-height: 1.8; margin: 0 0 16px; font-size: 16px; }
    a { color: #3b82f6; }
    .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 13px; }
    .footer a { color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <p>Hi {{name}},</p>

    <p>[Your message goes here. This is a simple, clean template perfect for personal communications, quick updates, or straightforward announcements.]</p>

    <p>[Add another paragraph if needed. Keep it concise and focused on the main message you want to convey.]</p>

    <p>[Optional: Include a call to action or next steps for the reader.]</p>

    <div class="signature">
      <p>Best regards,<br><strong>[Your Name]</strong><br>IT Origin</p>
    </div>
  </div>

  <div class="footer">
    {{social_links}}
    <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://itorigin.in">itorigin.in</a></p>
  </div>
</body>
</html>`,
  },
];

export const getTemplatesByCategory = (category: EmailTemplate["category"]) => {
  return emailTemplates.filter((t) => t.category === category);
};

export const getTemplateById = (id: string) => {
  return emailTemplates.find((t) => t.id === id);
};

export const templateCategories = [
  { id: "newsletter", name: "Newsletter", icon: "📰" },
  { id: "welcome", name: "Welcome", icon: "👋" },
  { id: "promotional", name: "Promotional", icon: "📢" },
  { id: "announcement", name: "Announcement", icon: "📣" },
  { id: "security", name: "Security Alert", icon: "🚨" },
] as const;
