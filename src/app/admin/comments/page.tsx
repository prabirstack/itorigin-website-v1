"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, X, Loader2, MessageSquare, Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface Comment {
  id: string;
  content: string;
  guestName: string | null;
  guestEmail: string | null;
  approved: boolean;
  createdAt: string;
  post: {
    id: string;
    title: string;
    slug: string;
  } | null;
  author: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchComments = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (statusFilter && statusFilter !== "all") {
        params.set("approved", statusFilter === "approved" ? "true" : "false");
      }

      const res = await fetch(`/api/admin/comments?${params}`);
      const data = await res.json();
      setComments(data.comments);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [statusFilter]);

  const handleApprove = async (id: string, approved: boolean) => {
    setUpdatingId(id);
    try {
      await fetch(`/api/admin/comments/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      fetchComments(pagination?.page || 1);
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/admin/comments/${deleteId}/approve`, {
        method: "DELETE",
      });
      fetchComments(pagination?.page || 1);
    } catch (error) {
      console.error("Failed to delete comment:", error);
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
          <h1 className="text-2xl font-bold">Comments</h1>
          <p className="text-muted-foreground">Moderate blog comments</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">No comments found</h3>
            <p className="text-sm text-muted-foreground">
              Comments will appear here when visitors leave them on your posts.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-75">Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-30">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <p className="line-clamp-2 text-sm">{comment.content}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {comment.author?.name || comment.guestName || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {comment.author?.email || comment.guestEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {comment.post ? (
                      <Link
                        href={`/blogs/${comment.post.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 text-sm hover:underline"
                      >
                        <span className="truncate max-w-37.5">
                          {comment.post.title}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={comment.approved ? "default" : "secondary"}
                    >
                      {comment.approved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(comment.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {updatingId === comment.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {!comment.approved && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApprove(comment.id, true)}
                              title="Approve"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                          )}
                          {comment.approved && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleApprove(comment.id, false)}
                              title="Unapprove"
                            >
                              <X className="w-4 h-4 text-yellow-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(comment.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      )}
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
            onPageChange={fetchComments}
          />
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot be
              undone.
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
