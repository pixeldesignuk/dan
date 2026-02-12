# Dental Aid Network

A donor-focused nonprofit website built with Next.js (App Router), Sanity CMS, and TypeScript. The primary goal is maximizing donation conversions through prominent Donate CTAs and compelling content.

## Tech Stack

- **Runtime:** [Bun](https://bun.sh)
- **Framework:** [Next.js 15](https://nextjs.org) (App Router, SSG/SSR)
- **CMS:** [Sanity](https://sanity.io)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Analytics:** [PostHog](https://posthog.com)
- **Email:** [Mailchimp](https://mailchimp.com) API
- **Donations:** External links to [Givebrite](https://givebrite.com)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- A Sanity account (create project during setup)
- PostHog account (for analytics)
- Mailchimp account (for email capture)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dental-aid-network
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your credentials:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
   - `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
   - `NEXT_PUBLIC_POSTHOG_KEY` - Your PostHog project API key
   - `MAILCHIMP_API_KEY` - Your Mailchimp API key
   - `MAILCHIMP_AUDIENCE_ID` - Your Mailchimp list/audience ID
   - `MAILCHIMP_SERVER_PREFIX` - Your Mailchimp server (e.g., "us1")

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Sanity Studio

Access Sanity Studio at [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (Mailchimp)
│   ├── stories/           # Stories pages
│   ├── missions/          # Missions pages
│   ├── events/            # Events pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── volunteer/         # Volunteer page
│   └── studio/            # Sanity Studio
├── components/
│   ├── forms/             # Form components
│   ├── layout/            # Header, Footer, etc.
│   ├── sections/          # Homepage sections
│   └── ui/                # Reusable UI components
├── lib/
│   ├── posthog/           # PostHog integration
│   ├── sanity/            # Sanity client & queries
│   └── utils/             # Utility functions
├── sanity/
│   └── schemas/           # Sanity schema definitions
└── plans/                 # Implementation plans
```

## Commands

```bash
# Development
bun dev                    # Start development server

# Production
bun run build             # Build for production
bun start                 # Start production server

# Linting
bun run lint              # Run ESLint
```

## Content Management

### Sanity Schemas

- **Site Settings** - Global settings, logo, donate URL, social links
- **Stories** - Impact stories with featured flag
- **Missions** - Dental missions with location, dates, funding progress
- **Events** - Upcoming events with registration links
- **Pages** - Static pages (About, Contact)

### Adding Content

1. Navigate to `/studio`
2. First, configure **Site Settings** with your:
   - Site name and logo
   - Primary Givebrite donation URL
   - Contact information
   - Trust strip items
3. Add Stories, Missions, and Events as needed

## Analytics Events

The site tracks the following events via PostHog:

- `page_view` - All page loads
- `donate_click` - Donate button clicks with placement info
- `outbound_click` - External link clicks (Givebrite)
- `email_signup_submitted` - Newsletter signups
- `volunteer_form_submitted` - Volunteer applications
- `cta_click` - General CTA interactions

## Donation Flow

All donations are handled externally via Givebrite:

1. Donate buttons include UTM parameters for tracking
2. Links open in new tabs
3. Site tracks click events before redirect
4. Content-specific donation URLs are configurable per story/mission/event

## Accessibility

- AA WCAG compliance
- Keyboard navigation support
- ARIA labels on interactive elements
- Minimum 16px fonts
- High contrast color ratios
- 44px minimum tap targets on mobile

## Deployment

The site is ready for deployment to Vercel, Netlify, or any platform supporting Next.js.

### Environment Variables

Ensure all environment variables are configured in your deployment platform:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL |
| `MAILCHIMP_API_KEY` | Mailchimp API key |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp audience/list ID |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp server prefix |

## License

Private - Dental Aid Network
