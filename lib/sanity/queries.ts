import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    primaryDonateUrl,
    headerCtaLabel,
    announcementBar,
    trustItems,
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
