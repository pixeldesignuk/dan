"use client";

import posthog from "posthog-js";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface PageViewProps {
  path: string;
  referrer?: string;
  utmParams?: UTMParams;
}

interface CtaClickProps {
  ctaName: string;
  placement: string;
  destinationUrl: string;
  contentType?: string;
  contentSlug?: string;
}

interface DonateClickProps {
  placement: string;
  destinationUrl: string;
  contentType?: string;
  contentSlug?: string;
}

interface EmailSignupProps {
  source: string;
  status: "success" | "error";
  errorMessage?: string;
}

interface VolunteerFormProps {
  status: "success" | "error";
  errorMessage?: string;
}

interface OutboundClickProps {
  destinationUrl: string;
  type: "donate" | "registration" | "social" | "other";
}

export function trackPageView({ path, referrer, utmParams }: PageViewProps) {
  posthog.capture("page_view", {
    path,
    referrer,
    ...utmParams,
  });
}

export function trackCtaClick({
  ctaName,
  placement,
  destinationUrl,
  contentType,
  contentSlug,
}: CtaClickProps) {
  posthog.capture("cta_click", {
    cta_name: ctaName,
    placement,
    destination_url: destinationUrl,
    content_type: contentType,
    content_slug: contentSlug,
  });
}

export function trackDonateClick({
  placement,
  destinationUrl,
  contentType,
  contentSlug,
}: DonateClickProps) {
  posthog.capture("donate_click", {
    placement,
    destination_url: destinationUrl,
    content_type: contentType,
    content_slug: contentSlug,
  });

  // Also track as outbound click
  trackOutboundClick({ destinationUrl, type: "donate" });
}

export function trackEmailSignup({ source, status, errorMessage }: EmailSignupProps) {
  posthog.capture("email_signup_submitted", {
    source,
    status,
    error_message: errorMessage,
  });
}

export function trackVolunteerFormSubmit({ status, errorMessage }: VolunteerFormProps) {
  posthog.capture("volunteer_form_submitted", {
    status,
    error_message: errorMessage,
  });
}

export function trackOutboundClick({ destinationUrl, type }: OutboundClickProps) {
  // Use sendBeacon for reliable tracking when navigating away
  const data = JSON.stringify({
    event: "outbound_click",
    properties: {
      destination_url: destinationUrl,
      type,
      timestamp: new Date().toISOString(),
    },
  });

  // Try sendBeacon first for reliability
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([data], { type: "application/json" });
    navigator.sendBeacon(
      `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/capture/`,
      blob
    );
  }

  // Also fire regular PostHog event
  posthog.capture("outbound_click", {
    destination_url: destinationUrl,
    type,
  });
}
