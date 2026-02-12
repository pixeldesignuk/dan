import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import {
  storyBySlugQuery,
  siteSettingsQuery,
  type Story,
  type SiteSettings,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/ui/PortableText";
import { DonateButton } from "@/components/ui/DonateButton";
import { Calendar } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getStory(slug: string): Promise<Story | null> {
  try {
    return await client.fetch<Story>(storyBySlugQuery, { slug });
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
  const story = await getStory(slug);

  if (!story) {
    return { title: "Story Not Found" };
  }

  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
      publishedTime: story.publishedAt,
      images: story.heroImage
        ? [urlFor(story.heroImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const [story, settings] = await Promise.all([getStory(slug), getSettings()]);

  if (!story) {
    notFound();
  }

  const donateUrl = story.givebriteDonateUrl || settings.primaryDonateUrl;

  return (
    <article>
      {/* Hero */}
      {story.heroImage && (
        <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
          <Image
            src={urlFor(story.heroImage).width(1920).height(800).url()}
            alt={story.heroImage.alt || story.title}
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
            <span className="mb-2 inline-block text-sm font-medium text-brand-green">
              Impact Story
            </span>
            <h1 className="heading-1 mb-4">{story.title}</h1>
            {story.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {new Date(story.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            )}
          </header>

          {/* Excerpt */}
          {story.excerpt && (
            <p className="mb-8 text-lg text-ink-light leading-relaxed">
              {story.excerpt}
            </p>
          )}

          {/* Body */}
          {story.body && <PortableText value={story.body} />}

          {/* Donate CTA */}
          <div className="mt-12 rounded-xl bg-surface-soft p-6 text-center md:p-8">
            <h2 className="heading-3 mb-3">Support This Cause</h2>
            <p className="mb-6 text-ink-light">
              Your donation helps us continue making an impact in communities like
              this. Every contribution matters.
            </p>
            <DonateButton
              placement="story-detail"
              contentType="story"
              contentSlug={story.slug.current}
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
