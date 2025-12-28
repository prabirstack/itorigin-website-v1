export interface Office {
  id: string;
  name: string;
  type: "Headquarters" | "Branch" | "Sales Office";
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

export interface ContactReason {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const contactInfo = {
  title: "Get in Touch",
  subtitle: "We're here to help secure your organization",
  description:
    "Have questions about our cybersecurity services? Our team of experts is ready to help you find the right security solutions for your organization.",
  responseTime: "We typically respond within 24 hours",
};

export const offices: Office[] = [
  {
    id: "hq",
    name: "IT Origin Headquarters",
    type: "Headquarters",
    address: "8/14, Sahid Nagar, Wing-A",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    postalCode: "700078",
    phone: "+91-7439490434",
    email: "connect@itorizin.in",
    mapUrl: "https://maps.google.com/?q=Sahid+Nagar+Kolkata",
  },
];

export const contactReasons: ContactReason[] = [
  {
    id: "sales",
    label: "Sales Inquiry",
    description: "Learn about our services and pricing",
    icon: "ShoppingCart",
  },
  {
    id: "demo",
    label: "Request Demo",
    description: "See our platform in action",
    icon: "Play",
  },
  {
    id: "support",
    label: "Technical Support",
    description: "Get help with existing services",
    icon: "Headphones",
  },
  {
    id: "partnership",
    label: "Partnership",
    description: "Explore partnership opportunities",
    icon: "Handshake",
  },
  {
    id: "careers",
    label: "Careers",
    description: "Join our security team",
    icon: "Briefcase",
  },
  {
    id: "media",
    label: "Media & Press",
    description: "Media inquiries and press releases",
    icon: "Newspaper",
  },
];

export const serviceInquiries = [
  { id: "soc", label: "SOC as a Service" },
  { id: "pentest", label: "Penetration Testing" },
  { id: "va", label: "Vulnerability Assessment" },
  { id: "grc", label: "GRC Services" },
  { id: "audit", label: "Security Audit" },
  { id: "training", label: "Training & Certification" },
  { id: "platform", label: "Cyber Fusion Platform" },
  { id: "other", label: "Other" },
];

export const companySizeOptions = [
  { id: "1-50", label: "1-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "501-1000", label: "501-1000 employees" },
  { id: "1001-5000", label: "1001-5000 employees" },
  { id: "5000+", label: "5000+ employees" },
];

export const industryOptions = [
  { id: "banking", label: "Banking & Financial Services" },
  { id: "healthcare", label: "Healthcare" },
  { id: "ecommerce", label: "E-commerce & Retail" },
  { id: "technology", label: "Technology & IT" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "government", label: "Government" },
  { id: "education", label: "Education" },
  { id: "telecom", label: "Telecommunications" },
  { id: "energy", label: "Energy & Utilities" },
  { id: "other", label: "Other" },
];

export const socialLinks = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/itorigin",
    icon: "Linkedin",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://x.com/itorigin",
    icon: "Twitter",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/itorigin",
    icon: "Facebook",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/itorigin/",
    icon: "Instagram",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@itorigin",
    icon: "Youtube",
  },
];

export const emergencyContact = {
  title: "Security Emergency?",
  description: "If you're experiencing an active security incident, our incident response team is available 24/7.",
  phone: "+91-7439490434",
  email: "incident@itorizin.in",
  cta: "Report Incident",
};

export const faq = [
  {
    id: 1,
    question: "What is the typical response time for inquiries?",
    answer: "We aim to respond to all inquiries within 24 business hours. For urgent security matters, please call our emergency hotline.",
  },
  {
    id: 2,
    question: "Do you offer free security assessments?",
    answer: "Yes, we offer complimentary initial security assessments to help you understand your security posture and how we can help.",
  },
  {
    id: 3,
    question: "Can you provide services to organizations outside India?",
    answer: "Yes, we serve clients globally. Our SOC operates 24/7 and can support organizations in any timezone.",
  },
  {
    id: 4,
    question: "How do I become a partner?",
    answer: "Visit our Partner page to learn about our partner programs and fill out the partner application form.",
  },
];
