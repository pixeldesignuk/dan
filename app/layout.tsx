import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PostHogProvider } from "@/lib/posthog/provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDonateBar } from "@/components/layout/MobileDonateBar";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery, type SiteSettings } from "@/lib/sanity/queries";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Malinton Display Font - chunky grotesque with inktraps
const malinton = localFont({
  src: [
    {
      path: "../public/fonts/malinton/MalintonTrialVersion-Regular-BF672accc4a43ea.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/malinton/MalintonTrialVersion-Medium-BF672accc49bfb7.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/malinton/MalintonTrialVersion-SemiBold-BF672accc4b3224.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/malinton/MalintonTrialVersion-Bold-BF672accc4407ad.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/malinton/MalintonTrialVersion-ExtBd-BF672accc44ebf4.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/malinton/MalintonTrialVersion-Black-BF672accc40a7c9.otf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Dental Aid Network | Bringing Smiles to Communities in Need",
    template: "%s | Dental Aid Network",
  },
  description:
    "Dental Aid Network provides free dental care to underserved communities worldwide. Support our mission through donations or volunteering.",
  keywords: [
    "dental charity",
    "dental missions",
    "dental volunteering",
    "free dental care",
    "nonprofit",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dental Aid Network",
  },
};

async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch<SiteSettings>(siteSettingsQuery);
    return (
      settings || {
        siteName: "Dental Aid Network",
        primaryDonateUrl: "https://givebrite.com/dental-aid-network",
      }
    );
  } catch {
    return {
      siteName: "Dental Aid Network",
      primaryDonateUrl: "https://givebrite.com/dental-aid-network",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${inter.variable} ${malinton.variable}`}>
      <body className="flex min-h-screen flex-col">
        <PostHogProvider>
          {/* Announcement Bar */}
          {settings.announcementBar?.enabled && settings.announcementBar?.text && (
            <AnnouncementBar
              text={settings.announcementBar.text}
              linkLabel={settings.announcementBar.linkLabel}
              linkUrl={settings.announcementBar.linkUrl}
            />
          )}

          <Header settings={settings} />

          <main className="flex-1 pb-20 lg:pb-0">{children}</main>

          <Footer settings={settings} />

          {/* Mobile sticky donate button */}
          <MobileDonateBar donateUrl={settings.primaryDonateUrl} />
        </PostHogProvider>
      </body>
    </html>
  );
}
