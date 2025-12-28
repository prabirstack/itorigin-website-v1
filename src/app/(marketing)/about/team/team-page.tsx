"use client";

import { motion } from "motion/react";
import { Users, Award, Target, Shield } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { TeamMemberCard } from "@/components/about/team-member-card";
import { CTASection } from "@/components/about/cta-section";
import { fadeInUp, staggerContainer, scaleUp } from "@/lib/animations";

export function TeamPage() {
  const stats = [
    { value: "100+", label: "Team Members", icon: Users },
    { value: "50+", label: "Certifications", icon: Award },
    { value: "15+", label: "Years Experience", icon: Target },
    { value: "24/7", label: "Support Coverage", icon: Shield }
  ];

  const leadership = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      bio: "15+ years leading cybersecurity initiatives for Fortune 500 companies. Passionate about building security-first cultures.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah.chen@itorigin.com"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "Former NSA security researcher with expertise in AI-powered threat detection and zero-trust architectures.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "michael.rodriguez@itorigin.com"
    },
    {
      name: "Emily Thompson",
      role: "Chief Information Security Officer",
      bio: "CISSP, CISM certified with extensive experience in GRC, compliance, and security program development.",
      linkedin: "https://linkedin.com",
      email: "emily.thompson@itorigin.com"
    },
    {
      name: "David Kim",
      role: "VP of Security Operations",
      bio: "Leads our 24/7 SOC operations with a focus on proactive threat hunting and incident response excellence.",
      linkedin: "https://linkedin.com",
      email: "david.kim@itorigin.com"
    }
  ];

  const securityTeam = [
    {
      name: "Alex Johnson",
      role: "Lead SOC Analyst",
      bio: "Expert in SIEM platforms and threat intelligence with 10+ years protecting critical infrastructure.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Priya Patel",
      role: "Senior Penetration Tester",
      bio: "OSCP certified ethical hacker specializing in web application and network security assessments.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "James Wilson",
      role: "Incident Response Manager",
      bio: "Leads rapid response teams handling complex security incidents and digital forensics investigations.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Lisa Martinez",
      role: "Threat Intelligence Analyst",
      bio: "Specializes in analyzing emerging threats and providing actionable intelligence to clients.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Robert Chang",
      role: "Security Architect",
      bio: "Designs enterprise-grade security solutions with focus on cloud security and zero-trust models.",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Nina Kowalski",
      role: "GRC Consultant",
      bio: "Helps organizations achieve compliance with GDPR, SOC 2, ISO 27001, and other frameworks.",
      linkedin: "https://linkedin.com"
    }
  ];

  const departments = [
    {
      name: "Security Operations Center",
      count: "25+ Analysts",
      description: "24/7 monitoring and threat detection"
    },
    {
      name: "Offensive Security",
      count: "15+ Testers",
      description: "Penetration testing and red team operations"
    },
    {
      name: "GRC & Compliance",
      count: "12+ Consultants",
      description: "Risk management and regulatory compliance"
    },
    {
      name: "Engineering & Research",
      count: "20+ Engineers",
      description: "Security tools development and research"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Users", text: "Our Team" }}
        title="Meet the Experts"
        highlight="Protecting Your Digital Future"
        description="Our team of certified security professionals brings together decades of experience, cutting-edge expertise, and an unwavering commitment to keeping your organization safe."
      />

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-black mb-4"
            >
              Leadership Team
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Experienced leaders driving innovation and excellence in cybersecurity.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <TeamMemberCard key={index} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Security Team */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-black mb-4"
            >
              Security Experts
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Meet some of the talented professionals keeping organizations secure around the clock.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityTeam.map((member, index) => (
              <TeamMemberCard key={index} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-black mb-4"
            >
              Our Departments
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Specialized teams working together to deliver comprehensive security solutions.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index * 0.1}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">{dept.name}</h3>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {dept.count}
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {dept.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 md:py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              <span>Careers</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-black mb-6"
            >
              Join Our Team
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-8"
            >
              We&apos;re always looking for talented security professionals who are passionate
              about protecting organizations and pushing the boundaries of cybersecurity.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="mailto:careers@itorigin.com"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="/about/values"
                className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                Our Culture & Values
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Work With Us?"
        description="Get in touch with our team to discuss how we can protect your organization."
        buttons={[
          { text: "Contact Us", href: "/contact" },
          { text: "Our Services", href: "/services/managed-soc-services", variant: "secondary" }
        ]}
      />
    </div>
  );
}
