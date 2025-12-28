"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Users,
  MessageSquare,
  UserCircle,
  Send,
  Eye,
  Loader2,
  MessageCircle,
  Briefcase,
  Award,
  FolderDown,
  Download,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Settings,
  Tag,
  RefreshCw,
  BarChart3,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Stats {
  // Content
  publishedPosts: number;
  totalPosts: number;
  categories: number;
  // Leads & Subscribers
  totalLeads: number;
  newLeadsThisMonth: number;
  confirmedSubscribers: number;
  // Engagement
  pendingComments: number;
  approvedComments: number;
  activeChats: number;
  // Services & Case Studies
  activeServices: number;
  publishedCaseStudies: number;
  featuredCaseStudies: number;
  // Resources
  publishedResources: number;
  totalDownloads: number;
  downloadsThisMonth: number;
  // Campaigns
  totalCampaigns: number;
  sentCampaigns: number;
}

interface RecentPost {
  id: string;
  title: string;
  slug: string;
  viewCount: number;
  publishedAt: string | null;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  source: string;
  createdAt: string;
}

interface RecentDownload {
  id: string;
  name: string;
  email: string;
  downloadedAt: string;
  resource: { title: string };
}

interface TopResource {
  id: string;
  title: string;
  slug: string;
  downloadCount: number;
  type: string;
}

const sourceLabels: Record<string, string> = {
  contact_form: "Contact",
  newsletter: "Newsletter",
  download: "Download",
  chat: "Chat",
  referral: "Referral",
  other: "Other",
};

