"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DonateButton } from "@/components/ui/DonateButton";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { HeroSectionData } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

interface HeroProps {
  data?: HeroSectionData;
}

const defaultData: Omit<HeroSectionData, "_type" | "_key"> = {
  overline: "Global dental care nonprofit",
  headline: "Smiles that",
  highlightedText: "change lives",
  subheadline:
    "We send volunteer dental teams to underserved communities worldwide. Your generosity transforms pain into relief, shame into confidence.",
  primaryCtaLabel: "Give now",
  secondaryCtaLabel: "Our missions",
  secondaryCtaLink: "/missions",
  trustMetrics: [
    { value: "50,000+", label: "Patients treated" },
    { value: "25", label: "Countries" },
    { value: "100%", label: "Goes to care" },
  ],
  floatingStatValue: "$2M+",
  floatingStatLabel: "In care delivered",
};

export function Hero({ data }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Merge CMS data with defaults
  const content = {
    ...defaultData,
    ...data,
  };

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col bg-surface-warm overflow-hidden"
    >
      {/* Background subtle pattern - custom tooth grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tooth-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40 10c-8 0-14 6-14 14 0 4 2 8 4 12l6 18c1 3 3 5 4 5s3-2 4-5l6-18c2-4 4-8 4-12 0-8-6-14-14-14z"
                fill="currentColor"
                className="text-ink"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tooth-pattern)" />
        </svg>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center">
        <div className="container-editorial w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left column - Editorial headline */}
            <div className="lg:col-span-7 xl:col-span-6">
              {/* Overline */}
              <div
                className={`transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="text-overline text-ink-muted">
                  {content.overline}
                </span>
              </div>

              {/* Main headline - editorial, dramatic */}
              <h1
                className={`mt-6 font-display font-bold text-display-xl text-ink transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {content.headline}
                <br />
                <span className="text-brand-blue">{content.highlightedText}</span>
              </h1>

              {/* Subheadline */}
              <p
                className={`mt-8 text-body-lg text-ink-secondary max-w-lg transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {content.subheadline}
              </p>

              {/* CTA group */}
              <div
                className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <DonateButton
                  placement="hero"
                  variant="primary"
                  size="large"
                  showArrow
                >
                  {content.primaryCtaLabel}
                </DonateButton>
                <Link
                  href={content.secondaryCtaLink || "/missions"}
                  className="btn-outline"
                >
                  {content.secondaryCtaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust indicators - minimal */}
              {content.trustMetrics && content.trustMetrics.length > 0 && (
                <div
                  className={`mt-12 pt-8 border-t border-edge transition-all duration-700 delay-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="flex flex-wrap gap-x-10 gap-y-4">
                    {content.trustMetrics.map((metric, index) => (
                      <div key={index}>
                        <div className="font-display font-semibold text-display-sm text-ink tabular-nums">
                          {metric.value}
                        </div>
                        <div className="mt-1 text-caption text-ink-muted uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Visual element */}
            <div
              className={`lg:col-span-5 xl:col-span-6 lg:pt-24 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                {/* Hero image with geometric frame */}
                <div className="absolute inset-0 bg-surface-cool border border-edge">
                  {/* Image container with editorial crop */}
                  <div className="absolute inset-4 lg:inset-6 bg-gradient-to-br from-brand-blue/10 to-brand-green/10 overflow-hidden">
                    {content.heroImage?.asset ? (
                      <Image
                        src={urlFor(content.heroImage).width(800).height(1000).url()}
                        alt={content.heroImage.alt || "Dental Aid Network volunteers providing care"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      /* Placeholder decorative smile icon */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          viewBox="0 0 200 200"
                          className="w-3/4 h-3/4 text-ink/5"
                          fill="currentColor"
                        >
                          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
                          <path
                            d="M60 110 Q100 150 140 110"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          <circle cx="70" cy="80" r="8" />
                          <circle cx="130" cy="80" r="8" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating stat card */}
                {content.floatingStatValue && (
                  <div
                    className={`absolute -left-6 lg:-left-12 bottom-16 bg-surface-card border border-edge p-6 shadow-elevated transition-all duration-700 delay-700 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                  >
                    <div className="font-display font-semibold text-display-sm text-brand-blue">
                      {content.floatingStatValue}
                    </div>
                    <div className="mt-1 text-caption text-ink-muted uppercase tracking-wider">
                      {content.floatingStatLabel}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pb-8 flex justify-center">
        <button
          onClick={scrollToContent}
          className={`flex flex-col items-center gap-2 text-ink-muted hover:text-ink transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          aria-label="Scroll to content"
        >
          <span className="text-caption uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
