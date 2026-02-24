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
  name: "ITOrigin Cyber Fusion Center",
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

// Page-specific data exports

export const platformPageHero = {
  badge: { icon: "Zap", text: "SecureOps Platform" },
  title: "Unified Security",
  highlight: "Operations Platform",
  description: "Transform your security operations with our comprehensive platform. SecureOps combines SIEM, threat intelligence, compliance monitoring, and automated response in one powerful solution built for modern security teams.",
};

export const platformPageCTAs = [
  { text: "Request Demo", href: "/contact", primary: true },
  { text: "Explore Products", href: "#products", primary: false },
];

export const platformPageStats = [
  { label: "Events Processed Daily", value: "50B+", icon: "Zap" },
  { label: "Average Detection Time", value: "<3min", icon: "Eye" },
  { label: "Platform Uptime", value: "99.9%", icon: "Server" },
  { label: "Active Deployments", value: "500+", icon: "Target" },
];

export const platformPageProducts = [
  {
    name: "SecureOps Core",
    tagline: "Unified Security Intelligence",
    description: "Next-generation SIEM platform that consolidates security data from across your infrastructure for real-time threat detection and response.",
    icon: "Shield",
    features: [
      "Real-time log aggregation and analysis",
      "Advanced correlation engine",
      "Machine learning-based anomaly detection",
      "Automated incident response workflows",
      "Custom dashboard and reporting",
      "Multi-tenant architecture",
    ],
    highlight: true,
  },
  {
    name: "ThreatIntel Pro",
    tagline: "AI-Powered Threat Intelligence",
    description: "Leverage artificial intelligence to identify, analyze, and respond to emerging threats before they impact your organization.",
    icon: "Zap",
    features: [
      "Global threat intelligence feeds",
      "Automated threat hunting",
      "Behavioral analytics and profiling",
      "Attack pattern recognition",
      "Threat actor attribution",
      "Predictive threat modeling",
    ],
    highlight: false,
  },
  {
    name: "ComplianceHub",
    tagline: "Continuous Compliance Monitoring",
    description: "Automate compliance monitoring and reporting across multiple frameworks with real-time policy enforcement and audit trails.",
    icon: "BarChart",
    features: [
      "Multi-framework compliance (GDPR, HIPAA, SOC 2, ISO 27001)",
      "Automated policy enforcement",
      "Real-time compliance scoring",
      "Executive compliance dashboards",
      "Audit trail automation",
      "Regulatory change tracking",
    ],
    highlight: false,
  },
];

export const platformPageSectionHeaders = {
  products: {
    title: "Platform Products",
    description: "Comprehensive security solutions that work together seamlessly to protect your organization.",
  },
  features: {
    title: "Core Platform Features",
    description: "Powerful capabilities designed to streamline security operations and improve threat detection.",
  },
  benefits: {
    title: "Why Choose SecureOps Platform",
    description: "Experience the advantages of a unified security operations platform built for modern threats.",
  },
  integrations: {
    title: "Seamless Integrations",
    description: "Connect with your existing security tools and infrastructure for a unified security operations experience.",
  },
};

export const platformPageCoreFeatures = [
  {
    title: "Unified Security Dashboard",
    description: "Get a comprehensive view of your security posture with customizable dashboards that aggregate data from all your security tools and infrastructure.",
    icon: "BarChart",
    metrics: ["Real-time threat visualization", "Custom KPI tracking", "Executive reporting"],
  },
  {
    title: "Automated Response",
    description: "Accelerate incident response with automated playbooks that contain threats, gather evidence, and initiate remediation workflows instantly.",
    icon: "Zap",
    metrics: ["Pre-built playbooks", "Custom automation", "Integration with SOAR tools"],
  },
  {
    title: "Advanced Analytics",
    description: "Leverage machine learning and behavioral analytics to detect sophisticated threats that traditional security tools miss.",
    icon: "TrendingUp",
    metrics: ["ML-powered detection", "User behavior analytics", "Predictive modeling"],
  },
  {
    title: "Threat Intelligence",
    description: "Stay ahead of threats with integrated threat intelligence feeds and automated enrichment of security events.",
    icon: "Eye",
    metrics: ["40+ threat feeds", "Automatic IoC enrichment", "Threat scoring"],
  },
];

export const platformPageIntegrations = [
  { name: "AWS Security Hub", category: "Cloud Security", icon: "Server" },
  { name: "Microsoft Sentinel", category: "SIEM", icon: "Shield" },
  { name: "CrowdStrike", category: "EDR", icon: "Lock" },
  { name: "Palo Alto Networks", category: "Firewall", icon: "Shield" },
  { name: "Splunk", category: "Log Management", icon: "BarChart" },
  { name: "ServiceNow", category: "ITSM", icon: "Settings" },
  { name: "Okta", category: "Identity", icon: "Users" },
  { name: "Jira", category: "Ticketing", icon: "Target" },
];

export const platformPageBenefits = [
  { icon: "Shield", title: "Comprehensive Protection", description: "Unified platform covering all aspects of security operations from detection to response." },
  { icon: "Zap", title: "Automated Workflows", description: "Reduce manual effort with intelligent automation that speeds up threat detection and response." },
  { icon: "TrendingUp", title: "Scalable Architecture", description: "Cloud-native platform that scales effortlessly from small teams to enterprise deployments." },
  { icon: "Eye", title: "Complete Visibility", description: "Centralized view of all security events across your entire infrastructure and cloud environments." },
  { icon: "CheckCircle2", title: "Compliance Ready", description: "Built-in compliance monitoring and reporting for major regulatory frameworks." },
  { icon: "Users", title: "Expert Support", description: "24/7 technical support from our security operations team with guaranteed response times." },
];

export const platformPageDeployment = {
  title: "Flexible Deployment Options",
  description: "Deploy SecureOps the way that works best for your organization.",
  options: [
    {
      icon: "Server",
      name: "SaaS",
      description: "Fully managed cloud platform with zero infrastructure overhead.",
      features: ["Instant deployment", "Automatic updates", "99.9% uptime SLA"],
      recommended: false,
    },
    {
      icon: "Shield",
      name: "Hybrid",
      description: "Combine cloud scalability with on-premise data control.",
      features: ["Data residency compliance", "Cloud-managed control plane", "Best of both worlds"],
      recommended: true,
    },
    {
      icon: "Lock",
      name: "On-Premise",
      description: "Complete control with self-hosted deployment in your datacenter.",
      features: ["Full data sovereignty", "Air-gapped option", "Custom configuration"],
      recommended: false,
    },
  ],
};

export const platformPagePricing = {
  title: "Enterprise-Ready Pricing",
  description: "Flexible pricing based on your environment size and feature requirements. Start with a free trial or request a custom quote for enterprise deployments.",
  buttons: [
    { text: "Start Free Trial", href: "/contact", primary: true },
    { text: "Contact Sales", href: "/contact", primary: false },
  ],
};

export const platformPageIntegrationsFooter = {
  text: "Supporting 100+ integrations with leading security, cloud, and enterprise tools.",
  linkText: "View all integrations",
  linkHref: "/contact",
};

export const platformPageCTA = {
  title: "Ready to Transform Your Security Operations?",
  description: "See SecureOps Platform in action with a personalized demo from our security experts.",
  buttons: [
    { text: "Schedule Demo", href: "/contact" },
    { text: "View Documentation", href: "/coming-soon?for=documentation", variant: "secondary" as const },
  ],
};
