"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DonateButton } from "@/components/ui/DonateButton";
import { useEffect, useRef, useState } from "react";

interface DonationIntentProps {
  donateUrl: string;
}

export function DonationIntent({ donateUrl }: DonationIntentProps) {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-lg bg-surface">
      <div className="container-editorial">
        {/* Editorial problem statement */}
        <div className="max-w-3xl">
          <span className="text-overline">The challenge</span>
          <h2
            className={`mt-4 text-display-lg transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            2 billion people lack access to basic dental care
          </h2>
          <p
            className={`mt-6 text-body-lg text-ink-secondary max-w-2xl transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Untreated dental disease causes chronic pain, malnutrition, and missed
            opportunities. For many communities, a dentist is a luxury they have
            never known.
          </p>
        </div>

        {/* Divider */}
        <div
          className={`my-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="divider" />
        </div>

        {/* How you can help - asymmetric grid */}
        <div>
          <span className="text-overline">How you can help</span>
          <h3
            className={`mt-4 text-display-md transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Choose your impact
          </h3>

          <div className="mt-12 grid md:grid-cols-2 gap-px bg-edge">
            {/* General donation card */}
            <div
              className={`bg-surface-card p-8 lg:p-12 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-donate/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-donate"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-display-sm">Give where needed most</h4>
                  <p className="mt-1 text-caption text-ink-muted uppercase tracking-wider">
                    Flexible funding
                  </p>
                </div>
              </div>

              <p className="mt-6 text-body text-ink-secondary">
                Your donation goes directly to equipment, supplies, and mission
                logistics. 100% of funds support our charitable work.
              </p>

              <div className="mt-8">
                <DonateButton
                  url={donateUrl}
                  placement="donation-intent-general"
                  variant="primary"
                >
                  Donate now
                </DonateButton>
              </div>
            </div>

            {/* Fund a mission card */}
            <div
              className={`bg-surface-card p-8 lg:p-12 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand-blue"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-display-sm">Fund a specific mission</h4>
                  <p className="mt-1 text-caption text-ink-muted uppercase tracking-wider">
                    Direct impact
                  </p>
                </div>
              </div>

              <p className="mt-6 text-body text-ink-secondary">
                Choose a mission to support and follow along as we provide care
                to communities you help reach.
              </p>

              <div className="mt-8">
                <Link
                  href="/missions"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  Browse missions
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
