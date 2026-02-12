"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer, scaleUp } from "@/lib/animations";
import { Shield, Award, FileCheck2, CheckCircle2, BadgeCheck } from "lucide-react";

const certifications = [
  { icon: Shield, label: "ISO 9001:2015", description: "Quality Management" },
  { icon: Award, label: "ISO 27001:2022", description: "Information Security" },
  { icon: FileCheck2, label: "ISO 20000-1:2018", description: "IT Service Management" },
  { icon: CheckCircle2, label: "ISO 17025", description: "Testing & Calibration" },
];

const empanelments = [
  { icon: Shield, label: "CERT-In", description: "Indian Computer Emergency Response Team" },
  { icon: BadgeCheck, label: "STQC", description: "Standardisation Testing & Quality Certification" },
  { icon: Award, label: "NICSI", description: "National Informatics Centre Services Inc." },
];

export function CertificationsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/30 via-transparent to-accent/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Trusted & Certified
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-black mb-4"
          >
            Certifications & Empanelments
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground"
          >
            Recognized by leading standards bodies and government agencies for our commitment to quality, security, and excellence.
          </motion.p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.h3 variants={fadeInUp} className="text-sm font-semibold text-primary uppercase tracking-widest mb-6 text-center">
            Certifications
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.label}
                variants={scaleUp}
                custom={index * 0.1}
                className="group relative text-center p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <cert.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-base sm:text-lg font-black mb-1">
                    {cert.label}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {cert.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empanelments */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 variants={fadeInUp} className="text-sm font-semibold text-primary uppercase tracking-widest mb-6 text-center">
            Empanelments
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {empanelments.map((emp, index) => (
              <motion.div
                key={emp.label}
                variants={scaleUp}
                custom={index * 0.1}
                className="group relative text-center p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <emp.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-base sm:text-lg font-black mb-1">
                    {emp.label}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {emp.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
