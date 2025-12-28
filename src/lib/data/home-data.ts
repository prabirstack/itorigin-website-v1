import { Shield, Target, FileCheck, Clock, Users, Award, Zap, Lock } from "lucide-react";

export const heroSlides = [
  {
    id: 1,
    title: "Agentic AI powered SOC as a Service",
    subtitle: "Trusted by our Global Customers",
    description:
      "Advanced threat detection and response with our state-of-the-art AI-driven SOC platform. Monitor, analyze, and respond to security incidents around the clock",
    videoUrl: "/videos/it-origin-vid-1.mp4",
    icon: "Shield",
    features: ["24/7 Monitoring", "Real-time Alerts", "Expert Analysis", "Instant Response"],
    buttonText: "Explore SOC Services",
    buttonHref: "/services/managed-soc-services",
  },
  {
    id: 2,
    title: "Offensive Security",
    subtitle: "Penetration Testing & Red Team Operations",
    description:
      "Identify vulnerabilities before attackers do. Our ethical hacking services simulate real-world attacks to strengthen your security posture.",
    videoUrl: "/videos/it-origin-vid-2.mp4",
    icon: "Target",
    features: [
      "Penetration Testing",
      "Red Team Exercises",
      "Vulnerability Assessment",
      "Security Auditing",
    ],
    buttonText: "Start Security Testing",
    buttonHref: "/services/offensive-security",
  },
  {
    id: 3,
    title: "Governance, Risk & Compliance",
    subtitle: "Strategic Security Framework",
    description:
      "Comprehensive GRC solutions to align your security strategy with business objectives and regulatory requirements.",
    videoUrl: "/videos/it-origin-vid-3.mp4",
    icon: "FileCheck",
    features: ["Compliance Management", "Risk Assessment", "Policy Development", "Audit Support"],
    buttonText: "View GRC Solutions",
    buttonHref: "/services/grc-services",
  },
];

export const stats = [
  {
    id: 1,
    value: "500+",
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
    description: "Government-recognized security operations center with certified expertise",
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
    description: "500+ clients trust us for their cybersecurity needs",
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
      "IT Origin's SOC services have transformed our security posture. Their 24/7 monitoring gives us peace of mind.",
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

export const trustedBy = [
  { id: 1, name: "Company 1", logo: "/images/clients/client-1.png" },
  { id: 2, name: "Company 2", logo: "/images/clients/client-2.png" },
  { id: 3, name: "Company 3", logo: "/images/clients/client-3.png" },
  { id: 4, name: "Company 4", logo: "/images/clients/client-4.png" },
  { id: 5, name: "Company 5", logo: "/images/clients/client-5.png" },
  { id: 6, name: "Company 6", logo: "/images/clients/client-6.png" },
];
