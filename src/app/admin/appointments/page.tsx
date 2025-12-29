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
  CalendarClock,
  Pencil,
  MoreHorizontal,
  Video,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Mail,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  type: "consultation" | "demo" | "discovery" | "follow_up" | "support" | "training";
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show" | "rescheduled";
  scheduledAt: string;
  duration: number;
  timezone: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  clientCompany: string | null;
  clientJobTitle: string | null;
  isVirtual: boolean;
  meetingUrl: string | null;
  location: string | null;
  assignedTo: string | null;
  serviceInterest: string | null;
  clientNotes: string | null;
  internalNotes: string | null;
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
  description: string;
  type: "consultation" | "demo" | "discovery" | "follow_up" | "support" | "training";
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show" | "rescheduled";
  scheduledAt: string;
  duration: number;
  timezone: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  clientJobTitle: string;
  isVirtual: boolean;
  meetingUrl: string;
  location: string;
  assignedTo: string;
  serviceInterest: string;
  clientNotes: string;
  internalNotes: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  type: "consultation",
  status: "pending",
  scheduledAt: "",
  duration: 30,
  timezone: "Asia/Kolkata",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientCompany: "",
  clientJobTitle: "",
  isVirtual: true,
  meetingUrl: "",
  location: "",
  assignedTo: "",
  serviceInterest: "",
  clientNotes: "",
  internalNotes: "",
};

const appointmentTypes = [
  { value: "consultation", label: "Consultation" },
  { value: "demo", label: "Demo" },
  { value: "discovery", label: "Discovery Call" },
  { value: "follow_up", label: "Follow Up" },
  { value: "support", label: "Support" },
  { value: "training", label: "Training" },
];

