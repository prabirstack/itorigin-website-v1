"use client";

import { motion } from "motion/react";
import { fadeInLeft, fadeInRight, scaleUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: IconName;
  color: string;
}

interface TimelineSectionProps {
  milestones: Milestone[];
}

export function TimelineSection({ milestones }: TimelineSectionProps) {
  return (
    <div className="relative">
      {/* Center line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      <div className="space-y-16 md:space-y-24">
        {milestones.map((milestone, index) => {
          const Icon = getIcon(milestone.icon);
          return (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Content */}
            <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
              <div className={`inline-block ${index % 2 === 0 ? "md:float-right" : "md:float-left"}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 max-w-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} text-white flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-black">{milestone.year}</div>
                      <div className="text-sm text-muted-foreground">Year</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Center dot */}
            <motion.div
              variants={scaleUp}
              className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary shadow-lg z-10 flex-shrink-0"
            >
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${milestone.color}`} />
            </motion.div>

            {/* Spacer for alignment */}
            <div className="hidden md:block flex-1" />
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
