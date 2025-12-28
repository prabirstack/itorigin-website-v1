"use client";

import React from "react";
import { motion } from "motion/react";
import { footerStats } from "@/lib/data/footer-data";
import { iconMap } from "@/lib/icon-map";

export function FooterStats() {
  return (
    <div className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerStats.map((stat, index) => {
            const IconComponent = iconMap[stat.iconName];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto">
                  {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
