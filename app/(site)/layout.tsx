import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDonateBar } from "@/components/layout/MobileDonateBar";
import { FloatingDonateWidget } from "@/components/layout/FloatingDonateWidget";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { DonateWrapper } from "@/components/layout/DonateWrapper";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery, type SiteSettings } from "@/lib/sanity/queries";

async function getSettings(): Promise<SiteSettings> {
  try {
    const settings = await client.fetch<SiteSettings>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60 } }
    );
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

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <DonateWrapper>
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
      <MobileDonateBar />

      {/* Desktop floating donate widget (feature flagged) */}
      {settings.donationSettings?.donationToolbarEnabled && (
        <FloatingDonateWidget donateUrl={settings.primaryDonateUrl} />
      )}
    </DonateWrapper>
  );
}
