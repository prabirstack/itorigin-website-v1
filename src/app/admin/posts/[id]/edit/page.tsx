"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostEditor } from "@/components/admin/posts/post-editor";
import { ArrowLeft, Loader2, Save, Eye, Trash2, Lock, Unlock, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import slugify from "slugify";
import { Breadcrumb } from "@/components/admin/shared/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  categoryId: z.string().optional(),
  status: z.enum(["draft", "published"]),
  slugLocked: z.boolean().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: "draft" | "published";
  categoryId: string | null;
  slugLocked: boolean;
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [slugLocked, setSlugLocked] = useState(false);
  const [originalTitle, setOriginalTitle] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const currentTitle = watch("title");
  const currentSlug = watch("slug");

  // Auto-generate slug when title changes (if not locked)
  useEffect(() => {
    if (!slugLocked && currentTitle && currentTitle !== originalTitle && post) {
      const newSlug = slugify(currentTitle, { lower: true, strict: true });
      setValue("slug", newSlug);
    }
  }, [currentTitle, slugLocked, originalTitle, setValue, post]);

  // Fetch post and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, categoriesRes] = await Promise.all([
          fetch(`/api/admin/posts/${id}`),
          fetch("/api/admin/categories"),
        ]);

        if (!postRes.ok) {
          throw new Error("Post not found");
        }

        const postData = await postRes.json();
        const categoriesData = await categoriesRes.json();

        setPost(postData.post);
        setContent(postData.post.content);
        setCategories(categoriesData.categories || []);
        setSlugLocked(postData.post.slugLocked || false);
        setOriginalTitle(postData.post.title);

        reset({
          title: postData.post.title,
          slug: postData.post.slug,
          excerpt: postData.post.excerpt || "",
          coverImage: postData.post.coverImage || "",
          categoryId: postData.post.categoryId || "",
          status: postData.post.status,
          slugLocked: postData.post.slugLocked || false,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
        router.push("/admin/posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, reset, router]);

  const onSubmit = async (data: PostFormData) => {
    if (!content.trim()) {
      alert("Content is required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content,
          slugLocked,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update post");
      }

      const result = await res.json();

      // Show notification if slug changed
      if (result.slugChanged) {
        console.log(`Slug updated: ${result.previousSlug} → ${result.post.slug}`);
      }

      router.push("/admin/posts");
    } catch (error) {
      console.error("Failed to update post:", error);
      alert(error instanceof Error ? error.message : "Failed to update post");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle manual slug edit - lock the slug when user types
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value;
    setValue("slug", newSlug);
    // If user manually edits slug, lock it
    if (newSlug !== slugify(currentTitle || "", { lower: true, strict: true })) {
      setSlugLocked(true);
    }
  };

  // Reset slug from title
  const regenerateSlug = () => {
    if (currentTitle) {
      const newSlug = slugify(currentTitle, { lower: true, strict: true });
      setValue("slug", newSlug);
      setSlugLocked(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      router.push("/admin/posts");
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/posts">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <p className="text-muted-foreground">Update your blog post</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Post</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this post? This action cannot
                  be undone.
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
          <Button
            type="button"
            variant="outline"
            onClick={handleSubmit((data) =>
              onSubmit({ ...data, status: "draft" })
            )}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </>
            )}
          </Button>
          <Button
            type="button"
            onClick={handleSubmit((data) =>
              onSubmit({ ...data, status: "published" })
            )}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Publish
              </>
            )}
          </Button>
        </div>
      </div>

      <form className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={regenerateSlug}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    title="Regenerate from title"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Sync
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Switch
                      id="slugLocked"
                      checked={slugLocked}
                      onCheckedChange={setSlugLocked}
                      className="scale-75"
                    />
                    <Label
                      htmlFor="slugLocked"
                      className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1"
                    >
                      {slugLocked ? (
                        <>
                          <Lock className="w-3 h-3" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3" />
                          Auto-sync
                        </>
                      )}
                    </Label>
                  </div>
                </div>
              </div>
              <Input
                id="slug"
                placeholder="post-url-slug"
                value={currentSlug || ""}
                onChange={handleSlugChange}
                className={slugLocked ? "border-amber-500/50" : ""}
              />
              {!slugLocked && (
                <p className="text-xs text-muted-foreground">
                  Slug will auto-update when you change the title
                </p>
              )}
              {slugLocked && post?.status === "published" && currentSlug !== post.slug && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Changing slug of a published post will create a redirect from the old URL
                </p>
              )}
              {errors.slug && (
                <p className="text-sm text-destructive">
                  {errors.slug.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief description of the post"
                rows={3}
                {...register("excerpt")}
              />
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 space-y-4">
            <Label>Content</Label>
            <PostEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h3 className="font-semibold">Post Settings</h3>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                defaultValue={post.categoryId || ""}
                onValueChange={(value) => setValue("categoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                placeholder="https://example.com/image.jpg"
                {...register("coverImage")}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
