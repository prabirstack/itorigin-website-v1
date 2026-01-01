"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setMessage(result.message || "Successfully subscribed!");
        reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setMessage("");
        }, 5000);
      } else {
        setIsError(true);
        setMessage(result.error || "Failed to subscribe. Please try again.");
        setTimeout(() => {
          setIsError(false);
          setMessage("");
        }, 5000);
      }
    } catch {
      setIsError(true);
      setMessage("Failed to subscribe. Please try again.");
      setTimeout(() => {
        setIsError(false);
        setMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl border border-primary bg-primary/5 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-black mb-2">Success!</h3>
        <p className="text-muted-foreground">
          You&apos;ve been subscribed to our newsletter. Check your inbox for confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl border border-primary bg-primary/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-black">Subscribe to Newsletter</h3>
          <p className="text-sm text-muted-foreground">Get weekly security insights</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Your Name (optional)"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Your Email Address"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <Mail className="w-5 h-5" />
              <span>Subscribe Now</span>
            </>
          )}
        </button>

        {message && !isSubmitted && (
          <div className={`flex items-center gap-2 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>
            {isError ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {message}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          By subscribing, you agree to receive our weekly newsletter. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
