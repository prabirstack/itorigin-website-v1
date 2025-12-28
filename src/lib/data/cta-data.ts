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

export interface ContactInfo {
  id: string;
  type: string;
  value: string;
  iconName: string;
  link?: string;
}

export const engagementOptions: EngagementOption[] = [
  {
    id: "assessment",
    title: "Free Security Assessment",
    description: "Discover your security gaps with our comprehensive analysis",
    iconName: "Search",
    gradient: "from-blue-500/20 via-blue-500/10 to-blue-600/5",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    ctaText: "Start Assessment",
    ctaLink: "/contact?service=assessment",
    popular: true,
  },
  {
    id: "consultation",
    title: "Expert Consultation",
    description: "Speak with our certified security experts for personalized guidance",
    iconName: "Phone",
    gradient: "from-green-500/20 via-green-500/10 to-emerald-600/5",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    ctaText: "Book Call",
    ctaLink: "/contact?service=consultation",
  },
  {
    id: "resources",
    title: "Resource Download",
    description: "Get our comprehensive security guides and best practices",
    iconName: "Download",
    gradient: "from-purple-500/20 via-purple-500/10 to-pink-600/5",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
    ctaText: "Download Now",
    ctaLink: "/whitepapers",
  },
  {
    id: "training",
    title: "Training Inquiry",
    description: "Explore certification programs and security training options",
    iconName: "GraduationCap",
    gradient: "from-orange-500/20 via-orange-500/10 to-red-600/5",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    ctaText: "Learn More",
    ctaLink: "/training",
  },
];

export const ctaContactInfo: ContactInfo[] = [
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
    value: "connect@itorizin.in",
    iconName: "Mail",
    link: "mailto:connect@itorizin.in",
  },
  {
    id: "website",
    type: "Website",
    value: "www.itorizin.com",
    iconName: "Globe",
    link: "https://www.itorizin.com",
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
