"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { trackDonateClick } from "@/lib/posthog/events";
import { useDonate } from "@/lib/donate/context";

interface FloatingDonateWidgetProps {
  donateUrl?: string; // Kept for potential fallback, but no longer primary
}

const FREQUENCIES = [
  { value: "once", label: "Give Once" },
  { value: "monthly", label: "Monthly" },
];

const AMOUNTS = [
  { value: "10", label: "£ 10" },
  { value: "25", label: "£ 25" },
  { value: "50", label: "£ 50" },
  { value: "100", label: "£ 100" },
  { value: "250", label: "£ 250" },
  { value: "other", label: "Other" },
];

const DONATION_TYPES = [
  { value: "general", label: "General" },
  { value: "missions", label: "Missions" },
  { value: "equipment", label: "Equipment" },
];

interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

function Dropdown({ options, value, onChange, className = "", label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label}
        aria-expanded={isOpen}
        className="flex items-center justify-between gap-4 w-full h-14 bg-surface-warm/95 rounded-full px-6 text-ink font-semibold text-base hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 transition-colors"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown
          className={`w-5 h-5 text-ink-muted flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-3xl shadow-elevated overflow-hidden z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-4 text-base font-medium hover:bg-surface-warm focus-visible:outline-none focus-visible:bg-surface-cool transition-colors ${
                option.value === value ? "bg-surface-cool text-brand-orange" : "text-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FloatingDonateWidget({ donateUrl }: FloatingDonateWidgetProps) {
  const [frequency, setFrequency] = useState("once");
  const [amount, setAmount] = useState("10");
  const [donationType, setDonationType] = useState("general");
  const [isVisible, setIsVisible] = useState(false);
  const { openDonate } = useDonate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDonateClick = () => {
    // Convert amount to pence (skip "other" - let sidebar handle custom)
    const amountInPence = amount !== "other" ? parseInt(amount) * 100 : undefined;

    // Map frequency to payment type
    const paymentType = frequency === "monthly" ? "subscription" : "one_time";

    trackDonateClick({
      placement: "sticky-donation-bar",
      destinationUrl: "donate-sidebar",
      contentType: `${frequency}-${amount}-${donationType}`,
    });

    openDonate({
      defaultAmount: amountInPence,
      paymentType,
      donationType,
      fromToolbar: true,
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 hidden lg:block px-6">
      <div className="max-w-container-xl mx-auto">
        {/* Floating rounded bar with blur */}
        <div className="bg-brand-blue/80 backdrop-blur-xl rounded-full border border-white/10 shadow-dramatic">
          <div className="px-10 py-4">
            <div className="flex items-center gap-4">
              {/* Label */}
              <span className="text-white font-semibold text-lg whitespace-nowrap pr-2">
                General Donation
              </span>

              {/* Frequency dropdown */}
              <Dropdown
                options={FREQUENCIES}
                value={frequency}
                onChange={setFrequency}
                label="Select donation frequency"
                className="flex-1 min-w-[140px]"
              />

              {/* Amount dropdown */}
              <Dropdown
                options={AMOUNTS}
                value={amount}
                onChange={setAmount}
                label="Select donation amount"
                className="w-[140px]"
              />

              {/* Donation type dropdown */}
              <Dropdown
                options={DONATION_TYPES}
                value={donationType}
                onChange={setDonationType}
                label="Select donation type"
                className="flex-1 min-w-[130px]"
              />

              {/* Donate button */}
              <button
                onClick={handleDonateClick}
                className="h-14 inline-flex items-center justify-center bg-brand-orange text-white px-12 rounded-full font-semibold text-lg hover:bg-brand-orange-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange whitespace-nowrap"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
