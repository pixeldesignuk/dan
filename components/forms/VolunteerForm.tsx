"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { trackVolunteerFormSubmit } from "@/lib/posthog/events";

const professions = [
  { value: "", label: "Select your profession" },
  { value: "dentist", label: "Dentist" },
  { value: "dental-hygienist", label: "Dental Hygienist" },
  { value: "dental-assistant", label: "Dental Assistant" },
  { value: "dental-student", label: "Dental Student" },
  { value: "medical-professional", label: "Other Medical Professional" },
  { value: "non-medical", label: "Non-Medical Volunteer" },
  { value: "other", label: "Other" },
];

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.profession) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/mailchimp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.name.split(" ")[0],
          lastName: formData.name.split(" ").slice(1).join(" "),
          tags: ["volunteer", formData.profession],
          mergeFields: {
            PHONE: formData.phone,
            PROFESSION: formData.profession,
            MESSAGE: formData.message,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", profession: "", message: "" });
      trackVolunteerFormSubmit({ status: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      setStatus("error");
      setErrorMessage(message);
      trackVolunteerFormSubmit({ status: "error", errorMessage: message });
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl bg-brand-green/10 p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-brand-green" aria-hidden="true" />
        <h3 className="heading-3 mb-2">Thank You!</h3>
        <p className="text-ink-light">
          We&apos;ve received your volunteer application. Our team will review your
          information and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          Full Name <span className="text-donate-crimson">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="volunteer-email" className="mb-2 block text-sm font-medium text-ink">
          Email Address <span className="text-donate-crimson">*</span>
        </label>
        <input
          type="email"
          id="volunteer-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
          Phone Number <span className="text-ink-muted">(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      {/* Profession */}
      <div>
        <label htmlFor="profession" className="mb-2 block text-sm font-medium text-ink">
          Profession <span className="text-donate-crimson">*</span>
        </label>
        <select
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100"
        >
          {professions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message <span className="text-ink-muted">(Optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === "loading"}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100"
          placeholder="Tell us about your experience and why you'd like to volunteer..."
        />
      </div>

      {/* Error Message */}
      {status === "error" && (
        <div
          className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
