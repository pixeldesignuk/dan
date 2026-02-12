"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Loader2, Heart } from "lucide-react";
import { trackDonateClick } from "@/lib/posthog/events";

interface DonateSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAmount?: number;
  project?: string;
  title?: string;
  description?: string;
  defaultPaymentType?: "one_time" | "subscription";
  defaultDonationType?: string;
}

const PRESET_AMOUNTS = [
  { value: 50000, label: "£500", impact: "Fund a full dental mission day" },
  { value: 5000, label: "£50", impact: "Provide dental care for 5 patients" },
  { value: 2500, label: "£25", impact: "Supply essential dental equipment" },
];

const DONATION_TYPES = [
  { value: "general", label: "General Donation" },
  { value: "mission", label: "Mission Support" },
  { value: "equipment", label: "Equipment Fund" },
];

export function DonateSidebar({
  isOpen,
  onClose,
  defaultAmount = 5000,
  project,
  title = "Support Dental Aid Network",
  description = "Your donation helps provide essential dental care to communities in need around the world.",
  defaultPaymentType = "one_time",
  defaultDonationType = "general",
}: DonateSidebarProps) {
  const [paymentType, setPaymentType] = useState<"one_time" | "subscription">(defaultPaymentType);
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [donationType, setDonationType] = useState(defaultDonationType);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when props change (e.g., sidebar opened with new options)
  useEffect(() => {
    if (isOpen) {
      setPaymentType(defaultPaymentType);
      setSelectedAmount(defaultAmount);
      setDonationType(defaultDonationType);
      setIsCustom(false);
      setCustomAmount("");
      setError(null);
    }
  }, [isOpen, defaultPaymentType, defaultAmount, defaultDonationType]);

  // Get current impact message
  const currentImpact = PRESET_AMOUNTS.find((a) => a.value === selectedAmount)?.impact;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");
    setCustomAmount(numericValue);
    setIsCustom(true);
    if (numericValue) {
      setSelectedAmount(parseInt(numericValue) * 100); // Convert to pence
    }
  };

  const handleDonate = useCallback(async () => {
    setError(null);

    // Validate email
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate amount
    const finalAmount = isCustom && customAmount ? parseInt(customAmount) * 100 : selectedAmount;
    if (!finalAmount || finalAmount < 100) {
      setError("Please select or enter an amount (minimum £1)");
      return;
    }

    setIsLoading(true);

    try {
      // Track the donation click
      trackDonateClick({
        placement: "donate-sidebar",
        destinationUrl: "givepay-checkout",
        contentType: donationType,
        contentSlug: project,
      });

      const response = await fetch("/api/givepay/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          paymentType,
          email,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          intention: DONATION_TYPES.find((t) => t.value === donationType)?.label,
          project: project || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to GivePay checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email, firstName, lastName, selectedAmount, customAmount, isCustom, paymentType, donationType, project]);

  if (!isOpen) return null;

  const finalAmount = isCustom && customAmount ? parseInt(customAmount) * 100 : selectedAmount;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-sidebar-title"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-dramatic overflow-y-auto animate-slide-in-from-right"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 pr-4">
              <h2
                id="donate-sidebar-title"
                className="font-display text-display-sm text-ink mb-2"
              >
                {title}
              </h2>
              <p className="text-body-sm text-ink-secondary">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 -mt-2 text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 rounded"
              aria-label="Close donation panel"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Payment Type Toggle */}
          <div className="mb-6">
            <div className="flex rounded-full bg-surface-cool p-1">
              <button
                onClick={() => setPaymentType("one_time")}
                className={`flex-1 py-3 px-4 rounded-full text-body-sm font-semibold transition-all ${
                  paymentType === "one_time"
                    ? "bg-brand-blue text-white shadow-soft"
                    : "text-ink-secondary hover:text-ink"
                }`}
              >
                Give Once
              </button>
              <button
                onClick={() => setPaymentType("subscription")}
                className={`flex-1 py-3 px-4 rounded-full text-body-sm font-semibold transition-all ${
                  paymentType === "subscription"
                    ? "bg-brand-blue text-white shadow-soft"
                    : "text-ink-secondary hover:text-ink"
                }`}
              >
                Give Monthly
              </button>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <p className="text-overline uppercase tracking-wider text-ink-muted mb-4 text-center">
              Select an amount to donate
            </p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleAmountSelect(preset.value)}
                  className={`relative py-4 px-3 rounded-xl border-2 font-semibold transition-all ${
                    selectedAmount === preset.value && !isCustom
                      ? "border-brand-blue bg-surface-cool text-brand-blue"
                      : "border-edge hover:border-brand-blue/50 text-ink"
                  }`}
                >
                  {preset.label}
                  {selectedAmount === preset.value && !isCustom && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-blue rotate-45" />
                  )}
                </button>
              ))}
            </div>

            {/* Impact Message */}
            {currentImpact && !isCustom && (
              <div className="bg-surface-cool rounded-xl p-4 text-center mb-4">
                <p className="text-body-sm text-ink-secondary">{currentImpact}</p>
              </div>
            )}

            {/* Custom Amount */}
            <div className="relative">
              <Heart className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Other Amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                onFocus={() => setIsCustom(true)}
                className={`w-full pl-12 pr-4 py-4 border-b-2 text-body focus:outline-none transition-colors ${
                  isCustom
                    ? "border-brand-blue"
                    : "border-edge focus:border-brand-blue"
                }`}
              />
              {customAmount && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted">
                  £{customAmount}
                </span>
              )}
            </div>
          </div>

          {/* Donation Type */}
          <div className="mb-6">
            <select
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              className="w-full px-4 py-4 border border-edge rounded-xl text-body text-ink bg-white focus:outline-none focus:border-brand-blue transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "20px",
              }}
            >
              {DONATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Information */}
          <div className="mb-6 space-y-4">
            <input
              type="email"
              placeholder="Email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-4 border border-edge rounded-xl text-body focus:outline-none focus:border-brand-blue transition-colors"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-4 border border-edge rounded-xl text-body focus:outline-none focus:border-brand-blue transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-4 border border-edge rounded-xl text-body focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-donate-light rounded-xl">
              <p className="text-body-sm text-donate">{error}</p>
            </div>
          )}

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            disabled={isLoading}
            className="w-full py-5 px-8 bg-donate text-white font-semibold text-lg rounded-full hover:bg-donate-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donate focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Donate £{(finalAmount / 100).toFixed(2)}
                {paymentType === "subscription" && " / month"}
              </>
            )}
          </button>

          {/* Security Note */}
          <p className="mt-4 text-caption text-ink-muted text-center">
            Secure payment powered by GivePay. Your donation is protected.
          </p>
        </div>
      </aside>
    </>
  );
}
