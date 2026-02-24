export const offensiveSecurityPageHero = {
  badge: { icon: "Target", text: "Offensive Security" },
  title: "Think Like an Attacker",
  highlight: "Defend Like a Pro",
  description:
    "Proactively identify and fix security vulnerabilities before malicious actors can exploit them. Our certified ethical hackers use the same techniques as real attackers to test your defenses and strengthen your security posture.",
};

export const offensiveSecurityPageCTAs = [
  { text: "Get a Quote", href: "/contact", primary: true },
  { text: "Schedule Assessment", href: "/contact", primary: false },
];

export const offensiveSecurityPageStats = [
  {
    label: "Vulnerabilities Found",
    value: "5,000+",
    icon: "Search" as const,
  },
  {
    label: "Critical Issues Identified",
    value: "800+",
    icon: "AlertTriangle" as const,
  },
  { label: "Applications Tested", value: "250+", icon: "Code" as const },
  { label: "Networks Assessed", value: "150+", icon: "Database" as const },
];

export const offensiveSecurityPageSectionHeaders = {
  features: {
    title: "Comprehensive Security Testing",
    description:
      "Our offensive security services cover all aspects of your digital infrastructure to ensure complete protection.",
  },
  benefits: {
    title: "Why Choose Our Offensive Security Services",
    description:
      "Partner with experienced security professionals who understand both attack and defense.",
  },
  process: {
    title: "Our Testing Methodology",
    description:
      "A proven approach that delivers actionable insights and measurable security improvements.",
  },
  compliance: {
    title: "Compliance & Standards",
    description:
      "Our testing methodology aligns with industry standards and regulatory requirements.",
  },
};

export const offensiveSecurityPageFeatures = [
  {
    title: "Penetration Testing",
    features: [
      "Web application penetration testing (OWASP Top 10)",
      "Mobile application security testing (iOS & Android)",
      "Network infrastructure penetration testing",
      "API security testing and validation",
      "Wireless network security assessment",
      "Cloud infrastructure security testing (AWS, Azure, GCP)",
    ],
  },
  {
    title: "Vulnerability Assessment",
    features: [
      "Comprehensive vulnerability scanning",
      "Configuration review and hardening",
      "Patch management assessment",
      "Security baseline validation",
      "Third-party component analysis",
      "Vulnerability prioritization and remediation guidance",
    ],
  },
  {
    title: "Red Team Operations",
    features: [
      "Advanced persistent threat (APT) simulation",
      "Social engineering and phishing campaigns",
      "Physical security testing",
      "Adversary emulation scenarios",
      "Security awareness training validation",
    ],
  },
];

export const offensiveSecurityPageBenefits = [
  {
    icon: "Search" as const,
    title: "Find Vulnerabilities First",
    description:
      "Discover security weaknesses before malicious actors can exploit them, reducing your attack surface.",
  },
  {
    icon: "Shield" as const,
    title: "Certified Experts",
    description:
      "Our team holds OSCP, CEH, GPEN, and other industry-leading security certifications.",
  },
  {
    icon: "Target" as const,
    title: "Real-World Attack Scenarios",
    description:
      "We simulate actual attack techniques used by cybercriminals to test your defenses.",
  },
  {
    icon: "FileText" as const,
    title: "Detailed Reporting",
    description:
      "Comprehensive reports with executive summaries, technical details, and actionable remediation steps.",
  },
  {
    icon: "Code" as const,
    title: "Latest Testing Tools",
    description:
      "We use cutting-edge security testing tools and custom exploits to thoroughly assess your systems.",
  },
  {
    icon: "CheckCircle2" as const,
    title: "Compliance Support",
    description:
      "Meet regulatory requirements for penetration testing (PCI-DSS, HIPAA, ISO 27001).",
  },
];

export const offensiveSecurityPageProcess = [
  {
    step: 1,
    title: "Scoping & Planning",
    description:
      "We work with your team to define testing scope, objectives, and rules of engagement. Identify critical systems, set testing windows, and establish communication protocols to ensure minimal business disruption.",
  },
  {
    step: 2,
    title: "Reconnaissance & Discovery",
    description:
      "Gather intelligence about your systems using both passive and active techniques. Map attack surface, identify potential entry points, and document the technology stack to plan targeted testing strategies.",
  },
  {
    step: 3,
    title: "Exploitation & Testing",
    description:
      "Attempt to exploit identified vulnerabilities using manual testing and automated tools. Test authentication mechanisms, injection flaws, business logic errors, and privilege escalation paths to determine real-world impact.",
  },
  {
    step: 4,
    title: "Reporting & Remediation",
    description:
      "Deliver comprehensive reports with findings, risk ratings, proof-of-concept exploits, and detailed remediation guidance. Provide retesting services to verify that security issues have been properly addressed.",
  },
];

export const offensiveSecurityPageComplianceStandards = [
  { name: "PCI-DSS", description: "Payment Card Industry compliance testing" },
  { name: "OWASP", description: "Top 10 vulnerabilities assessment" },
  { name: "NIST", description: "Cybersecurity Framework alignment" },
  { name: "ISO 27001", description: "Information security standards" },
];

export const offensiveSecurityPageCTA = {
  title: "Ready to Test Your Defenses?",
  description:
    "Schedule a penetration test today and discover vulnerabilities before attackers do.",
  buttons: [
    { text: "Get Started", href: "/contact" },
    {
      text: "View GRC Services",
      href: "/services/grc-services",
      variant: "secondary" as const,
    },
  ],
};
