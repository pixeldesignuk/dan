interface UTMOptions {
  campaign?: string;
  content?: string;
}

/**
 * Appends UTM parameters to a URL for tracking
 * @param url - The destination URL
 * @param options - Optional campaign and content values
 * @returns URL with UTM parameters appended
 */
export function appendUTMParams(url: string, options: UTMOptions = {}): string {
  if (!url) return url;

  try {
    const urlObj = new URL(url);

    // Set default UTM params
    urlObj.searchParams.set("utm_source", "dentalaidnetwork");
    urlObj.searchParams.set("utm_medium", "website");

    // Set campaign (defaults to 'general')
    urlObj.searchParams.set("utm_campaign", options.campaign || "general");

    // Set content if provided
    if (options.content) {
      urlObj.searchParams.set("utm_content", options.content);
    }

    return urlObj.toString();
  } catch {
    // If URL is invalid, return original
    return url;
  }
}

/**
 * Gets current page context for UTM campaign value
 */
export function getPageCampaign(pathname: string): string {
  if (pathname === "/") return "homepage";
  if (pathname.startsWith("/stories/")) return "story";
  if (pathname.startsWith("/missions/")) return "mission";
  if (pathname.startsWith("/events/")) return "event";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname === "/volunteer") return "volunteer";
  return "general";
}
