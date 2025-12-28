"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Loader2, CheckCircle, Mail, User, Building2 } from "lucide-react";

interface DownloadDialogProps {
  resourceId: string;
  resourceTitle: string;
  buttonText?: string;
  buttonClassName?: string;
  downloadUrl?: string;
  /** If true, uses the /api/resources endpoint for proper tracking */
  useResourcesApi?: boolean;
}

export function DownloadDialog({
  resourceId,
  resourceTitle,
  buttonText = "Download Free",
  buttonClassName = "",
  downloadUrl,
  useResourcesApi = false,
}: DownloadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [finalDownloadUrl, setFinalDownloadUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let responseDownloadUrl = downloadUrl;

      if (useResourcesApi) {
        // Use the resources API for proper tracking
        const response = await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resourceId,
            name: formData.name,
            email: formData.email,
            company: formData.company,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to submit");
        }

        const data = await response.json();
        responseDownloadUrl = data.downloadUrl || downloadUrl;
      } else {
        // Fallback to leads API for backward compatibility
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            source: "download",
            resource: resourceTitle,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit");
        }
      }

      setIsSuccess(true);
      setFinalDownloadUrl(responseDownloadUrl || null);

      // Auto close and redirect after success
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setFormData({ name: "", email: "", company: "" });

        // Trigger download
        if (responseDownloadUrl) {
          window.open(responseDownloadUrl, "_blank");
        }
        setFinalDownloadUrl(null);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={buttonClassName || "w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"}>
          <Download className="w-4 h-4" />
          {buttonText}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download: {resourceTitle}</DialogTitle>
          <DialogDescription>
            Enter your details to access this free resource.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-bold mb-2">Thank You!</h4>
            <p className="text-muted-foreground">
              Your download will start shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Now
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By downloading, you agree to receive occasional emails about our services.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
