export const grcPageHero = {
  badge: { icon: "Shield", text: "GRC Services" },
  title: "Navigate Compliance",
  highlight: "With Confidence",
  description:
    "Achieve and maintain regulatory compliance with expert guidance. Our comprehensive GRC services help you build robust governance frameworks, manage risks effectively, and meet compliance requirements across GDPR, HIPAA, SOC 2, ISO 27001, and more.",
};

export const grcPageCTAs = [
  { text: "Get a Quote", href: "/contact", primary: true },
  { text: "Schedule Consultation", href: "/contact", primary: false },
];

export const grcPageStats = [
  { label: "Compliance Frameworks", value: "15+", icon: "CheckCircle2" },
  { label: "Successful Audits", value: "200+", icon: "FileText" },
  { label: "Risk Assessments", value: "350+", icon: "BarChart" },
  { label: "Certified Consultants", value: "20+", icon: "Users" },
];

export const grcPageSectionHeaders = {
  features: {
    title: "Comprehensive GRC Solutions",
    description:
      "Our services cover all aspects of governance, risk management, and compliance to protect your organization.",
  },
  benefits: {
    title: "Why Choose Our GRC Services",
    description:
      "Partner with experienced compliance professionals who understand regulatory requirements and business needs.",
  },
  process: {
    title: "Our GRC Methodology",
    description:
      "A proven approach to achieving and maintaining compliance with regulatory requirements.",
  },
  frameworks: {
    title: "Compliance Frameworks We Support",
    description:
      "Expert guidance across major regulatory and industry standards.",
  },
};

export const grcPageFeatures = [
  {
    title: "Compliance Management",
    features: [
      "GDPR, CCPA, and data privacy compliance",
      "HIPAA healthcare compliance programs",
      "SOC 2 Type I & Type II certification",
      "ISO 27001 implementation and certification",
      "PCI-DSS compliance for payment systems",
      "NIST Cybersecurity Framework alignment",
    ],
  },
  {
    title: "Risk Management",
    features: [
      "Comprehensive risk assessments and analysis",
      "Third-party vendor risk management",
      "Business impact analysis (BIA)",
      "Threat modeling and risk quantification",
      "Risk treatment and mitigation strategies",
      "Continuous risk monitoring programs",
    ],
  },
  {
    title: "Governance & Policy",
    features: [
      "Security policy development and review",
      "Information security governance frameworks",
      "Compliance program design and implementation",
      "Security awareness training programs",
      "Incident response plan development",
      "Business continuity and disaster recovery planning",
    ],
  },
];

export const grcPageBenefits = [
  {
    icon: "Shield",
    title: "Regulatory Expertise",
    description:
      "Deep knowledge of global compliance frameworks and regulatory requirements across industries.",
  },
  {
    icon: "CheckCircle2",
    title: "Audit Readiness",
    description:
      "Prepare your organization for audits with comprehensive documentation and evidence collection.",
  },
  {
    icon: "BarChart",
    title: "Risk Reduction",
    description:
      "Identify and mitigate risks before they impact your business operations or reputation.",
  },
  {
    icon: "Users",
    title: "Certified Professionals",
    description:
      "Work with CISA, CRISC, CISSP, and ISO 27001 Lead Auditor certified consultants.",
  },
  {
    icon: "FileText",
    title: "Documentation Support",
    description:
      "Comprehensive policies, procedures, and documentation that meet compliance requirements.",
  },
  {
    icon: "Settings",
    title: "Tailored Solutions",
    description:
      "Customized compliance programs that align with your business objectives and risk appetite.",
  },
];

export const grcPageProcess = [
  {
    step: 1,
    title: "Gap Assessment",
    description:
      "Evaluate your current security and compliance posture against target frameworks. Identify gaps, prioritize remediation efforts, and create a roadmap to achieve compliance with regulatory requirements and industry standards.",
  },
  {
    step: 2,
    title: "Program Design",
    description:
      "Develop comprehensive compliance programs tailored to your organization. Create policies, procedures, and controls that address regulatory requirements while aligning with your business processes and objectives.",
  },
  {
    step: 3,
    title: "Implementation & Training",
    description:
      "Deploy compliance controls and security measures across your organization. Provide staff training, document procedures, and establish governance structures to ensure ongoing compliance and risk management.",
  },
  {
    step: 4,
    title: "Audit & Maintenance",
    description:
      "Prepare for and support external audits with comprehensive evidence collection. Maintain compliance through continuous monitoring, periodic reviews, and updates to policies and controls as regulations evolve.",
  },
];

export const grcPageFrameworks = [
  { name: "ISO 27001", description: "Information security management certification" },
  { name: "SOC 2", description: "Service organization controls for SaaS" },
  { name: "GDPR", description: "EU data protection and privacy regulation" },
  { name: "HIPAA", description: "Healthcare information privacy compliance" },
  { name: "PCI-DSS", description: "Payment card data security standards" },
  { name: "NIST CSF", description: "Cybersecurity framework and controls" },
];

export const grcPageCTA = {
  title: "Ready to Achieve Compliance?",
  description:
    "Start your compliance journey today with expert GRC consulting and support.",
  buttons: [
    { text: "Get Started", href: "/contact" },
    {
      text: "View Security Services",
      href: "/services/managed-soc-services",
      variant: "secondary" as const,
    },
  ],
};
