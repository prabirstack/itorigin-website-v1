import { db } from "@/db";
import { resources, resourceCategories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const RESOURCE_CATEGORIES = [
  { name: "Threat Intelligence", slug: "threat-intelligence", description: "Insights on emerging threats and attack vectors" },
  { name: "Security Operations", slug: "security-operations", description: "SOC best practices and operational security" },
  { name: "Compliance & GRC", slug: "compliance-grc", description: "Governance, risk, and compliance guidance" },
  { name: "Cloud Security", slug: "cloud-security", description: "Securing cloud infrastructure and applications" },
  { name: "Penetration Testing", slug: "penetration-testing", description: "Security testing methodologies and techniques" },
  { name: "Incident Response", slug: "incident-response", description: "Handling security incidents effectively" },
  { name: "Security Awareness", slug: "security-awareness", description: "Building a security-conscious culture" },
];

const RESOURCES_DATA = [
  // Whitepapers
  {
    title: "The State of Cybersecurity 2025",
    slug: "state-of-cybersecurity-2025",
    shortDescription: "Comprehensive analysis of current cyber threats and defense strategies",
    description: "This whitepaper provides an in-depth analysis of the current cybersecurity landscape, including emerging threats, attack trends, and effective defense strategies. Based on data from thousands of security incidents, it offers actionable insights for security leaders to strengthen their organization's security posture.",
    type: "whitepaper" as const,
    category: "Threat Intelligence",
    status: "published" as const,
    pages: 32,
    readTime: "45 min read",
    topics: ["Threat Landscape", "Ransomware", "APT Groups", "Defense Strategies"],
    featured: true,
    publishDate: new Date("2025-01-15"),
  },
  {
    title: "Zero Trust Architecture Implementation Guide",
    slug: "zero-trust-implementation-guide",
    shortDescription: "Step-by-step guide to implementing Zero Trust security model",
    description: "A practical guide for implementing Zero Trust Architecture in your organization. Covers identity verification, network segmentation, continuous monitoring, and least privilege access principles with real-world examples and implementation timelines.",
    type: "guide" as const,
    category: "Security Operations",
    status: "published" as const,
    pages: 48,
    readTime: "60 min read",
    topics: ["Zero Trust", "Identity Management", "Network Security", "Access Control"],
    featured: true,
    publishDate: new Date("2025-01-10"),
  },
  {
    title: "SOC Maturity Assessment Framework",
    slug: "soc-maturity-assessment-framework",
    shortDescription: "Evaluate and improve your Security Operations Center capabilities",
    description: "This framework helps organizations assess their SOC maturity across five key dimensions: people, processes, technology, governance, and metrics. Includes self-assessment questionnaires, scoring methodology, and roadmap templates for improvement.",
    type: "guide" as const,
    category: "Security Operations",
    status: "published" as const,
    pages: 36,
    readTime: "50 min read",
    topics: ["SOC", "Maturity Model", "Security Operations", "SIEM"],
    featured: false,
    publishDate: new Date("2025-01-05"),
  },
  {
    title: "GDPR Compliance Checklist for Enterprises",
    slug: "gdpr-compliance-checklist-enterprises",
    shortDescription: "Complete checklist for achieving and maintaining GDPR compliance",
    description: "A comprehensive checklist covering all aspects of GDPR compliance including data mapping, consent management, breach notification procedures, and data subject rights. Includes templates for Data Protection Impact Assessments (DPIA) and records of processing activities.",
    type: "checklist" as const,
    category: "Compliance & GRC",
    status: "published" as const,
    pages: 24,
    readTime: "30 min read",
    topics: ["GDPR", "Privacy", "Data Protection", "Compliance"],
    featured: true,
    publishDate: new Date("2024-12-20"),
  },
  {
    title: "Cloud Security Best Practices for AWS, Azure & GCP",
    slug: "cloud-security-best-practices-multi-cloud",
    shortDescription: "Security configurations and practices for major cloud platforms",
    description: "This guide covers security best practices for the three major cloud platforms. Includes IAM configuration, network security, data encryption, logging and monitoring, and compliance considerations specific to each platform.",
    type: "guide" as const,
    category: "Cloud Security",
    status: "published" as const,
    pages: 56,
    readTime: "75 min read",
    topics: ["AWS Security", "Azure Security", "GCP Security", "Cloud Posture"],
    featured: false,
    publishDate: new Date("2024-12-15"),
  },
  {
    title: "Ransomware Prevention and Response Playbook",
    slug: "ransomware-prevention-response-playbook",
    shortDescription: "Complete playbook for preventing and responding to ransomware attacks",
    description: "A detailed playbook covering ransomware prevention strategies, detection mechanisms, and incident response procedures. Includes decision trees for handling ransom demands, communication templates, and recovery procedures.",
    type: "guide" as const,
    category: "Incident Response",
    status: "published" as const,
    pages: 42,
    readTime: "55 min read",
    topics: ["Ransomware", "Incident Response", "Backup Strategy", "Recovery"],
    featured: true,
    publishDate: new Date("2024-12-10"),
  },
  {
    title: "Penetration Testing Methodology Guide",
    slug: "penetration-testing-methodology-guide",
    shortDescription: "Comprehensive guide to professional penetration testing methodologies",
    description: "This guide covers industry-standard penetration testing methodologies including reconnaissance, scanning, exploitation, and reporting. Based on OWASP, PTES, and OSSTMM frameworks with practical examples and tool recommendations.",
    type: "guide" as const,
    category: "Penetration Testing",
    status: "published" as const,
    pages: 64,
    readTime: "90 min read",
    topics: ["Pentest Methodology", "OWASP", "Vulnerability Assessment", "Ethical Hacking"],
    featured: false,
    publishDate: new Date("2024-12-01"),
  },
  {
    title: "Security Awareness Training Toolkit",
    slug: "security-awareness-training-toolkit",
    shortDescription: "Resources for building an effective security awareness program",
    description: "A complete toolkit for launching and maintaining a security awareness program. Includes presentation templates, phishing simulation guidelines, metric tracking spreadsheets, and sample policies for common security topics.",
    type: "toolkit" as const,
    category: "Security Awareness",
    status: "published" as const,
    pages: 38,
    readTime: "40 min read",
    topics: ["Security Awareness", "Phishing", "Training", "Human Factor"],
    featured: false,
    publishDate: new Date("2024-11-25"),
  },
  {
    title: "Vulnerability Management Program Template",
    slug: "vulnerability-management-program-template",
    shortDescription: "Templates and processes for an effective vulnerability management program",
    description: "This template provides a complete framework for establishing a vulnerability management program. Covers scanning schedules, risk scoring, remediation workflows, exception handling, and executive reporting templates.",
    type: "template" as const,
    category: "Security Operations",
    status: "published" as const,
    pages: 28,
    readTime: "35 min read",
    topics: ["Vulnerability Management", "Risk Assessment", "Patching", "CVSS"],
    featured: false,
    publishDate: new Date("2024-11-20"),
  },
  {
    title: "Third-Party Risk Assessment Questionnaire",
    slug: "third-party-risk-assessment-questionnaire",
    shortDescription: "Comprehensive questionnaire for assessing vendor security",
    description: "A detailed questionnaire for evaluating the security posture of third-party vendors and partners. Covers information security, data protection, incident response, business continuity, and compliance certifications.",
    type: "template" as const,
    category: "Compliance & GRC",
    status: "published" as const,
    pages: 18,
    readTime: "25 min read",
    topics: ["Third-Party Risk", "Vendor Assessment", "Supply Chain", "Due Diligence"],
    featured: false,
    publishDate: new Date("2024-11-15"),
  },
  {
    title: "Incident Response Plan Template",
    slug: "incident-response-plan-template",
    shortDescription: "Ready-to-use incident response plan template",
    description: "A comprehensive incident response plan template that can be customized for your organization. Includes roles and responsibilities, escalation procedures, communication templates, and post-incident review checklists.",
    type: "template" as const,
    category: "Incident Response",
    status: "published" as const,
    pages: 32,
    readTime: "40 min read",
    topics: ["Incident Response", "IR Plan", "NIST Framework", "Tabletop Exercises"],
    featured: false,
    publishDate: new Date("2024-11-10"),
  },
  {
    title: "API Security Testing Checklist",
    slug: "api-security-testing-checklist",
    shortDescription: "Complete checklist for testing API security",
    description: "A detailed checklist for performing security testing on REST and GraphQL APIs. Covers authentication, authorization, input validation, rate limiting, and common API vulnerabilities from the OWASP API Security Top 10.",
    type: "checklist" as const,
    category: "Penetration Testing",
    status: "published" as const,
    pages: 16,
    readTime: "20 min read",
    topics: ["API Security", "OWASP", "Authentication", "Authorization"],
    featured: false,
    publishDate: new Date("2024-11-05"),
  },
  {
    title: "Cybersecurity ROI Calculator and Business Case Guide",
    slug: "cybersecurity-roi-calculator-business-case",
    shortDescription: "Tools for calculating and presenting cybersecurity ROI",
    description: "This guide helps security leaders build compelling business cases for security investments. Includes ROI calculation methodologies, risk quantification frameworks, and presentation templates for executive stakeholders.",
    type: "toolkit" as const,
    category: "Compliance & GRC",
    status: "published" as const,
    pages: 22,
    readTime: "30 min read",
    topics: ["Security ROI", "Business Case", "Risk Quantification", "FAIR"],
    featured: false,
    publishDate: new Date("2024-10-30"),
  },
  {
    title: "Container Security Best Practices",
    slug: "container-security-best-practices",
    shortDescription: "Securing Docker and Kubernetes environments",
    description: "A comprehensive guide to securing containerized applications. Covers image security, runtime protection, Kubernetes security configurations, secrets management, and continuous security monitoring for container environments.",
    type: "guide" as const,
    category: "Cloud Security",
    status: "published" as const,
    pages: 44,
    readTime: "60 min read",
    topics: ["Container Security", "Kubernetes", "Docker", "DevSecOps"],
    featured: false,
    publishDate: new Date("2024-10-25"),
  },
  {
    title: "Threat Modeling Workbook",
    slug: "threat-modeling-workbook",
    shortDescription: "Practical exercises for threat modeling",
    description: "An interactive workbook for learning and practicing threat modeling. Includes STRIDE methodology tutorials, data flow diagram templates, attack tree examples, and real-world case studies with solutions.",
    type: "guide" as const,
    category: "Threat Intelligence",
    status: "published" as const,
    pages: 52,
    readTime: "70 min read",
    topics: ["Threat Modeling", "STRIDE", "Attack Trees", "Security Design"],
    featured: false,
    publishDate: new Date("2024-10-20"),
  },
];

async function seedResourcesData() {
  console.log("Starting resources data seeding...\n");

  // Create resource categories
  console.log("Creating resource categories...");
  for (const cat of RESOURCE_CATEGORIES) {
    const existing = await db.query.resourceCategories.findFirst({
      where: eq(resourceCategories.slug, cat.slug),
    });

    if (existing) {
      console.log(`  - Category "${cat.name}" already exists`);
    } else {
      await db.insert(resourceCategories).values({
        id: nanoid(),
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      });
      console.log(`  + Created category: ${cat.name}`);
    }
  }

  // Create resources
  console.log("\nCreating resources...");
  for (const resource of RESOURCES_DATA) {
    const existing = await db.query.resources.findFirst({
      where: eq(resources.slug, resource.slug),
    });

    if (existing) {
      console.log(`  - Resource "${resource.title}" already exists`);
      continue;
    }

    await db.insert(resources).values({
      id: nanoid(),
      title: resource.title,
      slug: resource.slug,
      shortDescription: resource.shortDescription,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      status: resource.status,
      pages: resource.pages,
      readTime: resource.readTime,
      topics: resource.topics,
      featured: resource.featured,
      publishDate: resource.publishDate,
      downloadCount: Math.floor(Math.random() * 500) + 50,
      viewCount: Math.floor(Math.random() * 1000) + 100,
    });

    console.log(`  + Created resource: ${resource.title}`);
  }

  console.log("\nResources data seeding completed!");
}

seedResourcesData()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
