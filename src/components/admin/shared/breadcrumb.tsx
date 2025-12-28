"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const pathLabels: Record<string, string> = {
  admin: "Dashboard",
  posts: "Posts",
  new: "New",
  edit: "Edit",
  categories: "Categories",
  comments: "Comments",
  tags: "Tags",
  leads: "Leads",
  subscribers: "Subscribers",
  services: "Services",
  "case-studies": "Case Studies",
  campaigns: "Campaigns",
  chat: "Chat",
  resources: "Resources",
  settings: "Settings",
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const segments = pathname.split("/").filter(Boolean);
    const result: BreadcrumbItem[] = [];

    segments.forEach((segment, index) => {
      // Skip ID segments (they look like random strings)
      if (segment.length > 10 && !pathLabels[segment]) {
        return;
      }

      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

      result.push({ label, href });
    });

    return result;
  })();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href || `breadcrumb-${index}`} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            )}
            {index === 0 && (
              <Home className="w-4 h-4 mr-1" />
            )}
            {index === breadcrumbItems.length - 1 || !item.href ? (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
