"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { DynamicIcon, type IconName } from "@/lib/icon-map";

interface MissionVisionContent {
  badge: {
    icon: IconName;
    text: string;
  };
  title: string;
  description: string;
  values: string[];
}

interface MissionVisionSectionProps {
  mission: MissionVisionContent;
  vision: MissionVisionContent;
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <DynamicIcon name={mission.badge.icon} className="w-4 h-4" />
              <span>{mission.badge.text}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              {mission.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {mission.description}
            </p>
            <div className="space-y-3">
              {mission.values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-base font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <DynamicIcon name={vision.badge.icon} className="w-4 h-4" />
              <span>{vision.badge.text}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              {vision.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {vision.description}
            </p>
            <div className="space-y-3">
              {vision.values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-base font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
