"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import Image from "next/image";
import { fadeInUp, scaleUp } from "@/lib/animations";

interface QuoteSectionProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export function QuoteSection({ quote, author, role, image }: QuoteSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
        >
          <motion.div
            variants={scaleUp}
            className="absolute -top-6 left-12"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary-foreground" />
            </div>
          </motion.div>

          <motion.blockquote
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold text-center mb-8 leading-relaxed"
          >
            &ldquo;{quote}&rdquo;
          </motion.blockquote>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-3"
          >
            {image && (
              <Image
                src={image}
                alt={author}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover"
              />
            )}
            <div className="text-center">
              <div className="font-bold text-lg">{author}</div>
              <div className="text-muted-foreground">{role}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
