"use client";

import React from "react";
import { Phone, Mail, Twitter, Linkedin, Github } from "lucide-react";

export const Topbar: React.FC = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 hover:text-primary-foreground/80 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+1 (234) 567-890</span>
            </a>
            <a
              href="mailto:info@itorigin.com"
              className="flex items-center space-x-2 hover:text-primary-foreground/80 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@itorigin.com</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-xs">Follow Us:</span>
            <div className="flex items-center space-x-3">
              <a
                href="https://twitter.com/itorigin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/itorigin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/itorigin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground/80 transition-colors duration-200"
                aria-label="Follow us on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
