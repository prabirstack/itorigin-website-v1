/**
 * List of free/personal email providers that are blocked for business chat
 * Only company domain emails are allowed
 */
export const BLOCKED_EMAIL_DOMAINS = [
  // Google
  "gmail.com",
  "googlemail.com",
  // Microsoft
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.it",
  "hotmail.es",
  "outlook.com",
  "outlook.co.uk",
  "outlook.fr",
  "outlook.de",
  "live.com",
  "live.co.uk",
  "live.fr",
  "msn.com",
  // Yahoo
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "yahoo.fr",
  "yahoo.de",
  "yahoo.it",
  "yahoo.es",
  "yahoo.ca",
  "yahoo.com.au",
  "ymail.com",
  "rocketmail.com",
  // Indian providers
  "rediffmail.com",
  "rediff.com",
  "sify.com",
  "indiatimes.com",
  // AOL
  "aol.com",
  "aol.co.uk",
  "aim.com",
  // Apple
  "icloud.com",
  "me.com",
  "mac.com",
  // Other popular free providers
  "mail.com",
  "email.com",
  "usa.com",
  "post.com",
  "gmx.com",
  "gmx.net",
  "gmx.de",
  "web.de",
  "freenet.de",
  "t-online.de",
  "zoho.com",
  "zohomail.com",
  "protonmail.com",
  "proton.me",
  "tutanota.com",
  "tutamail.com",
  "tuta.io",
  "fastmail.com",
  "fastmail.fm",
  "hushmail.com",
  "inbox.com",
  "lycos.com",
  "mail.ru",
  "yandex.com",
  "yandex.ru",
  "qq.com",
  "163.com",
  "126.com",
  "sina.com",
  // Temporary/disposable email providers
  "tempmail.com",
  "guerrillamail.com",
  "mailinator.com",
  "10minutemail.com",
  "throwaway.email",
  "fakeinbox.com",
  "sharklasers.com",
  "guerrillamail.info",
  "grr.la",
  "mailnesia.com",
];

/**
 * Check if an email is from a blocked free provider
 */
export function isBlockedEmailDomain(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return true; // Invalid email format
  return BLOCKED_EMAIL_DOMAINS.includes(domain);
}

/**
 * Check if an email appears to be from a company domain
 */
export function isCompanyEmail(email: string): boolean {
  return !isBlockedEmailDomain(email);
}

/**
 * Get the domain from an email address
 */
export function getEmailDomain(email: string): string | null {
  const parts = email.toLowerCase().split("@");
  return parts.length === 2 ? parts[1] : null;
}

/**
 * Generate a random 6-digit PIN
 */
export function generateVerificationPin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Validate email format
 */
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
