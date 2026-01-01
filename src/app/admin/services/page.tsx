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
  Briefcase,
  Edit,
  GripVertical,
  ExternalLink,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";
import { toast } from "sonner";

interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string | null;
  description: string;
  iconName: string | null;
  coverImage: string | null;
  features: string[];
  benefits: string[];
  primaryColor: string | null;
  secondaryColor: string | null;
  bgPattern: string | null;
  active: boolean;
  displayOrder: number;
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
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  coverImage: string;
  features: string[];
  benefits: string[];
  primaryColor: string;
  secondaryColor: string;
  active: boolean;
  displayOrder: number;
}

const initialFormData: FormData = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  iconName: "",
  coverImage: "",
  features: [],
  benefits: [],
  primaryColor: "",
  secondaryColor: "",
  active: true,
  displayOrder: 0,
};

const iconOptions = [
  "Shield",
  "Target",
  "Search",
  "Lock",
  "Users",
  "FileCheck",
  "AlertTriangle",
  "Eye",
  "Server",
  "Cloud",
  "Database",
  "Code",
  "Terminal",
  "Bug",
  "Key",
  "Fingerprint",
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [newFeature, setNewFeature] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchServices = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "20" });
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/services?${params}`);
      const data = await res.json();
      setServices(data.services || []);
      setPagination(data.pagination || null);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchServices(1);
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

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit.trim()],
      });
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Service created successfully");
        setIsCreateOpen(false);
        setFormData(initialFormData);
        fetchServices(pagination?.page || 1);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to create service");
      }
    } catch (error) {
      toast.error("Failed to create service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedService) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${selectedService.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Service updated successfully");
        setIsEditOpen(false);
        setSelectedService(null);
        fetchServices(pagination?.page || 1);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to update service");
      }
    } catch (error) {
      toast.error("Failed to update service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/services/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      toast.success("Service deleted successfully");
      fetchServices(pagination?.page || 1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete service");
    } finally {
      setDeleteId(null);
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !service.active }),
      });
      if (!res.ok) throw new Error("Failed to update service status");
      toast.success(`Service ${!service.active ? "activated" : "deactivated"}`);
      fetchServices(pagination?.page || 1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to toggle service status");
    }
  };

  const openEditDialog = (service: Service) => {
    setSelectedService(service);
    setFormData({
      slug: service.slug,
      title: service.title,
      shortDescription: service.shortDescription || "",
      description: service.description,
      iconName: service.iconName || "",
      coverImage: service.coverImage || "",
      features: service.features || [],
      benefits: service.benefits || [],
      primaryColor: service.primaryColor || "",
      secondaryColor: service.secondaryColor || "",
      active: service.active,
      displayOrder: service.displayOrder,
    });
    setIsEditOpen(true);
  };

  const ServiceForm = () => (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title *</Label>
          <Input
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Penetration Testing"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Slug *</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="penetration-testing"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Short Description</Label>
        <Input
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="Brief description for navigation menus"
          className="mt-1"
          maxLength={300}
        />
      </div>

      <div>
        <Label>Full Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed service description..."
          className="mt-1 min-h-25"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Icon</Label>
          <Select
            value={formData.iconName}
            onValueChange={(value) => setFormData({ ...formData, iconName: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Display Order</Label>
          <Input
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            className="mt-1"
            min={0}
          />
        </div>
      </div>

      <div>
        <Label>Cover Image URL</Label>
        <Input
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          placeholder="https://..."
          className="mt-1"
        />
      </div>

      <div>
        <Label>Features</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} variant="secondary">
            Add
          </Button>
        </div>
        {formData.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {feature}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeFeature(index)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label>Benefits</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            placeholder="Add a benefit"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
          />
          <Button type="button" onClick={addBenefit} variant="secondary">
            Add
          </Button>
        </div>
        {formData.benefits.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.benefits.map((benefit, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {benefit}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeBenefit(index)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Primary Color</Label>
          <Input
            value={formData.primaryColor}
            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            placeholder="#3b82f6"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Secondary Color</Label>
          <Input
            value={formData.secondaryColor}
            onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
            placeholder="#1d4ed8"
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div>
          <Label>Active</Label>
          <p className="text-xs text-muted-foreground">Show this service on the website</p>
        </div>
        <Switch
          checked={formData.active}
          onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your cybersecurity services</p>
        </div>
        <Button onClick={() => { setFormData(initialFormData); setIsCreateOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : !services || services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">No services found</h3>
            <p className="text-sm text-muted-foreground">
              Add your first service to get started.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12.5">Order</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-35">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{service.displayOrder}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="font-medium">{service.title}</p>
                      {service.shortDescription && (
                        <p className="text-sm text-muted-foreground truncate max-w-75">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{service.slug}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {service.features?.length || 0} features
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={service.active}
                      onCheckedChange={() => handleToggleActive(service)}
                    />
                  </TableCell>
                  <TableCell>
                    {format(new Date(service.updatedAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`/services/${service.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(service.id)}
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
            onPageChange={fetchServices}
          />
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new cybersecurity service
            </DialogDescription>
          </DialogHeader>
          <ServiceForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isSaving || !formData.title || !formData.slug || !formData.description}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service details
            </DialogDescription>
          </DialogHeader>
          <ServiceForm />
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
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
    </div>
  );
}
