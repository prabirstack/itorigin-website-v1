"use client";

import React from "react";
import { Phone, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import { motion } from "motion/react";

export const Topbar: React.FC = () => {
  return (
    <motion.div
      className="relative bg-gradient-to-r from-primary/95 via-primary to-primary/95 text-primary-foreground border-b border-primary-foreground/10 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between py-2.5">
          {/* Contact Info */}
          <motion.div
            className="flex items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href="tel:+1234567890"
              className="group flex items-center gap-2 text-xs sm:text-sm font-medium hover:text-primary-foreground/80 transition-all duration-300"
            >
              <span className="p-1 rounded-md bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-colors duration-300">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span className="hidden sm:inline">+1 (234) 567-890</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-primary-foreground/20" />
            <a
              href="mailto:info@itorigin.com"
              className="group flex items-center gap-2 text-xs sm:text-sm font-medium hover:text-primary-foreground/80 transition-all duration-300"
            >
              <span className="p-1 rounded-md bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-colors duration-300">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <span className="hidden sm:inline">info@itorigin.com</span>
            </a>
            <div className="hidden lg:block w-px h-4 bg-primary-foreground/20" />
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium">
              <span className="p-1 rounded-md bg-primary-foreground/10">
                <MapPin className="w-3.5 h-3.5" />
              </span>
              <span className="opacity-90">San Francisco, CA</span>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hidden md:inline text-xs font-medium opacity-90">
              Connect:
            </span>
            <div className="flex items-center gap-2">
              <motion.a
                href="https://twitter.com/itorigin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300"
                aria-label="Follow us on X (formerly Twitter)"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiTwitterXFill className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/itorigin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300"
                aria-label="Follow us on LinkedIn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                href="https://github.com/itorigin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300"
                aria-label="Follow us on GitHub"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent" />
    </motion.div>
  );
};
