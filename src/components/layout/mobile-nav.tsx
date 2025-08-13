"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
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


interface MobileSubMenuProps {
  items: SubMenuItem[];
  isOpen: boolean;
  onItemClick: () => void;
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

const MobileSubMenu: React.FC<MobileSubMenuProps> = ({ items, isOpen, onItemClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden bg-accent/30 rounded-lg ml-4 mt-2"
      >
        <div className="py-2">
          {items.map((item) => {
            const IconComponent = getServiceIcon(item.name);
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-start space-x-3 px-4 py-3 hover:bg-accent/50 rounded-md mx-2 transition-colors duration-200"
                onClick={onItemClick}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 mt-0.5 flex-shrink-0">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
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

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setExpandedItems(new Set());
    }
  };

  const toggleSubMenu = (itemId: string): void => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
    setExpandedItems(new Set());
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <motion.button
          onClick={toggleMenu}
          className={`flex items-center justify-center w-10 h-10 rounded-md border transition-colors duration-200 relative ${
            isOpen 
              ? 'bg-primary text-primary-foreground border-primary z-[99999]' 
              : 'bg-background border-border hover:bg-accent text-foreground z-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          style={{ zIndex: isOpen ? 99999 : 50 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Overlay - Portal Style */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 lg:hidden"
            style={{ 
              zIndex: 99998,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeMenu}
              style={{ zIndex: 1 }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl"
              style={{ zIndex: 2 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                  <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
                  <div className="w-8 h-8"></div> {/* Spacer to center the title */}
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-2">
                    {navItems.map((item: NavItem) => (
                      <div key={item.id}>
                        {item.isSubMenu ? (
                          <>
                            <button
                              onClick={() => toggleSubMenu(item.id)}
                              className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-foreground hover:bg-accent transition-colors duration-200 font-medium text-left"
                              aria-expanded={expandedItems.has(item.id)}
                            >
                              <span className="text-sm">{item.name}</span>
                              <motion.div
                                animate={{ rotate: expandedItems.has(item.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0 ml-2"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.div>
                            </button>
                            {item.subItems && (
                              <MobileSubMenu
                                items={item.subItems}
                                isOpen={expandedItems.has(item.id)}
                                onItemClick={closeMenu}
                              />
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-3 py-3 rounded-lg text-foreground hover:bg-accent transition-colors duration-200 font-medium text-sm"
                            onClick={closeMenu}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border shrink-0">
                  <div className="text-sm text-muted-foreground text-center">
                    IT Origin - Cybersecurity Excellence
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};