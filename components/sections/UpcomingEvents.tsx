"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Event } from "@/lib/sanity/queries";
import { useEffect, useRef, useState } from "react";

interface UpcomingEventsProps {
  events: Event[];
}

function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!endDate) return startStr;

  const end = new Date(endDate);

  if (start.toDateString() === end.toDateString()) {
    return startStr;
  }

  const endStr = end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

function getEventTypeBadge(eventType?: string): string | undefined {
  switch (eventType) {
    case "fundraiser":
      return "Fundraiser";
    case "volunteer":
      return "Volunteer";
    case "community":
      return "Community";
    case "webinar":
      return "Webinar";
    default:
      return undefined;
  }
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
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

  if (!events || events.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-lg bg-surface">
      <div className="container-editorial">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-overline">Get involved</span>
            <h2
              className={`mt-4 text-display-md transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Upcoming events
            </h2>
          </div>
          <Link
            href="/events"
            className={`group inline-flex items-center gap-2 text-body font-medium text-ink-secondary hover:text-ink transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            View all events
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={event._id}
              className={`bg-surface transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <Card
                href={`/events/${event.slug.current}`}
                title={event.title}
                subtitle={
                  <span className="flex items-center gap-3 text-ink-muted">
                    <span>{formatEventDate(event.startDate, event.endDate)}</span>
                    {event.location && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-ink-faint" />
                        <span>{event.location}</span>
                      </>
                    )}
                  </span>
                }
                excerpt={event.excerpt}
                image={event.heroImage}
                badge={getEventTypeBadge(event.eventType)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
