export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
  certifications?: string[];
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}

export const companyInfo = {
  name: "ITOrigin",
  tagline: "Cybersecurity Excellence and Innovation",
  founded: 2018,
  headquarters: "Kolkata, India",
  mission:
    "To protect organizations worldwide from cyber threats through innovative security solutions and expert guidance.",
  vision:
    "To be the most trusted cybersecurity partner for organizations across the globe, enabling them to operate securely in the digital age.",
  description:
    "ITOrigin is a CERT-IN empanelled cybersecurity company providing comprehensive security services including SOC as a Service, Penetration Testing, and GRC consulting. We combine cutting-edge technology with expert knowledge to protect organizations from evolving cyber threats.",
};

export const companyStats = [
  { id: 1, value: "300+", label: "Clients Served", icon: "Users" },
  { id: 2, value: "50+", label: "Security Experts", icon: "UserCheck" },
  { id: 3, value: "7+", label: "Years Experience", icon: "Calendar" },
  { id: 4, value: "24/7", label: "SOC Operations", icon: "Clock" },
  { id: 5, value: "99.9%", label: "Uptime SLA", icon: "TrendingUp" },
  { id: 6, value: "15min", label: "Avg Response Time", icon: "Zap" },
];

export const companyValues: CompanyValue[] = [
  {
    id: "integrity",
    title: "Integrity",
    description:
      "We uphold the highest ethical standards in all our interactions, ensuring trust and transparency with our clients.",
    icon: "Shield",
  },
  {
    id: "excellence",
    title: "Excellence",
    description:
      "We strive for excellence in every engagement, continuously improving our skills and methodologies.",
    icon: "Award",
  },
  {
    id: "innovation",
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and innovative approaches to stay ahead of evolving threats.",
    icon: "Lightbulb",
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description:
      "We work as partners with our clients, fostering open communication and shared success.",
    icon: "Users",
  },
  {
    id: "accountability",
    title: "Accountability",
    description:
      "We take responsibility for our actions and commitments, delivering on our promises.",
    icon: "CheckCircle",
  },
  {
    id: "continuous-learning",
    title: "Continuous Learning",
    description:
      "We invest in ongoing education and training to maintain expertise in the ever-changing security landscape.",
    icon: "BookOpen",
  },
];

export const milestones: Milestone[] = [
  {
    year: 2018,
    title: "Company Founded",
    description: "ITOrigin established with a mission to provide world-class cybersecurity services.",
  },
  {
    year: 2019,
    title: "CERT-IN Empanelment",
    description: "Achieved CERT-IN empanelment, recognizing our expertise in security operations.",
  },
  {
    year: 2020,
    title: "SOC Launch",
    description: "Launched our 24/7 Security Operations Center with AI-powered threat detection.",
  },
  {
    year: 2021,
    title: "100+ Clients",
    description: "Crossed 100 clients milestone, serving organizations across multiple industries.",
  },
  {
    year: 2022,
    title: "STQC Approval",
    description: "Received STQC approval for penetration testing services.",
  },
  {
    year: 2023,
    title: "300+ Clients",
    description: "Expanded our client base to 300+ organizations globally.",
  },
  {
    year: 2024,
    title: "AI-Powered SOC",
    description: "Introduced Agentic AI-powered SOC platform for advanced threat detection.",
  },
  {
    year: 2025,
    title: "Global Expansion",
    description: "Expanding services to international markets with new partnerships.",
  },
];

export const leadershipTeam: TeamMember[] = [
  {
    id: "md",
    name: "Basudev Gangopadhyay",
    role: "Managing Director",
    bio: "A highly accomplished technology executive with over 35 years of strategic and operational leadership across IT, data center engineering, and cybersecurity. Former Global Head for End-User services at Cognizant, catering to 280,000+ users worldwide.",
    image: "/images/team/basudev-ganguly.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: "director",
    name: "Indranil Banerjee",
    role: "Director",
    bio: "A seasoned cybersecurity business leader with over 27 years of experience across cybersecurity, information security, and enterprise technology. Drives strategic vision, service innovation, and growth across national and global markets.",
    image: "/images/team/indranil-banerjee.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: "svp-na",
    name: "Vishy Narayan",
    role: "Sr. Vice President - North America",
    bio: "Leads ITOrigin's AI Strategy and Cybersecurity Practice across North America. A trusted advisor to C-suite executives specializing in AI and security strategies. Previously built enterprise consulting practices at Cognizant, Infosys, and research networks at NASA.",
    image: "/images/team/vishy-narayan.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
    },
  },
];

export const certificationsList = [
  "CERT-IN Empanelled",
  "STQC Approved for VAPT",
  "ISO 27001:2022 Certified",
  "ISO 9001:2015 Certified",
];

export const industries = [
  { id: 1, name: "Banking & Finance", icon: "Building" },
  { id: 2, name: "Healthcare", icon: "Heart" },
  { id: 3, name: "E-commerce", icon: "ShoppingCart" },
  { id: 4, name: "Manufacturing", icon: "Factory" },
  { id: 5, name: "Government", icon: "Landmark" },
  { id: 6, name: "IT & Technology", icon: "Monitor" },
  { id: 7, name: "Education", icon: "GraduationCap" },
  { id: 8, name: "Telecom", icon: "Radio" },
];
