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
    image: "/images/team/indranil-banerjee.jpeg",
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
    "We combine technical excellence with business understanding to deliver security solutions that drive real value.",
  items: [
    {
      icon: "Shield",
      title: "Industry-Leading Expertise",
      description:
        "Our team of certified security professionals brings decades of combined experience in protecting critical infrastructure.",
    },
    {
      icon: "Target",
      title: "Proactive Security Approach",
      description:
        "We don\u2019t just respond to threats\u2014we anticipate them, using advanced threat intelligence and AI-powered analytics.",
    },
    {
      icon: "TrendingUp",
      title: "Proven Track Record",
      description:
        "With 99.9% uptime and zero major breaches across our client portfolio, we deliver results that matter.",
    },
  ],
};

export const aboutPageMissionVision = {
  mission: {
    badge: { icon: "Target", text: "Our Mission" },
    title: "Empowering Secure Digital Transformation",
    description:
      "Our mission is to empower organizations to embrace digital transformation with confidence by providing world-class cybersecurity solutions. We strive to be the trusted partner that enables businesses to innovate fearlessly while staying protected against evolving cyber threats.",
    values: ["Excellence in Execution", "Client-Centric Approach", "Continuous Innovation"],
  },
  vision: {
    badge: { icon: "TrendingUp", text: "Our Vision" },
    title: "A Secure Digital Future for All",
    description:
      "We envision a world where every organization, regardless of size or industry, has access to enterprise-grade cybersecurity. Through innovation, education, and relentless dedication, we aim to set new standards for security excellence and make the digital world a safer place for everyone.",
    values: ["Transparency & Trust", "Ethical Security Practices", "24/7 Commitment"],
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
  highlight: "15 Years of Excellence",
  description:
    "From a small startup to a global cybersecurity leader, our journey has been defined by innovation, dedication, and an unwavering commitment to protecting what matters most.",
};

export const storyPageMilestones = [
  {
    year: "2009",
    title: "The Foundation",
    description:
      "ITOrigin was founded by a group of security experts who saw the growing need for comprehensive cybersecurity solutions. Starting with just 5 people in a small office, we set out to change the industry.",
    icon: "Rocket",
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: "2012",
    title: "First Major Client",
    description:
      "Secured our first Fortune 500 client, marking a turning point in our growth. This partnership validated our approach and opened doors to enterprise-level opportunities.",
    icon: "Award",
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2015",
    title: "Global Expansion",
    description:
      "Expanded operations internationally, opening offices in Europe and Asia. Our team grew to 50+ security professionals serving clients across 15 countries.",
    icon: "Users",
    color: "from-orange-500 to-red-500",
  },
  {
    year: "2018",
    title: "Innovation Leader",
    description:
      "Launched our proprietary AI-powered threat detection platform, setting new industry standards. Received recognition as one of the top cybersecurity innovators.",
    icon: "Target",
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2021",
    title: "100+ Expert Team",
    description:
      "Grew to over 100 certified security professionals. Expanded our service offerings to include comprehensive GRC consulting and advanced penetration testing.",
    icon: "TrendingUp",
    color: "from-indigo-500 to-blue-500",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description:
      "Achieved major industry certifications and awards. Now protecting 300+ organizations globally with 24/7 SOC operations and cutting-edge security solutions.",
    icon: "Award",
    color: "from-yellow-500 to-orange-500",
  },
];

export const storyPageSectionHeader = {
  title: "Our Milestones",
  description:
    "Key moments that shaped ITOrigin into the trusted security partner we are today.",
};

export const storyPageMDMessage = {
  badge: "From the Managing Director",
  title: "A Message from Our",
  titleHighlight: "Leadership",
  quote:
    "Customer trust is our purpose, our people are our strength, and global excellence is our destination.",
  paragraphs: [
    "Our vision is to build a cybersecurity company where trust is earned every day\u2014from our customers, our partners, and our people.",
    "We exist to protect our customers\u2019 digital futures. Every solution we design, every service we deliver, and every decision we make begins with a simple question: does this genuinely improve our customer\u2019s security, resilience, and confidence?",
    "We aim to be more than a vendor\u2014we strive to be a long-term security partner who understands our customers\u2019 risks, business realities and aspirations where every service aims to add value to customers\u2019 business.",
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
    { value: "100+", label: "Security Experts" },
    { value: "12+", label: "Countries" },
    { value: "99.9%", label: "Uptime SLA" },
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
    "Customer trust is our purpose, our people are our strength, and global excellence is our destination.",
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
