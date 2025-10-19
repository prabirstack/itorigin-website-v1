import { Metadata } from "next";
import Link from "next/link";
import { Award, Users, Clock, Target, Shield, Code, ArrowRight, CheckCircle2, Zap, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { StatsSection } from "@/components/about/stats-section";
import { BenefitCard } from "@/components/services/benefit-card";
import { CTASection } from "@/components/about/cta-section";
import { CourseCard } from "@/components/training/course-card";
import { TrainingPathCard } from "@/components/training/training-path-card";

export const metadata: Metadata = {
  title: "Cybersecurity Training & Certification Courses | IT Origin",
  description: "Advance your cybersecurity career with IT Origin's expert-led training programs. OSCP, CEH, CISSP, security awareness training, and custom corporate programs. Hands-on labs and real-world scenarios.",
  keywords: [
    "cybersecurity training",
    "security certification",
    "OSCP training",
    "CEH certification",
    "CISSP course",
    "penetration testing training",
    "security awareness training",
    "ethical hacking course",
    "corporate security training",
    "hands-on cybersecurity",
    "security bootcamp"
  ],
  openGraph: {
    title: "Cybersecurity Training & Certification Courses | IT Origin",
    description: "Expert-led cybersecurity training programs with hands-on labs. OSCP, CEH, CISSP, and custom corporate training.",
    type: "website",
    url: "https://itorigin.com/training",
    images: [
      {
        url: "/images/og-training.jpg",
        width: 1200,
        height: 630,
        alt: "IT Origin Cybersecurity Training"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Training & Certification Courses",
    description: "Expert-led cybersecurity training programs with hands-on labs and real-world scenarios.",
    images: ["/images/og-training.jpg"]
  },
  alternates: {
    canonical: "https://itorigin.com/training"
  }
};

export default function TrainingPage() {
  const stats = [
    { label: "Students Trained", value: "5,000+", icon: "Users" as const },
    { label: "Certification Pass Rate", value: "95%", icon: "Award" as const },
    { label: "Training Hours Delivered", value: "50,000+", icon: "Clock" as const },
    { label: "Corporate Clients", value: "150+", icon: "Target" as const },
  ];

  const courses = [
    {
      title: "Offensive Security (OSCP Prep)",
      description: "Master penetration testing and ethical hacking with our comprehensive OSCP preparation course.",
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
        "24/7 lab access for 90 days"
      ],
      icon: "Target" as const,
      popular: true
    },
    {
      title: "Certified Ethical Hacker (CEH)",
      description: "Learn the fundamentals of ethical hacking and prepare for the CEH certification exam.",
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
        "Study materials & practice tests"
      ],
      icon: "Shield" as const,
      popular: false
    },
    {
      title: "Web Application Security",
      description: "Deep dive into web application vulnerabilities and secure coding practices.",
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
        "Weekly mentor sessions"
      ],
      icon: "Code" as const,
      popular: false
    },
    {
      title: "Security Operations & Incident Response",
      description: "Build expertise in SOC operations, threat hunting, and incident response procedures.",
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
        "Hands-on IR simulations"
      ],
      icon: "Eye" as const,
      popular: false
    },
    {
      title: "Cloud Security (AWS/Azure/GCP)",
      description: "Secure cloud infrastructure and learn cloud-native security controls.",
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
        "Real cloud environment labs"
      ],
      icon: "Shield" as const,
      popular: false
    },
    {
      title: "Security Awareness for Teams",
      description: "Empower your employees to be the first line of defense against cyber threats.",
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
        "Quarterly refresher sessions"
      ],
      icon: "Users" as const,
      popular: false
    }
  ];

  const trainingPaths = [
    {
      title: "Penetration Tester Path",
      description: "Complete learning path from beginner to advanced penetration testing professional",
      courses: ["Web Application Security", "Offensive Security (OSCP Prep)", "Advanced Red Teaming"],
      duration: "6 months",
      icon: "Target" as const
    },
    {
      title: "Security Analyst Path",
      description: "Build expertise in defensive security operations and threat detection",
      courses: ["Security Fundamentals", "Security Operations & Incident Response", "Threat Intelligence"],
      duration: "4 months",
      icon: "Shield" as const
    },
    {
      title: "Cloud Security Path",
      description: "Master cloud security across major platforms and earn cloud certifications",
      courses: ["Cloud Security Fundamentals", "Cloud Security (AWS/Azure/GCP)", "Cloud Compliance"],
      duration: "5 months",
      icon: "Zap" as const
    }
  ];

  const benefits = [
    {
      icon: "Award" as const,
      title: "Industry Certifications",
      description: "Prepare for top cybersecurity certifications including OSCP, CEH, CISSP, and more."
    },
    {
      icon: "Users" as const,
      title: "Expert Instructors",
      description: "Learn from certified professionals with real-world experience in offensive and defensive security."
    },
    {
      icon: "Code" as const,
      title: "Hands-On Labs",
      description: "Practice on real vulnerable systems and environments, not just theory and slides."
    },
    {
      icon: "Clock" as const,
      title: "Flexible Learning",
      description: "Live online sessions, self-paced courses, and on-site training options to fit your schedule."
    },
    {
      icon: "CheckCircle2" as const,
      title: "Career Support",
      description: "Resume reviews, interview preparation, and job placement assistance for graduates."
    },
    {
      icon: "TrendingUp" as const,
      title: "Continuous Updates",
      description: "Course content regularly updated to reflect the latest threats, tools, and techniques."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Award", text: "Training & Certification" }}
        title="Master Cybersecurity"
        highlight="Advance Your Career"
        description="Transform your cybersecurity skills with expert-led training programs. From ethical hacking to cloud security, our hands-on courses prepare you for industry certifications and real-world challenges."
      />

      {/* Hero CTA */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#courses"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 group"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Corporate Training Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Our Training Programs"
            description="Industry-leading cybersecurity education designed for real-world success."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Training Courses"
            description="Comprehensive programs designed to build expertise and earn industry certifications."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Training Paths Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Structured Learning Paths"
            description="Follow a proven curriculum designed to take you from beginner to expert in your chosen specialty."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {trainingPaths.map((path, index) => (
              <TrainingPathCard key={index} {...path} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Corporate Training Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Upskill your team with customized training programs tailored to your organization&apos;s needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl border border-border bg-card">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-4">Team Training</h3>
                <p className="text-muted-foreground mb-6">
                  Train your security team on the latest tools, techniques, and best practices. Custom curriculum designed for your tech stack and security challenges.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Customized course content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">On-site or virtual delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Hands-on labs with your infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Post-training assessments</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-2xl border border-border bg-card">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-4">Security Awareness</h3>
                <p className="text-muted-foreground mb-6">
                  Empower all employees with security awareness training. Reduce human risk with engaging, interactive programs that stick.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Phishing simulation campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Interactive training modules</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Compliance reporting dashboards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quarterly refresher training</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Request Corporate Training Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Training Journey?"
        description="Join thousands of cybersecurity professionals who have advanced their careers with our training programs."
        buttons={[
          { text: "Enroll Now", href: "/contact" },
          { text: "Download Course Catalog", href: "/courses-catalog.pdf", variant: "secondary" }
        ]}
      />
    </div>
  );
}
