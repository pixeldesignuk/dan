"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { trackDonateClick } from "@/lib/posthog/events";
import { appendUTMParams, getPageCampaign } from "@/lib/utils/utm";

interface DonationWidgetProps {
  donateUrl: string;
  placement?: string;
  className?: string;
}

const PRESET_AMOUNTS = [10, 25, 50, 100];

export function DonationWidget({
  donateUrl,
  placement = "hero-widget",
  className = "",
}: DonationWidgetProps) {
  const pathname = usePathname();
  const [frequency, setFrequency] = useState<"monthly" | "one-off">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");
    setCustomAmount(numericValue);
    if (numericValue) {
      setSelectedAmount(null);
    }
  };

  const getCurrentAmount = (): number | null => {
    if (customAmount) {
      return parseInt(customAmount, 10);
    }
    return selectedAmount;
  };

  const handleDonate = () => {
    const amount = getCurrentAmount();
    const destinationUrl = appendUTMParams(donateUrl, {
      campaign: getPageCampaign(pathname),
      content: `widget-${frequency}-${amount}`,
    });

    trackDonateClick({
      placement,
      destinationUrl,
      contentType: frequency,
      contentSlug: amount?.toString(),
    });

    // Open donation link in new tab
    window.open(destinationUrl, "_blank", "noopener,noreferrer");
  };

  const amount = getCurrentAmount();
  const isValid = amount && amount > 0;

  return (
    <div className={`${className}`}>
      {/* Frequency Tabs */}
      <div className="flex items-end">
        <button
          type="button"
          onClick={() => setFrequency("monthly")}
          className={`flex-1 px-6 text-base font-semibold transition-all duration-200 outline-none ${
            frequency === "monthly"
              ? "pt-[26px] pb-4 text-brand-orange bg-white"
              : "py-4 text-white bg-brand-orange"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setFrequency("one-off")}
          className={`flex-1 px-6 text-base font-semibold transition-all duration-200 outline-none ${
            frequency === "one-off"
              ? "pt-[26px] pb-4 text-brand-orange bg-white"
              : "py-4 text-white bg-brand-orange"
          }`}
        >
          One-off
        </button>
      </div>

      <div className="px-5 py-6 bg-white shadow-[0_-8px_32px_rgb(0,0,0,0.1)]">
        {/* Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountClick(amount)}
              className={`py-3.5 px-2 text-base font-semibold rounded-md border-2 transition-all duration-200 ${
                selectedAmount === amount && !customAmount
                  ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                  : "border-edge hover:border-brand-orange/50 text-ink"
              }`}
            >
              £{amount}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="mb-5">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted font-semibold">
              £
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Other amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className={`w-full pl-8 pr-4 py-3.5 text-base font-semibold rounded-md border-2 transition-all duration-200 outline-none ${
                customAmount
                  ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                  : "border-edge text-ink placeholder:text-ink-muted hover:border-brand-orange/50"
              } focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20`}
            />
          </div>
        </div>

        {/* Donate Button */}
        <button
          type="button"
          onClick={handleDonate}
          disabled={!isValid}
          className={`w-full py-4 px-6 text-lg font-bold rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
            isValid
              ? "bg-brand-orange text-white hover:bg-brand-orange-hover hover:-translate-y-0.5 shadow-soft hover:shadow-medium"
              : "bg-ink-faint text-white cursor-not-allowed"
          }`}
        >
          Donate{isValid && ` £${amount}`}
          {frequency === "monthly" && isValid && "/month"}
          <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Security note */}
        <p className="mt-3 text-center text-caption text-ink-muted">
          Secure donation powered by Givebrite
        </p>
      </div>
    </div>
  );
}
