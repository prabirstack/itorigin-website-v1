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
} from "lucide-react";
import { format } from "date-fns";

interface Stats {
  publishedPosts: number;
  totalLeads: number;
  confirmedSubscribers: number;
  pendingComments: number;
  activeChats: number;
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

const sourceLabels: Record<string, string> = {
  contact_form: "Contact Form",
  newsletter: "Newsletter",
  download: "Download",
  chat: "Chat",
  referral: "Referral",
  other: "Other",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data.stats);
        setRecentPosts(data.recentPosts || []);
        setRecentLeads(data.recentLeads || []);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Published Posts",
      value: stats?.publishedPosts || 0,
      icon: FileText,
      href: "/admin/posts",
    },
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      icon: UserCircle,
      href: "/admin/leads",
    },
    {
      title: "Subscribers",
      value: stats?.confirmedSubscribers || 0,
      icon: Users,
      href: "/admin/subscribers",
    },
    {
      title: "Pending Comments",
      value: stats?.pendingComments || 0,
      icon: MessageSquare,
      href: "/admin/comments",
    },
    {
      title: "Active Chats",
      value: stats?.activeChats || 0,
      icon: MessageCircle,
      href: "/admin/chat",
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
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your site.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-card border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Posts */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Posts</h2>
            <Link
              href="/admin/posts"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No published posts yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    {post.publishedAt && (
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
                    <Eye className="w-4 h-4" />
                    {post.viewCount.toLocaleString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No leads yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.email}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">
                    <p>{sourceLabels[lead.source] || lead.source}</p>
                    <p>{format(new Date(lead.createdAt), "MMM d")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium">New Post</span>
          </Link>
          <Link
            href="/admin/chat"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="font-medium">View Chats</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors"
          >
            <UserCircle className="w-5 h-5 text-primary" />
            <span className="font-medium">View Leads</span>
          </Link>
          <Link
            href="/admin/comments"
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="font-medium">Moderate Comments</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
