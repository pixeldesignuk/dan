import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { client } from "@/lib/sanity/client";
import { pageBySlugQuery, siteSettingsQuery, type Page, type SiteSettings } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/ui/PortableText";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dental Aid Network. We'd love to hear from you.",
};

async function getData(): Promise<{ page: Page | null; settings: SiteSettings }> {
  const defaultSettings: SiteSettings = {
    siteName: "Dental Aid Network",
    primaryDonateUrl: "",
  };

  try {
    const [page, settings] = await Promise.all([
      client.fetch<Page>(pageBySlugQuery, { slug: "contact" }),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
    return {
      page,
      settings: settings || defaultSettings,
    };
  } catch {
    return {
      page: null,
      settings: defaultSettings,
    };
  }
}

export default async function ContactPage() {
  const { page, settings } = await getData();

  return (
    <article>
      {/* Hero */}
      {page?.heroImage && (
        <div className="relative h-[30vh] min-h-[200px] md:h-[40vh]">
          <Image
            src={urlFor(page.heroImage).width(1920).height(600).url()}
            alt={page.heroImage.alt || "Contact us"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h1 className="heading-1 mb-8">{page?.title || "Contact Us"}</h1>

            {page?.body && <PortableText value={page.body} className="mb-10" />}

            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="heading-3">Get in Touch</h2>
                <p className="text-ink-light">
                  Have questions about our missions, volunteering, or how to donate?
                  We&apos;d love to hear from you.
                </p>

                <div className="space-y-4">
                  {settings.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-center gap-3 rounded-lg p-3 text-ink transition-colors hover:bg-surface-soft"
                    >
                      <div className="rounded-full bg-brand-blue/10 p-2">
                        <Mail className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-ink-muted">Email</p>
                        <p className="font-medium">{settings.contactEmail}</p>
                      </div>
                    </a>
                  )}

                  {settings.contactPhone && (
                    <a
                      href={`tel:${settings.contactPhone.replace(/\D/g, "")}`}
                      className="flex items-center gap-3 rounded-lg p-3 text-ink transition-colors hover:bg-surface-soft"
                    >
                      <div className="rounded-full bg-brand-green/10 p-2">
                        <Phone className="h-5 w-5 text-brand-green" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-ink-muted">Phone</p>
                        <p className="font-medium">{settings.contactPhone}</p>
                      </div>
                    </a>
                  )}

                  {settings.address && (
                    <div className="flex items-start gap-3 rounded-lg p-3">
                      <div className="rounded-full bg-brand-orange/10 p-2">
                        <MapPin className="h-5 w-5 text-brand-orange" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-ink-muted">Address</p>
                        <p className="font-medium whitespace-pre-line">{settings.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h2 className="heading-3">Quick Links</h2>
                <div className="space-y-4">
                  <div className="rounded-xl bg-surface-soft p-5">
                    <h3 className="mb-2 font-semibold text-ink">Want to Volunteer?</h3>
                    <p className="mb-3 text-sm text-ink-light">
                      Join our team of dedicated dental professionals making a difference.
                    </p>
                    <a href="/volunteer" className="text-sm font-medium text-brand-blue hover:underline">
                      Learn more about volunteering →
                    </a>
                  </div>

                  <div className="rounded-xl bg-surface-soft p-5">
                    <h3 className="mb-2 font-semibold text-ink">Partnership Inquiries</h3>
                    <p className="mb-3 text-sm text-ink-light">
                      Interested in partnering with us? We&apos;d love to explore opportunities.
                    </p>
                    {settings.contactEmail && (
                      <a
                        href={`mailto:${settings.contactEmail}?subject=Partnership Inquiry`}
                        className="text-sm font-medium text-brand-blue hover:underline"
                      >
                        Email us about partnerships →
                      </a>
                    )}
                  </div>

                  <div className="rounded-xl bg-surface-soft p-5">
                    <h3 className="mb-2 font-semibold text-ink">Media & Press</h3>
                    <p className="mb-3 text-sm text-ink-light">
                      For media inquiries, interview requests, or press materials.
                    </p>
                    {settings.contactEmail && (
                      <a
                        href={`mailto:${settings.contactEmail}?subject=Media Inquiry`}
                        className="text-sm font-medium text-brand-blue hover:underline"
                      >
                        Contact our press team →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
