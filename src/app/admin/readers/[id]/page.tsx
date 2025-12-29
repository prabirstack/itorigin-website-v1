"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Loader2,
  ArrowLeft,
  MessageSquare,
  Check,
  Clock,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface ReaderDetails {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  approved: boolean;
  createdAt: string;
  post: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

interface Stats {
  totalComments: number;
  approvedComments: number;
  pendingComments: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ReaderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [reader, setReader] = useState<ReaderDetails | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReader = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });

      const res = await fetch(`/api/admin/readers/${id}?${params}`);
      if (!res.ok) {
        throw new Error("Reader not found");
      }
      const data = await res.json();
      setReader(data.reader);
      setStats(data.stats);
      setComments(data.comments);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch reader:", error);
      router.push("/admin/readers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReader();
  }, [id]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!reader) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Reader Details</h1>
          <p className="text-muted-foreground">View comment history</p>
        </div>
      </div>

      {/* Reader Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={reader.image || undefined} />
              <AvatarFallback className="text-lg">
                {getInitials(reader.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{reader.name}</CardTitle>
              <CardDescription>{reader.email}</CardDescription>
              <p className="text-xs text-muted-foreground mt-1">
                Joined {format(new Date(reader.createdAt), "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalComments || 0}</p>
                <p className="text-xs text-muted-foreground">Total Comments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.approvedComments || 0}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.pendingComments || 0}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Table */}
      <div className="bg-card border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Comment History</h2>
        </div>
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">No comments</h3>
            <p className="text-sm text-muted-foreground">
              This reader hasn&apos;t made any comments yet.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Comment</TableHead>
                <TableHead>Post</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>
                    <p className="line-clamp-2 text-sm">{comment.content}</p>
                  </TableCell>
                  <TableCell>
                    {comment.post ? (
                      <Link
                        href={`/blogs/${comment.post.slug}`}
                        target="_blank"
                        className="flex items-center gap-1 text-sm hover:underline"
                      >
                        <span className="truncate max-w-48">
                          {comment.post.title}
                        </span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={comment.approved ? "default" : "secondary"}>
                      {comment.approved ? "Approved" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(comment.createdAt), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={fetchReader}
          />
        )}
      </div>
    </div>
  );
}
