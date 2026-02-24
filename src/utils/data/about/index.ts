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
  founded: 2017,
  headquarters: "Kolkata, India",
  mission:
    "To protect organizations worldwide from cyber threats through innovative security solutions and expert guidance.",
  vision:
    "To be the most trusted cybersecurity partner for organizations across the globe, enabling them to operate securely in the digital age.",
  description:
    "ITOrigin Technology Solutions Pvt. Ltd. is an ISO 27001, ISO 9001, ISO 20000-1, and ISO 17025 certified organization and CERT-In empanelled security auditor and STQC approved IT Test Lab, specializing in providing end-to-end cybersecurity consulting and managed security services across Managed SOC, Offensive Security, and GRC & Compliance.",
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
    year: 2017,
    title: "Company Founded",
    description: "ITOrigin established in Kolkata by seasoned IT industry veterans with a mission to deliver world-class cybersecurity services.",
  },
  {
    year: 2018,
    title: "CERT-In Empanelment",
    description: "Achieved CERT-In empanelment, formally authorized by the Government of India to conduct cybersecurity assessments.",
  },
  {
    year: 2019,
    title: "SOC Launch & STQC Approval",
    description: "Launched 24/7 Security Operations Center and received STQC approval for vulnerability assessment and penetration testing.",
  },
  {
    year: 2020,
    title: "ISO Certifications",
    description: "Achieved ISO 27001:2022 and ISO 9001:2015 certifications, ensuring secure and quality-driven service delivery.",
  },
  {
    year: 2021,
    title: "Middle East Expansion",
    description: "Extended cybersecurity services to the Middle East, serving defence, oil & gas, and public sector organizations.",
  },
  {
    year: 2022,
    title: "100+ Clients",
    description: "Crossed 100 clients milestone with multi-industry coverage across BFSI, telecom, government, and critical infrastructure.",
  },
  {
    year: 2023,
    title: "North America Practice",
    description: "Established North America practice focused on AI Strategy and Cybersecurity, expanding global delivery footprint.",
  },
  {
    year: 2024,
    title: "AI-Powered SOC & Advanced Certifications",
    description: "Introduced Agentic AI-powered SOC platform and achieved ISO 20000-1:2018 and ISO 17025 certifications.",
  },
  {
    year: 2025,
    title: "300+ Global Clients",
    description: "Serving 300+ organizations across India, Middle East, North America, Far East, and Australia with comprehensive cybersecurity solutions.",
  },
];

