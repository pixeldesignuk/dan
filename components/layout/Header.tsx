"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { useDonate } from "@/lib/donate/context";
import { trackDonateClick } from "@/lib/posthog/events";
import type { SiteSettings } from "@/lib/sanity/queries";

interface HeaderProps {
  settings: SiteSettings;
}

const navLinks = [
  { href: "/stories", label: "Stories" },
  { href: "/missions", label: "Missions" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Volunteer" },
];

function HeaderDonateButton({ label, placement }: { label: string; placement: string }) {
  const { openDonate } = useDonate();

  const handleClick = () => {
    trackDonateClick({
      placement,
      destinationUrl: "donate-sidebar",
    });
    openDonate();
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center font-semibold px-8 py-4 text-base bg-brand-orange text-white rounded-full hover:bg-brand-orange-hover focus-visible:ring-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5 will-change-transform"
    >
      {label}
    </button>
  );
}

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-card/95 backdrop-blur-md shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <nav className="container-editorial" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2"
            aria-label={`${settings.siteName || "Dental Aid Network"} - Home`}
          >
            {settings.logo ? (
              <Image
                src={urlFor(settings.logo).width(180).height(48).url()}
                alt={settings.siteName || "Dental Aid Network"}
                width={180}
                height={48}
                className="h-10 w-auto"
                priority
              />
            ) : (
              <span className="font-display text-xl text-ink">
                {settings.siteName || "Dental Aid Network"}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-body-sm font-medium text-ink-secondary transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="ml-4">
              <HeaderDonateButton
                label={settings.headerCtaLabel || "Donate"}
                placement="header"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-edge pb-6 lg:hidden bg-surface-card"
          >
            <div className="flex flex-col pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-4 text-body font-medium text-ink-secondary hover:text-ink transition-colors border-b border-edge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 px-2">
                <HeaderDonateButton
                  label={settings.headerCtaLabel || "Donate"}
                  placement="header-mobile"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
