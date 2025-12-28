"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  Award,
  Pencil,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Metric[];
  services: string[];
  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;
  coverImage: string | null;
  logo: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface FormData {
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Metric[];
  services: string[];
  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;
  coverImage: string;
  logo: string;
  metaTitle: string;
  metaDescription: string;
}

const initialFormData: FormData = {
  title: "",
  slug: "",
  client: "",
  industry: "",
  challenge: "",
  solution: "",
  results: [],
  metrics: [],
  services: [],
  featured: false,
  status: "draft",
  order: 0,
  coverImage: "",
  logo: "",
  metaTitle: "",
  metaDescription: "",
};

const industries = [
  "Financial Services",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Retail",
  "Government",
  "Energy",
  "Education",
  "Legal",
  "Telecommunications",
  "Insurance",
  "Non-Profit",
];

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newResult, setNewResult] = useState("");
  const [newService, setNewService] = useState("");
  const [newMetricLabel, setNewMetricLabel] = useState("");
  const [newMetricValue, setNewMetricValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchCaseStudies = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "10" });
      if (searchQuery) params.set("search", searchQuery);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (industryFilter !== "all") params.set("industry", industryFilter);

      const res = await fetch(`/api/admin/case-studies?${params}`);
      const data = await res.json();
      setCaseStudies(data.caseStudies || []);
      setPagination(data.pagination || null);
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
      setCaseStudies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, [statusFilter, industryFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCaseStudies(1);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
    });
  };

  const addResult = () => {
    if (newResult.trim()) {
      setFormData({
        ...formData,
        results: [...formData.results, newResult.trim()],
      });
      setNewResult("");
    }
  };

  const removeResult = (index: number) => {
    setFormData({
      ...formData,
      results: formData.results.filter((_, i) => i !== index),
    });
  };

  const addService = () => {
    if (newService.trim()) {
      setFormData({
        ...formData,
        services: [...formData.services, newService.trim()],
      });
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const addMetric = () => {
    if (newMetricLabel.trim() && newMetricValue.trim()) {
      setFormData({
        ...formData,
        metrics: [...formData.metrics, { label: newMetricLabel.trim(), value: newMetricValue.trim() }],
      });
      setNewMetricLabel("");
      setNewMetricValue("");
    }
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index),
    });
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to create case study");
        return;
      }

      setIsCreateOpen(false);
      setFormData(initialFormData);
      fetchCaseStudies();
    } catch (error) {
      console.error("Failed to create case study:", error);
      alert("Failed to create case study");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setFormData({
      title: caseStudy.title,
      slug: caseStudy.slug,
      client: caseStudy.client,
      industry: caseStudy.industry,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      results: caseStudy.results || [],
      metrics: caseStudy.metrics || [],
      services: caseStudy.services || [],
      featured: caseStudy.featured,
      status: caseStudy.status,
      order: caseStudy.order,
      coverImage: caseStudy.coverImage || "",
      logo: caseStudy.logo || "",
      metaTitle: caseStudy.metaTitle || "",
      metaDescription: caseStudy.metaDescription || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedCaseStudy) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/case-studies/${selectedCaseStudy.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to update case study");
        return;
      }

      setIsEditOpen(false);
      setSelectedCaseStudy(null);
      setFormData(initialFormData);
      fetchCaseStudies();
    } catch (error) {
      console.error("Failed to update case study:", error);
      alert("Failed to update case study");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/case-studies/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete case study");
        return;
      }

      setDeleteId(null);
      fetchCaseStudies();
    } catch (error) {
      console.error("Failed to delete case study:", error);
      alert("Failed to delete case study");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Case Studies" },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            Case Studies
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage client success stories and case studies
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Case Study
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : caseStudies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No case studies found
                </TableCell>
              </TableRow>
            ) : (
              caseStudies.map((caseStudy) => (
                <TableRow key={caseStudy.id}>
                  <TableCell>
                    <div className="font-medium">{caseStudy.title}</div>
                    <div className="text-xs text-muted-foreground">{caseStudy.slug}</div>
                  </TableCell>
                  <TableCell>{caseStudy.client}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{caseStudy.industry}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(caseStudy.status)}</TableCell>
                  <TableCell>
                    {caseStudy.featured ? (
                      <Badge className="bg-yellow-500/10 text-yellow-600">Featured</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(caseStudy.updatedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(caseStudy)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(caseStudy.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={fetchCaseStudies}
        />
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedCaseStudy(null);
          setFormData(initialFormData);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditOpen ? "Edit Case Study" : "Create Case Study"}</DialogTitle>
            <DialogDescription>
              {isEditOpen ? "Update the case study details" : "Add a new client success story"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="24/7 SOC Implementation for Leading Fintech"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="fintech-soc-implementation"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name *</Label>
                <Input
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Major Fintech Company"
                />
              </div>
              <div className="space-y-2">
                <Label>Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Challenge *</Label>
              <Textarea
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                placeholder="Describe the client's challenge..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Solution *</Label>
              <Textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Describe the solution provided..."
                rows={3}
              />
            </div>

            {/* Results */}
            <div className="space-y-2">
              <Label>Key Results</Label>
              <div className="flex gap-2">
                <Input
                  value={newResult}
                  onChange={(e) => setNewResult(e.target.value)}
                  placeholder="Add a result..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResult())}
                />
                <Button type="button" onClick={addResult} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.results.map((result, index) => (
                  <Badge key={index} variant="secondary" className="py-1 px-2">
                    {result}
                    <button onClick={() => removeResult(index)} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <Label>Metrics</Label>
              <div className="flex gap-2">
                <Input
                  value={newMetricLabel}
                  onChange={(e) => setNewMetricLabel(e.target.value)}
                  placeholder="Label (e.g., Detection Time)"
                  className="flex-1"
                />
                <Input
                  value={newMetricValue}
                  onChange={(e) => setNewMetricValue(e.target.value)}
                  placeholder="Value (e.g., <3 min)"
                  className="w-32"
                />
                <Button type="button" onClick={addMetric} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.metrics.map((metric, index) => (
                  <Badge key={index} variant="outline" className="py-1 px-2">
                    {metric.label}: {metric.value}
                    <button onClick={() => removeMetric(index)} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2">
              <Label>Services Used</Label>
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Add a service..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                />
                <Button type="button" onClick={addService} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="py-1 px-2">
                    {service}
                    <button onClick={() => removeService(index)} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Status and Options */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published" | "archived") =>
                    setFormData({ ...formData, status: value })
                  }
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
                <Label>Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>

            {/* SEO */}
            <div className="space-y-4 border-t pt-4">
              <h4 className="font-medium">SEO Settings</h4>
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="SEO title (max 60 characters)"
                  maxLength={60}
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="SEO description (max 160 characters)"
                  maxLength={160}
                  rows={2}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
                setSelectedCaseStudy(null);
                setFormData(initialFormData);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditOpen ? handleUpdate : handleCreate}
              disabled={isSaving || !formData.title || !formData.slug || !formData.client || !formData.industry || !formData.challenge || !formData.solution}
            >
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditOpen ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this case study? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