export const leadershipTeam: TeamMember[] = [
  {
    id: "md",
    name: "Basudev Gangopadhyay",
    role: "Managing Director",
    bio: "A highly accomplished technology executive with over 35 years of strategic and operational leadership across information technology, data center engineering, and cybersecurity. He has worked for multinationals like TCS & Cognizant, where he served as Global Head for End-User services catering to IT infrastructure needs for 280,000+ users worldwide. He has championed cybersecurity practice implementation, maturity improvements, establishing frameworks, governance models, and cybersecurity audits aligned with global best practices. He holds a degree from IISc, Bangalore and a PGDBM from IIM, Calcutta.",
    image: "/images/team/basudev-ganguly.jpg",
    social: {
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: "director",
    name: "Indranil Banerjee",
    role: "Director",
    bio: "A seasoned cybersecurity business leader and entrepreneur with over 27 years of experience across cybersecurity, information security, and enterprise technology. He drives the organization\u2019s strategic vision, service innovation, and growth across national and global markets, with deep expertise in security strategy, risk management, security architecture, and consulting-led service delivery. His experience spans consulting, systems integration, and advisory-led engagements across BFSI, telecom, government, and public sector organizations. He holds an MBA, PGD-IRPM, PGDCA, and is certified in BS 10012:2017 (GDPR).",
    image: "/images/team/indranil-banerjee.jpeg",
    social: {
      linkedin: "https://linkedin.com/in/",
    },
  },
  {
    id: "svp-na",
    name: "Vishy Narayan",
    role: "Sr. Vice President - North America",
    bio: "Leads ITOrigin\u2019s AI Strategy and Cybersecurity Practice across North America. A trusted advisor to C-suite executives, Vishy specializes in translating complex business challenges into actionable AI and security strategies. His expertise spans enterprise transformation, responsible AI governance, cloud modernization, and comprehensive cybersecurity frameworks. Prior to ITOrigin, he built and led enterprise consulting practices at Cognizant and Infosys and built wide area research networks at NASA. He holds degrees from IIM Bangalore and Louisiana State University, and has been awarded patents for technology innovation.",
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

export const aboutIndustries = [
  { id: 1, name: "Banking & Finance", icon: "Building" },
  { id: 2, name: "Healthcare", icon: "Heart" },
  { id: 3, name: "E-commerce", icon: "ShoppingCart" },
  { id: 4, name: "Manufacturing", icon: "Factory" },
  { id: 5, name: "Government", icon: "Landmark" },
  { id: 6, name: "IT & Technology", icon: "Monitor" },
  { id: 7, name: "Education", icon: "GraduationCap" },
  { id: 8, name: "Telecom", icon: "Radio" },
];

export const homeStats = [
  {
    id: 1,
    value: "300+",
    label: "Global Clients",
    description: "Trusted by organizations worldwide",
  },
  {
    id: 2,
    value: "24/7",
    label: "SOC Monitoring",
    description: "Round-the-clock security operations",
  },
  {
    id: 3,
    value: "99.9%",
    label: "Uptime SLA",
    description: "Industry-leading reliability",
  },
  {
    id: 4,
    value: "15min",
    label: "Response Time",
    description: "Average incident response",
  },
];

export const whyChooseUs = [
  {
    id: 1,
    icon: "Shield",
    title: "CERT-IN Empanelled",
    description:
      "Government-recognized cybersecurity firm with certified expertise in auditing and offensive security",
  },
  {
    id: 2,
    icon: "Clock",
    title: "24/7 Operations",
    description: "Round-the-clock monitoring and incident response by expert analysts",
  },
  {
    id: 3,
    icon: "Users",
    title: "Expert Team",
    description: "Certified security professionals with deep industry experience",
  },
  {
    id: 4,
    icon: "Award",
    title: "Proven Track Record",
    description: "300+ clients trust us for their cybersecurity needs",
  },
  {
    id: 5,
    icon: "Zap",
    title: "AI-Powered Detection",
    description: "Next-gen SIEM with machine learning for advanced threat detection",
  },
  {
    id: 6,
    icon: "Lock",
    title: "Compliance Ready",
    description: "ISO 27001, SOC2, GDPR, and industry-specific compliance support",
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "ITOrigin's SOC services have transformed our security posture. Their 24/7 monitoring gives us peace of mind.",
    author: "Rajesh Kumar",
    role: "CTO",
    company: "FinTech Solutions Ltd",
    image: "/images/testimonials/rajesh-kumar.jpg",
  },
  {
    id: 2,
    quote:
      "The penetration testing team uncovered critical vulnerabilities we never knew existed. Highly professional!",
    author: "Priya Sharma",
    role: "CISO",
    company: "Healthcare Plus",
    image: "/images/testimonials/priya-sharma.jpg",
  },
  {
    id: 3,
    quote:
      "Their GRC expertise helped us achieve ISO 27001 certification in record time. Exceptional service!",
    author: "Amit Patel",
    role: "VP of Security",
    company: "TechCorp India",
    image: "/images/testimonials/amit-patel.jpg",
  },
];

// ============================================================
// About Page Data
// ============================================================

export const aboutPageHero = {
  badge: { icon: "Shield", text: "Trusted Cybersecurity Partner" },
  title: "Protecting What",
  highlight: "Matters Most",
  description:
    "At ITOrigin, cybersecurity isn\u2019t just a shield, it\u2019s your competitive edge. We don\u2019t just defend against threats; we empower organizations to move faster, think bigger, and grow fearlessly. Across industries and borders, we stand beside our partners to protect what truly drives their success, their people, their processes, and their purpose.",
};

export const aboutPageCTAs = [
  { text: "Our Services", href: "/services/managed-soc-services", primary: true },
  { text: "Meet Our Team", href: "/about/team", primary: false },
];

export const aboutPageStats = [
  { label: "Years of Experience", value: "8+", icon: "Award" },
  { label: "Security Experts", value: "70+", icon: "Users" },
  { label: "Clients Protected", value: "300+", icon: "Shield" },
  { label: "Countries Served", value: "12+", icon: "Globe" },
];

export const aboutPageHighlights = {
  title: "Why Choose ITOrigin",
  description:
    "Government-accredited, globally certified, and backed by a team of industry veterans delivering cybersecurity across three core verticals.",
  items: [
    {
      icon: "Shield",
      title: "Government-Accredited & Trusted",
      description:
        "Empanelled with CERT-In and STQC, we are formally authorized to conduct cybersecurity assessments for government entities and national critical infrastructure in India.",
    },
    {
      icon: "Globe",
      title: "Proven Global Delivery",
      description:
        "Since 2017, we have been securing organizations across India, the Middle East, USA, APAC, and Australia \u2014 navigating complex threat landscapes and regulatory environments.",
    },
    {
      icon: "Award",
      title: "Quality & Assurance Driven",
      description:
        "Backed by ISO 27001, ISO 9001, ISO 20000-1, and ISO 17025 certifications, we ensure secure, reliable, and audit-ready service delivery.",
    },
  ],
};

export const aboutPageMissionVision = {
  mission: {
    badge: { icon: "Target", text: "Our Mission" },
    title: "Protecting Digital Futures with Precision",
    description:
      "To provide maximum business value to our clients by delivering end-to-end cybersecurity solutions that enable them to grow their businesses, manage risk and compliance, and strengthen their competitive position \u2014 powered by certified expertise and proven global delivery frameworks.",
    values: ["Governance & Compliance Alignment", "Client-First Approach", "Measurable Outcomes"],
  },
  vision: {
    badge: { icon: "TrendingUp", text: "Our Vision" },
    title: "A Trusted Global Cybersecurity Partner",
    description:
      "To be the most trusted cybersecurity partner for enterprises and government organizations worldwide \u2014 combining governance, technology, and operational excellence to protect business continuity, reputation, and digital trust across industries and geographies.",
    values: ["Transparency & Trust", "Global Delivery Excellence", "24/7 Commitment"],
  },
};

export const aboutPageCTA = {
  title: "Ready to Secure Your Future?",
  description:
    "Learn more about our story, meet our team, and discover the values that drive us forward.",
  buttons: [
    { text: "Our Story", href: "/about/story" },
    { text: "Our Values", href: "/about/values", variant: "secondary" as const },
  ],
};

// ============================================================
// Story Page Data
// ============================================================

export const storyPageHero = {
  badge: { icon: "Calendar", text: "Our Journey" },
  title: "Our Story",
  highlight: "Built on Trust & Expertise",
  description:
    "Since 2017, ITOrigin has grown from a Kolkata-based cybersecurity consultancy into a globally recognized managed security and consulting firm \u2014 empanelled by CERT-In and STQC, and trusted by enterprises and government organizations across India, the Middle East, North America, and Asia-Pacific.",
};

export const storyPageMilestones = [
  {
    year: "2017",
    title: "Founded in Kolkata",
    description:
      "ITOrigin was established by seasoned IT industry veterans with extensive leadership experience in global IT services organizations, with a mission to deliver end-to-end cybersecurity solutions.",
    icon: "Rocket",
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2018",
    title: "CERT-In Empanelment",
    description:
      "Formally empanelled by CERT-In (Indian Computer Emergency Response Team), authorized by the Government of India to conduct cybersecurity assessments for government and critical infrastructure.",
    icon: "Shield",
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2019",
    title: "SOC Launch & STQC Approval",
    description:
      "Launched 24/7 Security Operations Centre with integrated threat detection, and received STQC approval as an IT Test Lab for vulnerability assessment and penetration testing.",
    icon: "Eye",
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2021",
    title: "Middle East & Global Delivery",
    description:
      "Expanded cybersecurity delivery to the Middle East, Far East, and Australia \u2014 serving defence, oil & gas, utilities, telecom, and public sector organizations across geographies.",
    icon: "Globe",
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2023",
    title: "North America Practice",
    description:
      "Established dedicated North America practice focused on AI Strategy and Cybersecurity, with trusted advisory services for C-suite executives across enterprise sectors.",
    icon: "TrendingUp",
    color: "from-indigo-500 to-blue-500",
  },
  {
    year: "2025",
    title: "300+ Clients Globally",
    description:
      "Now protecting 300+ organizations across 12+ countries with comprehensive managed security, offensive security, and GRC services \u2014 backed by ISO 27001, ISO 9001, ISO 20000-1, and ISO 17025 certifications.",
    icon: "Award",
    color: "from-yellow-500 to-orange-500",
  },
];

export const storyPageSectionHeader = {
  title: "Our Milestones",
  description:
    "Key moments that shaped ITOrigin from a Kolkata-based consultancy into a globally trusted cybersecurity partner.",
};

export const storyPageMDMessage = {
  badge: "From the Managing Director",
  title: "A Message from Our",
  titleHighlight: "Leadership",
  quote:
    "Secure with Confidence. Scale with Trust.",
  paragraphs: [
    "Our vision is to build a cybersecurity company where trust is earned every day \u2014 from our customers, our partners, and our people.",
    "We exist to protect our customers\u2019 digital futures. Every solution we design, every service we deliver, and every decision we make begins with a simple question: does this genuinely improve our customer\u2019s security, resilience, and confidence?",
    "We aim to be more than a vendor \u2014 we strive to be a long-term security partner who understands our customers\u2019 risks, business realities, and aspirations. ITOrigin combines governance, technology, and operational excellence to protect what matters most \u2014 your business continuity and reputation.",
    "Our focus is to provide maximum business value to our clients, enabling them to grow their businesses, manage their risk and compliance, and strengthen their competitive position by delivering measurable security outcomes.",
  ],
  author: {
    name: "Basudev Gangopadhyay",
    role: "Managing Director, ITOrigin",
    image: "/images/team/basudev-ganguly.jpg",
  },
};

export const storyPageValuesPreview = {
  badge: { icon: "Target", text: "What Drives Us" },
  title: "Built on Strong Values",
  description:
    "Throughout our journey, our core values have remained constant. They guide every decision we make and shape the way we serve our clients. From day one, we\u2019ve been committed to excellence, innovation, and unwavering integrity.",
  values: ["Innovation", "Integrity", "Excellence", "Client Focus"],
  stats: [
    { value: "300+", label: "Clients Protected" },
    { value: "70+", label: "Security Experts" },
    { value: "12+", label: "Countries" },
    { value: "24/7", label: "SOC Operations" },
  ],
};

export const storyPageCTA = {
  title: "Be Part of Our Story",
  description:
    "Join hundreds of organizations that trust ITOrigin to protect their digital future.",
  buttons: [
    { text: "Meet Our Team", href: "/about/team" },
    { text: "Explore Services", href: "/services/managed-soc-services", variant: "secondary" as const },
  ],
};

// ============================================================
// Values Page Data
// ============================================================

export const valuesPageHero = {
  badge: { icon: "Heart", text: "Our Values" },
  title: "The Values That",
  highlight: "Define Us",
  description:
    "Our core values aren\u2019t just words on a wall\u2014they\u2019re the principles that guide every decision we make, every solution we build, and every relationship we forge.",
};

export const valuesPageCoreValues = [
  {
    icon: "Shield",
    title: "Excellence in Execution",
    description:
      "We pursue excellence in everything we do, from threat detection to incident response. Our commitment to quality ensures that our clients receive world-class security solutions that exceed expectations.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "Lightbulb",
    title: "Continuous Innovation",
    description:
      "The threat landscape evolves constantly, and so do we. We invest heavily in research, emerging technologies, and cutting-edge tools to stay ahead of cybercriminals and protect our clients.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: "Heart",
    title: "Client-Centric Approach",
    description:
      "Our clients\u2019 success is our success. We build lasting partnerships by truly understanding their unique challenges, tailoring solutions to their needs, and being there whenever they need us.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: "Lock",
    title: "Unwavering Integrity",
    description:
      "Trust is the foundation of cybersecurity. We operate with complete transparency, maintain the highest ethical standards, and protect client data with the utmost confidentiality.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: "Users",
    title: "Collaborative Teamwork",
    description:
      "Security is a team sport. We foster a culture of collaboration where experts from different disciplines work together seamlessly to deliver comprehensive protection.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "Zap",
    title: "Proactive Mindset",
    description:
      "We don\u2019t wait for threats to materialize. Our proactive approach means identifying vulnerabilities, anticipating attacks, and implementing defenses before incidents occur.",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: "Target",
    title: "Results-Driven Focus",
    description:
      "We measure our success by the tangible results we deliver. From reduced incident response times to improved security postures, we\u2019re committed to outcomes that matter.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: "TrendingUp",
    title: "Continuous Learning",
    description:
      "The cybersecurity field demands constant learning. We invest in our team\u2019s professional development, certifications, and training to maintain our position as industry leaders.",
    color: "from-teal-500 to-green-500",
  },
];

export const valuesPageSectionHeaders = {
  coreValues: {
    title: "Our Core Values",
    description:
      "Eight fundamental values that shape our culture, drive our innovation, and define how we serve our clients.",
  },
  principles: {
    title: "Our Operating Principles",
    description:
      "These principles guide our daily operations and interactions with clients, partners, and each other.",
  },
};

export const valuesPageOperatingPrinciples = [
  "Prioritize client security above all else",
  "Respond to incidents with urgency and precision",
  "Communicate clearly and transparently",
  "Embrace accountability for our actions",
  "Foster diversity and inclusion in our team",
  "Maintain the highest professional standards",
  "Share knowledge and learn from each other",
  "Challenge assumptions and think critically",
  "Adapt quickly to changing threat landscapes",
  "Celebrate successes and learn from failures",
];

export const valuesPageQuote = {
  quote:
    "Our focus is to provide maximum business value to our clients, enabling them to grow their businesses, manage their risk and compliance, and strengthen their competitive position by delivering measurable security outcomes.",
  author: "Basudev Gangopadhyay",
  role: "Managing Director",
  image: "/images/team/basudev-ganguly.jpg",
};

export const valuesPageCultureStats = [
  {
    value: "24/7",
    title: "Always Available",
    description:
      "Cyber threats don\u2019t sleep, and neither do we. Our commitment means being there for our clients around the clock.",
  },
  {
    value: "100%",
    title: "Full Transparency",
    description:
      "We believe in complete honesty with our clients about threats, risks, and the effectiveness of our solutions.",
  },
  {
    value: "Zero",
    title: "No Compromises",
    description:
      "When it comes to security, we never compromise on quality, integrity, or the safety of our clients.",
  },
];

export const valuesPageCTA = {
  title: "Join a Team That Lives These Values",
  description:
    "If these values resonate with you, we\u2019d love to hear from you. Explore career opportunities and become part of our mission.",
  buttons: [
    { text: "View Careers", href: "/coming-soon?for=careers" },
    { text: "Meet Our Team", href: "/about/team", variant: "secondary" as const },
  ],
};
