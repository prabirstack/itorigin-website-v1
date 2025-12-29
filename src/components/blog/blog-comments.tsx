"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ThumbsUp, Reply, LogIn } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const DUMMY_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "John Davis",
    content: "Excellent article! The insights on threat detection are particularly valuable. I've implemented similar strategies at my organization and seen great results.",
    timestamp: "2 days ago",
    likes: 8,
    replies: [
      {
        id: "1-1",
        author: "Sarah Chen",
        content: "Thanks John! Glad to hear it's working well for you. Would love to hear more about your implementation.",
        timestamp: "1 day ago",
        likes: 3
      }
    ]
  },
  {
    id: "2",
    author: "Maria Rodriguez",
    content: "This is a comprehensive guide. The section on automation was especially helpful. Do you have any recommendations for specific SIEM tools?",
    timestamp: "3 days ago",
    likes: 12
  },
  {
    id: "3",
    author: "Alex Kumar",
    content: "Great breakdown of the OWASP Top 10. Looking forward to more content like this!",
    timestamp: "5 days ago",
    likes: 6
  }
];

export function BlogComments() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const isAuthenticated = !!session?.user;
  const userName = session?.user?.name || "Anonymous";

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: userName,
      content: newComment,
      timestamp: "Just now",
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim() || !isAuthenticated) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: userName,
      content: replyContent,
      timestamp: "Just now",
      likes: 0
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyTo(null);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? "ml-12" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold">{comment.author}</span>
            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-muted-foreground mb-3 leading-relaxed">{comment.content}</p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.likes}</span>
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
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleSubmitReply(comment.id)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Post Reply
                </button>
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplyContent("");
                  }}
                  className="px-4 py-2 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-black mb-8">Comments ({comments.length})</h2>

      {/* Comment Form or Sign In Prompt */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium">{userName}</span>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="mt-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Post Comment
          </button>
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
      <div className="space-y-8">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
