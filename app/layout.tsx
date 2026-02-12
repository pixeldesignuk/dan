import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PostHogProvider } from "@/lib/posthog/provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${malinton.variable}`}>
      <body className="flex min-h-screen flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
