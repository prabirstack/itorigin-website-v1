export interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
}

export const platformInfo = {
  name: "IT Origin Cyber Fusion Center",
  tagline: "AI-Powered Security Operations Platform",
  description:
    "Our Cyber Fusion Center combines AI-driven threat detection, automated response, and expert analysis to provide comprehensive security operations. Built on next-generation SIEM technology, it offers real-time visibility and protection against sophisticated cyber threats.",
  highlights: [
    "AI-powered threat detection and response",
    "Real-time security analytics and dashboards",
    "Automated incident response workflows",
    "Integrated threat intelligence feeds",
    "Compliance reporting and audit trails",
    "Multi-tenant architecture for scalability",
  ],
};

export const platformFeatures: PlatformFeature[] = [
  {
    id: "ai-detection",
    title: "AI-Powered Detection",
    description: "Advanced machine learning algorithms for real-time threat detection",
    icon: "Brain",
    details: [
      "Behavioral analytics for anomaly detection",
      "Machine learning-based threat classification",
      "Automated false positive reduction",
      "Continuous learning from new threats",
    ],
  },
  {
    id: "siem",
    title: "Next-Gen SIEM",
    description: "Comprehensive security information and event management",
    icon: "Database",
    details: [
      "Centralized log collection and analysis",
      "Real-time correlation rules",
      "Custom detection rules engine",
      "High-speed data ingestion",
    ],
  },
  {
    id: "xdr",
    title: "Extended Detection & Response",
    description: "Unified visibility across endpoints, networks, and cloud",
    icon: "Layers",
    details: [
      "Cross-platform threat correlation",
      "Automated threat containment",
      "Integrated EDR capabilities",
      "Cloud workload protection",
    ],
  },
  {
    id: "soar",
    title: "Security Orchestration",
    description: "Automated workflows for faster incident response",
    icon: "Workflow",
    details: [
      "Pre-built response playbooks",
      "Custom automation workflows",
      "Third-party tool integration",
      "Case management system",
    ],
  },
  {
    id: "threat-intel",
    title: "Threat Intelligence",
    description: "Global threat intelligence for proactive defense",
    icon: "Globe",
    details: [
      "Multiple threat feed integration",
      "IOC enrichment and correlation",
      "Threat actor tracking",
      "Industry-specific intelligence",
    ],
  },
  {
    id: "compliance",
    title: "Compliance Management",
    description: "Built-in compliance reporting for major frameworks",
    icon: "FileCheck",
    details: [
      "Pre-built compliance dashboards",
      "Automated evidence collection",
      "Audit trail and logging",
      "Custom compliance frameworks",
    ],
  },
];

export const platformStats = [
  { id: 1, value: "10B+", label: "Events Processed Daily" },
  { id: 2, value: "<15min", label: "Average Detection Time" },
  { id: 3, value: "99.99%", label: "Platform Uptime" },
  { id: 4, value: "500+", label: "Integration Points" },
];

export const integrations: Integration[] = [
  {
    id: "aws",
    name: "Amazon Web Services",
    category: "Cloud",
    logo: "/images/integrations/aws.png",
    description: "Native integration with AWS CloudTrail, GuardDuty, and Security Hub",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "Cloud",
    logo: "/images/integrations/azure.png",
    description: "Integration with Azure Sentinel, Defender, and Activity Logs",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Cloud",
    logo: "/images/integrations/gcp.png",
    description: "Support for GCP Security Command Center and Cloud Logging",
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    category: "Endpoint",
    logo: "/images/integrations/crowdstrike.png",
    description: "Falcon EDR integration for endpoint threat detection",
  },
  {
    id: "sentinel-one",
    name: "SentinelOne",
    category: "Endpoint",
    logo: "/images/integrations/sentinelone.png",
    description: "Singularity platform integration for autonomous response",
  },
  {
    id: "palo-alto",
    name: "Palo Alto Networks",
    category: "Network",
    logo: "/images/integrations/paloalto.png",
    description: "Firewall and Cortex XDR integration",
  },
  {
    id: "okta",
    name: "Okta",
    category: "Identity",
    logo: "/images/integrations/okta.png",
    description: "Identity and access management integration",
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "ITSM",
    logo: "/images/integrations/servicenow.png",
    description: "Ticketing and incident management integration",
  },
];

export const deploymentOptions = [
  {
    id: "saas",
    name: "Cloud (SaaS)",
    description: "Fully managed cloud deployment with automatic updates",
    features: ["No infrastructure management", "Automatic updates", "Scalable resources", "Quick deployment"],
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Combine cloud analytics with on-premise data collection",
    features: ["Data residency compliance", "Flexible architecture", "Best of both worlds", "Custom configurations"],
  },
  {
    id: "on-premise",
    name: "On-Premise",
    description: "Full deployment within your data center",
    features: ["Complete data control", "Air-gapped environments", "Custom integrations", "Dedicated resources"],
  },
];
