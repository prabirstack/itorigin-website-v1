export interface PartnerProgram {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  icon: string;
}

export interface PartnerTier {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  color: string;
}

export const partnerInfo = {
  title: "ITOrigin Partner Program",
  subtitle: "Grow Your Business with Cybersecurity",
  description:
    "Join our partner ecosystem and help organizations strengthen their security posture. Whether you're a reseller, MSSP, or technology partner, we have a program tailored for your business.",
  cta: {
    text: "Become a Partner",
    href: "/contact?type=partner",
  },
};

export const partnerBenefits = [
  {
    id: 1,
    title: "Revenue Growth",
    description: "Competitive margins and recurring revenue opportunities",
    icon: "TrendingUp",
  },
  {
    id: 2,
    title: "Technical Training",
    description: "Comprehensive training and certification programs",
    icon: "GraduationCap",
  },
  {
    id: 3,
    title: "Sales Support",
    description: "Dedicated partner managers and sales resources",
    icon: "Users",
  },
  {
    id: 4,
    title: "Marketing Resources",
    description: "Co-branded materials and marketing support",
    icon: "Megaphone",
  },
  {
    id: 5,
    title: "Lead Generation",
    description: "Qualified leads and deal registration protection",
    icon: "Target",
  },
  {
    id: 6,
    title: "Technical Support",
    description: "Priority access to technical support and resources",
    icon: "Headphones",
  },
];

export const partnerPrograms: PartnerProgram[] = [
  {
    id: "reseller",
    name: "Reseller Partner",
    description: "Sell ITOrigin solutions to your customers with competitive margins",
    benefits: [
      "Competitive partner pricing",
      "Sales and technical training",
      "Marketing collateral",
      "Deal registration protection",
      "Partner portal access",
    ],
    requirements: [
      "Cybersecurity sales experience",
      "Minimum annual commitment",
      "Dedicated sales resources",
      "Training certification",
    ],
    icon: "ShoppingCart",
  },
  {
    id: "mssp",
    name: "MSSP Partner",
    description: "Deliver managed security services powered by ITOrigin platform",
    benefits: [
      "White-label SOC platform",
      "Multi-tenant management",
      "Advanced technical training",
      "Co-managed service options",
      "Dedicated partner success manager",
    ],
    requirements: [
      "Existing MSSP operations",
      "24/7 support capability",
      "Minimum client base",
      "SOC analyst team",
    ],
    icon: "Shield",
  },
  {
    id: "technology",
    name: "Technology Partner",
    description: "Integrate your solutions with ITOrigin platform",
    benefits: [
      "API access and documentation",
      "Joint solution development",
      "Co-marketing opportunities",
      "Technical collaboration",
      "Integration certification",
    ],
    requirements: [
      "Complementary technology",
      "Integration capability",
      "Joint go-to-market plan",
      "Technical resources",
    ],
    icon: "Puzzle",
  },
  {
    id: "consulting",
    name: "Consulting Partner",
    description: "Deliver GRC and advisory services with ITOrigin backing",
    benefits: [
      "Methodology and frameworks",
      "GRC training and certification",
      "Referral commissions",
      "Collaborative engagements",
      "Industry expertise sharing",
    ],
    requirements: [
      "GRC consulting experience",
      "Certified consultants",
      "Industry vertical focus",
      "Client references",
    ],
    icon: "Briefcase",
  },
];

export const partnerTiers: PartnerTier[] = [
  {
    id: "authorized",
    name: "Authorized",
    description: "Entry-level partnership for new partners",
    benefits: [
      "Partner pricing",
      "Basic training",
      "Partner portal access",
      "Marketing materials",
    ],
    requirements: [
      "Signed partner agreement",
      "Basic product training",
    ],
    color: "blue",
  },
  {
    id: "silver",
    name: "Silver",
    description: "Growing partners with proven track record",
    benefits: [
      "Enhanced partner pricing",
      "Advanced training",
      "Lead sharing",
      "Quarterly business reviews",
      "Co-marketing funds",
    ],
    requirements: [
      "$100K annual revenue",
      "2 certified professionals",
      "Customer satisfaction",
    ],
    color: "gray",
  },
  {
    id: "gold",
    name: "Gold",
    description: "Strategic partners with significant investment",
    benefits: [
      "Best partner pricing",
      "Priority support",
      "Dedicated partner manager",
      "Executive sponsorship",
      "Joint marketing campaigns",
      "Early access to features",
    ],
    requirements: [
      "$500K annual revenue",
      "5 certified professionals",
      "Dedicated practice",
    ],
    color: "yellow",
  },
  {
    id: "platinum",
    name: "Platinum",
    description: "Elite partners with deep strategic alignment",
    benefits: [
      "Premium partner pricing",
      "Strategic planning sessions",
      "Executive alignment",
      "Custom solutions",
      "Unlimited training",
      "Major event participation",
    ],
    requirements: [
      "$1M+ annual revenue",
      "10+ certified professionals",
      "Multi-geography coverage",
    ],
    color: "purple",
  },
];

export const partnerTestimonials = [
  {
    id: 1,
    quote: "Partnering with ITOrigin has transformed our security practice. Their platform and support are exceptional.",
    author: "Partner CEO",
    company: "Leading MSSP",
    image: "/images/partners/partner-1.jpg",
  },
  {
    id: 2,
    quote: "The training and enablement programs helped us become experts in delivering SOC services.",
    author: "Technical Director",
    company: "System Integrator",
    image: "/images/partners/partner-2.jpg",
  },
];

