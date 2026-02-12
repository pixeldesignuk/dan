import { groq } from "next-sanity";

// Homepage
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    sections[] {
      _type,
      _key,
      // Hero section
      _type == "heroSection" => {
        overline,
        headline,
        highlightedText,
        subheadline,
        primaryCtaLabel,
        secondaryCtaLabel,
        secondaryCtaLink,
        heroImage {
          _type,
          asset,
          alt,
          hotspot,
          crop
        },
        trustMetrics,
        floatingStatValue,
        floatingStatLabel
      },
      // Trust strip section
      _type == "trustStripSection" => {
        enabled
      },
      // Donation intent section
      _type == "donationIntentSection" => {
        enabled,
        problemOverline,
        problemStatement,
        narrativeText,
        helpOverline,
        helpHeadline,
        generalDonationTitle,
        generalDonationSubtitle,
        generalDonationDescription,
        generalDonationCtaLabel,
        missionDonationTitle,
        missionDonationSubtitle,
        missionDonationDescription,
        missionDonationCtaLabel
      },
      // Featured story section
      _type == "featuredStorySection" => {
        enabled,
        overline,
        customCtaLabel,
        readMoreLabel,
        viewAllLabel
      },
      // Latest missions section
      _type == "latestMissionsSection" => {
        enabled,
        overline,
        headline,
        viewAllLabel,
        count
      },
      // Upcoming events section
      _type == "upcomingEventsSection" => {
        enabled,
        overline,
        headline,
        viewAllLabel,
        count
      },
      // Volunteer CTA section
      _type == "volunteerCtaSection" => {
        enabled,
        overline,
        headline,
        description,
        ctaLabel,
        ctaLink,
        benefits
      },
      // Final CTA section
      _type == "finalCtaSection" => {
        enabled,
        headline,
        highlightedText,
        description,
        trustPoints,
        ctaLabel
      },
      // Email capture section
      _type == "emailCaptureSection" => {
        enabled,
        overline,
        headline,
        description
      }
    }
  }
`;

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    primaryDonateUrl,
    headerCtaLabel,
    announcementBar,
    trustItems,
    donationSettings,
    socialLinks,
    footerText,
    contactEmail,
    contactPhone,
    address
  }
`;

// Stories
export const featuredStoryQuery = groq`
  *[_type == "story" && featured == true][0] {
    _id,
    title,
    slug,
    publishedAt,
    heroImage,
    excerpt,
    body,
    givebriteDonateUrl
  }
`;

export const allStoriesQuery = groq`
  *[_type == "story"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    heroImage,
    excerpt,
    featured
  }
`;

export const storyBySlugQuery = groq`
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    heroImage,
    excerpt,
    body,
    givebriteDonateUrl,
    featured
  }
`;

// Missions
export const latestMissionsQuery = groq`
  *[_type == "mission"] | order(dateRange.start desc)[0...3] {
    _id,
    title,
    slug,
    dateRange,
    location,
    heroImage,
    excerpt,
    status,
    givebriteDonateUrl
  }
`;

export const allMissionsQuery = groq`
  *[_type == "mission"] | order(dateRange.start desc) {
    _id,
    title,
    slug,
    dateRange,
    location,
    heroImage,
    excerpt,
    status,
    fundingGoal,
    fundingRaised
  }
`;

export const missionBySlugQuery = groq`
  *[_type == "mission" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    dateRange,
    location,
    heroImage,
    excerpt,
    body,
    givebriteDonateUrl,
    fundingGoal,
    fundingRaised,
    status
  }
`;

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && startDate >= now()] | order(startDate asc)[0...3] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    heroImage,
    excerpt,
    eventType,
    registrationUrl
  }
`;

export const allEventsQuery = groq`
  *[_type == "event"] | order(startDate desc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    heroImage,
    excerpt,
    eventType,
    registrationUrl
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    heroImage,
    excerpt,
    body,
    registrationUrl,
    givebriteDonateUrl,
    eventType
  }
`;

// Pages
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seoDescription,
    heroImage,
    body
  }
`;

