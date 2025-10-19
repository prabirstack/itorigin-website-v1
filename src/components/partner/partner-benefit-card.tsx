"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { getIcon, type IconName } from "@/lib/icon-map";

interface PartnerBenefitCardProps {
  title: string;
  description: string;
  icon: IconName;
  keyBenefits: string[];
  index?: number;
}

export function PartnerBenefitCard({
  title,
  description,
  icon,
  keyBenefits,
  index = 0
}: PartnerBenefitCardProps) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className="p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>

      <h3 className="text-xl font-black mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div>
        <div className="text-sm font-semibold mb-3">Key Benefits:</div>
        <ul className="space-y-2">
          {keyBenefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