export const partnerPortalFeatures = [
  "Deal registration and tracking",
  "Training and certification management",
  "Marketing resource library",
  "Technical documentation",
  "Support ticket management",
  "Revenue and commission reports",
];

export const partnerPageHero = {
  badge: { icon: "Users", text: "Partner Program" },
  title: "Grow Together",
  highlight: "Succeed Together",
  description: "Join ITOrigin's partner network and accelerate your cybersecurity business. Access world-class training, technical support, marketing resources, and competitive margins to help your customers stay secure.",
};

export const partnerPageCTAs = [
  { text: "Become a Partner", href: "/contact", primary: true },
  { text: "Partner Login", href: "/partner-portal", primary: false },
];

export const partnerPageStats = [
  { label: "Active Partners", value: "50+", icon: "Users" },
  { label: "Partner Revenue Growth", value: "45%", icon: "TrendingUp" },
  { label: "Certified Partner Engineers", value: "500+", icon: "Award" },
  { label: "Countries", value: "12+", icon: "Globe" },
];

export const partnerPageSectionHeaders = {
  whyPartner: {
    title: "Why Partner with ITOrigin",
    subtitle: "Scale Globally. Deliver Confidently. Grow Together.",
    description:
      "Whether you are a regional reseller, MSSP, or a consulting firm, partnering with ITOrigin gives you instant access to world-class cybersecurity capabilities and a proven global delivery engine.",
  },
  highlights: {
    title: "Program Highlights",
    description: "Comprehensive resources and support to help you succeed.",
  },
};

export const partnerPageWhyPartner = [
  {
    icon: "Globe",
    title: "Global Cybersecurity Delivery Expertise",
    description:
      "Proven service delivery experience across India, Far East, Middle East, North America, and Australia \u2014 enabling high-quality, regulator-aligned cybersecurity services seamlessly across global markets.",
  },
  {
    icon: "Rocket",
    title: "Expand Your Service Portfolio Instantly",
    description:
      "Offer advanced services such as Security Architecture, Managed SOC, GRC, ERM, VAPT, Patch Management, and Compliance Framework Implementation \u2014 without building deep internal benches.",
  },
  {
    icon: "TrendingUp",
    title: "Low Overhead, High Strategic Impact",
    description:
      "We handle specialized cybersecurity delivery while you lead customer engagement, contracts, and procurement \u2014 ensuring a scalable and efficient partnership model.",
  },
  {
    icon: "FileCheck",
    title: "Proven Frameworks & Compliance Alignment",
    description:
      "Leverage structured methodologies aligned with ISO 27001, NIST, ERM, PDPL/GDPR, and other international standards to deliver audit-ready, compliance-driven outcomes.",
  },
  {
    icon: "BarChart",
    title: "Recurring Revenue & Premium Engagements",
    description:
      "Unlock predictable managed service revenue (SOC, GRC, Vulnerability Management) alongside high-value project-based cybersecurity engagements.",
  },
  {
    icon: "Shield",
    title: "Trusted Critical Infrastructure Experience",
    description:
      "Proven delivery across defence, oil & gas, utilities, telecom, financial services, and public sector organizations \u2014 strengthening your credibility in strategic sectors.",
  },
  {
    icon: "Users",
    title: "End-to-End Collaboration Model",
    description:
      "From technical pre-sales and RFP support to service delivery and reporting \u2014 we operate as an extension of your team to jointly win and execute complex engagements.",
  },
];

export const partnerPageHighlights = [
  { title: "Partner Portal", description: "Access sales tools, technical documentation, training materials, and marketing resources through our comprehensive partner portal." },
  { title: "Technical Enablement", description: "Product training, hands-on labs, technical workshops, and certification programs to build your team's expertise." },
  { title: "Sales Support", description: "Pre-sales engineering assistance, proof-of-concept support, and competitive intelligence to help you win deals." },
  { title: "End-to-End Handholding", description: "From onboarding to deal closure, our dedicated partner success team walks with you at every step \u2014 ensuring you never face a challenge alone." },
];

export const partnerPageProcess = {
  title: "How to Become a Partner",
  description: "Join our partner program in four simple steps.",
  steps: [
    { step: 1, title: "Submit Application", description: "Complete the partner application form with details about your business, technical capabilities, and target markets." },
    { step: 2, title: "Review & Approval", description: "Our partner team reviews your application and schedules a discussion to understand your business goals and partnership objectives." },
    { step: 3, title: "Onboarding & Training", description: "Sign the partner agreement, access the partner portal, and complete initial training to get your team certified." },
    { step: 4, title: "Start Selling", description: "Begin selling ITOrigin solutions with full access to sales tools, technical support, and marketing resources." },
  ],
};

export const partnerPageCTA = {
  title: "Ready to Partner with ITOrigin?",
  description: "Join our growing network of cybersecurity partners and unlock new revenue opportunities.",
  buttons: [
    { text: "Apply to Partner Program", href: "/contact" },
    { text: "Partner Login", href: "/partner-portal", variant: "secondary" as const },
  ],
};
