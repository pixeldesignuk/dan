import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import {
  missionBySlugQuery,
  siteSettingsQuery,
  type Mission,
  type SiteSettings,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/ui/PortableText";
import { DonateButton } from "@/components/ui/DonateButton";
import { MapPin, Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getMission(slug: string): Promise<Mission | null> {
  try {
    return await client.fetch<Mission>(missionBySlugQuery, { slug });
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
  const mission = await getMission(slug);

  if (!mission) {
    return { title: "Mission Not Found" };
  }

  return {
    title: mission.title,
    description: mission.excerpt,
    openGraph: {
      title: mission.title,
      description: mission.excerpt,
      type: "article",
      images: mission.heroImage
        ? [urlFor(mission.heroImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

function formatDateRange(dateRange?: { start?: string; end?: string }): string {
  if (!dateRange?.start) return "Dates TBD";

  const start = new Date(dateRange.start);
  const startStr = start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!dateRange.end) return startStr;

  const end = new Date(dateRange.end);
  const endStr = end.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

function getStatusBadgeStyles(status?: string): string {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const [mission, settings] = await Promise.all([getMission(slug), getSettings()]);

  if (!mission) {
    notFound();
  }

  const donateUrl = mission.givebriteDonateUrl || settings.primaryDonateUrl;
  const fundingProgress =
    mission.fundingGoal && mission.fundingRaised
      ? Math.min((mission.fundingRaised / mission.fundingGoal) * 100, 100)
      : null;

  return (
    <article>
      {/* Hero */}
      {mission.heroImage && (
        <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
          <Image
            src={urlFor(mission.heroImage).width(1920).height(800).url()}
            alt={mission.heroImage.alt || mission.title}
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
              {mission.status && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusBadgeStyles(
                    mission.status
                  )}`}
                >
                  {mission.status}
                </span>
              )}
              {mission.location && (
                <span className="flex items-center gap-1 text-sm text-ink-muted">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {mission.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-sm text-ink-muted">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDateRange(mission.dateRange)}
              </span>
            </div>
            <h1 className="heading-1 mb-4">{mission.title}</h1>
          </header>

          {/* Funding Progress */}
          {fundingProgress !== null && (
            <div className="mb-8 rounded-xl bg-surface-soft p-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Funding Progress</span>
                <span className="text-ink-muted">
                  ${mission.fundingRaised?.toLocaleString()} of $
                  {mission.fundingGoal?.toLocaleString()}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-brand-green transition-all"
                  style={{ width: `${fundingProgress}%` }}
                  role="progressbar"
                  aria-valuenow={fundingProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${Math.round(fundingProgress)}% funded`}
                />
              </div>
              <p className="mt-2 text-right text-sm font-medium text-brand-green">
                {Math.round(fundingProgress)}% funded
              </p>
            </div>
          )}

          {/* Excerpt */}
          {mission.excerpt && (
            <p className="mb-8 text-lg text-ink-light leading-relaxed">
              {mission.excerpt}
            </p>
          )}

          {/* Body */}
          {mission.body && <PortableText value={mission.body} />}

          {/* Donate CTA */}
          <div className="mt-12 rounded-xl bg-surface-soft p-6 text-center md:p-8">
            <h2 className="heading-3 mb-3">Support This Mission</h2>
            <p className="mb-6 text-ink-light">
              Your donation directly supports this mission, providing essential
              dental care to those who need it most.
            </p>
            <DonateButton
              placement="mission-detail"
              contentType="mission"
              contentSlug={mission.slug.current}
              showArrow
            >
              Fund this mission
            </DonateButton>
          </div>
        </div>
      </div>
    </article>
  );
}
