export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  format: "Online" | "In-Person" | "Hybrid";
  price: string;
  topics: string[];
  certification?: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  duration: string;
  prerequisites: string[];
  icon: string;
}

export const trainingInfo = {
  title: "IT Origin Training Academy",
  subtitle: "Build Your Cybersecurity Expertise",
  description:
    "Comprehensive training programs designed to develop cybersecurity skills at all levels. From foundational courses to advanced certifications, we help you build the expertise needed to protect organizations.",
  highlights: [
    "Industry-recognized certifications",
    "Hands-on lab environments",
    "Expert instructors",
    "Flexible learning options",
    "Career advancement support",
  ],
};

export const trainingStats = [
  { id: 1, value: "5,000+", label: "Professionals Trained" },
  { id: 2, value: "50+", label: "Training Courses" },
  { id: 3, value: "95%", label: "Certification Pass Rate" },
  { id: 4, value: "4.8/5", label: "Student Rating" },
];

export const courses: Course[] = [
  {
    id: "soc-analyst",
    title: "SOC Analyst Fundamentals",
    description: "Learn the fundamentals of security operations center operations, including threat detection, incident handling, and SIEM management.",
    duration: "5 days",
    level: "Beginner",
    format: "Hybrid",
    price: "Contact for pricing",
    topics: [
      "SOC fundamentals and operations",
      "SIEM tools and log analysis",
      "Threat detection techniques",
      "Incident triage and response",
      "Security event correlation",
      "Reporting and documentation",
    ],
    certification: "IT Origin Certified SOC Analyst",
    icon: "Monitor",
  },
  {
    id: "threat-hunting",
    title: "Advanced Threat Hunting",
    description: "Master proactive threat hunting techniques to identify sophisticated attacks before they cause damage.",
    duration: "4 days",
    level: "Advanced",
    format: "Hybrid",
    price: "Contact for pricing",
    topics: [
      "Threat hunting methodologies",
      "Behavioral analysis",
      "Hypothesis-driven hunting",
      "Hunting with MITRE ATT&CK",
      "Advanced persistence detection",
      "Creating hunting playbooks",
    ],
    certification: "IT Origin Certified Threat Hunter",
    icon: "Search",
  },
  {
    id: "penetration-testing",
    title: "Penetration Testing Professional",
    description: "Comprehensive training on penetration testing methodologies, tools, and techniques for identifying vulnerabilities.",
    duration: "10 days",
    level: "Intermediate",
    format: "Hybrid",
    price: "Contact for pricing",
    topics: [
      "Penetration testing methodology",
      "Reconnaissance techniques",
      "Vulnerability assessment",
      "Exploitation techniques",
      "Web application testing",
      "Network penetration testing",
      "Post-exploitation",
      "Report writing",
    ],
    certification: "IT Origin Certified Penetration Tester",
    icon: "Target",
  },
  {
    id: "incident-response",
    title: "Incident Response & Forensics",
    description: "Learn to effectively respond to security incidents and conduct digital forensics investigations.",
    duration: "5 days",
    level: "Intermediate",
    format: "Hybrid",
    price: "Contact for pricing",
    topics: [
      "Incident response framework",
      "Digital forensics fundamentals",
      "Memory and disk forensics",
      "Network forensics",
      "Malware analysis basics",
      "Evidence handling",
      "Incident documentation",
    ],
    certification: "IT Origin Certified Incident Responder",
    icon: "AlertTriangle",
  },
  {
    id: "cloud-security",
    title: "Cloud Security Fundamentals",
    description: "Understanding security in cloud environments including AWS, Azure, and GCP.",
    duration: "3 days",
    level: "Intermediate",
    format: "Online",
    price: "Contact for pricing",
    topics: [
      "Cloud security architecture",
      "AWS security services",
      "Azure security center",
      "GCP security features",
      "Container security",
      "Cloud compliance",
    ],
    certification: "IT Origin Cloud Security Associate",
    icon: "Cloud",
  },
  {
    id: "grc-fundamentals",
    title: "GRC Fundamentals",
    description: "Introduction to governance, risk management, and compliance in cybersecurity.",
    duration: "3 days",
    level: "Beginner",
    format: "Online",
    price: "Contact for pricing",
    topics: [
      "GRC framework overview",
      "Risk assessment methodologies",
      "Compliance frameworks (ISO 27001, SOC2)",
      "Policy development",
      "Audit preparation",
      "Third-party risk management",
    ],
    certification: "IT Origin GRC Associate",
    icon: "FileCheck",
  },
  {
    id: "red-team-ops",
    title: "Red Team Operations",
    description: "Advanced adversary simulation techniques for testing organizational defenses.",
    duration: "5 days",
    level: "Expert",
    format: "In-Person",
    price: "Contact for pricing",
    topics: [
      "Red team methodology",
      "Advanced reconnaissance",
      "Social engineering",
      "Physical security testing",
      "Command and control",
      "Defense evasion",
      "Operation planning",
    ],
    certification: "IT Origin Certified Red Team Operator",
    icon: "Swords",
  },
  {
    id: "security-awareness",
    title: "Security Awareness Training",
    description: "Build a security-conscious culture with comprehensive awareness training for employees.",
    duration: "1 day",
    level: "Beginner",
    format: "Online",
    price: "Contact for pricing",
    topics: [
      "Phishing awareness",
      "Password security",
      "Social engineering defense",
      "Data protection",
      "Mobile security",
      "Incident reporting",
    ],
    icon: "Users",
  },
];

