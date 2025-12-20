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
  Search,
  Code,
  Database,
  Server,
  FileText,
  BarChart,
  Settings,
  BookOpen,
  Newspaper,
  Video,
  FileCheck,
  Star,
  RefreshCcw,
  Home,
  Gift,
  type LucideIcon
} from "lucide-react";
import { RiTwitterXFill } from "react-icons/ri";
import type { IconType } from "react-icons";

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
  Search,
  Code,
  Database,
  Server,
  FileText,
  BarChart,
  Settings,
  BookOpen,
  Newspaper,
  Video,
  FileCheck,
  Star,
  RefreshCcw,
  Home,
  Gift,
};

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon | IconType {
  return iconMap[name];
}
