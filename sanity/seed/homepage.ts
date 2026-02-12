/**
 * Seed script for the homepage document
 *
 * Run with: npx sanity exec sanity/seed/homepage.ts --with-user-token
 * Or: bunx sanity exec sanity/seed/homepage.ts --with-user-token
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  console.error("Missing SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-01-01",
});

const homepageDocument = {
  _id: "homepage",
  _type: "homepage",
  title: "Homepage",
  sections: [
    {
      _type: "heroSection",
      _key: "hero-section-1",
      overline: "Global dental care nonprofit",
      headline: "Smiles that",
      highlightedText: "change lives",
      subheadline:
        "We send volunteer dental teams to underserved communities worldwide. Your generosity transforms pain into relief, shame into confidence.",
      primaryCtaLabel: "Give now",
      secondaryCtaLabel: "Our missions",
      secondaryCtaLink: "/missions",
      trustMetrics: [
        { _key: "metric-1", value: "50,000+", label: "Patients treated" },
        { _key: "metric-2", value: "25", label: "Countries" },
        { _key: "metric-3", value: "100%", label: "Goes to care" },
      ],
      floatingStatValue: "$2M+",
      floatingStatLabel: "In care delivered",
    },
    {
      _type: "trustStripSection",
      _key: "trust-strip-1",
      enabled: true,
    },
    {
      _type: "donationIntentSection",
      _key: "donation-intent-1",
      enabled: true,
      problemOverline: "The challenge",
      problemStatement: "2 billion people lack access to basic dental care",
      narrativeText:
        "Untreated dental disease causes chronic pain, malnutrition, and missed opportunities. For many communities, a dentist is a luxury they have never known.",
      helpOverline: "How you can help",
      helpHeadline: "Choose your impact",
      generalDonationTitle: "Give where needed most",
      generalDonationSubtitle: "Flexible funding",
      generalDonationDescription:
        "Your donation goes directly to equipment, supplies, and mission logistics. 100% of funds support our charitable work.",
      generalDonationCtaLabel: "Donate now",
      missionDonationTitle: "Fund a specific mission",
      missionDonationSubtitle: "Direct impact",
      missionDonationDescription:
        "Choose a mission to support and follow along as we provide care to communities you help reach.",
      missionDonationCtaLabel: "Browse missions",
    },
    {
      _type: "featuredStorySection",
      _key: "featured-story-1",
      enabled: true,
      overline: "Impact Story",
      customCtaLabel: "Support this cause",
      readMoreLabel: "Read the full story",
      viewAllLabel: "View all stories",
    },
    {
      _type: "latestMissionsSection",
      _key: "latest-missions-1",
      enabled: true,
      overline: "Where we work",
      headline: "Latest missions",
      viewAllLabel: "View all missions",
      count: 3,
    },
    {
      _type: "upcomingEventsSection",
      _key: "upcoming-events-1",
      enabled: true,
      overline: "Get involved",
      headline: "Upcoming events",
      viewAllLabel: "View all events",
      count: 3,
    },
    {
      _type: "volunteerCtaSection",
      _key: "volunteer-cta-1",
      enabled: true,
      overline: "Join our team",
      headline: "Become a volunteer",
      description:
        "Whether you're a dental professional or passionate about making a difference, we have a place for you. Join us on our next mission.",
      ctaLabel: "Apply to volunteer",
      ctaLink: "/volunteer",
      benefits: [
        { _key: "benefit-1", value: "50+", label: "Volunteer professionals on each mission" },
        { _key: "benefit-2", value: "2 weeks", label: "Average mission duration" },
        { _key: "benefit-3", value: "100%", label: "Travel and accommodation covered" },
        { _key: "benefit-4", value: "CME", label: "Continuing education credits available" },
      ],
    },
    {
      _type: "finalCtaSection",
      _key: "final-cta-1",
      enabled: true,
      headline: "Every smile",
      highlightedText: "starts with you",
      description:
        "Your generosity funds volunteer missions, dental equipment, and life-changing care for communities who need it most.",
      trustPoints: ["100% goes to care", "Tax deductible", "Secure giving"],
      ctaLabel: "Give now",
    },
    {
      _type: "emailCaptureSection",
      _key: "email-capture-1",
      enabled: true,
      overline: "Stay connected",
      headline: "Get updates from the field",
      description:
        "Mission reports, impact stories, and ways to get involved. No spam, just meaningful updates.",
    },
  ],
};

async function seedHomepage() {
  console.log("Seeding homepage document...");

  try {
    // Check if document already exists
    const existing = await client.fetch('*[_id == "homepage"][0]');

    if (existing) {
      console.log("Homepage document already exists. Updating...");
      await client.createOrReplace(homepageDocument);
      console.log("Homepage document updated successfully!");
    } else {
      console.log("Creating new homepage document...");
      await client.create(homepageDocument);
      console.log("Homepage document created successfully!");
    }
  } catch (error) {
    console.error("Error seeding homepage:", error);
    process.exit(1);
  }
}

seedHomepage();
