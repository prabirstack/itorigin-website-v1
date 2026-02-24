export const auditPageHero = {
  badge: { icon: "FileCheck", text: "Security Auditing" },
  title: "Validate Your",
  highlight: "Security Posture",
  description:
    "Comprehensive security audits to evaluate your controls, validate compliance, and identify opportunities for improvement. Expert guidance through certification and regulatory requirements.",
};

export const auditPageCTAs = [
  { text: "Get a Quote", href: "/contact", primary: true },
  { text: "Schedule Consultation", href: "/contact", primary: false },
];

export const auditPageStats = [
  { label: "Audits Completed", value: "300+", icon: "FileCheck" },
  { label: "Compliance Frameworks", value: "15+", icon: "CheckCircle" },
  { label: "Certification Success Rate", value: "100%", icon: "Award" },
  { label: "Remediation Items Resolved", value: "5,000+", icon: "Target" },
];

export const auditPageSectionHeaders = {
  features: {
    title: "Comprehensive Audit Services",
    description:
      "We evaluate all aspects of your security program against industry frameworks and best practices.",
  },
  frameworks: {
    title: "Compliance Frameworks We Support",
    description:
      "Expert auditors certified in major security and compliance frameworks.",
  },
  benefits: {
    title: "Why Choose Our Audit Services",
    description:
      "Expert auditors who understand both compliance requirements and practical security.",
  },
  process: {
    title: "Our Audit Process",
    description:
      "A thorough methodology that ensures comprehensive coverage and actionable results.",
  },
};

export const auditPageFeatures = [
  {
    title: "Compliance Audits",
    features: [
      "ISO 27001 readiness assessment",
      "SOC 2 Type I & Type II audits",
      "PCI-DSS compliance validation",
      "HIPAA security assessment",
      "GDPR compliance review",
      "NIST framework assessment",
    ],
  },
  {
    title: "Technical Security Audits",
    features: [
      "Network architecture review",
      "Cloud security configuration audit",
      "Application security assessment",
      "Access control audit",
      "Encryption implementation review",
      "Security logging and monitoring audit",
    ],
  },
  {
    title: "Program & Policy Audits",
    features: [
      "Security policy review",
      "Incident response plan assessment",
      "Business continuity audit",
      "Vendor security management review",
      "Security awareness program evaluation",
      "Risk management framework review",
    ],
  },
];

export const auditPageBenefits = [
  {
    icon: "FileCheck",
    title: "Compliance Assurance",
    description:
      "Achieve and maintain compliance with industry standards and regulatory requirements.",
  },
  {
    icon: "Eye",
    title: "Independent Assessment",
    description:
      "Get an unbiased, third-party evaluation of your security controls and practices.",
  },
  {
    icon: "Target",
    title: "Gap Identification",
    description:
      "Identify gaps between your current state and desired security maturity level.",
  },
  {
    icon: "FileText",
    title: "Audit-Ready Reports",
    description:
      "Comprehensive documentation suitable for regulators, auditors, and stakeholders.",
  },
  {
    icon: "TrendingUp",
    title: "Roadmap for Improvement",
    description:
      "Prioritized recommendations to address findings and improve security posture.",
  },
  {
    icon: "Users",
    title: "Expert Auditors",
    description:
      "Certified professionals with deep experience in compliance frameworks and security auditing.",
  },
];

export const auditPageProcess = [
  {
    step: 1,
    title: "Scoping & Planning",
    description:
      "Define audit objectives, scope, and timeline. Identify applicable frameworks, key stakeholders, and documentation requirements. Develop a detailed audit plan.",
  },
  {
    step: 2,
    title: "Documentation Review",
    description:
      "Review security policies, procedures, and documentation against framework requirements. Identify gaps in documentation and areas requiring evidence collection.",
  },
  {
    step: 3,
    title: "Control Testing",
    description:
      "Evaluate the design and operating effectiveness of security controls through interviews, observations, and technical testing. Gather evidence of control implementation.",
  },
  {
    step: 4,
    title: "Gap Analysis",
    description:
      "Analyze findings to identify gaps between current state and compliance requirements. Assess risk and business impact of identified gaps.",
  },
  {
    step: 5,
    title: "Reporting & Remediation",
    description:
      "Deliver detailed audit report with findings, risk ratings, and remediation recommendations. Provide support for remediation planning and certification preparation.",
  },
];

export const auditPageComplianceFrameworks = [
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "SOC 2", description: "Service Organization Controls" },
  { name: "PCI-DSS", description: "Payment Card Security" },
  { name: "HIPAA", description: "Healthcare Data Protection" },
  { name: "GDPR", description: "EU Data Protection" },
  { name: "NIST CSF", description: "Cybersecurity Framework" },
  { name: "CIS Controls", description: "Critical Security Controls" },
  { name: "CMMC", description: "Defense Contractor Security" },
];

export const auditPageCTA = {
  title: "Ready to Validate Your Security?",
  description:
    "Get expert audit services to ensure compliance and strengthen your security program.",
  buttons: [
    { text: "Schedule Audit", href: "/contact" },
    {
      text: "View GRC Services",
      href: "/services/grc-services",
      variant: "secondary" as const,
    },
  ],
};
