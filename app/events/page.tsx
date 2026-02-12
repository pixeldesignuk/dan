import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allEventsQuery, type Event } from "@/lib/sanity/queries";
import { Card } from "@/components/ui/Card";
import { MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Events",
  description: "Join our upcoming fundraisers, volunteer events, and community gatherings.",
};

async function getEvents(): Promise<Event[]> {
  try {
    return (await client.fetch<Event[]>(allEventsQuery)) || [];
  } catch {
    return [];
  }
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

export default async function EventsPage() {
  const events = await getEvents();

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.startDate) >= now);
  const pastEvents = events.filter((e) => new Date(e.startDate) < now);

  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mb-10 text-center">
          <h1 className="heading-1 mb-4">Events</h1>
          <p className="mx-auto max-w-2xl text-lg text-ink-light">
            Join our fundraisers, volunteer events, and community gatherings.
            Together, we can make a bigger impact.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ink-muted">No events available yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <section className="mb-12">
                <h2 className="heading-2 mb-6">Upcoming Events</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <Card
                      key={event._id}
                      href={`/events/${event.slug.current}`}
                      title={event.title}
                      subtitle={
                        <span className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {formatEventDate(event.startDate, event.endDate)}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {event.location}
                            </span>
                          )}
                        </span>
                      }
                      excerpt={event.excerpt}
                      image={event.heroImage}
                      badge={getEventTypeBadge(event.eventType)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <section>
                <h2 className="heading-2 mb-6 text-ink-muted">Past Events</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((event) => (
                    <Card
                      key={event._id}
                      href={`/events/${event.slug.current}`}
                      title={event.title}
                      subtitle={
                        <span className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {formatEventDate(event.startDate, event.endDate)}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {event.location}
                            </span>
                          )}
                        </span>
                      }
                      excerpt={event.excerpt}
                      image={event.heroImage}
                      badge={getEventTypeBadge(event.eventType)}
                      className="opacity-75"
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
