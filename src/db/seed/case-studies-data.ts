import { db } from "@/db";
import { caseStudies } from "@/db/schema";
import { eq } from "drizzle-orm";

const CASE_STUDIES_DATA = [
  {
    title: "24/7 SOC Implementation for Global Financial Services Firm",
    slug: "global-fintech-soc-implementation",
    client: "Fortune 500 Financial Services Company",
    industry: "Financial Services",
    challenge: "The client faced increasing cyber threats targeting their trading platforms and customer data. Their internal team was overwhelmed with alerts, resulting in slow detection and response times. They needed round-the-clock monitoring but lacked the resources to build an in-house 24/7 SOC.",
    solution: "IT Origin deployed a comprehensive Managed SOC solution with dedicated security analysts, advanced SIEM integration, and custom threat detection rules tailored to financial sector threats. We implemented automated response playbooks for common attack patterns and established direct communication channels with their internal IT team.",
    results: [
      "Reduced mean time to detect (MTTD) from 48 hours to under 15 minutes",
      "Achieved 99.9% uptime for security monitoring coverage",
      "Prevented 3 potential data breaches within the first quarter",
      "Reduced security alert fatigue by 80% through intelligent alert prioritization",
      "Achieved SOC 2 Type II compliance within 6 months",
    ],
    metrics: [
      { label: "Detection Time", value: "<15 min" },
      { label: "Coverage", value: "24/7/365" },
      { label: "Alert Reduction", value: "80%" },
    ],
    services: ["Managed SOC Services", "SIEM Management", "Threat Intelligence", "Incident Response"],
    featured: true,
    status: "published" as const,
    order: 1,
  },
  {
    title: "Healthcare Data Protection and HIPAA Compliance Program",
    slug: "healthcare-hipaa-compliance-program",
    client: "Regional Healthcare Network",
    industry: "Healthcare",
    challenge: "A network of 12 hospitals and 50+ clinics faced challenges maintaining HIPAA compliance across disparate systems. Previous audits revealed gaps in access controls, encryption, and incident response procedures. They needed a unified security program to protect patient data.",
    solution: "We conducted a comprehensive security assessment, implemented a centralized identity and access management system, deployed end-to-end encryption for PHI, and established an organization-wide incident response program. Our team provided ongoing vCISO services to maintain compliance.",
    results: [
      "Achieved full HIPAA compliance across all facilities",
      "Implemented role-based access control for 15,000+ users",
      "Reduced unauthorized access incidents by 95%",
      "Passed external HIPAA audit with zero critical findings",
      "Established breach notification procedures meeting 24-hour requirements",
    ],
    metrics: [
      { label: "Compliance Rate", value: "100%" },
      { label: "Users Protected", value: "15,000+" },
      { label: "Incident Reduction", value: "95%" },
    ],
    services: ["Compliance Management", "vCISO Services", "Security Assessment", "Identity Management"],
    featured: true,
    status: "published" as const,
    order: 2,
  },
  {
    title: "Ransomware Recovery and Security Transformation",
    slug: "ransomware-recovery-manufacturing",
    client: "Global Manufacturing Corporation",
    industry: "Manufacturing",
    challenge: "The client suffered a devastating ransomware attack that encrypted critical production systems, causing $2M in daily losses. They needed immediate incident response to restore operations and a complete security overhaul to prevent future attacks.",
    solution: "Our incident response team mobilized within 2 hours, isolated affected systems, and began recovery from secure backups. Post-recovery, we implemented zero-trust architecture, advanced endpoint protection, network segmentation, and comprehensive security awareness training for all employees.",
    results: [
      "Restored critical production systems within 72 hours",
      "Avoided $6M+ in potential ransom payment",
      "Implemented network segmentation across 8 manufacturing facilities",
      "Deployed EDR solution protecting 5,000+ endpoints",
      "Reduced attack surface by 70% through zero-trust implementation",
    ],
    metrics: [
      { label: "Recovery Time", value: "72 hrs" },
      { label: "Ransom Avoided", value: "$6M+" },
      { label: "Attack Surface", value: "-70%" },
    ],
    services: ["Incident Response", "Digital Forensics", "Network Security", "Endpoint Protection"],
    featured: true,
    status: "published" as const,
    order: 3,
  },
  {
    title: "Cloud Security Transformation for SaaS Platform",
    slug: "saas-cloud-security-transformation",
    client: "Enterprise SaaS Provider",
    industry: "Technology",
    challenge: "A rapidly growing SaaS company with 500+ enterprise clients needed to achieve SOC 2 Type II certification while maintaining development velocity. Their AWS infrastructure lacked proper security controls, and they had no formal security program.",
    solution: "IT Origin implemented a DevSecOps program integrating security into their CI/CD pipeline, deployed cloud-native security tools, established security governance frameworks, and provided hands-on support throughout the SOC 2 audit process.",
    results: [
      "Achieved SOC 2 Type II certification in 9 months",
      "Reduced cloud misconfigurations by 85%",
      "Automated security scanning in 100% of deployments",
      "Maintained zero security-related downtime",
      "Enabled sales to 50+ new enterprise clients requiring SOC 2",
    ],
    metrics: [
      { label: "Time to SOC 2", value: "9 months" },
      { label: "Misconfigs Reduced", value: "85%" },
      { label: "New Clients Enabled", value: "50+" },
    ],
    services: ["Cloud Security", "DevSecOps", "Compliance Management", "Security Architecture"],
    featured: false,
    status: "published" as const,
    order: 4,
  },
  {
    title: "Penetration Testing Program for E-Commerce Giant",
    slug: "ecommerce-penetration-testing-program",
    client: "Major E-Commerce Retailer",
    industry: "Retail",
    challenge: "Processing $500M+ in annual transactions, the client needed comprehensive security testing to protect customer payment data and meet PCI DSS requirements. Previous point-in-time assessments weren't catching vulnerabilities introduced by rapid development.",
    solution: "We established a continuous penetration testing program with monthly web application tests, quarterly network assessments, and annual red team exercises. Findings were integrated directly into their development workflow with prioritized remediation guidance.",
    results: [
      "Identified and remediated 47 critical vulnerabilities in year one",
      "Achieved continuous PCI DSS compliance",
      "Reduced time from vulnerability discovery to fix by 60%",
      "Prevented potential card data breach affecting 2M+ customers",
      "Implemented secure coding training reducing new vulnerabilities by 40%",
    ],
    metrics: [
      { label: "Critical Vulns Fixed", value: "47" },
      { label: "Fix Time Reduced", value: "60%" },
      { label: "New Vulns Reduced", value: "40%" },
    ],
    services: ["Penetration Testing", "Web Application Security", "PCI Compliance", "Security Training"],
    featured: false,
    status: "published" as const,
    order: 5,
  },
  {
    title: "Government Agency Zero Trust Implementation",
    slug: "government-zero-trust-implementation",
    client: "Federal Government Agency",
    industry: "Government",
    challenge: "Mandated to implement zero trust architecture per executive order, the agency struggled with legacy systems, siloed security tools, and complex compliance requirements. They needed a phased approach that wouldn't disrupt critical operations.",
    solution: "IT Origin designed a multi-year zero trust roadmap starting with identity-centric security, then progressing to micro-segmentation and continuous verification. We integrated with existing FedRAMP-authorized tools and ensured FISMA compliance throughout.",
    results: [
      "Successfully implemented zero trust for 8,000+ federal employees",
      "Reduced lateral movement risk by 90%",
      "Achieved FISMA High authorization",
      "Eliminated VPN dependency for 70% of workforce",
      "Reduced account compromise incidents by 75%",
    ],
    metrics: [
      { label: "Users Covered", value: "8,000+" },
      { label: "Lateral Movement Risk", value: "-90%" },
      { label: "Compromises Reduced", value: "75%" },
    ],
    services: ["Zero Trust Architecture", "Identity Security", "Network Segmentation", "Compliance"],
    featured: false,
    status: "published" as const,
    order: 6,
  },
  {
    title: "Energy Sector OT/IT Security Convergence",
    slug: "energy-ot-it-security-convergence",
    client: "Regional Energy Utility",
    industry: "Energy",
    challenge: "The utility's operational technology (OT) networks controlling power distribution were increasingly connected to IT systems, creating new attack vectors. They needed visibility and protection for both environments without impacting critical infrastructure operations.",
    solution: "We deployed passive network monitoring for OT environments, implemented secure IT/OT network boundaries, established asset inventory for 10,000+ industrial devices, and created incident response procedures specific to operational technology scenarios.",
    results: [
      "Achieved complete visibility into OT network traffic",
      "Implemented secure remote access for 200+ field technicians",
      "Detected and blocked 15 attempted intrusions into OT networks",
      "Met NERC CIP compliance requirements",
      "Reduced OT security incidents by 80%",
    ],
    metrics: [
      { label: "OT Visibility", value: "100%" },
      { label: "Intrusions Blocked", value: "15" },
      { label: "Incidents Reduced", value: "80%" },
    ],
    services: ["OT Security", "Network Monitoring", "NERC CIP Compliance", "Industrial Security"],
    featured: false,
    status: "published" as const,
    order: 7,
  },
  {
    title: "University Cybersecurity Program Development",
    slug: "university-cybersecurity-program",
    client: "State University System",
    industry: "Education",
    challenge: "A university system with 50,000 students and staff faced unique challenges: open network policies for academic freedom, limited security budget, and diverse user population including international researchers. Recent phishing attacks compromised faculty accounts.",
    solution: "IT Origin developed a layered security program balancing security with academic needs. We implemented risk-based authentication, security awareness training tailored to academia, and established a student security ambassador program to extend security culture.",
    results: [
      "Reduced successful phishing attacks by 90%",
      "Implemented MFA for 50,000+ users with 95% adoption",
      "Protected $50M+ in research grant data",
      "Trained 500 student security ambassadors",
      "Achieved FERPA and research compliance requirements",
    ],
    metrics: [
      { label: "Phishing Reduction", value: "90%" },
      { label: "MFA Adoption", value: "95%" },
      { label: "Research Protected", value: "$50M+" },
    ],
    services: ["Security Program Development", "Security Awareness", "Identity Management", "Compliance"],
    featured: false,
    status: "published" as const,
    order: 8,
  },
  {
    title: "Law Firm Data Protection and Client Confidentiality Program",
    slug: "law-firm-data-protection-program",
    client: "International Law Firm",
    industry: "Legal",
    challenge: "An Am Law 100 firm handling sensitive M&A and litigation data needed to protect attorney-client privileged information from sophisticated threat actors. They required security measures that wouldn't impede the fast-paced work of 1,000+ attorneys.",
    solution: "We implemented data loss prevention across all channels, deployed advanced email security with impersonation protection, established secure client collaboration portals, and created matter-specific security controls for high-value cases.",
    results: [
      "Protected 5+ petabytes of privileged client data",
      "Blocked 99.9% of targeted phishing attempts",
      "Implemented secure client portals for 500+ matters",
      "Achieved cyber insurance premium reduction of 30%",
      "Met security requirements for Fortune 500 clients",
    ],
    metrics: [
      { label: "Data Protected", value: "5+ PB" },
      { label: "Phishing Blocked", value: "99.9%" },
      { label: "Insurance Savings", value: "30%" },
    ],
    services: ["Data Loss Prevention", "Email Security", "Secure Collaboration", "Risk Assessment"],
    featured: false,
    status: "published" as const,
    order: 9,
  },
  {
    title: "Telecommunications Provider Threat Intelligence Program",
    slug: "telecom-threat-intelligence-program",
    client: "Major Telecommunications Company",
    industry: "Telecommunications",
    challenge: "As critical infrastructure, the telecom provider faced nation-state level threats targeting their network infrastructure and customer data. They needed proactive threat intelligence to stay ahead of sophisticated adversaries.",
    solution: "IT Origin established a threat intelligence program integrating multiple intelligence feeds, implemented threat hunting capabilities, developed custom indicators of compromise for telecom-specific threats, and created executive threat briefings for leadership.",
    results: [
      "Identified 3 APT groups specifically targeting their infrastructure",
      "Proactively blocked attacks based on threat intelligence 200+ times",
      "Reduced incident response time by 50% through enriched alerts",
      "Shared intelligence benefiting the telecom sector via ISACs",
      "Prevented potential service outage affecting 5M+ customers",
    ],
    metrics: [
      { label: "APT Groups Identified", value: "3" },
      { label: "Proactive Blocks", value: "200+" },
      { label: "IR Time Reduced", value: "50%" },
    ],
    services: ["Threat Intelligence", "Threat Hunting", "SOC Services", "Executive Briefings"],
    featured: false,
    status: "published" as const,
    order: 10,
  },
  {
    title: "Insurance Company Cyber Risk Quantification",
    slug: "insurance-cyber-risk-quantification",
    client: "National Insurance Provider",
    industry: "Insurance",
    challenge: "The insurer needed to quantify their own cyber risk exposure for board reporting while also improving underwriting of cyber insurance policies. Traditional qualitative assessments weren't providing the data-driven insights leadership required.",
    solution: "We implemented the FAIR (Factor Analysis of Information Risk) framework, conducted detailed scenario analysis for top risk scenarios, developed custom risk models integrating their data, and created board-ready risk reports with financial impact projections.",
    results: [
      "Quantified cyber risk exposure at $150M potential annual loss",
      "Justified $5M security investment with 3x ROI projection",
      "Improved cyber insurance underwriting accuracy by 40%",
      "Reduced risk exposure by 35% through targeted controls",
      "Achieved board-level cyber risk visibility",
    ],
    metrics: [
      { label: "Risk Quantified", value: "$150M" },
      { label: "ROI Demonstrated", value: "3x" },
      { label: "Risk Reduced", value: "35%" },
    ],
    services: ["Risk Quantification", "FAIR Analysis", "Board Reporting", "Strategic Advisory"],
    featured: false,
    status: "published" as const,
    order: 11,
  },
  {
    title: "Non-Profit Organization Security Transformation",
    slug: "nonprofit-security-transformation",
    client: "International Humanitarian Organization",
    industry: "Non-Profit",
    challenge: "Operating in 40+ countries including conflict zones, the non-profit faced unique threats including state-sponsored surveillance targeting their beneficiary data. With limited budget, they needed enterprise-grade security on a non-profit budget.",
    solution: "IT Origin provided pro-bono and reduced-cost services, implementing cloud-based security controls, secure communications for field workers, and donor data protection. We trained local staff to maintain security practices independently.",
    results: [
      "Protected sensitive data for 2M+ beneficiaries",
      "Implemented secure communications in 40+ countries",
      "Achieved 80% security improvement with 50% less cost",
      "Trained 200+ field workers on digital security",
      "Met GDPR and donor trust requirements",
    ],
    metrics: [
      { label: "Beneficiaries Protected", value: "2M+" },
      { label: "Countries Covered", value: "40+" },
      { label: "Cost Savings", value: "50%" },
    ],
    services: ["Security Assessment", "Cloud Security", "Training", "Compliance"],
    featured: false,
    status: "published" as const,
    order: 12,
  },
];

async function seedCaseStudiesData() {
  console.log("Starting case studies data seeding...\n");

  console.log("Creating case studies...");
  for (const study of CASE_STUDIES_DATA) {
    const existing = await db.query.caseStudies.findFirst({
      where: eq(caseStudies.slug, study.slug),
    });

    if (existing) {
      console.log(`  - Case study "${study.title}" already exists`);
      continue;
    }

    await db.insert(caseStudies).values({
      title: study.title,
      slug: study.slug,
      client: study.client,
      industry: study.industry,
      challenge: study.challenge,
      solution: study.solution,
      results: study.results,
      metrics: study.metrics,
      services: study.services,
      featured: study.featured,
      status: study.status,
      order: study.order,
      publishedAt: new Date(),
    });

    console.log(`  + Created case study: ${study.title}`);
  }

  console.log("\nCase studies data seeding completed!");
}

seedCaseStudiesData()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