// Types
export interface SiteSettings {
  siteName: string;
  logo?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  primaryDonateUrl: string;
  headerCtaLabel?: string;
  announcementBar?: {
    enabled: boolean;
    text?: string;
    linkLabel?: string;
    linkUrl?: string;
  };
  trustItems?: string[];
  donationSettings?: {
    donationToolbarEnabled?: boolean;
    defaultAmount?: number;
    suggestedAmounts?: number[];
  };
  socialLinks?: Array<{
    platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
    url: string;
  }>;
  footerText?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export interface Story {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  heroImage?: SanityImage;
  excerpt?: string;
  body?: PortableTextBlock[];
  givebriteDonateUrl?: string;
  featured?: boolean;
}

export interface Mission {
  _id: string;
  title: string;
  slug: { current: string };
  dateRange?: {
    start?: string;
    end?: string;
  };
  location?: string;
  heroImage?: SanityImage;
  excerpt?: string;
  body?: PortableTextBlock[];
  givebriteDonateUrl?: string;
  fundingGoal?: number;
  fundingRaised?: number;
  status?: "upcoming" | "active" | "completed";
}

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  location?: string;
  heroImage?: SanityImage;
  excerpt?: string;
  body?: PortableTextBlock[];
  registrationUrl?: string;
  givebriteDonateUrl?: string;
  eventType?: "fundraiser" | "volunteer" | "community" | "webinar" | "other";
}

export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  seoDescription?: string;
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

// Homepage Section Types
export interface HeroSectionData {
  _type: "heroSection";
  _key: string;
  overline?: string;
  headline?: string;
  highlightedText?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  heroImage?: SanityImage;
  trustMetrics?: Array<{ value: string; label: string }>;
  floatingStatValue?: string;
  floatingStatLabel?: string;
}

export interface TrustStripSectionData {
  _type: "trustStripSection";
  _key: string;
  enabled?: boolean;
}

export interface DonationIntentSectionData {
  _type: "donationIntentSection";
  _key: string;
  enabled?: boolean;
  problemOverline?: string;
  problemStatement?: string;
  narrativeText?: string;
  helpOverline?: string;
  helpHeadline?: string;
  generalDonationTitle?: string;
  generalDonationSubtitle?: string;
  generalDonationDescription?: string;
  generalDonationCtaLabel?: string;
  missionDonationTitle?: string;
  missionDonationSubtitle?: string;
  missionDonationDescription?: string;
  missionDonationCtaLabel?: string;
}

export interface FeaturedStorySectionData {
  _type: "featuredStorySection";
  _key: string;
  enabled?: boolean;
  overline?: string;
  customCtaLabel?: string;
  readMoreLabel?: string;
  viewAllLabel?: string;
}

export interface LatestMissionsSectionData {
  _type: "latestMissionsSection";
  _key: string;
  enabled?: boolean;
  overline?: string;
  headline?: string;
  viewAllLabel?: string;
  count?: number;
}

export interface UpcomingEventsSectionData {
  _type: "upcomingEventsSection";
  _key: string;
  enabled?: boolean;
  overline?: string;
  headline?: string;
  viewAllLabel?: string;
  count?: number;
}

export interface VolunteerCtaSectionData {
  _type: "volunteerCtaSection";
  _key: string;
  enabled?: boolean;
  overline?: string;
  headline?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
  benefits?: Array<{ value: string; label: string }>;
}

export interface FinalCtaSectionData {
  _type: "finalCtaSection";
  _key: string;
  enabled?: boolean;
  headline?: string;
  highlightedText?: string;
  description?: string;
  trustPoints?: string[];
  ctaLabel?: string;
}

export interface EmailCaptureSectionData {
  _type: "emailCaptureSection";
  _key: string;
  enabled?: boolean;
  overline?: string;
  headline?: string;
  description?: string;
}

export type HomepageSection =
  | HeroSectionData
  | TrustStripSectionData
  | DonationIntentSectionData
  | FeaturedStorySectionData
  | LatestMissionsSectionData
  | UpcomingEventsSectionData
  | VolunteerCtaSectionData
  | FinalCtaSectionData
  | EmailCaptureSectionData;

export interface Homepage {
  sections: HomepageSection[];
}
