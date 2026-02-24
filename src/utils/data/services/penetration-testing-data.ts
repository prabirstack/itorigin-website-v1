// ============================================================
// Penetration Testing Page Data
// ============================================================

export const pentestPageHero = {
  badge: { icon: "Target", text: "Penetration Testing" },
  title: "Find Vulnerabilities",
  highlight: "Before Hackers Do",
  description:
    "Our certified ethical hackers simulate real-world attacks to identify security weaknesses in your applications, networks, and infrastructure. Get actionable insights to strengthen your defenses.",
};

export const pentestPageCTAs = [
  { text: "Get a Quote", href: "/contact", primary: true },
  { text: "Schedule a Test", href: "/contact", primary: false },
];

export const pentestPageStats = [
  { label: "Penetration Tests Completed", value: "500+", icon: "Target" },
  { label: "Critical Vulnerabilities Found", value: "2,500+", icon: "AlertTriangle" },
  { label: "Client Satisfaction Rate", value: "99%", icon: "Star" },
  { label: "Certified Testers", value: "25+", icon: "Award" },
];

export const pentestPageSectionHeaders = {
  features: {
    title: "Comprehensive Testing Services",
    description:
      "We test all aspects of your digital infrastructure to ensure complete security coverage.",
  },
  benefits: {
    title: "Why Choose ITOrigin for Pen Testing",
    description:
      "Partner with experienced security professionals who deliver real value.",
  },
  process: {
    title: "Our Testing Process",
    description:
      "A structured approach that ensures thorough testing and actionable results.",
  },
};

export const pentestPageFeatures = [
  {
    title: "Web Application Testing",
    features: [
      "OWASP Top 10 vulnerability assessment",
      "Authentication & session management testing",
      "Input validation and injection testing",
      "Business logic vulnerability analysis",
      "API endpoint security testing",
      "Single Page Application (SPA) testing",
    ],
  },
  {
    title: "Network Penetration Testing",
    features: [
      "External network perimeter testing",
      "Internal network assessment",
      "Firewall and IDS/IPS bypass testing",
      "Active Directory security assessment",
      "Wireless network penetration testing",
      "Network segmentation validation",
    ],
  },
  {
    title: "Cloud & Mobile Testing",
    features: [
      "AWS, Azure, GCP security assessment",
      "Cloud configuration review",
      "iOS application security testing",
      "Android application security testing",
      "Container and Kubernetes testing",
      "Serverless security assessment",
    ],
  },
];

export const pentestPageBenefits = [
  {
    icon: "Target",
    title: "Real-World Attack Simulation",
    description:
      "We use the same techniques and tools as malicious hackers to find vulnerabilities in your systems.",
  },
  {
    icon: "Award",
    title: "Certified Professionals",
    description:
      "Our team holds OSCP, OSCE, GPEN, CEH, and other industry-recognized certifications.",
  },
  {
    icon: "FileText",
    title: "Actionable Reports",
    description:
      "Detailed reports with risk ratings, proof-of-concept exploits, and step-by-step remediation guidance.",
  },
  {
    icon: "Shield",
    title: "Safe Testing Methodology",
    description:
      "Careful testing approach that minimizes risk of service disruption to your business operations.",
  },
  {
    icon: "RefreshCcw",
    title: "Free Retesting",
    description:
      "Verify your fixes with complimentary retesting to ensure vulnerabilities are properly remediated.",
  },
  {
    icon: "CheckCircle2",
    title: "Compliance Ready",
    description:
      "Reports suitable for PCI-DSS, SOC 2, HIPAA, ISO 27001, and other compliance requirements.",
  },
];

export const pentestPageProcess = [
  {
    step: 1,
    title: "Pre-Engagement",
    description:
      "Define scope, objectives, and testing methodology. Sign NDA and rules of engagement. Coordinate testing windows and emergency contacts to ensure safe, effective testing.",
  },
  {
    step: 2,
    title: "Information Gathering",
    description:
      "Collect intelligence about target systems using OSINT techniques. Map the attack surface, identify technologies, and develop a testing strategy tailored to your environment.",
  },
  {
    step: 3,
    title: "Vulnerability Discovery",
    description:
      "Identify security weaknesses using both automated scanning and manual testing techniques. Focus on finding vulnerabilities that automated tools typically miss.",
  },
  {
    step: 4,
    title: "Exploitation",
    description:
      "Safely exploit discovered vulnerabilities to determine real-world impact. Document proof-of-concept and assess the potential damage an attacker could cause.",
  },
  {
    step: 5,
    title: "Reporting & Remediation",
    description:
      "Deliver comprehensive report with findings, risk ratings, and remediation priorities. Present results to technical and executive stakeholders with actionable recommendations.",
  },
];

export const pentestPageCTA = {
  title: "Ready to Secure Your Systems?",
  description:
    "Get a comprehensive penetration test and discover vulnerabilities before attackers exploit them.",
  buttons: [
    { text: "Schedule a Test", href: "/contact" },
    { text: "View All Services", href: "/services/offensive-security", variant: "secondary" as const },
  ],
};
