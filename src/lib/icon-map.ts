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
  Twitter,
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
  type LucideIcon
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Shield,
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  CheckCircle2,
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
  Twitter,
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
};

export type IconName = keyof typeof iconMap;

export function getIcon(name: IconName): LucideIcon {
  return iconMap[name];
}
