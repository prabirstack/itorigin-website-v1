// Icon mapping utility to resolve icon names to components
// This allows passing icon names as strings from Server Components to Client Components

import {
  Shield,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  CheckCircle2,
  CheckCircle,
  ArrowRight,
  Calendar,
  Rocket,
  Heart,
  Lightbulb,
  Zap,
  Lock,
  Quote,
  Mail,
  Linkedin,
  Clock,
  Eye,
  Check,
  AlertTriangle,
  AlertCircle,
  Search,
  SearchCheck,
  Code,
  Database,
  Server,
  FileText,
  FileSearch,
  FileCheck2,
  BarChart,
  BarChart3,
  Settings,
  BookOpen,
  Newspaper,
  Video,
  FileCheck,
  Star,
  RefreshCcw,
  Home,
  Gift,
  Building2,
  Download,
  Phone,
  MapPin,
  GraduationCap,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Github,
  User,
  Bug,
  type LucideIcon
} from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import type { IconType } from "react-icons";
import { createElement, type SVGProps } from "react";

export const iconMap: Record<string, LucideIcon | IconType> = {
  Shield,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  CheckCircle2,
  CheckCircle,
  ArrowRight,
  Calendar,
  Rocket,
  Heart,
  Lightbulb,
  Zap,
  Lock,
  Quote,
  Mail,
  Linkedin,
  TwitterX: RiTwitterXFill, // X (formerly Twitter)
  Clock,
  Eye,
  Check,
  AlertTriangle,
  AlertCircle,
  Search,
  SearchCheck,
  Code,
  Database,
  Server,
  FileText,
  FileSearch,
  FileCheck2,
  BarChart,
  BarChart3,
  Settings,
  BookOpen,
  Newspaper,
  Video,
  FileCheck,
  Star,
  RefreshCcw,
  Home,
  Gift,
  Building2,
  Download,
  Phone,
  MapPin,
  GraduationCap,
  Send,
  Facebook,
  Instagram,
  Youtube,
  Github,
  User,
  Bug,
};

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon | IconType {
  return iconMap[name];
}

type DynamicIconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number | string;
};

// Stable, module-scope component for rendering an icon by name. Using
// createElement (instead of aliasing the looked-up component to a capitalized
// local variable and rendering it as JSX) keeps this from being treated as a
// component "created during render" by react-hooks/static-components.
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return createElement(Icon, props);
}
