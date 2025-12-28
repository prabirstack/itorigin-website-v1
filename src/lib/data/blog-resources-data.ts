import { LucideIcon } from "lucide-react";

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
    title: "Latest cybersecurity trends and analysis",
    description: "Stay ahead of emerging threats with our expert analysis",
    iconName: "TrendingUp",
    readTime: "5 min read",
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
