import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | Dental Aid Network",
  description: "Content management studio for Dental Aid Network",
  robots: "noindex, nofollow",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
