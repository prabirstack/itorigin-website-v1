export interface SubMenuItem {
  id: string;
  name: string;
  href: string;
  description: string;
  iconName?: string | null;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  isSubMenu: boolean;
  subItems?: SubMenuItem[];
}

// Static navigation items (non-services, non-about)
export const staticNavItems: NavItem[] = [
  {
    id: "menuorigin02",
    name: "Platform",
    href: "/platform",
    isSubMenu: false,
  },
  {
    id: "menuorigin03",
    name: "Partner",
    href: "/partner",
    isSubMenu: false,
  },
  {
    id: "menuorigin04",
    name: "Training",
    href: "/training",
    isSubMenu: false,
  },
  {
    id: "menuorigin05",
    name: "Blogs",
    href: "/blogs",
    isSubMenu: false,
  },
];

// About page sub-items (static)
export const aboutSubItems: SubMenuItem[] = [
  {
    id: "SubMenuOrigin061",
    name: "Story",
    href: "/about/story",
    description: "Our journey in cybersecurity and mission to protect organizations worldwide",
    iconName: "BookOpen",
  },
  {
    id: "menuorigin062",
    name: "Team",
    href: "/about/team",
    description: "Meet the cybersecurity experts and professionals behind IT Origin's success",
    iconName: "Users",
  },
  {
    id: "menuorigin063",
    name: "Values",
    href: "/about/values",
    description: "Our core principles and commitment to excellence in cybersecurity services",
    iconName: "Heart",
  },
];

// Default services for fallback (when database is empty)
export const defaultServiceItems: SubMenuItem[] = [
  {
    id: "SubMenuOrigin011",
    name: "Managed SOC Services",
    href: "/services/managed-soc-services",
    description: "24/7 security operations center with advanced threat detection and incident response capabilities",
    iconName: "Shield",
  },
  {
    id: "menuorigin012",
    name: "Offensive Security",
    href: "/services/offensive-security",
    description: "Penetration testing, red team operations, and vulnerability assessments to strengthen your defenses",
    iconName: "Target",
  },
  {
    id: "menuorigin013",
    name: "GRC Services",
    href: "/services/grc-services",
    description: "Governance, risk management, and compliance solutions aligned with industry standards",
    iconName: "FileCheck",
  },
];

// Full nav items (for backward compatibility - includes hardcoded services)
export const navItems: NavItem[] = [
  {
    id: "menuorigin01",
    name: "Services",
    href: "/services",
    isSubMenu: true,
    subItems: defaultServiceItems,
  },
  ...staticNavItems,
  {
    id: "menuorigin06",
    name: "About",
    href: "/about",
    isSubMenu: true,
    subItems: aboutSubItems,
  },
];