const typeLabels: Record<string, string> = {
  whitepaper: "Whitepaper",
  ebook: "eBook",
  guide: "Guide",
  report: "Report",
  template: "Template",
  checklist: "Checklist",
  "case-study": "Case Study",
  infographic: "Infographic",
  toolkit: "Toolkit",
  other: "Other",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentDownloads, setRecentDownloads] = useState<RecentDownload[]>([]);
  const [topResources, setTopResources] = useState<TopResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data.stats);
      setRecentPosts(data.recentPosts || []);
      setRecentLeads(data.recentLeads || []);
      setRecentDownloads(data.recentDownloads || []);
      setTopResources(data.topResources || []);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
  };

  // Overview stats cards
  const overviewCards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      change: stats?.newLeadsThisMonth || 0,
      changeLabel: "this month",
      icon: UserCircle,
      href: "/admin/leads",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Subscribers",
      value: stats?.confirmedSubscribers || 0,
      icon: Users,
      href: "/admin/subscribers",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Downloads",
      value: stats?.totalDownloads || 0,
      change: stats?.downloadsThisMonth || 0,
      changeLabel: "this month",
      icon: Download,
      href: "/admin/resources",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Active Chats",
      value: stats?.activeChats || 0,
      icon: MessageCircle,
      href: "/admin/chat",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  // Content section cards
  const contentCards = [
    {
      title: "Blog Posts",
      published: stats?.publishedPosts || 0,
      total: stats?.totalPosts || 0,
      icon: FileText,
      href: "/admin/posts",
      action: { label: "New Post", href: "/admin/posts/new" },
    },
    {
      title: "Categories",
      published: stats?.categories || 0,
      total: stats?.categories || 0,
      icon: Tag,
      href: "/admin/categories",
      action: { label: "Manage", href: "/admin/categories" },
    },
    {
      title: "Services",
      published: stats?.activeServices || 0,
      total: stats?.activeServices || 0,
      icon: Briefcase,
      href: "/admin/services",
      action: { label: "Manage", href: "/admin/services" },
    },
    {
      title: "Case Studies",
      published: stats?.publishedCaseStudies || 0,
      total: stats?.publishedCaseStudies || 0,
      icon: Award,
      href: "/admin/case-studies",
      action: { label: "Manage", href: "/admin/case-studies" },
    },
    {
      title: "Resources",
      published: stats?.publishedResources || 0,
      total: stats?.publishedResources || 0,
      icon: FolderDown,
      href: "/admin/resources",
      action: { label: "Add Resource", href: "/admin/resources" },
    },
    {
      title: "Campaigns",
      published: stats?.sentCampaigns || 0,
      total: stats?.totalCampaigns || 0,
      icon: Send,
      href: "/admin/campaigns",
      action: { label: "New Campaign", href: "/admin/campaigns" },
    },
  ];

  // Engagement cards
  const engagementCards = [
    {
      title: "Pending Comments",
      value: stats?.pendingComments || 0,
      icon: MessageSquare,
      href: "/admin/comments",
      urgent: (stats?.pendingComments || 0) > 0,
    },
    {
      title: "Approved Comments",
      value: stats?.approvedComments || 0,
      icon: MessageSquare,
      href: "/admin/comments",
    },
    {
      title: "Featured Case Studies",
      value: stats?.featuredCaseStudies || 0,
      icon: Award,
      href: "/admin/case-studies",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your site.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-card border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-all hover:shadow-md group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-bold">{card.value.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{card.title}</p>
            {card.change !== undefined && card.change > 0 && (
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+{card.change} {card.changeLabel}</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Content Management */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Content Management</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentCards.map((card) => (
            <div
              key={card.title}
              className="bg-card border rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <card.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{card.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {card.published} / {card.total} published
                    </p>
                  </div>
                </div>
              </div>
              {card.total > 0 && (
                <Progress
                  value={(card.published / card.total) * 100}
                  className="h-1.5 mb-4"
                />
              )}
              <div className="flex items-center justify-between">
                <Link
                  href={card.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all
                </Link>
                <Link
                  href={card.action.href}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {card.action.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Stats */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Engagement</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {engagementCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`bg-card border rounded-xl p-5 shadow-sm hover:border-primary/50 transition-colors ${
                card.urgent ? "border-orange-500/50 bg-orange-500/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${card.urgent ? "bg-orange-500/10" : "bg-muted"}`}>
                  <card.icon className={`w-4 h-4 ${card.urgent ? "text-orange-500" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${card.urgent ? "text-orange-500" : ""}`}>
                    {card.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Posts */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Top Posts</h2>
            </div>
            <Link href="/admin/posts" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No published posts yet</p>
              <Link href="/admin/posts/new" className="text-sm text-primary hover:underline mt-2 inline-block">
                Create your first post
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="text-xs font-medium text-muted-foreground w-5">
                    #{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    {post.publishedAt && (
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="font-medium">{post.viewCount.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Recent Leads</h2>
            </div>
            <Link href="/admin/leads" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="text-center py-8">
              <UserCircle className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No leads yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                      {sourceLabels[lead.source] || lead.source}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(lead.createdAt), "MMM d")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Top Resources */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FolderDown className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Top Resources</h2>
            </div>
            <Link href="/admin/resources" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {topResources.length === 0 ? (
            <div className="text-center py-8">
              <FolderDown className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No resources yet</p>
              <Link href="/admin/resources" className="text-sm text-primary hover:underline mt-2 inline-block">
                Add your first resource
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {topResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <span className="text-xs font-medium text-muted-foreground w-5">
                    #{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{resource.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {typeLabels[resource.type] || resource.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-3.5 h-3.5" />
                    <span className="font-medium">{resource.downloadCount?.toLocaleString() || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Downloads */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-primary" />
              <h2 className="font-semibold">Recent Downloads</h2>
            </div>
            <Link href="/admin/resources" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentDownloads.length === 0 ? (
            <div className="text-center py-8">
              <Download className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No downloads yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentDownloads.map((download) => (
                <div
                  key={download.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{download.name || "Anonymous"}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {download.resource?.title || "Unknown resource"}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(download.downloadedAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted hover:border-primary/50 transition-all"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium">New Post</span>
          </Link>
          <Link
            href="/admin/campaigns"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted hover:border-primary/50 transition-all"
          >
            <Send className="w-5 h-5 text-primary" />
            <span className="font-medium">Send Campaign</span>
          </Link>
          <Link
            href="/admin/chat"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted hover:border-primary/50 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="font-medium">View Chats</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted hover:border-primary/50 transition-all"
          >
            <UserCircle className="w-5 h-5 text-primary" />
            <span className="font-medium">View Leads</span>
          </Link>
          <Link
            href="/admin/comments"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted hover:border-primary/50 transition-all"
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="font-medium">Moderate</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted hover:border-primary/50 transition-all"
          >
            <Settings className="w-5 h-5 text-primary" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
