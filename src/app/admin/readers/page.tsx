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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Users, MessageSquare, Eye } from "lucide-react";
import { format } from "date-fns";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import { Pagination } from "@/components/admin/shared/pagination";

interface Reader {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
  commentCount: number;
  approvedComments: number;
  pendingComments: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ReadersPage() {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReaders = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });

      const res = await fetch(`/api/admin/readers?${params}`);
      const data = await res.json();
      setReaders(data.readers);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch readers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Readers</h1>
          <p className="text-muted-foreground">
            Users who have commented on your blog posts
          </p>
        </div>
      </div>

      <div className="bg-card border rounded-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : readers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">No readers yet</h3>
            <p className="text-sm text-muted-foreground">
              Readers will appear here when they comment on your posts.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reader</TableHead>
                <TableHead>Total Comments</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {readers.map((reader) => (
                <TableRow key={reader.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={reader.image || undefined} />
                        <AvatarFallback>{getInitials(reader.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{reader.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {reader.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{reader.commentCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{reader.approvedComments}</Badge>
                  </TableCell>
                  <TableCell>
                    {reader.pendingComments > 0 ? (
                      <Badge variant="secondary">{reader.pendingComments}</Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(reader.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/readers/${reader.id}`} title="View comments">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
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
            onPageChange={fetchReaders}
          />
        )}
      </div>
    </div>
  );
}
