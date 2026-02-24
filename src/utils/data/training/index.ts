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
  title: "ITOrigin Training Academy",
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
    certification: "ITOrigin Certified SOC Analyst",
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
    certification: "ITOrigin Certified Threat Hunter",
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
    certification: "ITOrigin Certified Penetration Tester",
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
    certification: "ITOrigin Certified Incident Responder",
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
    certification: "ITOrigin Cloud Security Associate",
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
    certification: "ITOrigin GRC Associate",
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
    certification: "ITOrigin Certified Red Team Operator",
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
    name: "ITOrigin Certified SOC Analyst (CSA)",
    description: "Validates skills in security operations center operations and threat detection.",
    duration: "Valid for 3 years",
    prerequisites: ["SOC Analyst Fundamentals course", "1 year SOC experience recommended"],
    icon: "Award",
  },
  {
    id: "cth",
    name: "ITOrigin Certified Threat Hunter (CTH)",
    description: "Demonstrates expertise in proactive threat hunting methodologies.",
    duration: "Valid for 3 years",
    prerequisites: ["CSA certification", "Advanced Threat Hunting course"],
    icon: "Search",
  },
  {
    id: "cpt",
    name: "ITOrigin Certified Penetration Tester (CPT)",
    description: "Validates comprehensive penetration testing skills across platforms.",
    duration: "Valid for 3 years",
    prerequisites: ["Penetration Testing Professional course"],
    icon: "Target",
  },
  {
    id: "cir",
    name: "ITOrigin Certified Incident Responder (CIR)",
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

export const trainingPageHero = {
  badge: { icon: "Award", text: "Training & Certification" },
  title: "Master Cybersecurity",
  highlight: "Advance Your Career",
  description:
    "Transform your cybersecurity skills with expert-led training programs. From ethical hacking to cloud security, our hands-on courses prepare you for industry certifications and real-world challenges.",
};

export const trainingPageCTAs = [
  { text: "Browse Courses", href: "#courses", primary: true },
  { text: "Corporate Training Inquiry", href: "/contact", primary: false },
];

export const trainingPageStats = [
  { label: "Students Trained", value: "5,000+", icon: "Users" },
  { label: "Certification Pass Rate", value: "95%", icon: "Award" },
  { label: "Training Hours Delivered", value: "50,000+", icon: "Clock" },
  { label: "Corporate Clients", value: "150+", icon: "Target" },
];

export const trainingPageSectionHeaders = {
  benefits: {
    title: "Why Choose Our Training Programs",
    description:
      "Industry-leading cybersecurity education designed for real-world success.",
  },
  courses: {
    title: "Our Training Courses",
    description:
      "Comprehensive programs designed to build expertise and earn industry certifications.",
  },
  paths: {
    title: "Structured Learning Paths",
    description:
      "Follow a proven curriculum designed to take you from beginner to expert in your chosen specialty.",
  },
};

export const trainingPageCourses = [
  {
    title: "Offensive Security (OSCP Prep)",
    description:
      "Master penetration testing and ethical hacking with our comprehensive OSCP preparation course.",
    duration: "8 weeks",
    level: "Advanced",
    format: "Live Online + Labs",
    price: "$2,499",
    features: [
      "80+ hours of live instruction",
      "Real-world penetration testing labs",
      "OSCP exam preparation",
      "Buffer overflow exploitation",
      "Active Directory attacks",
      "Web application testing",
      "Custom exploit development",
      "24/7 lab access for 90 days",
    ],
    icon: "Target",
    popular: true,
  },
  {
    title: "Certified Ethical Hacker (CEH)",
    description:
      "Learn the fundamentals of ethical hacking and prepare for the CEH certification exam.",
    duration: "5 weeks",
    level: "Intermediate",
    format: "Live Online",
    price: "$1,799",
    features: [
      "40 hours of live training",
      "EC-Council official curriculum",
      "Hands-on hacking labs",
      "Network scanning & enumeration",
      "System hacking techniques",
      "Social engineering tactics",
      "CEH exam voucher included",
      "Study materials & practice tests",
    ],
    icon: "Shield",
    popular: false,
  },
  {
    title: "Web Application Security",
    description:
      "Deep dive into web application vulnerabilities and secure coding practices.",
    duration: "4 weeks",
    level: "Intermediate",
    format: "Self-Paced + Mentoring",
    price: "$1,299",
    features: [
      "OWASP Top 10 coverage",
      "SQL injection & XSS attacks",
      "Authentication bypass techniques",
      "API security testing",
      "Secure code review",
      "Bug bounty preparation",
      "Real vulnerable applications",
      "Weekly mentor sessions",
    ],
    icon: "Code",
    popular: false,
  },
  {
    title: "Security Operations & Incident Response",
    description:
      "Build expertise in SOC operations, threat hunting, and incident response procedures.",
    duration: "6 weeks",
    level: "Intermediate",
    format: "Live Online",
    price: "$1,899",
    features: [
      "50 hours of instruction",
      "SIEM configuration & tuning",
      "Log analysis & correlation",
      "Threat hunting techniques",
      "Incident response playbooks",
      "Digital forensics basics",
      "Malware analysis introduction",
      "Hands-on IR simulations",
    ],
    icon: "Eye",
    popular: false,
  },
  {
    title: "Cloud Security (AWS/Azure/GCP)",
    description:
      "Secure cloud infrastructure and learn cloud-native security controls.",
    duration: "5 weeks",
    level: "Intermediate",
    format: "Live Online + Labs",
    price: "$1,699",
    features: [
      "Multi-cloud security coverage",
      "IAM & access management",
      "Cloud network security",
      "Container & Kubernetes security",
      "Cloud compliance frameworks",
      "Security automation",
      "Cloud-native tools (GuardDuty, Security Hub)",
      "Real cloud environment labs",
    ],
    icon: "Shield",
    popular: false,
  },
  {
    title: "Security Awareness for Teams",
    description:
      "Empower your employees to be the first line of defense against cyber threats.",
    duration: "Custom",
    level: "Beginner",
    format: "On-Site or Virtual",
    price: "Custom",
    features: [
      "Phishing awareness training",
      "Social engineering defense",
      "Password security best practices",
      "Safe browsing habits",
      "Data protection & privacy",
      "Incident reporting procedures",
      "Interactive simulations",
      "Quarterly refresher sessions",
    ],
    icon: "Users",
    popular: false,
  },
];

export const trainingPagePaths = [
  {
    title: "Penetration Tester Path",
    description:
      "Complete learning path from beginner to advanced penetration testing professional",
    courses: [
      "Web Application Security",
      "Offensive Security (OSCP Prep)",
      "Advanced Red Teaming",
    ],
    duration: "6 months",
    icon: "Target",
  },
  {
    title: "Security Analyst Path",
    description:
      "Build expertise in defensive security operations and threat detection",
    courses: [
      "Security Fundamentals",
      "Security Operations & Incident Response",
      "Threat Intelligence",
    ],
    duration: "4 months",
    icon: "Shield",
  },
  {
    title: "Cloud Security Path",
    description:
      "Master cloud security across major platforms and earn cloud certifications",
    courses: [
      "Cloud Security Fundamentals",
      "Cloud Security (AWS/Azure/GCP)",
      "Cloud Compliance",
    ],
    duration: "5 months",
    icon: "Zap",
  },
];

export const trainingPageBenefits = [
  {
    icon: "Award",
    title: "Industry Certifications",
    description:
      "Prepare for top cybersecurity certifications including OSCP, CEH, CISSP, and more.",
  },
  {
    icon: "Users",
    title: "Expert Instructors",
    description:
      "Learn from certified professionals with real-world experience in offensive and defensive security.",
  },
  {
    icon: "Code",
    title: "Hands-On Labs",
    description:
      "Practice on real vulnerable systems and environments, not just theory and slides.",
  },
  {
    icon: "Clock",
    title: "Flexible Learning",
    description:
      "Live online sessions, self-paced courses, and on-site training options to fit your schedule.",
  },
  {
    icon: "CheckCircle2",
    title: "Career Support",
    description:
      "Resume reviews, interview preparation, and job placement assistance for graduates.",
  },
  {
    icon: "TrendingUp",
    title: "Continuous Updates",
    description:
      "Course content regularly updated to reflect the latest threats, tools, and techniques.",
  },
];

export const trainingPageCorporate = {
  title: "Corporate Training Solutions",
  description:
    "Upskill your team with customized training programs tailored to your organization's needs.",
  programs: [
    {
      icon: "Users",
      title: "Team Training",
      description:
        "Train your security team on the latest tools, techniques, and best practices. Custom curriculum designed for your tech stack and security challenges.",
      features: [
        "Customized course content",
        "On-site or virtual delivery",
        "Hands-on labs with your infrastructure",
        "Post-training assessments",
      ],
    },
    {
      icon: "Shield",
      title: "Security Awareness",
      description:
        "Empower all employees with security awareness training. Reduce human risk with engaging, interactive programs that stick.",
      features: [
        "Phishing simulation campaigns",
        "Interactive training modules",
        "Compliance reporting dashboards",
        "Quarterly refresher training",
      ],
    },
  ],
  ctaText: "Request Corporate Training Quote",
  ctaHref: "/contact",
};

export const trainingPageCTA = {
  title: "Ready to Start Your Training Journey?",
  description:
    "Join thousands of cybersecurity professionals who have advanced their careers with our training programs.",
  buttons: [
    { text: "Enroll Now", href: "/contact" },
    {
      text: "Download Course Catalog",
      href: "/courses-catalog.pdf",
      variant: "secondary" as const,
    },
  ],
};
