"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Shield,
  Target,
  FileCheck,
  BookOpen,
  Users,
  Heart,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem, navItems, SubMenuItem } from "@/lib/constant";


interface DropdownMenuProps {
  items: SubMenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

const getServiceIcon = (name: string) => {
  if (name.includes("SOC")) return Shield;
  if (name.includes("Offensive")) return Target;
  if (name.includes("GRC")) return FileCheck;
  if (name.includes("Story")) return BookOpen;
  if (name.includes("Team")) return Users;
  if (name.includes("Values")) return Heart;
  return ExternalLink;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg backdrop-blur-sm z-50"
        onMouseLeave={onClose}
      >
        <div className="p-2">
          {items.map((item) => {
            const IconComponent = getServiceIcon(item.name);
            return (
              <Link
                key={item.id}
                href={item.href}
                className="block p-3 rounded-md hover:bg-accent transition-colors duration-200 group"
                onClick={onClose}
              >
                {" "}
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const DesktopNav: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (itemId: string): void => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = (): void => {
    setActiveDropdown(null);
  };

  const closeDropdown = (): void => {
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {navItems.map((item: NavItem) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => (item.isSubMenu ? handleMouseEnter(item.id) : undefined)}
          onMouseLeave={item.isSubMenu ? handleMouseLeave : undefined}
        >
          {item.isSubMenu ? (
            <button
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-all duration-200 font-medium"
              aria-expanded={activeDropdown === item.id}
              aria-haspopup="true"
            >
              <span>{item.name}</span>
              <motion.div
                animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          ) : (
            <Link
              href={item.href}
              className="px-4 py-2 rounded-md text-foreground hover:text-primary hover:bg-accent transition-all duration-200 font-medium"
            >
              {item.name}
            </Link>
          )}

          {item.isSubMenu && item.subItems && (
            <DropdownMenu
              items={item.subItems}
              isOpen={activeDropdown === item.id}
              onClose={closeDropdown}
            />
          )}
        </div>
      ))}
    </nav>
  );
};