const appointmentStatuses = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No Show" },
  { value: "rescheduled", label: "Rescheduled" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [todayCount, setTodayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);

  const fetchAppointments = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: "10" });
      if (searchQuery) params.set("search", searchQuery);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (typeFilter !== "all") params.set("type", typeFilter);

      const res = await fetch(`/api/admin/appointments?${params}`);
      const data = await res.json();
      setAppointments(data.appointments || []);
      setPagination(data.pagination || null);
      setStatusCounts(data.statusCounts || {});
      setTodayCount(data.todayCount || 0);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, typeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAppointments(1);
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          description: formData.description || null,
          clientPhone: formData.clientPhone || null,
          clientCompany: formData.clientCompany || null,
          clientJobTitle: formData.clientJobTitle || null,
          meetingUrl: formData.meetingUrl || null,
          location: formData.location || null,
          assignedTo: formData.assignedTo || null,
          serviceInterest: formData.serviceInterest || null,
          clientNotes: formData.clientNotes || null,
          internalNotes: formData.internalNotes || null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to create appointment");
        return;
      }

      setIsCreateOpen(false);
      setFormData(initialFormData);
      fetchAppointments();
    } catch (error) {
      console.error("Failed to create appointment:", error);
      alert("Failed to create appointment");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      title: appointment.title,
      description: appointment.description || "",
      type: appointment.type,
      status: appointment.status,
      scheduledAt: appointment.scheduledAt ? new Date(appointment.scheduledAt).toISOString().slice(0, 16) : "",
      duration: appointment.duration,
      timezone: appointment.timezone,
      clientName: appointment.clientName,
      clientEmail: appointment.clientEmail,
      clientPhone: appointment.clientPhone || "",
      clientCompany: appointment.clientCompany || "",
      clientJobTitle: appointment.clientJobTitle || "",
      isVirtual: appointment.isVirtual,
      meetingUrl: appointment.meetingUrl || "",
      location: appointment.location || "",
      assignedTo: appointment.assignedTo || "",
      serviceInterest: appointment.serviceInterest || "",
      clientNotes: appointment.clientNotes || "",
      internalNotes: appointment.internalNotes || "",
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedAppointment) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/appointments/${selectedAppointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          description: formData.description || null,
          clientPhone: formData.clientPhone || null,
          clientCompany: formData.clientCompany || null,
          clientJobTitle: formData.clientJobTitle || null,
          meetingUrl: formData.meetingUrl || null,
          location: formData.location || null,
          assignedTo: formData.assignedTo || null,
          serviceInterest: formData.serviceInterest || null,
          clientNotes: formData.clientNotes || null,
          internalNotes: formData.internalNotes || null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Failed to update appointment");
        return;
      }

      setIsEditOpen(false);
      setSelectedAppointment(null);
      setFormData(initialFormData);
      fetchAppointments();
    } catch (error) {
      console.error("Failed to update appointment:", error);
      alert("Failed to update appointment");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/appointments/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete appointment");
        return;
      }

      setDeleteId(null);
      fetchAppointments();
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      alert("Failed to delete appointment");
    }
  };

  const handleQuickStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      fetchAppointments();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-600",
      confirmed: "bg-blue-500/10 text-blue-500",
      completed: "bg-green-500/10 text-green-500",
      cancelled: "bg-red-500/10 text-red-500",
      no_show: "bg-gray-500/10 text-gray-500",
      rescheduled: "bg-purple-500/10 text-purple-500",
    };
    return <Badge className={styles[status] || ""}>{status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/admin" },
          { label: "Appointments" },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CalendarClock className="w-8 h-8 text-primary" />
            Appointments
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage client consultations and meetings
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
          <div className="text-2xl font-bold text-primary">{todayCount}</div>
          <div className="text-sm text-muted-foreground">Today&apos;s Appointments</div>
        </div>
        <div className="p-4 rounded-lg border bg-yellow-500/5 border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending || 0}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="p-4 rounded-lg border bg-blue-500/5 border-blue-500/20">
          <div className="text-2xl font-bold text-blue-600">{statusCounts.confirmed || 0}</div>
          <div className="text-sm text-muted-foreground">Confirmed</div>
        </div>
        <div className="p-4 rounded-lg border bg-green-500/5 border-green-500/20">
          <div className="text-2xl font-bold text-green-600">{statusCounts.completed || 0}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by client name, email, company..."
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
            {appointmentStatuses.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {appointmentTypes.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="font-medium">{appointment.clientName}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {appointment.clientEmail}
                    </div>
                    {appointment.clientCompany && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {appointment.clientCompany}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{appointment.title}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {appointment.isVirtual ? (
                        <><Video className="w-3 h-3" /> Virtual</>
                      ) : (
                        <><MapPin className="w-3 h-3" /> {appointment.location || "In-person"}</>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3" />
                      {format(new Date(appointment.scheduledAt), "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(appointment.scheduledAt), "h:mm a")} ({appointment.duration} min)
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {appointmentTypes.find(t => t.value === appointment.type)?.label || appointment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(appointment)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {appointment.status === "pending" && (
                          <DropdownMenuItem onClick={() => handleQuickStatusChange(appointment.id, "confirmed")}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Confirm
                          </DropdownMenuItem>
                        )}
                        {appointment.status === "confirmed" && (
                          <DropdownMenuItem onClick={() => handleQuickStatusChange(appointment.id, "completed")}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Mark Complete
                          </DropdownMenuItem>
                        )}
                        {!["cancelled", "completed"].includes(appointment.status) && (
                          <DropdownMenuItem onClick={() => handleQuickStatusChange(appointment.id, "cancelled")}>
                            <XCircle className="w-4 h-4 mr-2" /> Cancel
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteId(appointment.id)}
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
          onPageChange={fetchAppointments}
        />
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setIsEditOpen(false);
          setSelectedAppointment(null);
          setFormData(initialFormData);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditOpen ? "Edit Appointment" : "New Appointment"}</DialogTitle>
            <DialogDescription>
              {isEditOpen ? "Update appointment details" : "Schedule a new client appointment"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Security Consultation with Acme Corp"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: typeof formData.type) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: typeof formData.status) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentStatuses.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Client Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name *</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client Email *</Label>
                  <Input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={formData.clientCompany}
                    onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                    placeholder="Acme Corporation"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Schedule</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date & Time *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Switch
                  id="isVirtual"
                  checked={formData.isVirtual}
                  onCheckedChange={(checked) => setFormData({ ...formData, isVirtual: checked })}
                />
                <Label htmlFor="isVirtual">Virtual Meeting</Label>
              </div>

              {formData.isVirtual ? (
                <div className="space-y-2 mt-4">
                  <Label>Meeting URL</Label>
                  <Input
                    value={formData.meetingUrl}
                    onChange={(e) => setFormData({ ...formData, meetingUrl: e.target.value })}
                    placeholder="https://meet.google.com/..."
                  />
                </div>
              ) : (
                <div className="space-y-2 mt-4">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Office Address"
                  />
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Notes</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Client Notes</Label>
                  <Textarea
                    value={formData.clientNotes}
                    onChange={(e) => setFormData({ ...formData, clientNotes: e.target.value })}
                    placeholder="Notes from the client..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Internal Notes</Label>
                  <Textarea
                    value={formData.internalNotes}
                    onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                    placeholder="Internal team notes..."
                    rows={2}
                  />
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
                setSelectedAppointment(null);
                setFormData(initialFormData);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditOpen ? handleUpdate : handleCreate}
              disabled={isSaving || !formData.title || !formData.clientName || !formData.clientEmail || !formData.scheduledAt}
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
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
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
