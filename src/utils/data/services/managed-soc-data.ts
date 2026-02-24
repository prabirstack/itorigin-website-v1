export const managedSOCPageHero = {
  badge: { icon: "Shield", text: "Managed SOC Services" },
  title: "24/7 Security",
  highlight: "Operations Center",
  description:
    "Protect your organization with enterprise-grade security monitoring and threat response. Our certified security analysts monitor your infrastructure around the clock, detecting and responding to threats before they impact your business.",
};

export const managedSOCPageCTAs = [
  { text: "Get a Quote", href: "/contact", primary: true },
  { text: "Request Demo", href: "/contact", primary: false },
];

export const managedSOCPageStats = [
  { label: "Average Detection Time", value: "2min", icon: "Clock" as const },
  { label: "Monitored Events Daily", value: "40M+", icon: "Eye" as const },
  { label: "Threat Response Time", value: "<15min", icon: "Zap" as const },
  {
    label: "Daily Incidents Handled",
    value: "600+",
    icon: "AlertTriangle" as const,
  },
  { label: "SOC Analysts", value: "30+", icon: "Users" as const },
];

export const managedSOCPageSectionHeaders = {
  features: {
    title: "Comprehensive SOC Coverage",
    description:
      "Our managed SOC service provides complete security operations capabilities tailored to your organization's needs.",
  },
  benefits: {
    title: "Why Choose Our Managed SOC",
    description:
      "Experience the advantages of partnering with a dedicated security operations team.",
  },
  process: {
    title: "How It Works",
    description:
      "Our proven process ensures seamless integration and immediate security value.",
  },
};

export const managedSOCPageFeatures = [
  {
    title: "24/7 Security Monitoring",
    features: [
      "Round-the-clock monitoring by certified security analysts",
      "Real-time threat detection and alerting",
      "Continuous log analysis and correlation",
      "Advanced SIEM platform integration",
      "Multi-layered security event analysis",
      "Automated threat intelligence feeds",
    ],
  },
  {
    title: "Threat Detection & Response",
    features: [
      "Advanced threat hunting and analysis",
      "Behavioral anomaly detection",
      "Automated incident response workflows",
      "Rapid threat containment procedures",
      "Forensic investigation capabilities",
      "Post-incident analysis and reporting",
    ],
  },
  {
    title: "Compliance & Reporting",
    features: [
      "Regulatory compliance monitoring (GDPR, HIPAA, PCI-DSS)",
      "Detailed security event reporting",
      "Custom compliance dashboards",
      "Audit trail maintenance",
      "Executive summary reports",
      "Real-time security metrics",
    ],
  },
];

export const managedSOCPageBenefits = [
  {
    icon: "Shield" as const,
    title: "Enterprise-Grade Protection",
    description:
      "Access to the same advanced security tools and expertise used by Fortune 500 companies.",
  },
  {
    icon: "TrendingUp" as const,
    title: "Cost-Effective Security",
    description:
      "Get 24/7 SOC coverage for a fraction of the cost of building an in-house team.",
  },
  {
    icon: "Zap" as const,
    title: "Rapid Response",
    description:
      "Fast threat detection and response minimizes potential damage and downtime.",
  },
  {
    icon: "Users" as const,
    title: "Expert Analysts",
    description:
      "Certified security professionals with years of experience protecting critical infrastructure.",
  },
  {
    icon: "Eye" as const,
    title: "Complete Visibility",
    description:
      "Comprehensive view of your security posture with real-time dashboards and alerts.",
  },
  {
    icon: "Clock" as const,
    title: "Always Available",
    description:
      "Security threats don't sleep, and neither does our SOC team monitoring your systems.",
  },
];

export const managedSOCPageProcess = [
  {
    step: 1,
    title: "Assessment & Onboarding",
    description:
      "We analyze your current security infrastructure, identify gaps, and create a tailored monitoring plan. Our team integrates with your existing tools and establishes baseline security metrics.",
  },
  {
    step: 2,
    title: "Deployment & Integration",
    description:
      "Deploy our SIEM platform and security sensors across your infrastructure. Configure custom detection rules, integrate threat intelligence feeds, and establish monitoring workflows.",
  },
  {
    step: 3,
    title: "Continuous Monitoring",
    description:
      "Our 24/7 SOC team monitors your environment for threats, analyzes security events in real-time, and uses advanced analytics to detect suspicious activities before they become incidents.",
  },
  {
    step: 4,
    title: "Threat Response & Resolution",
    description:
      "When threats are detected, our team immediately responds with containment procedures, investigates the root cause, and works with your team to eliminate the threat and prevent recurrence.",
  },
];

export const managedSOCPageCTA = {
  title: "Ready to Strengthen Your Security Posture?",
  description:
    "Get started with our managed SOC services today and protect your organization 24/7.",
  buttons: [
    { text: "Get Started", href: "/contact" },
    {
      text: "View Other Services",
      href: "/services/offensive-security",
      variant: "secondary" as const,
    },
  ],
};
