"use client";

import { motion } from "motion/react";
import { Users, Award, Target, Shield } from "lucide-react";
import { PageHero } from "@/components/about/page-hero";
import { TeamMemberCard } from "@/components/about/team-member-card";
import { CTASection } from "@/components/about/cta-section";
import { fadeInUp, staggerContainer, scaleUp } from "@/lib/animations";

export function TeamPage() {
  const stats = [
    { value: "70+", label: "Team Members", icon: Users },
    { value: "50+", label: "Certifications", icon: Award },
    { value: "30+", label: "Years Experience", icon: Target },
    { value: "24/7", label: "Support Coverage", icon: Shield }
  ];

  const leadership = [
    {
      name: "Basudev Gangopadhyay",
      role: "Managing Director",
      image: "/images/team/basudev-ganguly.jpg",
      bio: "A highly accomplished technology executive with over 35 years of strategic and operational leadership across IT, data center engineering, and cybersecurity. He has worked for multinationals like TCS & Cognizant, where he served as Global Head for End-User services catering to IT infrastructure needs for 280,000+ users worldwide. He holds a degree from IISc, Bangalore and a PGDBM from IIM, Calcutta.",
    },
    {
      name: "Indranil Banerjee",
      role: "Director",
      image: "/images/team/indranil-banerjee.jpeg",
      bio: "A seasoned cybersecurity business leader with over 27 years of experience across cybersecurity, information security, and enterprise technology. He drives the organization's strategic vision, service innovation, and growth across national and global markets, with deep expertise in security strategy, risk management, and consulting-led service delivery.",
    },
    {
      name: "Vishy Narayan",
      role: "Sr. Vice President - North America",
      image: "/images/team/vishy-narayan.jpg",
      bio: "Leads ITOrigin's AI Strategy and Cybersecurity Practice across North America. A trusted advisor to C-suite executives, Vishy specializes in translating complex business challenges into actionable AI and security strategies. Prior to ITOrigin, he built and led enterprise consulting practices at Cognizant and Infosys and built wide area research networks at NASA. He holds degrees from IIM Bangalore and Louisiana State University.",
    },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
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
                href="/coming-soon?for=careers"
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
