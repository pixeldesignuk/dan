"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Check, AlertCircle } from "lucide-react";
import { trackEmailSignup } from "@/lib/posthog/events";

interface EmailSignupFormProps {
  variant?: "inline" | "footer";
}

export function EmailSignupForm({ variant = "inline" }: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/mailchimp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
      trackEmailSignup({ source: variant, status: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setStatus("error");
      setErrorMessage(message);
      trackEmailSignup({ source: variant, status: "error", errorMessage: message });
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 text-brand-green"
        role="status"
        aria-live="polite"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10">
          <Check className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className="text-body font-medium text-ink">Thanks for subscribing</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex">
        <label htmlFor={`email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id={`email-${variant}`}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className={`flex-1 px-5 py-4 text-body bg-surface border border-edge rounded-l-full text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-ink/20 disabled:opacity-60 ${
            status === "error" ? "border-donate" : ""
          }`}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `error-${variant}` : undefined}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center px-6 py-4 bg-ink text-white font-semibold rounded-r-full hover:bg-ink-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          )}
          <span className="sr-only">{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
        </button>
      </div>

      {status === "error" && (
        <div
          id={`error-${variant}`}
          className="mt-3 flex items-center gap-2 text-body-sm text-donate"
          role="alert"
        >
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          {errorMessage}
        </div>
      )}
    </form>
  );
}
