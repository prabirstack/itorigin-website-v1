"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, Reply, LogIn, Loader2, MessageSquare, CheckCircle2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CommentData {
  id: string;
  content: string;
  authorId: string | null;
  authorName: string;
  authorImage: string | null;
  likeCount: number;
  userLiked: boolean;
  createdAt: string;
  replies: CommentData[];
}

interface BlogCommentsProps {
  postId: string;
}

export function BlogComments({ postId }: BlogCommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isAuthenticated = !!session?.user;
  const userName = session?.user?.name || "Anonymous";

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: newComment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit comment");
      }

      setNewComment("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || !isAuthenticated || isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: replyContent.trim(),
          parentId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit reply");
      }

      setReplyContent("");
      setReplyTo(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit reply");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like comments");
      return;
    }

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to like comment");
      }

      const { liked, likeCount } = await res.json();

      // Update comment state
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, likeCount, userLiked: liked };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === commentId
                  ? { ...reply, likeCount, userLiked: liked }
                  : reply
              ),
            };
          }
          return comment;
        })
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to like comment");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: CommentData;
    isReply?: boolean;
  }) => (
    <div className={cn(isReply && "ml-12 mt-4")}>
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 shrink-0">
          <AvatarImage src={comment.authorImage || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {getInitials(comment.authorName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold">{comment.authorName}</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-muted-foreground mb-3 leading-relaxed whitespace-pre-wrap wrap-break-word">
            {comment.content}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLike(comment.id)}
              className={cn(
                "flex items-center gap-2 text-sm transition-colors",
                comment.userLiked
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <ThumbsUp className={cn("w-4 h-4", comment.userLiked && "fill-current")} />
              <span>{comment.likeCount}</span>
            </button>
            {!isReply && isAuthenticated && (
              <button
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyTo === comment.id && (
            <div className="mt-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows={3}
                disabled={isSubmittingReply}
              />
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyContent.trim() || isSubmittingReply}
                  size="sm"
                >
                  {isSubmittingReply ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Post Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReplyTo(null);
                    setReplyContent("");
                  }}
                  disabled={isSubmittingReply}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies?.length || 0),
    0
  );

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
        <MessageSquare className="w-8 h-8" />
        Comments ({totalComments})
      </h2>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 rounded-lg border border-green-500/30 bg-green-500/10 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-300">
            Your comment has been submitted and is pending approval by our moderators.
          </p>
        </div>
      )}

      {/* Comment Form or Sign In Prompt */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{userName}</span>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            rows={4}
            disabled={isSubmitting}
            maxLength={2000}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {newComment.length}/2000 characters
            </span>
            <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Post Comment
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-12 p-6 rounded-lg border border-border bg-muted/30 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Sign in to comment</h3>
          <p className="text-muted-foreground mb-4">
            Join the conversation by signing in to your account.
          </p>
          <Button asChild>
            <Link href="/sign-in">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No comments yet</h3>
          <p className="text-muted-foreground">
            Be the first to share your thoughts on this article.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
