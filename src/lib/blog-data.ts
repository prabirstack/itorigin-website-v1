export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const BLOG_CATEGORIES = [
  "All Posts",
  "Threat Intelligence",
  "Penetration Testing",
  "Compliance & GRC",
  "Cloud Security",
  "Security Operations",
  "Incident Response",
  "Security Awareness",
  "Best Practices"
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "advanced-threat-hunting-techniques-2025",
    title: "Advanced Threat Hunting Techniques for 2025",
    excerpt: "Explore cutting-edge threat hunting methodologies and tools that security teams are using to proactively identify sophisticated attacks before they cause damage.",
    content: "Full blog content here...",
    category: "Threat Intelligence",
    author: {
      name: "Sarah Chen",
      avatar: "/images/authors/sarah-chen.jpg",
      role: "Threat Intelligence Lead"
    },
    publishedAt: "2025-01-15",
    readTime: "8 min read",
    image: "/images/blog/threat-hunting.jpg",
    tags: ["Threat Hunting", "SOC", "Cyber Defense"],
    featured: true
  },
  {
    id: "2",
    slug: "zero-trust-architecture-implementation-guide",
    title: "Zero Trust Architecture: A Practical Implementation Guide",
    excerpt: "Learn how to implement Zero Trust security model in your organization with step-by-step guidance, real-world examples, and common pitfalls to avoid.",
    content: "Full blog content here...",
    category: "Best Practices",
    author: {
      name: "Michael Torres",
      avatar: "/images/authors/michael-torres.jpg",
      role: "Security Architect"
    },
    publishedAt: "2025-01-12",
    readTime: "12 min read",
    image: "/images/blog/zero-trust.jpg",
    tags: ["Zero Trust", "Architecture", "Security Strategy"],
    featured: true
  },
  {
    id: "3",
    slug: "owasp-top-10-2025-comprehensive-analysis",
    title: "OWASP Top 10 2025: Comprehensive Analysis and Mitigation",
    excerpt: "Deep dive into the latest OWASP Top 10 vulnerabilities with practical examples, exploitation techniques, and effective mitigation strategies for developers.",
    content: "Full blog content here...",
    category: "Penetration Testing",
    author: {
      name: "Alex Kumar",
      avatar: "/images/authors/alex-kumar.jpg",
      role: "Senior Penetration Tester"
    },
    publishedAt: "2025-01-10",
    readTime: "15 min read",
    image: "/images/blog/owasp-top-10.jpg",
    tags: ["OWASP", "Web Security", "AppSec"],
    featured: true
  },
  {
    id: "4",
    slug: "cloud-security-posture-management-best-practices",
    title: "Cloud Security Posture Management: Best Practices",
    excerpt: "Discover how to maintain a strong security posture across multi-cloud environments with automated monitoring, configuration management, and compliance checks.",
    content: "Full blog content here...",
    category: "Cloud Security",
    author: {
      name: "Jennifer Wu",
      avatar: "/images/authors/jennifer-wu.jpg",
      role: "Cloud Security Specialist"
    },
    publishedAt: "2025-01-08",
    readTime: "10 min read",
    image: "/images/blog/cloud-security.jpg",
    tags: ["Cloud Security", "CSPM", "AWS", "Azure"],
    featured: false
  },
  {
    id: "5",
    slug: "incident-response-playbook-ransomware-attacks",
    title: "Incident Response Playbook: Handling Ransomware Attacks",
    excerpt: "A comprehensive playbook for responding to ransomware incidents, including detection, containment, eradication, and recovery procedures.",
    content: "Full blog content here...",
    category: "Incident Response",
    author: {
      name: "David Martinez",
      avatar: "/images/authors/david-martinez.jpg",
      role: "Incident Response Manager"
    },
    publishedAt: "2025-01-05",
    readTime: "11 min read",
    image: "/images/blog/ransomware-response.jpg",
    tags: ["Ransomware", "Incident Response", "Crisis Management"],
    featured: false
  },
  {
    id: "6",
    slug: "gdpr-compliance-checklist-2025",
    title: "GDPR Compliance Checklist for 2025",
    excerpt: "Stay compliant with the latest GDPR requirements using our comprehensive checklist covering data protection, privacy by design, and breach notification.",
    content: "Full blog content here...",
    category: "Compliance & GRC",
    author: {
      name: "Emma Thompson",
      avatar: "/images/authors/emma-thompson.jpg",
      role: "GRC Consultant"
    },
    publishedAt: "2025-01-01",
    readTime: "9 min read",
    image: "/images/blog/gdpr-compliance.jpg",
    tags: ["GDPR", "Compliance", "Privacy"],
    featured: false
  },
  {
    id: "7",
    slug: "kubernetes-security-hardening-guide",
    title: "Kubernetes Security Hardening: Complete Guide",
    excerpt: "Secure your Kubernetes clusters with this comprehensive guide covering RBAC, network policies, pod security, secrets management, and runtime protection.",
    content: "Full blog content here...",
    category: "Cloud Security",
    author: {
      name: "Ryan Patel",
      avatar: "/images/authors/ryan-patel.jpg",
      role: "DevSecOps Engineer"
    },
    publishedAt: "2024-12-28",
    readTime: "14 min read",
    image: "/images/blog/kubernetes-security.jpg",
    tags: ["Kubernetes", "Container Security", "DevSecOps"],
    featured: false
  },
  {
    id: "8",
    slug: "social-engineering-attacks-2025-trends",
    title: "Social Engineering Attacks: 2025 Trends and Defense",
    excerpt: "Understand the latest social engineering tactics used by attackers and learn how to build a human firewall through effective security awareness training.",
    content: "Full blog content here...",
    category: "Security Awareness",
    author: {
      name: "Lisa Anderson",
      avatar: "/images/authors/lisa-anderson.jpg",
      role: "Security Awareness Manager"
    },
    publishedAt: "2024-12-25",
    readTime: "7 min read",
    image: "/images/blog/social-engineering.jpg",
    tags: ["Social Engineering", "Phishing", "Security Awareness"],
    featured: false
  },
  {
    id: "9",
    slug: "siem-optimization-reducing-alert-fatigue",
    title: "SIEM Optimization: Reducing Alert Fatigue",
    excerpt: "Learn strategies to optimize your SIEM configuration, reduce false positives, and improve alert quality for more efficient security operations.",
    content: "Full blog content here...",
    category: "Security Operations",
    author: {
      name: "James Wilson",
      avatar: "/images/authors/james-wilson.jpg",
      role: "SOC Manager"
    },
    publishedAt: "2024-12-22",
    readTime: "10 min read",
    image: "/images/blog/siem-optimization.jpg",
    tags: ["SIEM", "SOC", "Alert Management"],
    featured: false
  },
  {
    id: "10",
    slug: "api-security-testing-methodology",
    title: "API Security Testing: A Comprehensive Methodology",
    excerpt: "Master API security testing with this detailed methodology covering authentication, authorization, injection attacks, and business logic vulnerabilities.",
    content: "Full blog content here...",
    category: "Penetration Testing",
    author: {
      name: "Sofia Rodriguez",
      avatar: "/images/authors/sofia-rodriguez.jpg",
      role: "API Security Researcher"
    },
    publishedAt: "2024-12-20",
    readTime: "13 min read",
    image: "/images/blog/api-security.jpg",
    tags: ["API Security", "Pentesting", "Web Security"],
    featured: false
  },
  {
    id: "11",
    slug: "supply-chain-security-best-practices-2025",
    title: "Supply Chain Security: Best Practices for 2025",
    excerpt: "Protect your software supply chain from attacks with modern security practices including SBOM, dependency scanning, and secure CI/CD pipelines.",
    content: "Full blog content here...",
    category: "Best Practices",
    author: {
      name: "Thomas Lee",
      avatar: "/images/authors/thomas-lee.jpg",
      role: "Security Engineer"
    },
    publishedAt: "2024-12-18",
    readTime: "11 min read",
    image: "/images/blog/supply-chain.jpg",
    tags: ["Supply Chain", "DevSecOps", "SBOM"],
    featured: false
  },
  {
    id: "12",
    slug: "ai-powered-security-tools-review-2025",
    title: "AI-Powered Security Tools: 2025 Review",
    excerpt: "Explore the latest AI and machine learning tools revolutionizing cybersecurity, from threat detection to automated response and vulnerability analysis.",
    content: "Full blog content here...",
    category: "Threat Intelligence",
    author: {
      name: "Dr. Anna Schmidt",
      avatar: "/images/authors/anna-schmidt.jpg",
      role: "AI Security Researcher"
    },
    publishedAt: "2024-12-15",
    readTime: "9 min read",
    image: "/images/blog/ai-security.jpg",
    tags: ["AI", "Machine Learning", "Security Tools"],
    featured: false
  },
  {
    id: "13",
    slug: "penetration-testing-report-writing-guide",
    title: "Writing Effective Penetration Testing Reports",
    excerpt: "Learn how to create comprehensive, actionable penetration testing reports that communicate findings effectively to both technical and executive audiences.",
    content: "Full blog content here...",
    category: "Penetration Testing",
    author: {
      name: "Marcus Brown",
      avatar: "/images/authors/marcus-brown.jpg",
      role: "Lead Penetration Tester"
    },
    publishedAt: "2024-12-12",
    readTime: "8 min read",
    image: "/images/blog/pentest-reports.jpg",
    tags: ["Penetration Testing", "Reporting", "Communication"],
    featured: false
  },
  {
    id: "14",
    slug: "secure-coding-practices-developers",
    title: "Secure Coding Practices Every Developer Should Know",
    excerpt: "Essential secure coding principles and practices to prevent common vulnerabilities in your applications, with code examples in multiple languages.",
    content: "Full blog content here...",
    category: "Best Practices",
    author: {
      name: "Kevin Zhang",
      avatar: "/images/authors/kevin-zhang.jpg",
      role: "Application Security Lead"
    },
    publishedAt: "2024-12-10",
    readTime: "12 min read",
    image: "/images/blog/secure-coding.jpg",
    tags: ["Secure Coding", "AppSec", "Development"],
    featured: false
  },
  {
    id: "15",
    slug: "security-metrics-kpis-soc-performance",
    title: "Security Metrics and KPIs for SOC Performance",
    excerpt: "Discover the most important security metrics and KPIs to measure SOC effectiveness, from MTTD and MTTR to threat detection accuracy.",
    content: "Full blog content here...",
    category: "Security Operations",
    author: {
      name: "Patricia Green",
      avatar: "/images/authors/patricia-green.jpg",
      role: "SOC Director"
    },
    publishedAt: "2024-12-08",
    readTime: "10 min read",
    image: "/images/blog/security-metrics.jpg",
    tags: ["Metrics", "SOC", "Performance"],
    featured: false
  }
];

// Helper function to get blogs by category
export function getBlogsByCategory(category: string): BlogPost[] {
  if (category === "All Posts") {
    return BLOG_POSTS;
  }
  return BLOG_POSTS.filter(post => post.category === category);
}

// Helper function to get featured blogs
export function getFeaturedBlogs(): BlogPost[] {
  return BLOG_POSTS.filter(post => post.featured);
}

// Helper function to get popular blogs (featured + most recent)
export function getPopularBlogs(limit: number = 5): BlogPost[] {
  return BLOG_POSTS.slice(0, limit);
}

// Helper function to search blogs
export function searchBlogs(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return BLOG_POSTS.filter(
    post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
