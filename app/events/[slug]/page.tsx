import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import {
  eventBySlugQuery,
  siteSettingsQuery,
  type Event,
  type SiteSettings,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/ui/PortableText";
import { DonateButton } from "@/components/ui/DonateButton";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    return await client.fetch<Event>(eventBySlugQuery, { slug });
  } catch {
    return null;
  }
}

async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch<SiteSettings>(siteSettingsQuery);
    return settings || { siteName: "Dental Aid Network", primaryDonateUrl: "https://givebrite.com/dental-aid-network" };
  } catch {
    return { siteName: "Dental Aid Network", primaryDonateUrl: "https://givebrite.com/dental-aid-network" };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: event.title,
    description: event.excerpt,
    openGraph: {
      title: event.title,
      description: event.excerpt,
      type: "article",
      images: event.heroImage
        ? [urlFor(event.heroImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!endDate) return startStr;

  const end = new Date(endDate);
  if (start.toDateString() === end.toDateString()) {
    return startStr;
  }

  const endStr = end.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

function getEventTypeBadgeStyles(eventType?: string): string {
  switch (eventType) {
    case "fundraiser":
      return "bg-orange-100 text-orange-800";
    case "volunteer":
      return "bg-green-100 text-green-800";
    case "community":
      return "bg-purple-100 text-purple-800";
    case "webinar":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const [event, settings] = await Promise.all([getEvent(slug), getSettings()]);

  if (!event) {
    notFound();
  }

  const donateUrl = event.givebriteDonateUrl || settings.primaryDonateUrl;
  const isPastEvent = new Date(event.startDate) < new Date();

  return (
    <article>
      {/* Hero */}
      {event.heroImage && (
        <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
          <Image
            src={urlFor(event.heroImage).width(1920).height(800).url()}
            alt={event.heroImage.alt || event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container-page py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              {event.eventType && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getEventTypeBadgeStyles(
                    event.eventType
                  )}`}
                >
                  {event.eventType}
                </span>
              )}
              {isPastEvent && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Past Event
                </span>
              )}
            </div>
            <h1 className="heading-1 mb-4">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-ink-muted">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" aria-hidden="true" />
                {formatEventDate(event.startDate, event.endDate)}
              </span>
              {event.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                  {event.location}
                </span>
              )}
            </div>
          </header>

          {/* Registration Button */}
          {event.registrationUrl && !isPastEvent && (
            <div className="mb-8">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Register Now
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}

          {/* Excerpt */}
          {event.excerpt && (
            <p className="mb-8 text-lg text-ink-light leading-relaxed">
              {event.excerpt}
            </p>
          )}

          {/* Body */}
          {event.body && <PortableText value={event.body} />}

          {/* Donate CTA */}
          <div className="mt-12 rounded-xl bg-surface-soft p-6 text-center md:p-8">
            <h2 className="heading-3 mb-3">
              {isPastEvent ? "Support Future Events" : "Support This Event"}
            </h2>
            <p className="mb-6 text-ink-light">
              {isPastEvent
                ? "Help us organize more events like this. Your donation makes a difference."
                : "Your donation helps make this event possible and supports our mission."}
            </p>
            <DonateButton
              url={donateUrl}
              placement="event-detail"
              contentType="event"
              contentSlug={event.slug.current}
              showArrow
            >
              Donate
            </DonateButton>
          </div>
        </div>
      </div>
    </article>
  );
}
