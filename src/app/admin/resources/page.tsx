"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Trash2,
  Loader2,
  FileText,
  Plus,
  Pencil,
  Download,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  type: string;
  category: string;
  status: "draft" | "published" | "archived";
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  pages: number | null;
  readTime: string | null;
  topics: string[];
  featured: boolean;
  downloadCount: number;
  publishDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusColors: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

const typeLabels: Record<string, string> = {
  whitepaper: "Whitepaper",
  ebook: "E-Book",
  guide: "Guide",
  report: "Report",
  template: "Template",
  checklist: "Checklist",
  "case-study": "Case Study",
  infographic: "Infographic",
  toolkit: "Toolkit",
  other: "Other",
};

const defaultForm = {
  title: "",
  slug: "",
  description: "",
  shortDescription: "",
  type: "whitepaper" as const,
  category: "Uncategorized",
  status: "draft" as const,
  fileUrl: "",
  fileName: "",
  fileSize: 0,
  pages: 0,
  readTime: "",
  topics: [] as string[],
  featured: false,
  publishDate: "",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [topicsInput, setTopicsInput] = useState("");

  const fetchResources = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);

      const res = await fetch(`/api/admin/resources?${params}`);
      const data = await res.json();
      setResources(data.resources);
      setCategories(data.categories || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [statusFilter, typeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources(1);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openCreateDialog = () => {
    setForm(defaultForm);
    setTopicsInput("");
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = async (resource: Resource) => {
    setForm({
      title: resource.title,
      slug: resource.slug,
      description: resource.description,
      shortDescription: resource.shortDescription || "",
      type: resource.type as typeof defaultForm.type,
      category: resource.category,
      status: resource.status as typeof defaultForm.status,
      fileUrl: resource.fileUrl || "",
      fileName: resource.fileName || "",
      fileSize: resource.fileSize || 0,
      pages: resource.pages || 0,
      readTime: resource.readTime || "",
      topics: resource.topics || [],
      featured: resource.featured,
      publishDate: resource.publishDate ? resource.publishDate.split("T")[0] : "",
    });
    setTopicsInput((resource.topics || []).join(", "));
    setEditingId(resource.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const topics = topicsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      const payload = {
        ...form,
        topics,
        pages: form.pages || null,
        fileSize: form.fileSize || null,
        publishDate: form.publishDate ? new Date(form.publishDate).toISOString() : null,
      };

      const url = editingId
        ? `/api/admin/resources/${editingId}`
        : "/api/admin/resources";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save resource");
      }

      setIsDialogOpen(false);
      fetchResources(pagination?.page || 1);
    } catch (error) {
      console.error("Failed to save resource:", error);
      alert(error instanceof Error ? error.message : "Failed to save resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/admin/resources/${deleteId}`, { method: "DELETE" });
      fetchResources(pagination?.page || 1);
    } catch (error) {
      console.error("Failed to delete resource:", error);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-muted-foreground">
            Manage downloadable resources (whitepapers, guides, etc.)
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
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
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-35">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="whitepaper">Whitepaper</SelectItem>
            <SelectItem value="ebook">E-Book</SelectItem>
            <SelectItem value="guide">Guide</SelectItem>
            <SelectItem value="report">Report</SelectItem>
            <SelectItem value="template">Template</SelectItem>
            <SelectItem value="checklist">Checklist</SelectItem>
            <SelectItem value="case-study">Case Study</SelectItem>
            <SelectItem value="infographic">Infographic</SelectItem>
            <SelectItem value="toolkit">Toolkit</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : resources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">No resources found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first downloadable resource.
            </p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-30">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="font-medium">{resource.title}</div>
                    <div className="text-xs text-muted-foreground">
                      /{resource.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {typeLabels[resource.type] || resource.type}
                    </span>
                  </TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[resource.status]} variant="outline">
                      {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3 text-muted-foreground" />
                      <span>{resource.downloadCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {resource.featured ? (
                      <Badge variant="secondary">Featured</Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(resource.updatedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {resource.fileUrl && (
                        <Button variant="ghost" size="icon" asChild>
                          <a
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(resource)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(resource.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={fetchResources}
          />
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Resource" : "Add Resource"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the resource details below."
                : "Fill in the details for the new resource."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: editingId ? form.slug : generateSlug(e.target.value),
                    });
                  }}
                  required
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) => setForm({ ...form, type: value as typeof form.type })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whitepaper">Whitepaper</SelectItem>
                    <SelectItem value="ebook">E-Book</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="checklist">Checklist</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="infographic">Infographic</SelectItem>
                    <SelectItem value="toolkit">Toolkit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => setForm({ ...form, status: value as typeof form.status })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={form.publishDate}
                  onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Brief summary for listings"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="fileUrl">File URL</Label>
                <Input
                  id="fileUrl"
                  type="url"
                  value={form.fileUrl}
                  onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                  placeholder="https://example.com/file.pdf"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileName">File Name</Label>
                <Input
                  id="fileName"
                  value={form.fileName}
                  onChange={(e) => setForm({ ...form, fileName: e.target.value })}
                  placeholder="whitepaper.pdf"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileSize">File Size (bytes)</Label>
                <Input
                  id="fileSize"
                  type="number"
                  value={form.fileSize || ""}
                  onChange={(e) => setForm({ ...form, fileSize: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pages">Pages</Label>
                <Input
                  id="pages"
                  type="number"
                  value={form.pages || ""}
                  onChange={(e) => setForm({ ...form, pages: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  placeholder="30 min read"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="topics">Topics (comma-separated)</Label>
                <Input
                  id="topics"
                  value={topicsInput}
                  onChange={(e) => setTopicsInput(e.target.value)}
                  placeholder="Cybersecurity, SOC, Threat Detection"
                />
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(checked) => setForm({ ...form, featured: checked })}
                />
                <Label htmlFor="featured">Featured Resource</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : editingId ? (
                  "Update Resource"
                ) : (
                  "Create Resource"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resource? This will also delete
              all download records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
