"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { scaleUp } from "@/lib/animations";
import { iconMap } from "@/lib/icon-map";

interface EngagementCardProps {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradient: string;
  iconBg: string;
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
  index: number;
}

export function EngagementCard({
  title,
  description,
  iconName,
  gradient,
  iconBg,
  ctaText,
  ctaLink,
  popular,
  index,
}: EngagementCardProps) {
  const Icon = iconMap[iconName];

  return (
    <motion.div
      variants={scaleUp}
      custom={index * 0.1}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="group w-full"
    >
      <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 relative overflow-hidden">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
          {/* Popular badge */}
          {popular && (
            <div className="absolute -top-2 -right-2 z-20">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" />
                Popular
              </div>
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} border-2 border-border/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500`}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center shadow-xl`}
              >
                <div className="text-white">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
              {title}
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base group-hover:text-muted-foreground/90 transition-colors leading-relaxed flex-grow">
              {description}
            </p>
          </div>

          <div className="mt-4 sm:mt-6">
            <Link
              href={ctaLink}
              className="w-full flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group/btn text-sm h-9 px-3 rounded-md font-medium"
            >
              {ctaText}
              <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Card shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
