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
  // New whitepapers added for Task 12
  {
    title: "Zero Trust Architecture: A 2026 Enterprise Blueprint",
    slug: "zero-trust-architecture-2026",
    shortDescription: "How leading enterprises are adopting Zero Trust to eliminate implicit trust and reduce breach impact",
    description: "This whitepaper examines how organisations across financial services, healthcare, and critical infrastructure are deploying Zero Trust principles in 2026. Drawing on IT Origin's engagements with enterprise clients, it maps the architectural patterns that deliver measurable risk reduction alongside practical migration guidance for teams at every stage of maturity.",
    type: "whitepaper" as const,
    category: "Cloud Security",
    status: "published" as const,
    pages: 28,
    readTime: "35 min read",
    topics: ["Zero Trust", "Network Segmentation", "Identity Verification", "Least Privilege", "Cloud Security"],
    featured: true,
    publishDate: new Date("2026-02-10"),
    fileUrl: "https://itorigin.com/whitepapers/zero-trust-architecture-2026.pdf",
    content: `<h2>Executive Summary</h2>
<p>The traditional perimeter-based security model has proven inadequate against modern adversaries who operate laterally inside corporate networks after initial compromise. Zero Trust Architecture (ZTA) replaces implicit trust with continuous, identity-centric verification for every user, device, and workload — regardless of network location. This whitepaper synthesises IT Origin's 2025–2026 deployment experience across twelve enterprise engagements to present a practical blueprint for organisations ready to make the transition.</p>
<p>Key findings indicate that organisations achieving full ZTA maturity reduced mean time to contain (MTTC) lateral movement by 67 % and cut blast radius of successful breaches by an average of 74 % compared to their legacy posture.</p>

<h2>Core Principles</h2>
<p>Zero Trust is built on three foundational pillars:</p>
<ul>
<li><strong>Verify explicitly.</strong> Every access request must be authenticated and authorised using all available signals: user identity, device health, location, service, and data sensitivity.</li>
<li><strong>Use least-privilege access.</strong> Limit user access with just-in-time and just-enough-access (JIT/JEA) policies, risk-based adaptive policies, and data protection mechanisms.</li>
<li><strong>Assume breach.</strong> Minimise blast radius, segment access by network, user, device, and application, and encrypt all sessions end to end. Treat every request as if it originates from an untrusted network.</li>
</ul>
<p>These principles translate directly into the five architectural control planes examined in this whitepaper: Identity & Access Management, Device Trust, Network Micro-segmentation, Application Access Control, and Data Classification & Protection.</p>

<h2>Maturity Model</h2>
<p>IT Origin's ZTA Maturity Model defines four stages — Traditional, Advanced, Optimal, and Adaptive — each mapped to measurable security outcomes and technology investments. Stage 1 (Traditional) organisations rely on VPN and perimeter firewalls with minimal MFA deployment. By Stage 4 (Adaptive) they have automated policy enforcement driven by continuous risk signals, AI-assisted anomaly detection, and full workload-to-workload mTLS across hybrid environments.</p>
<p>Our assessment data shows the median enterprise reaches Stage 2 within 18 months of programme launch, and Stage 3 within 36 months when executive sponsorship and dedicated implementation budget are in place.</p>

<h2>Implementation Roadmap</h2>
<p>A phased roadmap reduces risk and delivers early wins. Phase 1 (0–6 months) focuses on identity consolidation: deploying a unified IdP, enforcing phishing-resistant MFA across all privileged accounts, and completing a device inventory. Phase 2 (6–18 months) introduces network micro-segmentation for crown-jewel workloads and extends conditional access policies to all SaaS applications. Phase 3 (18–36 months) achieves full application-layer Zero Trust using a Software-Defined Perimeter (SDP) or SSE platform and automates policy lifecycle management.</p>

<h2>Key Findings</h2>
<p>Across our client engagements, four findings stand out. First, identity remains the most exploited attack vector: 81 % of breaches in our dataset involved compromised credentials. Strengthening identity controls delivers the highest ROI in the shortest timeframe. Second, micro-segmentation projects consistently underestimate application dependency mapping effort — budget 30–40 % of project time for discovery before any policy change. Third, user experience friction during rollout is the leading cause of programme stall; invest in self-service tooling and clear communication early. Fourth, ZTA is not a product — success requires a programme office with clear ownership, KPIs, and executive reporting cadence.</p>

<h2>Recommendations</h2>
<p>Based on our analysis we recommend the following actions for security leaders:</p>
<ol>
<li>Appoint a Zero Trust Programme Owner with cross-functional authority spanning IT, Security, and Business stakeholders.</li>
<li>Begin with a 90-day identity sprint: consolidate directories, enforce MFA, and deploy Privileged Access Workstations (PAWs) for admin accounts.</li>
<li>Select a pilot workload for micro-segmentation based on risk and visibility — avoid starting with the most complex legacy application.</li>
<li>Establish a Zero Trust dashboard with four core metrics: MFA coverage, device compliance rate, lateral movement detections, and privileged session recording coverage.</li>
<li>Reassess architecture annually — the threat landscape and cloud-native tooling evolve rapidly.</li>
</ol>`,
  },
  {
    title: "SOC Maturity Benchmark Report 2026",
    slug: "soc-maturity-benchmark-report-2026",
    shortDescription: "Industry benchmark data on SOC capabilities, staffing, tooling, and detection performance across 200+ organisations",
    description: "Based on assessments of more than 200 Security Operations Centres conducted by IT Origin throughout 2025, this benchmark report quantifies where organisations stand across five SOC capability dimensions and provides peer-group comparisons by industry, organisation size, and geography. Security leaders can use these findings to prioritise improvement investments and set realistic performance targets.",
    type: "whitepaper" as const,
    category: "Security Operations",
    status: "published" as const,
    pages: 34,
    readTime: "40 min read",
    topics: ["SOC", "Benchmarking", "SIEM", "SOAR", "Detection Engineering", "Mean Time to Detect"],
    featured: false,
    publishDate: new Date("2026-03-01"),
    fileUrl: "https://itorigin.com/whitepapers/soc-maturity-benchmark-report-2026.pdf",
    content: `<h2>Executive Summary</h2>
<p>Security Operations Centres are under sustained pressure: alert volumes grew 38 % year-over-year in 2025 while the global analyst shortage deepened. Despite heavy investment in SIEM and SOAR platforms, only 22 % of surveyed SOCs meet the industry target of a sub-one-hour mean time to detect (MTTD) for high-severity incidents. This benchmark report — drawn from IT Origin's formal SOC maturity assessments of 214 organisations across 18 industries — provides actionable context for security leaders seeking to measure and improve SOC performance.</p>
<p>The median SOC in our dataset operates at Maturity Level 2 on the IT Origin five-level scale, characterised by reactive detection, manual triage, and inconsistent use of threat intelligence. Level 4 and 5 SOCs — representing 11 % of our sample — share three distinguishing characteristics: detection engineering as a dedicated discipline, automated playbook coverage above 60 %, and continuous tuning programmes driven by purple-team exercises.</p>

<h2>Methodology</h2>
<p>Assessments were conducted between January and December 2025 using IT Origin's SOC Capability Framework, which evaluates 47 control points across five dimensions: People & Skills, Process Maturity, Technology Stack, Threat Intelligence Integration, and Governance & Metrics. Each control point is scored 0–4 and weighted by operational impact to produce a composite Maturity Level (ML 1–5). Organisations were recruited through IT Origin's managed security service client base and open enrolment, with participation skewed toward enterprises with 1,000–50,000 employees.</p>

<h2>Key Findings</h2>
<p><strong>Detection performance gaps remain wide.</strong> The median MTTD for high-severity incidents is 4.2 hours — four times the industry target. The gap between median and top-quartile performers is stark: top-quartile SOCs achieve MTTD of 41 minutes, enabled by pre-built detection content libraries and automated alert enrichment.</p>
<p><strong>Analyst burnout is systemic.</strong> 68 % of SOC managers report analyst attrition above 20 % annually. Organisations that have deployed SOAR-driven Tier 1 automation report 31 % lower attrition, suggesting that reducing repetitive triage work directly improves retention.</p>
<p><strong>Threat intelligence is under-operationalised.</strong> 74 % of surveyed SOCs subscribe to at least one threat intelligence feed, but only 29 % have automated indicator ingestion into their SIEM detection rules. The rest consume intelligence through manual analyst review — creating latency and coverage gaps.</p>
<p><strong>Cloud visibility is the fastest-growing blind spot.</strong> Cloud-sourced telemetry represents 54 % of the average enterprise's event volume in 2025, but cloud-native detections account for only 18 % of the average SOC's rule library. This imbalance is the single largest contributor to detection coverage gaps identified in our assessments.</p>

<h2>Maturity Level Distribution by Industry</h2>
<p>Financial services and regulated healthcare lead the benchmark, with 28 % of organisations at ML 3 or above — driven by regulatory pressure (PCI-DSS, HIPAA) and Board-level security accountability. Retail, manufacturing, and logistics lag significantly: fewer than 8 % reach ML 3, and 41 % remain at ML 1 with largely ad-hoc detection and response capabilities.</p>
<p>Organisation size correlates positively with maturity up to approximately 10,000 employees, beyond which the relationship weakens — very large enterprises often struggle with coordination overhead, legacy SIEM debt, and distributed ownership of security tooling across business units.</p>

<h2>Recommendations</h2>
<p>Based on benchmark findings, IT Origin recommends three priority actions for most SOCs:</p>
<ol>
<li><strong>Invest in detection engineering.</strong> Treat detection content as a software engineering discipline with version control, testing pipelines, and regular purple-team validation. SOCs that do this consistently outperform peers on MTTD by a factor of 3–5x.</li>
<li><strong>Automate Tier 1 triage before expanding headcount.</strong> SOAR-driven automation for common alert types (phishing, endpoint AV, identity anomalies) can handle 40–60 % of Tier 1 volume, freeing analysts for higher-value investigation and improving retention.</li>
<li><strong>Close the cloud visibility gap.</strong> Audit your detection rule library against cloud service telemetry sources. Prioritise coverage for identity (Entra ID / Okta), cloud storage exfiltration, and compute abuse scenarios — the three most frequently exploited cloud attack paths in 2025.</li>
</ol>`,
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
      ...("fileUrl" in resource && resource.fileUrl ? { fileUrl: resource.fileUrl } : {}),
      ...("content" in resource && resource.content ? { content: resource.content } : {}),
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