export const trainingCertifications: Certification[] = [
  {
    id: "csa",
    name: "IT Origin Certified SOC Analyst (CSA)",
    description: "Validates skills in security operations center operations and threat detection.",
    duration: "Valid for 3 years",
    prerequisites: ["SOC Analyst Fundamentals course", "1 year SOC experience recommended"],
    icon: "Award",
  },
  {
    id: "cth",
    name: "IT Origin Certified Threat Hunter (CTH)",
    description: "Demonstrates expertise in proactive threat hunting methodologies.",
    duration: "Valid for 3 years",
    prerequisites: ["CSA certification", "Advanced Threat Hunting course"],
    icon: "Search",
  },
  {
    id: "cpt",
    name: "IT Origin Certified Penetration Tester (CPT)",
    description: "Validates comprehensive penetration testing skills across platforms.",
    duration: "Valid for 3 years",
    prerequisites: ["Penetration Testing Professional course"],
    icon: "Target",
  },
  {
    id: "cir",
    name: "IT Origin Certified Incident Responder (CIR)",
    description: "Demonstrates skills in incident response and digital forensics.",
    duration: "Valid for 3 years",
    prerequisites: ["Incident Response & Forensics course"],
    icon: "AlertTriangle",
  },
];

export const trainingFormats = [
  {
    id: "online",
    name: "Online Training",
    description: "Self-paced learning with instructor support",
    features: ["Flexible schedule", "Access from anywhere", "Interactive labs", "Discussion forums"],
    icon: "Laptop",
  },
  {
    id: "in-person",
    name: "In-Person Training",
    description: "Classroom training at our facility or your location",
    features: ["Face-to-face instruction", "Hands-on labs", "Networking opportunities", "Immediate feedback"],
    icon: "Users",
  },
  {
    id: "hybrid",
    name: "Hybrid Training",
    description: "Combination of online and in-person sessions",
    features: ["Best of both worlds", "Flexible attendance", "In-person labs", "Online resources"],
    icon: "Monitor",
  },
  {
    id: "corporate",
    name: "Corporate Training",
    description: "Customized training for your organization",
    features: ["Tailored curriculum", "On-site delivery", "Bulk discounts", "Progress tracking"],
    icon: "Building",
  },
];

export const upcomingBatches = [
  {
    id: 1,
    course: "SOC Analyst Fundamentals",
    startDate: "2025-02-01",
    format: "Hybrid",
    seatsAvailable: 15,
  },
  {
    id: 2,
    course: "Penetration Testing Professional",
    startDate: "2025-02-15",
    format: "Hybrid",
    seatsAvailable: 12,
  },
  {
    id: 3,
    course: "Advanced Threat Hunting",
    startDate: "2025-03-01",
    format: "Online",
    seatsAvailable: 20,
  },
];
