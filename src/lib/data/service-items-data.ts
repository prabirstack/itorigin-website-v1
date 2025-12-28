export interface ServiceItem {
  id: number;
  iconName: string;
  headline: string;
  description: string;
  services: string[];
  ctaText: string;
  ctaLink: string;
  primaryColor: string;
  secondaryColor: string;
  bgPattern: string;
}

export const homeServices: ServiceItem[] = [
  {
    id: 1,
    iconName: "Shield",
    headline: "24/7 Security Operations Center",
    description:
      "CERT-IN empanelled SOC with AI-SIEM technology. Real-time threat detection, incident response, and compliance reporting for continuous protection.",
    services: [
      "24/7 security monitoring and threat detection",
      "Incident response and remediation",
      "Next-gen SIEM management",
      "Managed XDR and EDR",
      "Threat hunting and intelligence",
    ],
    ctaText: "Explore SOCaaS",
    ctaLink: "/services/managed-soc-services",
    primaryColor: "text-blue-500",
    secondaryColor: "bg-blue-500/10",
    bgPattern: "from-blue-500/5 to-cyan-500/5",
  },
  {
    id: 2,
    iconName: "SearchCheck",
    headline: "Advanced Threat Hunting & Response",
    description:
      "Multi-vendor EDR support with elite threat hunters. Proactive detection and hands-on remediation to neutralize sophisticated attacks.",
    services: [
      "Advanced behavioral analytics",
      "Real-time threat containment",
      "Forensic investigation",
      "Guided remediation support",
      "Threat advisory services",
    ],
    ctaText: "Discover MDR",
    ctaLink: "/services/managed-soc-services",
    primaryColor: "text-purple-500",
    secondaryColor: "bg-purple-500/10",
    bgPattern: "from-purple-500/5 to-pink-500/5",
  },
  {
    id: 3,
    iconName: "Bug",
    headline: "Comprehensive Security Testing",
    description:
      "STQC-approved penetration testing across web, mobile, network, cloud, and API environments. Find vulnerabilities before attackers do.",
    services: [
      "Vulnerability Assessment",
      "Web & Mobile App Testing",
      "Network Penetration Testing",
      "Cloud Security Assessment",
      "API Security Testing (SAST/DAST)",
      "Red Team Operations",
    ],
    ctaText: "View Offensive Security",
    ctaLink: "/services/offensive-security",
    primaryColor: "text-red-500",
    secondaryColor: "bg-red-500/10",
    bgPattern: "from-red-500/5 to-orange-500/5",
  },
  {
    id: 4,
    iconName: "FileCheck2",
    headline: "Governance, Risk & Compliance",
    description:
      "End-to-end compliance consulting for ISO 27001, SOC2, GDPR, and Indian regulations. Achieve certification faster.",
    services: [
      "ISO 27001 Implementation",
      "SOC1/SOC2 Compliance",
      "GDPR Compliance Support",
      "Risk Assessment & Management",
      "Audit & Gap Analysis",
      "Regulatory Advisory",
    ],
    ctaText: "Explore GRC Services",
    ctaLink: "/services/grc-services",
    primaryColor: "text-green-500",
    secondaryColor: "bg-green-500/10",
    bgPattern: "from-green-500/5 to-emerald-500/5",
  },
  {
    id: 5,
    iconName: "Server",
    headline: "Managed Security Infrastructure",
    description:
      "Complete management of firewalls, IDS/IPS, WAF, and security patches. Maintain strong perimeter defenses.",
    services: [
      "Firewall configuration & management",
      "IDS/IPS deployment & monitoring",
      "WAF management & optimization",
      "Patch management services",
      "Security infrastructure monitoring",
    ],
    ctaText: "Learn More",
    ctaLink: "/services/managed-soc-services",
    primaryColor: "text-indigo-500",
    secondaryColor: "bg-indigo-500/10",
    bgPattern: "from-indigo-500/5 to-blue-500/5",
  },
  {
    id: 6,
    iconName: "FileSearch",
    headline: "Incident Response & Forensics",
    description:
      "Rapid incident response, digital forensics investigation, and breach containment. Minimize damage and ensure business continuity.",
    services: [
      "Incident response planning",
      "Digital forensics analysis",
      "Breach containment & eradication",
      "Post-incident analysis & reporting",
      "Recovery assistance & hardening",
    ],
    ctaText: "Explore IR Services",
    ctaLink: "/services/offensive-security",
    primaryColor: "text-orange-500",
    secondaryColor: "bg-orange-500/10",
    bgPattern: "from-orange-500/5 to-yellow-500/5",
  },
];
