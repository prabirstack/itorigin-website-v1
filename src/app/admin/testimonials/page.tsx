"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Trash2,
  Loader2,
  Quote,
  Pencil,
  Star,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Shield,
  Award,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage: string | null;
  authorEmail: string | null;
  authorLinkedin: string | null;
  quote: string;
  rating: number;
  industry: string | null;
  serviceUsed: string | null;
  featured: boolean;
  displayOrder: number;
  status: "pending" | "approved" | "rejected";
  verified: boolean;
  verifiedAt: string | null;
  source: string | null;
  externalUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface StatusCounts {
  pending: number;
  approved: number;
  rejected: number;
}

interface FormData {
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage: string;
  authorEmail: string;
  authorLinkedin: string;
  quote: string;
  rating: number;
  industry: string;
  serviceUsed: string;
  featured: boolean;
  displayOrder: number;
  status: "pending" | "approved" | "rejected";
  verified: boolean;
  source: string;
  externalUrl: string;
}

const initialFormData: FormData = {
  authorName: "",
  authorRole: "",
  authorCompany: "",
  authorImage: "",
  authorEmail: "",
  authorLinkedin: "",
  quote: "",
  rating: 5,
  industry: "",
  serviceUsed: "",
  featured: false,
  displayOrder: 0,
  status: "pending",
  verified: false,
  source: "",
  externalUrl: "",
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

const services = [
  "SOC Services",
  "Penetration Testing",
  "Vulnerability Assessment",
  "Incident Response",
  "Compliance Consulting",
  "Security Training",
  "Cloud Security",
  "Managed Detection & Response",
];

const sources = [
  "website",
  "email",
  "linkedin",
  "google",
  "clutch",
  "g2",
  "direct",
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({ pending: 0, approved: 0, rejected: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const fetchTestimonials = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "10" });
      if (searchQuery) params.set("search", searchQuery);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (industryFilter !== "all") params.set("industry", industryFilter);

      const res = await fetch(`/api/admin/testimonials?${params}`);
      const data = await res.json();
      setTestimonials(data.testimonials || []);
      setPagination(data.pagination || null);
      setStatusCounts(data.statusCounts || { pending: 0, approved: 0, rejected: 0 });
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [statusFilter, industryFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTestimonials(1);
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          authorImage: formData.authorImage || null,
          authorEmail: formData.authorEmail || null,
          authorLinkedin: formData.authorLinkedin || null,
          industry: formData.industry || null,
          serviceUsed: formData.serviceUsed || null,
          source: formData.source || null,
          externalUrl: formData.externalUrl || null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to create testimonial");
        return;
      }

      setIsCreateOpen(false);
      setFormData(initialFormData);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to create testimonial:", error);
      alert("Failed to create testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      authorName: testimonial.authorName,
      authorRole: testimonial.authorRole,
      authorCompany: testimonial.authorCompany,
      authorImage: testimonial.authorImage || "",
      authorEmail: testimonial.authorEmail || "",
      authorLinkedin: testimonial.authorLinkedin || "",
      quote: testimonial.quote,
      rating: testimonial.rating,
      industry: testimonial.industry || "",
      serviceUsed: testimonial.serviceUsed || "",
      featured: testimonial.featured,
      displayOrder: testimonial.displayOrder,
      status: testimonial.status,
      verified: testimonial.verified,
      source: testimonial.source || "",
      externalUrl: testimonial.externalUrl || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedTestimonial) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${selectedTestimonial.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          authorImage: formData.authorImage || null,
          authorEmail: formData.authorEmail || null,
          authorLinkedin: formData.authorLinkedin || null,
          industry: formData.industry || null,
          serviceUsed: formData.serviceUsed || null,
          source: formData.source || null,
          externalUrl: formData.externalUrl || null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to update testimonial");
        return;
      }

      setIsEditOpen(false);
      setSelectedTestimonial(null);
      setFormData(initialFormData);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to update testimonial:", error);
      alert("Failed to update testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete testimonial");
        return;
      }

      setDeleteId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) return;
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, action }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || `Failed to ${action} testimonials`);
        return;
      }

      setSelectedIds([]);
      fetchTestimonials();
    } catch (error) {
      console.error(`Failed to ${action} testimonials:`, error);
      alert(`Failed to ${action} testimonials`);
    }
  };

  const handleQuickAction = async (id: string, action: string) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id], action }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || `Failed to ${action} testimonial`);
        return;
      }

      fetchTestimonials();
    } catch (error) {
      console.error(`Failed to ${action} testimonial:`, error);
      alert(`Failed to ${action} testimonial`);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === testimonials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(testimonials.map((t) => t.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Testimonials" },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Quote className="w-8 h-8 text-primary" />
            Testimonials
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage client testimonials and reviews
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-yellow-500/5 border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </div>
        <div className="p-4 rounded-lg border bg-green-500/5 border-green-500/20">
          <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </div>
        <div className="p-4 rounded-lg border bg-red-500/5 border-red-500/20">
          <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
          <div className="text-sm text-muted-foreground">Rejected</div>
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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

        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
            <Button size="sm" variant="outline" onClick={() => handleBulkAction("approve")}>
              <CheckCircle className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkAction("reject")}>
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkAction("feature")}>
              <Award className="w-4 h-4 mr-1" /> Feature
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={testimonials.length > 0 && selectedIds.length === testimonials.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No testimonials found
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(testimonial.id)}
                      onCheckedChange={() => toggleSelect(testimonial.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{testimonial.authorName}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.authorRole} at {testimonial.authorCompany}
                    </div>
                    {testimonial.industry && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {testimonial.industry}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm">{testimonial.quote}</p>
                  </TableCell>
                  <TableCell>{renderStars(testimonial.rating)}</TableCell>
                  <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                  <TableCell>
                    {testimonial.featured ? (
                      <Badge className="bg-yellow-500/10 text-yellow-600">Featured</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {testimonial.verified ? (
                      <Shield className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(testimonial)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {testimonial.status !== "approved" && (
                          <DropdownMenuItem onClick={() => handleQuickAction(testimonial.id, "approve")}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                          </DropdownMenuItem>
                        )}
                        {testimonial.status !== "rejected" && (
                          <DropdownMenuItem onClick={() => handleQuickAction(testimonial.id, "reject")}>
                            <XCircle className="w-4 h-4 mr-2" /> Reject
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleQuickAction(testimonial.id, testimonial.featured ? "unfeature" : "feature")}>
                          <Award className="w-4 h-4 mr-2" /> {testimonial.featured ? "Unfeature" : "Feature"}
                        </DropdownMenuItem>
                        {!testimonial.verified && (
                          <DropdownMenuItem onClick={() => handleQuickAction(testimonial.id, "verify")}>
                            <Shield className="w-4 h-4 mr-2" /> Verify
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(testimonial.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
          onPageChange={fetchTestimonials}
        />
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedTestimonial(null);
          setFormData(initialFormData);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditOpen ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
            <DialogDescription>
              {isEditOpen ? "Update the testimonial details" : "Add a new client testimonial"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Author Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author Name *</Label>
                <Input
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label>Author Role *</Label>
                <Input
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  placeholder="CISO"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  value={formData.authorCompany}
                  onChange={(e) => setFormData({ ...formData, authorCompany: e.target.value })}
                  placeholder="Acme Corporation"
                />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.authorEmail}
                  onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input
                  value={formData.authorLinkedin}
                  onChange={(e) => setFormData({ ...formData, authorLinkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/johnsmith"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Author Image URL</Label>
              <Input
                value={formData.authorImage}
                onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Quote */}
            <div className="space-y-2">
              <Label>Testimonial Quote *</Label>
              <Textarea
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Write the testimonial quote here..."
                rows={4}
              />
            </div>

            {/* Rating & Service */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating !== 1 && "s"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service Used</Label>
                <Select
                  value={formData.serviceUsed}
                  onValueChange={(value) => setFormData({ ...formData, serviceUsed: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Source & External URL */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Source</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData({ ...formData, source: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source.charAt(0).toUpperCase() + source.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>External URL</Label>
                <Input
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  placeholder="Link to original testimonial"
                />
              </div>
            </div>

            {/* Status and Options */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "pending" | "approved" | "rejected") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex flex-col gap-2 pt-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="verified"
                    checked={formData.verified}
                    onCheckedChange={(checked) => setFormData({ ...formData, verified: checked })}
                  />
                  <Label htmlFor="verified">Verified</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
                setSelectedTestimonial(null);
                setFormData(initialFormData);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditOpen ? handleUpdate : handleCreate}
              disabled={isSaving || !formData.authorName || !formData.authorRole || !formData.authorCompany || !formData.quote}
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
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
