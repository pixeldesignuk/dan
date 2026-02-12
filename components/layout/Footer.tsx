import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DonateButton } from "@/components/ui/DonateButton";
import type { SiteSettings } from "@/lib/sanity/queries";

interface FooterProps {
  settings: SiteSettings;
}

const footerLinks = {
  explore: [
    { href: "/stories", label: "Stories" },
    { href: "/missions", label: "Missions" },
    { href: "/events", label: "Events" },
  ],
  engage: [
    { href: "/volunteer", label: "Volunteer" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-ink text-white">
      {/* Main Footer */}
      <div className="container-editorial py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <h2 className="font-display font-semibold text-display-sm text-white">
              {settings.siteName || "Dental Aid Network"}
            </h2>
            {settings.footerText && (
              <p className="mt-4 text-body text-white/60 max-w-sm">
                {settings.footerText}
              </p>
            )}
            <div className="mt-8">
              <DonateButton
                url={settings.primaryDonateUrl}
                placement="footer"
                variant="primary"
                showArrow
              >
                Support our mission
              </DonateButton>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3">
            <h3 className="text-overline text-white/40 mb-6">
              Explore
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-body text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-overline text-white/40 mb-6">
              Engage
            </h3>
            <ul className="space-y-4">
              {footerLinks.engage.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-body text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2">
            <h3 className="text-overline text-white/40 mb-6">
              Contact
            </h3>
            <div className="space-y-4 text-body text-white/70">
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="block hover:text-white transition-colors"
                >
                  {settings.contactEmail}
                </a>
              )}
              {settings.contactPhone && (
                <a
                  href={`tel:${settings.contactPhone.replace(/\D/g, "")}`}
                  className="block hover:text-white transition-colors"
                >
                  {settings.contactPhone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-body-sm text-white/40">
            &copy; {new Date().getFullYear()} {settings.siteName || "Dental Aid Network"}
          </p>

          {/* Social Links */}
          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {settings.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-white/40 hover:text-white transition-colors capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
