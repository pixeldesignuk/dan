"use client";

import { EmailSignupForm } from "@/components/forms/EmailSignupForm";
import { useEffect, useRef, useState } from "react";
import type { EmailCaptureSectionData } from "@/lib/sanity/queries";

interface EmailCaptureProps {
  data?: EmailCaptureSectionData;
}

const defaultData: Omit<EmailCaptureSectionData, "_type" | "_key" | "enabled"> = {
  overline: "Stay connected",
  headline: "Get updates from the field",
  description:
    "Mission reports, impact stories, and ways to get involved. No spam, just meaningful updates.",
};

export function EmailCapture({ data }: EmailCaptureProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Merge CMS data with defaults
  const content = {
    ...defaultData,
    ...data,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-edge bg-surface-card"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 py-16 lg:py-20">
          {/* Left - Content */}
          <div className="flex flex-col justify-center">
            <span
              className={`text-overline transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {content.overline}
            </span>
            <h2
              className={`mt-4 text-display-md transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {content.headline}
            </h2>
            <p
              className={`mt-4 text-body text-ink-secondary max-w-md transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {content.description}
            </p>
          </div>

          {/* Right - Form */}
          <div
            className={`flex items-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <EmailSignupForm variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
}
