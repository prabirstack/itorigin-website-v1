export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  pricing?: {
    type: "contact" | "starting";
    value?: string;
  };
  cta: {
    text: string;
    href: string;
  };
}

export const services: Service[] = [
  {
    id: "managed-soc",
    slug: "managed-soc-services",
    title: "Managed SOC Services",
    shortTitle: "SOC as a Service",
    description:
      "24/7 security operations center with AI-powered threat detection, incident response, and compliance reporting.",
    longDescription:
      "Our CERT-IN empanelled Security Operations Center provides round-the-clock monitoring, threat detection, and incident response. Powered by next-gen AI-SIEM technology, we protect your organization from sophisticated cyber threats while ensuring regulatory compliance.",
    icon: "Shield",
    features: [
      "24/7 security monitoring and threat detection",
      "Real-time incident response and remediation",
      "Next-gen AI-SIEM management",
      "Managed XDR and EDR solutions",
      "Threat hunting and intelligence",
      "Compliance reporting (ISO 27001, SOC2, GDPR)",
      "Security analytics and dashboards",
      "Dedicated security analyst team",
    ],
    benefits: [
      {
        title: "Reduce Risk",
        description: "Proactive threat detection minimizes your attack surface",
        icon: "ShieldCheck",
      },
      {
        title: "Save Costs",
        description: "Avoid the expense of building an in-house SOC",
        icon: "PiggyBank",
      },
      {
        title: "Expert Team",
        description: "Access to certified security professionals 24/7",
        icon: "Users",
      },
      {
        title: "Compliance",
        description: "Meet regulatory requirements with comprehensive reporting",
        icon: "FileCheck",
      },
    ],
    pricing: { type: "contact" },
    cta: { text: "Get Started", href: "/contact?service=soc" },
  },
  {
    id: "offensive-security",
    slug: "offensive-security",
    title: "Offensive Security",
    shortTitle: "Penetration Testing",
    description:
      "Comprehensive penetration testing, red team operations, and vulnerability assessments to identify and fix security gaps.",
    longDescription:
      "Our STQC-approved offensive security services simulate real-world attacks to identify vulnerabilities before malicious actors exploit them. From web and mobile app testing to network penetration and red team exercises, we help you strengthen your defenses.",
    icon: "Target",
    features: [
      "Web application penetration testing",
      "Mobile application security testing",
      "Network penetration testing",
      "Cloud security assessment (AWS, Azure, GCP)",
      "API security testing (SAST/DAST)",
      "Red team operations",
      "Social engineering assessments",
      "Wireless security testing",
    ],
    benefits: [
      {
        title: "Find Vulnerabilities",
        description: "Discover security gaps before attackers do",
        icon: "Search",
      },
      {
        title: "Validate Controls",
        description: "Test effectiveness of your security measures",
        icon: "CheckCircle",
      },
      {
        title: "Compliance",
        description: "Meet PCI-DSS, HIPAA, and other requirements",
        icon: "FileCheck",
      },
      {
        title: "Remediation Support",
        description: "Get detailed guidance on fixing vulnerabilities",
        icon: "Wrench",
      },
    ],
    pricing: { type: "contact" },
    cta: { text: "Request Assessment", href: "/contact?service=pentest" },
  },
  {
    id: "grc-services",
    slug: "grc-services",
    title: "GRC Services",
    shortTitle: "Governance, Risk & Compliance",
    description:
      "End-to-end compliance consulting for ISO 27001, SOC2, GDPR, and Indian regulations. Achieve certification faster.",
    longDescription:
      "Navigate the complex landscape of cybersecurity regulations with our comprehensive GRC services. From gap analysis to certification, we guide you through ISO 27001, SOC1/SOC2, GDPR, and industry-specific compliance requirements.",
    icon: "FileCheck",
    features: [
      "ISO 27001 implementation and certification",
      "SOC1/SOC2 compliance",
      "GDPR compliance support",
      "Risk assessment and management",
      "Security policy development",
      "Audit preparation and support",
      "Regulatory advisory",
      "Third-party risk management",
    ],
    benefits: [
      {
        title: "Faster Certification",
        description: "Streamlined approach to achieve compliance quickly",
        icon: "Zap",
      },
      {
        title: "Risk Reduction",
        description: "Identify and mitigate organizational risks",
        icon: "Shield",
      },
      {
        title: "Business Enablement",
        description: "Meet customer and partner security requirements",
        icon: "TrendingUp",
      },
      {
        title: "Expert Guidance",
        description: "Navigate complex regulatory requirements with ease",
        icon: "Compass",
      },
    ],
    pricing: { type: "contact" },
    cta: { text: "Start Compliance Journey", href: "/contact?service=grc" },
  },
  {
    id: "penetration-testing",
    slug: "penetration-testing",
    title: "Penetration Testing",
    shortTitle: "Pen Testing",
    description:
      "STQC-approved penetration testing services to identify vulnerabilities across your infrastructure and applications.",
    longDescription:
      "Our certified penetration testers use the latest tools and techniques to simulate real-world attacks. We provide comprehensive assessments of your web applications, mobile apps, networks, and cloud infrastructure.",
    icon: "Bug",
    features: [
      "Black box, grey box, and white box testing",
      "OWASP Top 10 vulnerability assessment",
      "Business logic testing",
      "Authentication and authorization testing",
      "Data validation testing",
      "Configuration review",
      "Detailed remediation guidance",
      "Executive and technical reports",
    ],
    benefits: [
      {
        title: "Real-World Testing",
        description: "Simulate actual attack scenarios",
        icon: "Target",
      },
      {
        title: "Comprehensive Coverage",
        description: "Test all aspects of your security",
        icon: "Layers",
      },
      {
        title: "Actionable Results",
        description: "Get clear remediation priorities",
        icon: "ListChecks",
      },
      {
        title: "Compliance",
        description: "Meet regulatory testing requirements",
        icon: "FileCheck",
      },
    ],
    pricing: { type: "contact" },
    cta: { text: "Schedule Test", href: "/contact?service=pentest" },
  },
  {
    id: "vulnerability-assessment",
    slug: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    shortTitle: "VA Services",
    description:
      "Automated and manual vulnerability scanning to identify security weaknesses across your IT infrastructure.",
    longDescription:
      "Our vulnerability assessment services combine automated scanning with expert analysis to identify security weaknesses. We provide prioritized findings with remediation guidance to help you address the most critical issues first.",
    icon: "Search",
    features: [
      "Network vulnerability scanning",
      "Web application scanning",
      "Database security assessment",
      "Configuration auditing",
      "Patch management review",
      "Risk-based prioritization",
      "Trend analysis and reporting",
      "Continuous monitoring options",
    ],
    benefits: [
      {
        title: "Visibility",
        description: "Understand your security posture",
        icon: "Eye",
      },
      {
        title: "Prioritization",
        description: "Focus on the most critical vulnerabilities",
        icon: "ArrowUp",
      },
      {
        title: "Efficiency",
        description: "Automated scanning saves time and resources",
        icon: "Zap",
      },
      {
        title: "Compliance",
        description: "Meet scanning requirements for PCI-DSS, etc.",
        icon: "FileCheck",
      },
    ],
    pricing: { type: "contact" },
    cta: { text: "Get Assessment", href: "/contact?service=va" },
  },
  {
    id: "security-audit",
    slug: "security-audit",
    title: "Security Audit",
    shortTitle: "Audit Services",
    description:
      "Comprehensive security audits to evaluate your organization's security controls, policies, and procedures.",
    longDescription:
      "Our security audits provide an independent evaluation of your organization's security posture. We assess technical controls, policies, procedures, and compliance status to identify gaps and recommend improvements.",
    icon: "ClipboardCheck",
    features: [
      "Technical security assessment",
      "Policy and procedure review",
      "Access control audit",
      "Network architecture review",
      "Incident response evaluation",
      "Business continuity review",
      "Vendor security assessment",
      "Gap analysis and roadmap",
    ],
    benefits: [
      {
        title: "Independent Review",
        description: "Unbiased assessment of your security",
        icon: "Scale",
      },
      {
        title: "Identify Gaps",
        description: "Find weaknesses before they're exploited",
        icon: "Search",
      },
      {
        title: "Improve Posture",
        description: "Get actionable recommendations",
        icon: "TrendingUp",
      },
      {
        title: "Board Reporting",
        description: "Executive-level security insights",
        icon: "BarChart",
      },
    ],
    pricing: { type: "contact" },
    cta: { text: "Request Audit", href: "/contact?service=audit" },
  },
];

export const serviceCategories = [
  {
    id: "defensive",
    name: "Defensive Security",
    description: "Protect your organization with 24/7 monitoring and response",
    services: ["managed-soc"],
  },
  {
    id: "offensive",
    name: "Offensive Security",
    description: "Find vulnerabilities before attackers do",
    services: ["offensive-security", "penetration-testing", "vulnerability-assessment"],
  },
  {
    id: "compliance",
    name: "Compliance & Audit",
    description: "Achieve and maintain regulatory compliance",
    services: ["grc-services", "security-audit"],
  },
];

export const serviceCertifications = [
  { id: 1, name: "CERT-IN Empanelled", logo: "/images/certifications/cert-in.png" },
  { id: 2, name: "STQC Approved", logo: "/images/certifications/stqc.png" },
  { id: 3, name: "ISO 27001 Certified", logo: "/images/certifications/iso-27001.png" },
];
