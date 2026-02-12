"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { VolunteerCtaSectionData } from "@/lib/sanity/queries";

interface VolunteerCtaProps {
  data?: VolunteerCtaSectionData;
}

const defaultData: Omit<VolunteerCtaSectionData, "_type" | "_key" | "enabled"> = {
  overline: "Join our team",
  headline: "Become a volunteer",
  description:
    "Whether you're a dental professional or passionate about making a difference, we have a place for you. Join us on our next mission.",
  ctaLabel: "Apply to volunteer",
  ctaLink: "/volunteer",
  benefits: [
    { value: "50+", label: "Volunteer professionals on each mission" },
    { value: "2 weeks", label: "Average mission duration" },
    { value: "100%", label: "Travel and accommodation covered" },
    { value: "CME", label: "Continuing education credits available" },
  ],
};

export function VolunteerCta({ data }: VolunteerCtaProps) {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      style={{ backgroundColor: "#F0F9F0" }}
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 py-20 lg:py-28">
          {/* Left - Content */}
          <div className="flex flex-col justify-center">
            <span
              className={`text-overline transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ color: "#5A8A3C" }}
            >
              {content.overline}
            </span>
            <h2
              className={`mt-4 text-display-lg transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#333333" }}
            >
              {content.headline}
            </h2>
            <p
              className={`mt-6 text-body-lg max-w-md transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#4A4A4A" }}
            >
              {content.description}
            </p>

            <div
              className={`mt-10 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href={content.ctaLink || "/volunteer"}
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5 group"
                style={{ backgroundColor: "#96CA2D" }}
              >
                {content.ctaLabel}
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Right - Benefits grid */}
          {content.benefits && content.benefits.length > 0 && (
            <div
              className={`grid grid-cols-2 gap-px transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ backgroundColor: "#D4E8C7" }}
            >
              {content.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-8"
                  style={{ backgroundColor: index % 2 === 0 ? "#E8F4E0" : "#E2F1D8" }}
                >
                  <div
                    className="font-display font-semibold text-display-sm"
                    style={{ color: "#5A8A3C" }}
                  >
                    {benefit.value}
                  </div>
                  <div className="mt-2 text-body-sm" style={{ color: "#4A4A4A" }}>
                    {benefit.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
