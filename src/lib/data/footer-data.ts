export interface FooterLink {
  name: string;
  href: string;
  isNew?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  iconName: string;
  href: string;
  hoverColor: string;
}

export interface FooterStat {
  iconName: string;
  label: string;
  value: string;
}

export const footerSections: FooterSection[] = [
  {
    title: "Services",
    links: [
      { name: "Managed SOC Services", href: "/services/managed-soc-services" },
      { name: "Offensive Security", href: "/services/offensive-security" },
      { name: "Penetration Testing", href: "/services/penetration-testing" },
      { name: "Vulnerability Assessment", href: "/services/vulnerability-assessment" },
      { name: "GRC Services", href: "/services/grc-services" },
      { name: "Security Auditing", href: "/services/security-audit", isNew: true },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Careers", href: "/careers" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blogs" },
      { name: "News & Events", href: "/news" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Security Center", href: "/security" },
      { name: "Best Practices", href: "/best-practices" },
      { name: "Whitepapers", href: "/whitepapers" },
      { name: "Webinars", href: "/webinars", isNew: true },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
      { name: "SLA", href: "/sla" },
      { name: "Security Policy", href: "/security-policy" },
    ],
  },
];

export const footerSocialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    iconName: "Linkedin",
    href: "https://linkedin.com/company/it-origin",
    hoverColor: "hover:text-blue-600",
  },
  {
    name: "X (formerly Twitter)",
    iconName: "TwitterX",
    href: "https://twitter.com/itorigin",
    hoverColor: "hover:text-foreground",
  },
  {
    name: "Facebook",
    iconName: "Facebook",
    href: "https://facebook.com/itorigin",
    hoverColor: "hover:text-blue-500",
  },
  {
    name: "Instagram",
    iconName: "Instagram",
    href: "https://instagram.com/itorigin",
    hoverColor: "hover:text-pink-500",
  },
  {
    name: "YouTube",
    iconName: "Youtube",
    href: "https://youtube.com/@itorigin",
    hoverColor: "hover:text-red-500",
  },
  {
    name: "GitHub",
    iconName: "Github",
    href: "https://github.com/itorigin",
    hoverColor: "hover:text-gray-400",
  },
];

export const footerStats: FooterStat[] = [
  { iconName: "Shield", label: "Security Incidents Prevented", value: "10,000+" },
  { iconName: "Users", label: "Enterprise Clients", value: "500+" },
  { iconName: "Globe", label: "Countries Served", value: "25+" },
  { iconName: "Award", label: "Security Certifications", value: "50+" },
];

export const securityBadges = [
  { iconName: "Shield", label: "ISO 27001" },
  { iconName: "Award", label: "SOC 2" },
  { iconName: "FileCheck", label: "GDPR" },
  { iconName: "Globe", label: "HIPAA" },
];
