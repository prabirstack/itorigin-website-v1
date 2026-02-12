"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Building2, ShieldCheck, Users, Clock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Government-Accredited Excellence",
    description:
      "One of the few security service providers in India accredited by both CERT-In and STQC, formally authorized by the Government of India to conduct cybersecurity assessments for government agencies and national critical infrastructure.",
  },
  {
    icon: Building2,
    title: "Founded by Industry Veterans",
    description:
      "Established in 2017 and headquartered in Kolkata, India, ITOrigin was founded by seasoned IT industry veterans with extensive leadership experience in global IT services organizations.",
  },
  {
    icon: Clock,
    title: "24x7 Security Operations",
    description:
      "Our global delivery framework is powered by a round-the-clock Security Operations Centre (SOC) and an integrated Governance, Risk & Compliance (GRC) practice, ensuring continuous protection and proactive threat detection.",
  },
  {
    icon: Users,
    title: "Elite Security Team",
    description:
      "A robust team of highly experienced consultants, auditors, and cybersecurity engineers delivering end-to-end cybersecurity, managed security operations, and rigorous regulatory compliance across industries and geographies.",
  },
];

export function AboutStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Building2 className="w-4 h-4" />
            Who We Are
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            Building Digital Trust at Scale
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            ITOrigin Technology Solutions Pvt. Ltd. is a globally recognized Managed Security and Cybersecurity Consulting firm, empowering enterprises and government organizations to build digital trust, resilience, and compliance in an increasingly complex cyber landscape.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              variants={fadeInUp}
              custom={index * 0.1}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
