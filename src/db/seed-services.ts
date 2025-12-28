import { db } from "./index";
import { services } from "./schema";
import { nanoid } from "nanoid";

const initialServices = [
  {
    id: nanoid(),
    slug: "managed-soc-services",
    title: "Managed SOC Services",
    shortDescription: "24/7 security operations center with advanced threat detection and incident response capabilities",
    description: `Our Managed SOC Services provide round-the-clock security monitoring and incident response. We combine advanced threat detection technologies with expert security analysts to protect your organization from cyber threats.

Key capabilities include:
- 24/7/365 security monitoring
- Real-time threat detection and analysis
- Incident response and remediation
- Security event correlation
- Threat intelligence integration
- Compliance reporting`,
    iconName: "Shield",
    coverImage: null,
    features: [
      "24/7 Security Monitoring",
      "Advanced Threat Detection",
      "Incident Response",
      "Threat Intelligence",
      "Security Analytics",
      "Compliance Support",
    ],
    benefits: [
      "Reduce security risks",
      "Lower operational costs",
      "Expert security team",
      "Faster incident response",
      "Improved compliance",
    ],
    primaryColor: "#3b82f6",
    secondaryColor: "#1d4ed8",
    bgPattern: "grid",
    active: true,
    displayOrder: 1,
  },
  {
    id: nanoid(),
    slug: "offensive-security",
    title: "Offensive Security",
    shortDescription: "Penetration testing, red team operations, and vulnerability assessments to strengthen your defenses",
    description: `Our Offensive Security services help identify vulnerabilities before attackers do. Our expert team conducts thorough assessments using the latest techniques and tools to test your security posture.

Services include:
- Penetration Testing (Network, Web, Mobile, API)
- Red Team Operations
- Vulnerability Assessments
- Social Engineering Testing
- Physical Security Testing
- Security Architecture Review`,
    iconName: "Target",
    coverImage: null,
    features: [
      "Penetration Testing",
      "Red Team Operations",
      "Vulnerability Assessment",
      "Social Engineering",
      "Physical Security Testing",
      "Application Security",
    ],
    benefits: [
      "Identify vulnerabilities early",
      "Test real-world attack scenarios",
      "Improve security posture",
      "Meet compliance requirements",
      "Detailed remediation guidance",
    ],
    primaryColor: "#ef4444",
    secondaryColor: "#dc2626",
    bgPattern: "dots",
    active: true,
    displayOrder: 2,
  },
  {
    id: nanoid(),
    slug: "grc-services",
    title: "GRC Services",
    shortDescription: "Governance, risk management, and compliance solutions aligned with industry standards",
    description: `Our GRC Services help organizations establish robust governance frameworks, manage risks effectively, and achieve compliance with industry standards and regulations.

We provide expertise in:
- ISO 27001 Implementation
- SOC 2 Compliance
- GDPR Compliance
- PCI DSS Compliance
- Risk Assessment & Management
- Policy Development
- Security Awareness Training`,
    iconName: "FileCheck",
    coverImage: null,
    features: [
      "ISO 27001 Implementation",
      "SOC 2 Compliance",
      "GDPR Compliance",
      "Risk Assessment",
      "Policy Development",
      "Security Training",
    ],
    benefits: [
      "Achieve compliance certifications",
      "Reduce regulatory risks",
      "Improve governance",
      "Streamline audit processes",
      "Build customer trust",
    ],
    primaryColor: "#22c55e",
    secondaryColor: "#16a34a",
    bgPattern: "lines",
    active: true,
    displayOrder: 3,
  },
];

async function seedServices() {
  console.log("Seeding services...");

  try {
    // Check if services already exist
    const existingServices = await db.query.services.findMany();

    if (existingServices.length > 0) {
      console.log(`Found ${existingServices.length} existing services. Skipping seed.`);
      console.log("To re-seed, delete existing services first.");
      return;
    }

    // Insert services
    for (const service of initialServices) {
      await db.insert(services).values(service);
      console.log(`Created service: ${service.title}`);
    }

    console.log("\nServices seeded successfully!");
  } catch (error) {
    console.error("Failed to seed services:", error);
    throw error;
  }
}

// Run if executed directly
seedServices()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
