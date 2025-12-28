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
  title: "IT Origin Partner Program",
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
    description: "Sell IT Origin solutions to your customers with competitive margins",
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
    description: "Deliver managed security services powered by IT Origin platform",
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
    description: "Integrate your solutions with IT Origin platform",
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
    description: "Deliver GRC and advisory services with IT Origin backing",
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
    quote: "Partnering with IT Origin has transformed our security practice. Their platform and support are exceptional.",
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
