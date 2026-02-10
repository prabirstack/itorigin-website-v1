"use client";

import { useState, useEffect } from "react";
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
import { Download, Loader2, CheckCircle, Mail, User, Building2, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Blocked free email domains (subset for client-side validation)
const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com", "hotmail.com", "outlook.com", "live.com",
  "yahoo.com", "yahoo.co.in", "ymail.com", "aol.com", "icloud.com", "me.com",
  "protonmail.com", "proton.me", "mail.com", "zoho.com", "rediffmail.com",
  "rediff.com", "mail.ru", "yandex.com", "qq.com", "163.com",
  "msn.com", "gmx.com", "web.de", "tutanota.com", "fastmail.com",
  "tempmail.com", "guerrillamail.com", "mailinator.com", "10minutemail.com",
];

function isBlockedDomain(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return true;
  return BLOCKED_DOMAINS.includes(domain);
}

type DownloadPhase = "form" | "verification" | "success";

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
  const [phase, setPhase] = useState<DownloadPhase>("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [finalDownloadUrl, setFinalDownloadUrl] = useState<string | null>(null);

  // Verification state
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Validate email domain on change
  useEffect(() => {
    if (formData.email && formData.email.includes("@")) {
      if (isBlockedDomain(formData.email)) {
        setEmailError("Please use your company email. Personal email addresses are not accepted.");
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError(null);
    }
  }, [formData.email]);

  const resetState = () => {
    setPhase("form");
    setFormData({ name: "", email: "", company: "" });
    setIsSubmitting(false);
    setError("");
    setEmailError(null);
    setFinalDownloadUrl(null);
    setVerificationId(null);
    setPin("");
    setIsVerifying(false);
    setIsSendingCode(false);
    setVerificationError(null);
    setVerificationSuccess(false);
  };

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || emailError) return;

    setIsSendingCode(true);
    setError("");
    setVerificationError(null);

    try {
      const res = await fetch("/api/chat/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "BLOCKED_DOMAIN") {
          setEmailError(data.message);
        } else {
          setVerificationError(data.message || "Failed to send verification code");
        }
        return;
      }

      setVerificationId(data.verificationId);
      setPhase("verification");
    } catch {
      setVerificationError("Failed to send verification code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyAndDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationId || !pin || pin.length !== 6) return;

    setIsVerifying(true);
    setVerificationError(null);

    try {
      // Step 1: Verify the PIN
      const verifyRes = await fetch("/api/chat/verify/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationId, pin }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        setVerificationError(verifyData.message || "Invalid verification code");
        return;
      }

      setVerificationSuccess(true);

      // Step 2: Process the download
      let responseDownloadUrl = downloadUrl;

      if (useResourcesApi) {
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
          throw new Error(data.error || "Failed to process download");
        }

        const data = await response.json();
        responseDownloadUrl = data.downloadUrl || downloadUrl;
      } else {
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
          throw new Error("Failed to process download");
        }
      }

      setFinalDownloadUrl(responseDownloadUrl || null);
      setPhase("success");

      // Trigger download and close after delay
      setTimeout(() => {
        if (responseDownloadUrl) {
          window.open(responseDownloadUrl, "_blank");
        }
        setIsOpen(false);
        resetState();
      }, 2500);
    } catch (err) {
      setVerificationError(err instanceof Error ? err.message : "Failed to process your request. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setPin("");
    setVerificationError(null);
    setVerificationSuccess(false);
    setIsSendingCode(true);

    try {
      const res = await fetch("/api/chat/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setVerificationError(data.message || "Failed to resend code");
        return;
      }

      setVerificationId(data.verificationId);
    } catch {
      setVerificationError("Failed to resend code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetState();
    }}>
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
            {phase === "form"
              ? "Enter your business details to access this resource."
              : phase === "verification"
                ? "Verify your email to proceed with the download."
                : "Your download is ready!"}
          </DialogDescription>
        </DialogHeader>

        {phase === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-xl font-bold mb-2">Thank You!</h4>
            <p className="text-muted-foreground">
              Your download will start shortly.
            </p>
          </div>
        ) : phase === "verification" ? (
          <div className="space-y-4">
            {/* Back button */}
            <button
              onClick={() => {
                setPhase("form");
                setPin("");
                setVerificationError(null);
                setVerificationSuccess(false);
              }}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {/* Email sent confirmation */}
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
                    Check your email
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    We sent a 6-digit code to <strong>{formData.email}</strong>
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerifyAndDownload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="download-pin">Verification Code *</Label>
                <input
                  id="download-pin"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPin(value);
                    setVerificationError(null);
                  }}
                  required
                  disabled={verificationSuccess}
                  className={cn(
                    "flex h-12 w-full rounded-md border bg-background px-3 py-2 text-lg text-center font-mono tracking-widest placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    verificationSuccess ? "border-green-500 bg-green-50 dark:bg-green-950/30" : "border-input"
                  )}
                />
              </div>

              {verificationError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {verificationError}
                  </p>
                </div>
              )}

              {verificationSuccess && (
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Email verified! Processing download...
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isVerifying || pin.length !== 6 || verificationSuccess}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : verificationSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Verified!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Verify & Download
                  </>
                )}
              </Button>
            </form>

            {/* Resend option */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Didn&apos;t receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isSendingCode}
                className="text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingCode ? "Sending..." : "Resend code"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendVerification} className="space-y-4">
            {/* Business email notice */}
            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  <strong>Company email required:</strong> We only accept business email addresses. Personal emails (Gmail, Yahoo, etc.) are not accepted.
                </p>
              </div>
            </div>

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
                  className={cn(
                    "pl-10",
                    emailError ? "border-destructive focus-visible:ring-destructive" : ""
                  )}
                  required
                />
              </div>
              {emailError && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Organisation Name *</Label>
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
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {verificationError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {verificationError}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSendingCode || !!emailError || !formData.name || !formData.email || !formData.company}
              className="w-full"
            >
              {isSendingCode ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Verification Code...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Verify Email & Download
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
