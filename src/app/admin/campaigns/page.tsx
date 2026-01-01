"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Trash2,
  Loader2,
  Mail,
  Send,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Paperclip,
  Upload,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";
import { toast } from "sonner";
import {
  emailTemplates,
  templateCategories,
  type EmailTemplate,
} from "@/lib/email-templates";

interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  previewText: string | null;
  htmlContent: string;
  status: "draft" | "scheduled" | "sending" | "sent" | "cancelled";
  campaignType: "one-time" | "monthly" | "welcome";
  recurringDay: number | null;
  isRecurringActive: boolean;
  scheduledAt: string | null;
  sentAt: string | null;
  lastSentAt: string | null;
  totalRecipients: number;
  sentCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  attachments: Attachment[];
  socialLinks: SocialLinks | null;
  createdAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface FormData {
  name: string;
  subject: string;
  previewText: string;
  htmlContent: string;
  campaignType: "one-time" | "monthly" | "welcome";
  recurringDay: number | null;
  isRecurringActive: boolean;
  attachments: Attachment[];
  socialLinks: SocialLinks;
}

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const, icon: Edit },
  scheduled: { label: "Scheduled", variant: "outline" as const, icon: Clock },
  sending: { label: "Sending", variant: "default" as const, icon: Loader2 },
  sent: { label: "Sent", variant: "default" as const, icon: CheckCircle },
  cancelled: { label: "Cancelled", variant: "destructive" as const, icon: XCircle },
};

const campaignTypeConfig = {
  "one-time": { label: "One-Time", icon: Send },
  monthly: { label: "Monthly", icon: Calendar },
  welcome: { label: "Welcome", icon: Mail },
};

