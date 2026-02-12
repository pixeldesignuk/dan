import { client } from "@/lib/sanity/client";
import {
  siteSettingsQuery,
  homepageQuery,
  featuredStoryQuery,
  latestMissionsQuery,
  upcomingEventsQuery,
  type SiteSettings,
  type Homepage,
  type HomepageSection,
  type Story,
  type Mission,
  type Event,
  type HeroSectionData,
  type TrustStripSectionData,
  type DonationIntentSectionData,
  type FeaturedStorySectionData,
  type LatestMissionsSectionData,
  type UpcomingEventsSectionData,
  type VolunteerCtaSectionData,
  type FinalCtaSectionData,
  type EmailCaptureSectionData,
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
    const [settings, homepage, featuredStory, missions, events] = await Promise.all([
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<Homepage>(homepageQuery),
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
      homepage,
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
      homepage: null,
      featuredStory: null,
      missions: [],
      events: [],
    };
  }
}

// Render a single section based on its type
function renderSection(
  section: HomepageSection,
  settings: SiteSettings,
  featuredStory: Story | null,
  missions: Mission[],
  events: Event[]
): React.ReactNode {
  switch (section._type) {
    case "heroSection":
      return (
        <Hero
          key={section._key}
          data={section as HeroSectionData}
        />
      );

    case "trustStripSection": {
      const trustData = section as TrustStripSectionData;
      if (trustData.enabled === false) return null;
      if (!settings.trustItems || settings.trustItems.length === 0) return null;
      return <TrustStrip key={section._key} items={settings.trustItems} />;
    }

    case "donationIntentSection": {
      const donationData = section as DonationIntentSectionData;
      if (donationData.enabled === false) return null;
      return (
        <DonationIntent
          key={section._key}
          donateUrl={settings.primaryDonateUrl}
          data={donationData}
        />
      );
    }

    case "featuredStorySection": {
      const storyData = section as FeaturedStorySectionData;
      if (storyData.enabled === false) return null;
      if (!featuredStory) return null;
      return (
        <FeaturedStory
          key={section._key}
          story={featuredStory}
          defaultDonateUrl={settings.primaryDonateUrl}
          data={storyData}
        />
      );
    }

    case "latestMissionsSection": {
      const missionData = section as LatestMissionsSectionData;
      if (missionData.enabled === false) return null;
      if (missions.length === 0) return null;
      const count = missionData.count || 3;
      return (
        <LatestMissions
          key={section._key}
          missions={missions.slice(0, count)}
          data={missionData}
        />
      );
    }

    case "upcomingEventsSection": {
      const eventData = section as UpcomingEventsSectionData;
      if (eventData.enabled === false) return null;
      if (events.length === 0) return null;
      const count = eventData.count || 3;
      return (
        <UpcomingEvents
          key={section._key}
          events={events.slice(0, count)}
          data={eventData}
        />
      );
    }

    case "volunteerCtaSection": {
      const volunteerData = section as VolunteerCtaSectionData;
      if (volunteerData.enabled === false) return null;
      return <VolunteerCta key={section._key} data={volunteerData} />;
    }

    case "finalCtaSection": {
      const finalData = section as FinalCtaSectionData;
      if (finalData.enabled === false) return null;
      return (
        <FinalCta
          key={section._key}
          donateUrl={settings.primaryDonateUrl}
          data={finalData}
        />
      );
    }

    case "emailCaptureSection": {
      const emailData = section as EmailCaptureSectionData;
      if (emailData.enabled === false) return null;
      return <EmailCapture key={section._key} data={emailData} />;
    }

    default:
      return null;
  }
}

// Default sections when no homepage document exists
function renderDefaultSections(
  settings: SiteSettings,
  featuredStory: Story | null,
  missions: Mission[],
  events: Event[]
): React.ReactNode {
  return (
    <>
      <Hero />

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

export default async function HomePage() {
  const { settings, homepage, featuredStory, missions, events } = await getData();

  // If no homepage document exists, render default sections
  if (!homepage || !homepage.sections || homepage.sections.length === 0) {
    return renderDefaultSections(settings, featuredStory, missions, events);
  }

  // Render sections from CMS in order
  return (
    <>
      {homepage.sections.map((section) =>
        renderSection(section, settings, featuredStory, missions, events)
      )}
    </>
  );
}
