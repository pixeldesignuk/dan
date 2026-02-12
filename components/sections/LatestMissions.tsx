"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Mission } from "@/lib/sanity/queries";
import { useEffect, useRef, useState } from "react";

interface LatestMissionsProps {
  missions: Mission[];
}

function formatDateRange(dateRange?: { start?: string; end?: string }): string {
  if (!dateRange?.start) return "Dates TBD";

  const start = new Date(dateRange.start);
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (!dateRange.end) return startStr;

  const end = new Date(dateRange.end);
  const endStr = end.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

function getStatusBadge(status?: string): string | undefined {
  switch (status) {
    case "active":
      return "Active";
    case "upcoming":
      return "Upcoming";
    case "completed":
      return "Completed";
    default:
      return undefined;
  }
}

export function LatestMissions({ missions }: LatestMissionsProps) {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!missions || missions.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-lg bg-surface-warm">
      <div className="container-editorial">
        {/* Header with editorial layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-overline">Where we work</span>
            <h2
              className={`mt-4 text-display-md transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Latest missions
            </h2>
          </div>
          <Link
            href="/missions"
            className={`group inline-flex items-center gap-2 text-body font-medium text-ink-secondary hover:text-ink transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            View all missions
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission, index) => (
            <div
              key={mission._id}
              className={`bg-surface-warm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <Card
                href={`/missions/${mission.slug.current}`}
                title={mission.title}
                subtitle={
                  <span className="flex items-center gap-3 text-ink-muted">
                    {mission.location && <span>{mission.location}</span>}
                    {mission.location && mission.dateRange && (
                      <span className="w-1 h-1 rounded-full bg-ink-faint" />
                    )}
                    <span>{formatDateRange(mission.dateRange)}</span>
                  </span>
                }
                excerpt={mission.excerpt}
                image={mission.heroImage}
                badge={getStatusBadge(mission.status)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
