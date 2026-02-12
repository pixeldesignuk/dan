"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DonateButton } from "@/components/ui/DonateButton";
import { urlFor } from "@/lib/sanity/image";
import type { Story, FeaturedStorySectionData } from "@/lib/sanity/queries";
import { useEffect, useRef, useState } from "react";

interface FeaturedStoryProps {
  story: Story;
  defaultDonateUrl: string;
  data?: FeaturedStorySectionData;
}

const defaultData: Omit<FeaturedStorySectionData, "_type" | "_key" | "enabled"> = {
  overline: "Impact Story",
  customCtaLabel: "Support this cause",
  readMoreLabel: "Read the full story",
  viewAllLabel: "View all stories",
};

export function FeaturedStory({ story, defaultDonateUrl, data }: FeaturedStoryProps) {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!story) return null;

  const donateUrl = story.givebriteDonateUrl || defaultDonateUrl;

  return (
    <section ref={sectionRef} className="bg-ink text-white overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Image - full bleed on the left */}
        {story.heroImage && (
          <div
            className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={urlFor(story.heroImage).width(1200).height(900).url()}
              alt={story.heroImage.alt || story.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient overlay for text readability on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:hidden" />
          </div>
        )}

        {/* Content */}
        <div className="flex items-center p-8 lg:p-16 xl:p-20">
          <div className="max-w-lg">
            {/* Label */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-overline text-white/60">{content.overline}</span>
            </div>

            {/* Title */}
            <h2
              className={`mt-4 text-display-md text-white transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {story.title}
            </h2>

            {/* Excerpt */}
            {story.excerpt && (
              <p
                className={`mt-6 text-body-lg text-white/80 transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {story.excerpt}
              </p>
            )}

            {/* CTAs */}
            <div
              className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <DonateButton
                placement="featured-story"
                contentType="story"
                contentSlug={story.slug.current}
                variant="primary"
                showArrow
              >
                {content.customCtaLabel}
              </DonateButton>
              <Link
                href={`/stories/${story.slug.current}`}
                className="inline-flex items-center gap-2 px-6 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                {content.readMoreLabel}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* View all stories link */}
      <div className="border-t border-white/10">
        <Link
          href="/stories"
          className="flex items-center justify-between px-8 lg:px-16 py-6 text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-300 group"
        >
          <span className="text-body font-medium">{content.viewAllLabel}</span>
          <ArrowUpRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
