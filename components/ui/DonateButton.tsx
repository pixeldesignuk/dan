"use client";

import { ArrowUpRight } from "lucide-react";
import { useDonate } from "@/lib/donate/context";
import { trackDonateClick } from "@/lib/posthog/events";

interface DonateButtonProps {
  placement: string;
  contentType?: string;
  contentSlug?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "minimal";
  size?: "default" | "large";
  showArrow?: boolean;
}

export function DonateButton({
  placement,
  contentType,
  contentSlug,
  children,
  className = "",
  variant = "primary",
  size = "default",
  showArrow = false,
}: DonateButtonProps) {
  const { openDonate } = useDonate();

  const handleClick = () => {
    trackDonateClick({
      placement,
      destinationUrl: "donate-sidebar",
      contentType,
      contentSlug,
    });
    openDonate();
  };

  const baseStyles = "inline-flex items-center justify-center font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 will-change-transform";

  const sizeStyles = {
    default: "px-8 py-4 text-base",
    large: "px-10 py-5 text-lg",
  };

  const variantStyles = {
    primary: "bg-brand-orange text-white rounded-full hover:bg-brand-orange-hover focus-visible:ring-brand-orange",
    outline: "border-2 border-brand-orange text-brand-orange bg-transparent rounded-full hover:bg-brand-orange hover:text-white focus-visible:ring-brand-orange",
    minimal: "text-brand-orange hover:text-brand-orange-hover underline underline-offset-4 px-0 py-0",
  };

  const transitionStyles = variant === "minimal"
    ? "transition-colors duration-200"
    : "transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5";

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${transitionStyles} ${className}`}
      aria-label={`Donate${contentType ? ` to ${contentType}` : ""}`}
    >
      {children || "Donate"}
      {showArrow && <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
