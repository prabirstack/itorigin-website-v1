export const benefitSectionHeader = {
  title: "Why Choose ITOrigin?",
  description:
    "Experience unparalleled cybersecurity protection with our comprehensive suite of advanced security solutions",
};

export interface BenefitItem {
  id: number;
  iconName: string;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  accentColor: string;
  href: string;
}

export const benefits: BenefitItem[] = [
  {
    id: 1,
    iconName: "Zap",
    title: "Sub-15 Min Response Time",
    description:
      "Lightning-fast incident response with automated threat containment and expert intervention within 15 minutes.",
    gradient: "from-blue-500/10 via-cyan-500/10 to-blue-600/10",
    iconBg: "bg-linear-to-br from-blue-500 to-cyan-500",
    accentColor: "border-blue-500/20 hover:border-blue-400/40",
    href: "/services/managed-soc-services",
  },
  {
    id: 2,
    iconName: "Bot",
    title: "AI-Powered Threat Detection",
    description:
      "Advanced machine learning algorithms continuously analyze patterns to identify and neutralize emerging threats.",
    gradient: "from-purple-500/10 via-pink-500/10 to-purple-600/10",
    iconBg: "bg-linear-to-br from-purple-500 to-pink-500",
    accentColor: "border-purple-500/20 hover:border-purple-400/40",
    href: "/services/managed-soc-services",
  },
  {
    id: 3,
    iconName: "DollarSign",
    title: "Significant Cost Savings",
    description:
      "Reduce security overhead costs while maintaining enterprise-grade protection and compliance through managed services.",
    gradient: "from-green-500/10 via-emerald-500/10 to-green-600/10",
    iconBg: "bg-linear-to-br from-green-500 to-emerald-500",
    accentColor: "border-green-500/20 hover:border-green-400/40",
    href: "/services",
  },
  {
    id: 4,
    iconName: "Shield",
    title: "24/7/365 Expert Monitoring",
    description:
      "Round-the-clock surveillance by certified security professionals ensuring continuous protection.",
    gradient: "from-orange-500/10 via-red-500/10 to-orange-600/10",
    iconBg: "bg-linear-to-br from-orange-500 to-red-500",
    accentColor: "border-orange-500/20 hover:border-orange-400/40",
    href: "/services/managed-soc-services",
  },
  {
    id: 5,
    iconName: "FileBarChart",
    title: "Audit-Ready Compliance Reports",
    description:
      "Comprehensive reporting and documentation that meets industry standards and regulatory requirements.",
    gradient: "from-indigo-500/10 via-blue-500/10 to-indigo-600/10",
    iconBg: "bg-linear-to-br from-indigo-500 to-blue-500",
    accentColor: "border-indigo-500/20 hover:border-indigo-400/40",
    href: "/services/grc-services",
  },
  {
    id: 6,
    iconName: "Target",
    title: "Noise-Free Threat Alerts",
    description:
      "Precision-tuned detection with multi-layer validation cuts through alert fatigue so your team focuses only on what matters.",
    gradient: "from-teal-500/10 via-cyan-500/10 to-teal-600/10",
    iconBg: "bg-linear-to-br from-teal-500 to-cyan-500",
    accentColor: "border-teal-500/20 hover:border-teal-400/40",
    href: "/services/managed-soc-services",
  },
];
