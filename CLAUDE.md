# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dental Aid Network (DAN) website redesign - a donor-focused nonprofit site built with Next.js and Sanity CMS. The primary goal is maximizing donation conversions through clean, clinical design with a persistent red Donate CTA.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Next.js (SSG/SSR)
- **CMS:** Sanity
- **Analytics:** PostHog
- **Email:** Mailchimp integration
- **Donations:** External links to Givebrite (no in-platform payment processing)

## Commands

```bash
# Install dependencies
bun install

# Development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Run Sanity Studio (typically at /studio or separate)
bunx sanity dev
```

## Architecture

### Content Flow

All site content (pages, projects, CTAs, copy) is managed via Sanity CMS. The site fetches content at build time (SSG) or request time (SSR) depending on page requirements.

### Donation Flow

Donate buttons link externally to Givebrite in new tabs:

- General donations → main Givebrite donation page
- Project-specific donations → project-specific Givebrite links (stored in Sanity)

No payment data is handled by this site.

### Key Integration Points

- **Givebrite:** External donation links only (no API integration)
- **Mailchimp:** Email capture forms (embed or API)
- **PostHog:** Event tracking for CTAs, page views, and donation funnels
- **Sanity Studio:** Admin-only path for content management

## Design Requirements

- Soft, clinical color palette with calming backgrounds
- Persistent red Donate CTA: header on desktop, sticky/floating on mobile
- Mobile-first, AA accessibility standards
- High contrast, minimum 16px fonts, ARIA labels, keyboard navigation
- Target <2s perceived load time

## Sanity Schema Priorities

- Pages (Home, About, Contact, Impact)
- Projects (with Givebrite deep link URLs, funding status, images)
- Site-wide CTAs and copy
- Email opt-in messaging

## Analytics Events to Track

- Page loads (homepage, project pages)
- Donate button clicks (general and project-specific)
- Outbound Givebrite link opens
- Email form submissions
- Funnel: landing → project selection → donation click

## Plans

All implementation plans should be stored in a `plans/` folder at the project root.

Brand colors / Tailwind tokens Use Tailwind. Implement custom colors in `tailwind.config.ts`:

- `brand: { blue: '#00CADD', green: '#96CA2D', orange: '#FF6100' }`
- `ink: '#333333'`
- `donate: { red: '#DC2626' }` (or similar distinct red) Usage rules:
- Blue is primary brand accent; gray is typography base; green is secondary accent sparingly.
- Orange should be minimal and never compete with Donate.
- Donate red is reserved exclusively for Donate CTAs (header, sticky bar, hero CTA, footer CTA).
- Backgrounds should be soft/clinical using tints (e.g., `bg-slate-50`, subtle blue tint sections)