const initialFormData: FormData = {
  name: "",
  subject: "",
  previewText: "",
  htmlContent: "",
  campaignType: "one-time",
  recurringDay: null,
  isRecurringActive: false,
  attachments: [],
  socialLinks: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    website: "",
  },
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sendId, setSendId] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [templateCategory, setTemplateCategory] = useState<string>("all");

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCampaigns = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);

      const res = await fetch(`/api/admin/campaigns?${params}`);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setPagination(data.pagination || null);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [statusFilter, typeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCampaigns(1);
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          socialLinks: Object.fromEntries(
            Object.entries(formData.socialLinks).filter(([, v]) => v)
          ),
        }),
      });

      if (res.ok) {
        toast.success("Campaign created successfully");
        setIsCreateOpen(false);
        setFormData(initialFormData);
        fetchCampaigns(pagination?.page || 1);
      } else {
        toast.error("Failed to create campaign");
      }
    } catch (error) {
      toast.error("Failed to create campaign");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedCampaign) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/campaigns/${selectedCampaign.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          socialLinks: Object.fromEntries(
            Object.entries(formData.socialLinks).filter(([, v]) => v)
          ),
        }),
      });

      if (res.ok) {
        toast.success("Campaign updated successfully");
        setIsEditOpen(false);
        setSelectedCampaign(null);
        fetchCampaigns(pagination?.page || 1);
      } else {
        toast.error("Failed to update campaign");
      }
    } catch (error) {
      toast.error("Failed to update campaign");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/campaigns/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Campaign deleted successfully");
      } else {
        toast.error("Failed to delete campaign");
      }
      fetchCampaigns(pagination?.page || 1);
    } catch (error) {
      toast.error("Failed to delete campaign");
    } finally {
      setDeleteId(null);
    }
  };

  const handleSend = async () => {
    if (!sendId) return;
    setIsSending(true);
    try {
      const res = await fetch(`/api/admin/campaigns/${sendId}/send`, {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Campaign sent to ${data.sentCount} subscribers!`);
        fetchCampaigns(pagination?.page || 1);
      } else {
        toast.error(data.error || "Failed to send campaign");
      }
    } catch (error) {
      toast.error("Failed to send campaign");
    } finally {
      setIsSending(false);
      setSendId(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          attachments: [...prev.attachments, data.attachment],
        }));
        toast.success("File uploaded successfully");
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to upload file");
      }
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeAttachment = async (attachment: Attachment) => {
    try {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: attachment.url }),
      });
      setFormData((prev) => ({
        ...prev,
        attachments: prev.attachments.filter((a) => a.id !== attachment.id),
      }));
    } catch (error) {
      console.error("Failed to remove attachment:", error);
    }
  };

  const openEditDialog = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setFormData({
      name: campaign.name,
      subject: campaign.subject,
      previewText: campaign.previewText || "",
      htmlContent: campaign.htmlContent,
      campaignType: campaign.campaignType,
      recurringDay: campaign.recurringDay,
      isRecurringActive: campaign.isRecurringActive,
      attachments: campaign.attachments || [],
      socialLinks: campaign.socialLinks || {
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
        youtube: "",
        website: "",
      },
    });
    setIsEditOpen(true);
  };

  const openPreview = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsPreviewOpen(true);
  };

  const openTemplateSelector = () => {
    setTemplateCategory("all");
    setSelectedTemplate(null);
    setIsTemplateOpen(true);
  };

  const selectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      ...initialFormData,
      name: template.name,
      subject: template.subject,
      previewText: template.previewText,
      htmlContent: template.htmlContent,
      campaignType: template.category === "welcome" ? "welcome" :
                    template.category === "newsletter" && template.id.includes("monthly") ? "monthly" : "one-time",
    });
    setIsTemplateOpen(false);
    setIsCreateOpen(true);
  };

  const startFromScratch = () => {
    setFormData(initialFormData);
    setSelectedTemplate(null);
    setIsTemplateOpen(false);
    setIsCreateOpen(true);
  };

  const previewTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsTemplatePreviewOpen(true);
  };

  const filteredTemplates = templateCategory === "all"
    ? emailTemplates
    : emailTemplates.filter(t => t.category === templateCategory);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const CampaignForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="attachments">Attachments</TabsTrigger>
        <TabsTrigger value="social">Social Links</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 pt-4">
        <div>
          <Label>Campaign Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Monthly Newsletter - January"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Subject Line</Label>
          <Input
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Your January Security Digest"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            For monthly: use {"{{month}}"} and {"{{year}}"} placeholders
          </p>
        </div>
        <div>
          <Label>Preview Text</Label>
          <Input
            value={formData.previewText}
            onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
            placeholder="See what's new in cybersecurity this month..."
            className="mt-1"
          />
        </div>
        <div>
          <Label>HTML Content</Label>
          <Textarea
            value={formData.htmlContent}
            onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
            placeholder="<html>...</html>"
            className="mt-1 min-h-50 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Placeholders: {"{{name}}"}, {"{{email}}"}, {"{{unsubscribe_url}}"}, {"{{social_links}}"}, {"{{month}}"}, {"{{year}}"}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4 pt-4">
        <div>
          <Label>Campaign Type</Label>
          <Select
            value={formData.campaignType}
            onValueChange={(value: "one-time" | "monthly" | "welcome") =>
              setFormData({ ...formData, campaignType: value })
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  One-Time Campaign
                </div>
              </SelectItem>
              <SelectItem value="monthly">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Monthly Newsletter
                </div>
              </SelectItem>
              <SelectItem value="welcome">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Welcome Email
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.campaignType === "monthly" && (
          <>
            <div>
              <Label>Send on Day of Month</Label>
              <Select
                value={formData.recurringDay?.toString() || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, recurringDay: parseInt(value) })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day === 1 ? "1st" : day === 2 ? "2nd" : day === 3 ? "3rd" : `${day}th`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Campaign will automatically send on this day each month
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Active Recurring</Label>
                <p className="text-xs text-muted-foreground">
                  Enable automatic monthly sending
                </p>
              </div>
              <Switch
                checked={formData.isRecurringActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isRecurringActive: checked })
                }
              />
            </div>
          </>
        )}

        {formData.campaignType === "welcome" && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Welcome emails are automatically sent to new subscribers after they confirm their subscription.
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="attachments" className="space-y-4 pt-4">
        <div>
          <Label>Attachments</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Max 10MB per file. Allowed: PDF, DOC, DOCX, XLS, XLSX, images, TXT, CSV
          </p>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.txt,.csv"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Upload File
            </Button>
          </div>
        </div>

        {formData.attachments.length > 0 && (
          <div className="space-y-2">
            {formData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="social" className="space-y-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Add social media links to include in your email footer. Use {"{{social_links}}"} placeholder in your HTML.
        </p>
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Facebook className="w-5 h-5 text-blue-600" />
            <Input
              value={formData.socialLinks.facebook || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                })
              }
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div className="flex items-center gap-3">
            <Twitter className="w-5 h-5 text-sky-500" />
            <Input
              value={formData.socialLinks.twitter || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                })
              }
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="w-5 h-5 text-blue-700" />
            <Input
              value={formData.socialLinks.linkedin || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-pink-600" />
            <Input
              value={formData.socialLinks.instagram || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          <div className="flex items-center gap-3">
            <Youtube className="w-5 h-5 text-red-600" />
            <Input
              value={formData.socialLinks.youtube || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                })
              }
              placeholder="https://youtube.com/@yourchannel"
            />
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-600" />
            <Input
              value={formData.socialLinks.website || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, website: e.target.value },
                })
              }
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Email Campaigns</h1>
          <p className="text-muted-foreground">Create and manage email campaigns</p>
        </div>
        <Button onClick={openTemplateSelector}>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-35">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-35">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="one-time">One-Time</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="welcome">Welcome</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : !campaigns || campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">No campaigns found</h3>
            <p className="text-sm text-muted-foreground">
              Create your first email campaign to get started.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Opens</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => {
                const status = statusConfig[campaign.status];
                const StatusIcon = status.icon;
                const campaignType = campaign.campaignType || "one-time";
                const typeConfig = campaignTypeConfig[campaignType];
                const TypeIcon = typeConfig.icon;
                const openRate = campaign.sentCount > 0
                  ? ((campaign.openCount / campaign.sentCount) * 100).toFixed(1)
                  : "0";
                const hasAttachments = campaign.attachments && campaign.attachments.length > 0;

                return (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{campaign.name}</p>
                          {hasAttachments && (
                            <Paperclip className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {campaign.subject}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <TypeIcon className="w-3 h-3" />
                        {typeConfig.label}
                        {campaignType === "monthly" && campaign.isRecurringActive && (
                          <RefreshCw className="w-3 h-3 text-green-500" />
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="flex items-center gap-1 w-fit">
                        <StatusIcon className={`w-3 h-3 ${campaign.status === "sending" ? "animate-spin" : ""}`} />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {campaign.status === "sent"
                        ? `${campaign.sentCount}/${campaign.totalRecipients}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {campaign.status === "sent" ? `${openRate}%` : "—"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(campaign.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openPreview(campaign)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {campaign.status === "draft" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(campaign)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSendId(campaign.id)}
                            >
                              <Send className="w-4 h-4 text-green-600" />
                            </Button>
                          </>
                        )}
                        {campaign.status !== "sending" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(campaign.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={fetchCampaigns}
          />
        )}
      </div>

      {/* Template Selector Dialog */}
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a Template</DialogTitle>
            <DialogDescription>
              Start with a professional template or create from scratch
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={templateCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTemplateCategory("all")}
            >
              All
            </Button>
            {templateCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={templateCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setTemplateCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Start from Scratch Card */}
            <div
              className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors flex flex-col items-center justify-center text-center min-h-50"
              onClick={startFromScratch}
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-1">Start from Scratch</h3>
              <p className="text-sm text-muted-foreground">
                Create a custom email with your own design
              </p>
            </div>

            {/* Template Cards */}
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="border rounded-lg p-4 cursor-pointer hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {templateCategories.find(c => c.id === template.category)?.icon}{" "}
                      {templateCategories.find(c => c.id === template.category)?.name}
                    </Badge>
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => selectTemplate(template)}
                  >
                    Use Template
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      previewTemplate(template);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <Dialog open={isTemplatePreviewOpen} onOpenChange={setIsTemplatePreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              Subject: {selectedTemplate?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-white max-h-[60vh] overflow-y-auto">
            <div
              dangerouslySetInnerHTML={{ __html: selectedTemplate?.htmlContent || "" }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplatePreviewOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsTemplatePreviewOpen(false);
                if (selectedTemplate) selectTemplate(selectedTemplate);
              }}
            >
              Use This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Campaign</DialogTitle>
            <DialogDescription>
              {selectedTemplate ? (
                <span className="flex items-center gap-2">
                  Using template: <Badge variant="secondary">{selectedTemplate.name}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      setIsCreateOpen(false);
                      setIsTemplateOpen(true);
                    }}
                  >
                    Change
                  </Button>
                </span>
              ) : (
                "Create a new email campaign from scratch"
              )}
            </DialogDescription>
          </DialogHeader>
          <CampaignForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isSaving || !formData.name || !formData.subject || !formData.htmlContent}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
          </DialogHeader>
          <CampaignForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCampaign?.name}</DialogTitle>
            <DialogDescription>Subject: {selectedCampaign?.subject}</DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg p-4 bg-white">
            <div
              dangerouslySetInnerHTML={{ __html: selectedCampaign?.htmlContent || "" }}
            />
          </div>
          {selectedCampaign?.attachments && selectedCampaign.attachments.length > 0 && (
            <div className="border-t pt-4">
              <Label>Attachments</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCampaign.attachments.map((att) => (
                  <Badge key={att.id} variant="secondary" className="flex items-center gap-1">
                    <Paperclip className="w-3 h-3" />
                    {att.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Confirmation */}
      <AlertDialog open={!!sendId} onOpenChange={() => setSendId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send this campaign to all confirmed subscribers? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
