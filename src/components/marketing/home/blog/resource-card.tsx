"use client";

import React from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scaleUp } from "@/lib/animations";
import { iconMap } from "@/lib/icon-map";

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  iconName: string;
  type: string;
  index: number;
  onDownloadClick: () => void;
}

export function ResourceCard({
  title,
  description,
  iconName,
  type,
  index,
  onDownloadClick,
}: ResourceCardProps) {
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
      <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
        <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-border/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 shrink-0">
              {Icon && <Icon className="w-6 h-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-xs bg-primary/10 text-primary border-primary/20"
                >
                  {type}
                </Badge>
              </div>
              <h4 className="text-base sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                {title}
              </h4>
              <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors text-sm leading-relaxed flex-grow">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onDownloadClick}
              className="w-full border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary hover:text-primary group/btn text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover/btn:animate-bounce" />
              Download Resource
            </Button>
          </div>

          {/* Card shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
