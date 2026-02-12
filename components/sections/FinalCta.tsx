"use client";

import { DonateButton } from "@/components/ui/DonateButton";
import { useEffect, useRef, useState } from "react";
import type { FinalCtaSectionData } from "@/lib/sanity/queries";

interface FinalCtaProps {
  donateUrl: string;
  data?: FinalCtaSectionData;
}

const defaultData: Omit<FinalCtaSectionData, "_type" | "_key" | "enabled"> = {
  headline: "Every smile",
  highlightedText: "starts with you",
  description:
    "Your generosity funds volunteer missions, dental equipment, and life-changing care for communities who need it most.",
  trustPoints: ["100% goes to care", "Tax deductible", "Secure giving"],
  ctaLabel: "Give now",
};

export function FinalCta({ donateUrl, data }: FinalCtaProps) {
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
      className="relative bg-surface-warm overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="final-cta-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#final-cta-pattern)" />
        </svg>
      </div>

      <div className="container-narrow relative py-28 lg:py-36">
        <div className="text-center">
          {/* Large impactful headline */}
          <h2
            className={`text-display-xl text-ink transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {content.headline}
            <br />
            <span className="text-brand-blue">{content.highlightedText}</span>
          </h2>

          <p
            className={`mt-8 text-body-lg text-ink-secondary max-w-md mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {content.description}
          </p>

          {/* Trust points */}
          {content.trustPoints && content.trustPoints.length > 0 && (
            <div
              className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-body-sm text-ink-muted transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {content.trustPoints.map((point, index) => (
                <span key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-green" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div
            className={`mt-12 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <DonateButton
              url={donateUrl}
              placement="final-cta"
              variant="primary"
              size="large"
              showArrow
            >
              {content.ctaLabel}
            </DonateButton>
          </div>
        </div>
      </div>
    </section>
  );
}
