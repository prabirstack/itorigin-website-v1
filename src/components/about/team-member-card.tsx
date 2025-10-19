"use client";

import { motion } from "motion/react";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  index?: number;
}

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
  linkedin,
  twitter,
  email,
  index = 0
}: TeamMemberCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index * 0.1}
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        {/* Image/Avatar */}
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <div className="aspect-square bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-6xl font-black text-primary/40">
                {name.charAt(0)}
              </div>
            )}
          </div>

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm font-semibold text-primary">
              {role}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm">
            {bio}
          </p>
        </div>

        {/* Social Links */}
        {(linkedin || twitter || email) && (
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={`${name}'s LinkedIn`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={`${name}'s Twitter`}
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={`Email ${name}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
