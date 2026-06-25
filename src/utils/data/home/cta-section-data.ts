export const ctaSectionHeader = {
  badge: "Ready to Secure Your Business?",
  title: "Get Started",
  titleHighlight: "Today",
  description:
    "Choose your preferred way to begin your cybersecurity journey with ITOrigin. Our experts are ready to help you strengthen your security posture.",
};

export const engagementHeader = {
  title: "Multiple Engagement Options",
  subtitle: "Select the option that best fits your immediate security needs",
};

export const finalCta = {
  text: "Start Your Security Journey",
  href: "/contact",
  subtext: "Join 300+ organizations that trust ITOrigin for their cybersecurity needs",
};

export interface EngagementOption {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradient: string;
  iconBg: string;
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

export interface ContactInfoItem {
  id: string;
  type: string;
  value: string;
  iconName: string;
  link?: string;
}

export const engagementOptions: EngagementOption[] = [
  {
    id: "consultation",
    title: "Expert Consultation",
    description: "Speak with our certified security experts for personalized guidance",
    iconName: "Phone",
    gradient: "from-green-500/20 via-green-500/10 to-emerald-600/5",
    iconBg: "bg-linear-to-br from-green-500 to-emerald-600",
    ctaText: "Book Call",
    ctaLink: "/contact?service=consultation",
  },
  {
    id: "resources",
    title: "Resource Download",
    description: "Get our comprehensive security guides and best practices",
    iconName: "Download",
    gradient: "from-purple-500/20 via-purple-500/10 to-pink-600/5",
    iconBg: "bg-linear-to-br from-purple-500 to-pink-600",
    ctaText: "Download Now",
    ctaLink: "/whitepapers",
  },
  {
    id: "training",
    title: "Training Inquiry",
    description: "Explore certification programs and security training options",
    iconName: "GraduationCap",
    gradient: "from-orange-500/20 via-orange-500/10 to-red-600/5",
    iconBg: "bg-linear-to-br from-orange-500 to-red-600",
    ctaText: "Learn More",
    ctaLink: "/coming-soon?for=training",
  },
];

export const ctaContactInfo: ContactInfoItem[] = [
  {
    id: "address",
    type: "Headquarters",
    value: "8/14, Sahid Nagar, Wing-A, Kolkata - 700078",
    iconName: "MapPin",
  },
  {
    id: "phone",
    type: "Phone",
    value: "+91-7439490434",
    iconName: "Phone",
    link: "tel:+917439490434",
  },
  {
    id: "email",
    type: "Email",
    value: "connect@itorigin.in",
    iconName: "Mail",
    link: "mailto:connect@itorigin.in",
  },
  {
    id: "website",
    type: "Website",
    value: "www.itorigin.com",
    iconName: "Globe",
    link: "https://www.itorigin.com",
  },
];

export const serviceOptions = [
  { value: "assessment", label: "Free Security Assessment" },
  { value: "consultation", label: "Expert Consultation" },
  { value: "resources", label: "Resource Download" },
  { value: "training", label: "Training Inquiry" },
  { value: "socaas", label: "SOC as a Service" },
  { value: "pentest", label: "Penetration Testing" },
  { value: "grc", label: "GRC Services" },
];
