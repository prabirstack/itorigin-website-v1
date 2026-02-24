export const industrySectionHeader = {
  badge: "Industry Leadership",
  title: "Proven Track Record",
  titleHighlight: "Across Industries",
  description:
    "Delivering world-class cybersecurity solutions to organizations across diverse industry sectors with measurable results and proven success.",
};

export const successStoriesHeader = {
  title: "Success Stories",
  subtitle: "Real results for real businesses across diverse industry sectors",
};

export const industryCta = {
  text: "Read Case Studies",
  href: "/case-studies",
};

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  gradient: string;
}

export const industries: IndustryItem[] = [
  {
    id: "1",
    name: "Banking & Financial Services",
    iconName: "Building2",
    description: "Securing financial transactions and customer data",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "2",
    name: "Healthcare & Pharma",
    iconName: "Heart",
    description: "Protecting sensitive medical records and research",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "3",
    name: "Manufacturing & Industrial",
    iconName: "Factory",
    description: "Safeguarding operational technology and IP",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "4",
    name: "E-commerce & Retail",
    iconName: "ShoppingCart",
    description: "Securing customer transactions and data",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "5",
    name: "Education & Research",
    iconName: "GraduationCap",
    description: "Protecting academic data and research assets",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
  {
    id: "6",
    name: "Government & Public Sector",
    iconName: "Landmark",
    description: "Ensuring citizen data security and privacy",
    gradient: "from-primary/20 via-primary/10 to-primary/5",
  },
];

export interface FallbackStory {
  id: string;
  title: string;
  metric: string;
  description: string;
}

export const fallbackStories: FallbackStory[] = [
  {
    id: "1",
    title: "Enterprise Security",
    metric: "24/7 SOC",
    description: "Round-the-clock security operations center monitoring for enterprise clients",
  },
  {
    id: "2",
    title: "Compliance Achievement",
    metric: "100% Success",
    description: "Comprehensive compliance and certification support across industry frameworks",
  },
];
