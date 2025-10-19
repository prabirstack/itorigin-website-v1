"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface TrainingPathCardProps {
  title: string;
  description: string;
  courses: string[];
  duration: string;
  icon: IconName;
  index?: number;
}

export function TrainingPathCard({
  title,
  description,
  courses,
  duration,
  icon,
  index = 0
}: TrainingPathCardProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary-foreground" />
      </div>

      <h3 className="text-2xl font-black mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-3">Course Sequence:</div>
        <ol className="space-y-3">
          {courses.map((course, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                {idx + 1}
              </div>
              <span className="text-sm text-muted-foreground pt-0.5">{course}</span>
            </li>
          ))}
        </ol>
      </div>

      <button className="w-full py-3 rounded-lg font-semibold border border-border hover:bg-accent transition-colors inline-flex items-center justify-center gap-2 group">
        View Path Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
