"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
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
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Stats {
  publishedPosts: number;
  totalPosts: number;
  categories: number;
  totalLeads: number;
  newLeadsThisMonth: number;
  confirmedSubscribers: number;
  pendingComments: number;
  approvedComments: number;
  activeChats: number;
  activeServices: number;
  publishedCaseStudies: number;
  featuredCaseStudies: number;
  publishedResources: number;
  totalDownloads: number;
  downloadsThisMonth: number;
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17,
    },
  },
} as const;

const pulseVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1] as number[],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

// Animated counter component
function AnimatedCounter({ value, duration = 1 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
}

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

  const overviewCards = [
    {
      title: "Total Leads",
      value: stats?.totalLeads || 0,
      change: stats?.newLeadsThisMonth || 0,
      changeLabel: "this month",
      icon: UserCircle,
      href: "/admin/leads",
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      borderColor: "hover:border-blue-500/50",
    },
    {
      title: "Subscribers",
      value: stats?.confirmedSubscribers || 0,
      icon: Users,
      href: "/admin/subscribers",
      gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-500",
      borderColor: "hover:border-emerald-500/50",
    },
    {
      title: "Total Downloads",
      value: stats?.totalDownloads || 0,
      change: stats?.downloadsThisMonth || 0,
      changeLabel: "this month",
      icon: Download,
      href: "/admin/resources",
      gradient: "from-violet-500/20 via-violet-500/10 to-transparent",
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-500",
      borderColor: "hover:border-violet-500/50",
    },
    {
      title: "Active Chats",
      value: stats?.activeChats || 0,
      icon: MessageCircle,
      href: "/admin/chat",
      gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500",
      borderColor: "hover:border-amber-500/50",
    },
  ];

  const contentCards = [
    {
      title: "Blog Posts",
      published: stats?.publishedPosts || 0,
      total: stats?.totalPosts || 0,
      icon: FileText,
      href: "/admin/posts",
      action: { label: "New Post", href: "/admin/posts/new" },
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      title: "Categories",
      published: stats?.categories || 0,
      total: stats?.categories || 0,
      icon: Tag,
      href: "/admin/categories",
      action: { label: "Manage", href: "/admin/categories" },
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Services",
      published: stats?.activeServices || 0,
      total: stats?.activeServices || 0,
      icon: Briefcase,
      href: "/admin/services",
      action: { label: "Manage", href: "/admin/services" },
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      title: "Case Studies",
      published: stats?.publishedCaseStudies || 0,
      total: stats?.publishedCaseStudies || 0,
      icon: Award,
      href: "/admin/case-studies",
      action: { label: "Manage", href: "/admin/case-studies" },
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Resources",
      published: stats?.publishedResources || 0,
      total: stats?.publishedResources || 0,
      icon: FolderDown,
      href: "/admin/resources",
      action: { label: "Add Resource", href: "/admin/resources" },
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      title: "Campaigns",
      published: stats?.sentCampaigns || 0,
      total: stats?.totalCampaigns || 0,
      icon: Send,
      href: "/admin/campaigns",
      action: { label: "New Campaign", href: "/admin/campaigns" },
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
  ];

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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
              Dashboard
            </h1>
            <motion.div
              variants={pulseVariants}
              initial="initial"
              animate="pulse"
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your site.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="group"
        >
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
          </motion.div>
          Refresh
        </Button>
      </motion.div>

      {/* Overview Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={card.href}
              className={`block relative overflow-hidden bg-card border rounded-2xl p-6 shadow-sm transition-colors ${card.borderColor}`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-50`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`p-3 rounded-xl ${card.iconBg}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </motion.div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-3xl font-bold tracking-tight">
                  <AnimatedCounter value={card.value} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{card.title}</p>
                {card.change !== undefined && card.change > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-1 mt-3 text-xs text-emerald-600 dark:text-emerald-400"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>+{card.change} {card.changeLabel}</span>
                  </motion.div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Content Management */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Content Management</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`p-2.5 rounded-xl ${card.bgColor}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <card.icon className={`w-4 h-4 ${card.color}`} />
                  </motion.div>
                  <div>
                    <h3 className="font-medium">{card.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {card.published} / {card.total} published
                    </p>
                  </div>
                </div>
              </div>
              {card.total > 0 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                >
                  <Progress
                    value={(card.published / card.total) * 100}
                    className="h-1.5 mb-4"
                  />
                </motion.div>
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
                  className="text-sm text-primary hover:underline flex items-center gap-1 group"
                >
                  {card.action.label}
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Engagement Stats */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Engagement</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {engagementCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={card.href}
                className={`block bg-card border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md ${
                  card.urgent
                    ? "border-orange-500/50 bg-linear-to-br from-orange-500/10 to-transparent"
                    : "hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`p-2.5 rounded-xl ${card.urgent ? "bg-orange-500/20" : "bg-muted"}`}
                    animate={card.urgent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <card.icon className={`w-4 h-4 ${card.urgent ? "text-orange-500" : "text-muted-foreground"}`} />
                  </motion.div>
                  <div>
                    <p className={`text-2xl font-bold ${card.urgent ? "text-orange-500" : ""}`}>
                      <AnimatedCounter value={card.value} duration={0.5} />
                    </p>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Grid */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {/* Top Posts */}
        <motion.div
          className="bg-card border rounded-2xl p-6 shadow-sm"
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-500/10">
                <FileText className="w-4 h-4 text-sky-500" />
              </div>
              <h2 className="font-semibold">Top Posts</h2>
            </div>
            <Link href="/admin/posts" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <AnimatePresence>
            {recentPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No published posts yet</p>
                <Link href="/admin/posts/new" className="text-sm text-primary hover:underline mt-2 inline-block">
                  Create your first post
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
                    className="rounded-xl transition-colors"
                  >
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="flex items-center gap-3 p-3"
                    >
                      <span className="text-xs font-bold text-primary/60 w-6 text-center">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{post.title}</p>
                        {post.publishedAt && (
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(post.publishedAt), "MMM d, yyyy")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="font-medium">{post.viewCount.toLocaleString()}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          className="bg-card border rounded-2xl p-6 shadow-sm"
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10">
                <UserCircle className="w-4 h-4 text-blue-500" />
              </div>
              <h2 className="font-semibold">Recent Leads</h2>
            </div>
            <Link href="/admin/leads" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <AnimatePresence>
            {recentLeads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <UserCircle className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No leads yet</p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {recentLeads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
                    className="rounded-xl transition-colors"
                  >
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                      </div>
                      <div className="text-right ml-4 flex items-center gap-2">
                        <span className="inline-block px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary font-medium">
                          {sourceLabels[lead.source] || lead.source}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(lead.createdAt), "MMM d")}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Top Resources */}
        <motion.div
          className="bg-card border rounded-2xl p-6 shadow-sm"
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-500/10">
                <FolderDown className="w-4 h-4 text-violet-500" />
              </div>
              <h2 className="font-semibold">Top Resources</h2>
            </div>
            <Link href="/admin/resources" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <AnimatePresence>
            {topResources.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <FolderDown className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No resources yet</p>
                <Link href="/admin/resources" className="text-sm text-primary hover:underline mt-2 inline-block">
                  Add your first resource
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {topResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
                    className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  >
                    <span className="text-xs font-bold text-primary/60 w-6 text-center">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{resource.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {typeLabels[resource.type] || resource.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                      <Download className="w-3.5 h-3.5" />
                      <span className="font-medium">{resource.downloadCount?.toLocaleString() || 0}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Recent Downloads */}
        <motion.div
          className="bg-card border rounded-2xl p-6 shadow-sm"
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10">
                <Download className="w-4 h-4 text-emerald-500" />
              </div>
              <h2 className="font-semibold">Recent Downloads</h2>
            </div>
            <Link href="/admin/resources" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <AnimatePresence>
            {recentDownloads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Download className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No downloads yet</p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {recentDownloads.map((download, index) => (
                  <motion.div
                    key={download.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
                    className="flex items-center justify-between p-3 rounded-xl transition-colors"
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
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="bg-linear-to-br from-card via-card to-muted/30 border rounded-2xl p-6 shadow-sm"
      >
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {[
            { href: "/admin/posts/new", icon: FileText, label: "New Post", color: "text-sky-500", bg: "bg-sky-500/10" },
            { href: "/admin/campaigns", icon: Send, label: "Send Campaign", color: "text-rose-500", bg: "bg-rose-500/10" },
            { href: "/admin/chat", icon: MessageCircle, label: "View Chats", color: "text-amber-500", bg: "bg-amber-500/10" },
            { href: "/admin/leads", icon: UserCircle, label: "View Leads", color: "text-blue-500", bg: "bg-blue-500/10" },
            { href: "/admin/comments", icon: MessageSquare, label: "Moderate", color: "text-violet-500", bg: "bg-violet-500/10" },
            { href: "/admin/settings", icon: Settings, label: "Settings", color: "text-slate-500", bg: "bg-slate-500/10" },
          ].map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-primary/30 transition-all hover:shadow-md"
              >
                <div className={`p-2 rounded-lg ${action.bg}`}>
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="font-medium text-sm">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
