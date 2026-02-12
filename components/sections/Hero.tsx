"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DonationWidget } from "@/components/ui/DonationWidget";
import { ArrowDown, ArrowRight } from "lucide-react";

interface HeroProps {
  donateUrl: string;
}

export function Hero({ donateUrl }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

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
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-[10%] items-center">
            {/* Left column - Editorial headline */}
            <div>
              {/* Overline */}
              <div
                className={`transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="text-overline text-ink-muted">
                  Global dental care nonprofit
                </span>
              </div>

              {/* Main headline - editorial, dramatic */}
              <h1
                className={`mt-6 font-display font-bold text-display-xl text-ink transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Smiles that
                <br />
                <span className="text-brand-blue">change lives</span>
              </h1>

              {/* Subheadline */}
              <p
                className={`mt-8 text-body-lg text-ink-secondary max-w-lg transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                We send volunteer dental teams to underserved communities worldwide.
                Your generosity transforms pain into relief, shame into confidence.
              </p>

              {/* CTA group */}
              <div
                className={`mt-10 transition-all duration-700 delay-400 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Link
                  href="/missions"
                  className="btn-outline"
                >
                  Our missions
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust indicators - minimal */}
              <div
                className={`mt-12 pt-8 border-t border-edge transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <div className="font-display font-semibold text-display-sm text-ink tabular-nums">50,000+</div>
                    <div className="mt-1 text-caption text-ink-muted uppercase tracking-wider">Patients treated</div>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-display-sm text-ink tabular-nums">25</div>
                    <div className="mt-1 text-caption text-ink-muted uppercase tracking-wider">Countries</div>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-display-sm text-ink tabular-nums">100%</div>
                    <div className="mt-1 text-caption text-ink-muted uppercase tracking-wider">Goes to care</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Donation Widget */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <DonationWidget
                donateUrl={donateUrl}
                placement="hero-widget"
                className="w-full"
              />
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
