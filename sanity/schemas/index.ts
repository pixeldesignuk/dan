import siteSettings from "./siteSettings";
import story from "./story";
import mission from "./mission";
import event from "./event";
import page from "./page";
import homepage from "./homepage";

// Section object types
import {
  heroSection,
  trustStripSection,
  donationIntentSection,
  featuredStorySection,
  latestMissionsSection,
  upcomingEventsSection,
  volunteerCtaSection,
  finalCtaSection,
  emailCaptureSection,
} from "./sections";

export const schemaTypes = [
  // Documents
  siteSettings,
  homepage,
  story,
  mission,
  event,
  page,
  // Section objects (used by homepage)
  heroSection,
  trustStripSection,
  donationIntentSection,
  featuredStorySection,
  latestMissionsSection,
  upcomingEventsSection,
  volunteerCtaSection,
  finalCtaSection,
  emailCaptureSection,
];
