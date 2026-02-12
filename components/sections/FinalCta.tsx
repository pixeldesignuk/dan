"use client";

import { DonateButton } from "@/components/ui/DonateButton";
import { useEffect, useRef, useState } from "react";

interface FinalCtaProps {
  donateUrl: string;
}

export function FinalCta({ donateUrl }: FinalCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
            Every smile
            <br />
            <span className="text-brand-blue">starts with you</span>
          </h2>

          <p
            className={`mt-8 text-body-lg text-ink-secondary max-w-md mx-auto transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Your generosity funds volunteer missions, dental equipment, and
            life-changing care for communities who need it most.
          </p>

          {/* Trust points */}
          <div
            className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-body-sm text-ink-muted transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              100% goes to care
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tax deductible
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-green" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Secure giving
            </span>
          </div>

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
              Give now
            </DonateButton>
          </div>
        </div>
      </div>
    </section>
  );
}
