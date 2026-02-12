import { client } from "@/lib/sanity/client";
import {
  siteSettingsQuery,
  featuredStoryQuery,
  latestMissionsQuery,
  upcomingEventsQuery,
  type SiteSettings,
  type Story,
  type Mission,
  type Event,
} from "@/lib/sanity/queries";

import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { DonationIntent } from "@/components/sections/DonationIntent";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { LatestMissions } from "@/components/sections/LatestMissions";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { VolunteerCta } from "@/components/sections/VolunteerCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { EmailCapture } from "@/components/sections/EmailCapture";

async function getData() {
  try {
    const [settings, featuredStory, missions, events] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<Story>(featuredStoryQuery),
      client.fetch<Mission[]>(latestMissionsQuery),
      client.fetch<Event[]>(upcomingEventsQuery),
    ]);

    return {
      settings: settings || {
        siteName: "Dental Aid Network",
        primaryDonateUrl: "https://givebrite.com/dental-aid-network",
        trustItems: [
          "100% of donations go to care",
          "10,000+ patients treated",
          "20+ mission trips annually",
        ],
      },
      featuredStory,
      missions: missions || [],
      events: events || [],
    };
  } catch {
    return {
      settings: {
        siteName: "Dental Aid Network",
        primaryDonateUrl: "https://givebrite.com/dental-aid-network",
        trustItems: [
          "100% of donations go to care",
          "10,000+ patients treated",
          "20+ mission trips annually",
        ],
      },
      featuredStory: null,
      missions: [],
      events: [],
    };
  }
}

export default async function HomePage() {
  const { settings, featuredStory, missions, events } = await getData();

  return (
    <>
      <Hero donateUrl={settings.primaryDonateUrl} />

      {settings.trustItems && settings.trustItems.length > 0 && (
        <TrustStrip items={settings.trustItems} />
      )}

      <DonationIntent donateUrl={settings.primaryDonateUrl} />

      {featuredStory && (
        <FeaturedStory
          story={featuredStory}
          defaultDonateUrl={settings.primaryDonateUrl}
        />
      )}

      {missions.length > 0 && <LatestMissions missions={missions} />}

      {events.length > 0 && <UpcomingEvents events={events} />}

      <VolunteerCta />

      <FinalCta donateUrl={settings.primaryDonateUrl} />

      <EmailCapture />
    </>
  );
}
