export const blogSectionHeader = {
  badge: "Knowledge Center",
  title: "Security Intelligence",
  titleHighlight: "Resources",
  description:
    "Access comprehensive cybersecurity resources, industry insights, and expert analysis to strengthen your security posture and stay ahead of evolving threats.",
  ctaText: "View All Articles",
  ctaHref: "/blogs",
};

export const downloadResourcesHeader = {
  title: "Download Resources",
  subtitle: "Essential tools and guides to enhance your cybersecurity strategy",
};

export const blogHighlightsHeader = {
  title: "Blog Highlights",
  subtitle: "Stay informed with our latest security insights and expert analysis",
};

export interface DownloadResource {
  id: string;
  title: string;
  description: string;
  iconName: string;
  type: string;
}

export interface BlogHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
  readTime: string;
  href?: string;
}

export const downloadResources: DownloadResource[] = [
  {
    id: "1",
    title: "Cybersecurity Assessment Checklist",
    description: "Comprehensive evaluation framework for your security posture",
    iconName: "FileText",
    type: "Checklist",
  },
  {
    id: "2",
    title: "Annual Threat Landscape Report 2025",
    description: "Latest threat trends and attack vectors analysis",
    iconName: "BarChart3",
    type: "Report",
  },
  {
    id: "3",
    title: "Compliance Readiness Guide",
    description: "ISO 27001, SOC2, and GDPR implementation roadmap",
    iconName: "Shield",
    type: "Guide",
  },
  {
    id: "4",
    title: "Incident Response Playbook Template",
    description: "Step-by-step incident handling and recovery procedures",
    iconName: "Target",
    type: "Template",
  },
];

export const blogHighlights: BlogHighlight[] = [
  {
    id: "1",
    title: "A Practical Guide to India's DPDP Act",
    description:
      "Understand India's Digital Personal Data Protection Act — its applicability, key obligations, timelines, and a practical 9-phase implementation strategy for compliance.",
    iconName: "Shield",
    readTime: "5 min read",
    href: "/blogs/a-practical-guide-to-indias-digital-personal-data-protection-dpdp-act",
  },
  {
    id: "2",
    title: "Compliance guides and best practices",
    description: "Navigate regulatory requirements with confidence",
    iconName: "Lock",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Threat intelligence updates",
    description: "Real-time insights from our security operations center",
    iconName: "AlertCircle",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Industry-specific security insights",
    description: "Tailored security strategies for your sector",
    iconName: "Building2",
    readTime: "7 min read",
  },
];
