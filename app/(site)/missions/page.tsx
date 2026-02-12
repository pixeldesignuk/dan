import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allMissionsQuery, type Mission } from "@/lib/sanity/queries";
import { Card } from "@/components/ui/Card";
import { MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Missions",
  description: "Explore our dental missions around the world. See where we've been and where we're headed next.",
};

async function getMissions(): Promise<Mission[]> {
  try {
    return (await client.fetch<Mission[]>(allMissionsQuery)) || [];
  } catch {
    return [];
  }
}

function formatDateRange(dateRange?: { start?: string; end?: string }): string {
  if (!dateRange?.start) return "Dates TBD";

  const start = new Date(dateRange.start);
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (!dateRange.end) return startStr;

  const end = new Date(dateRange.end);
  const endStr = end.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${startStr} - ${endStr}`;
}

function getStatusBadge(status?: string): string | undefined {
  switch (status) {
    case "active":
      return "Active";
    case "upcoming":
      return "Upcoming";
    case "completed":
      return "Completed";
    default:
      return undefined;
  }
}

export default async function MissionsPage() {
  const missions = await getMissions();

  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mb-10 text-center">
          <h1 className="heading-1 mb-4">Our Missions</h1>
          <p className="mx-auto max-w-2xl text-lg text-ink-light">
            Explore our dental missions around the world. From remote villages to
            urban communities, we bring care to those who need it most.
          </p>
        </div>

        {missions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ink-muted">No missions available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => (
              <Card
                key={mission._id}
                href={`/missions/${mission.slug.current}`}
                title={mission.title}
                subtitle={
                  <span className="flex items-center gap-3 text-xs">
                    {mission.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />
                        {mission.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {formatDateRange(mission.dateRange)}
                    </span>
                  </span>
                }
                excerpt={mission.excerpt}
                image={mission.heroImage}
                badge={getStatusBadge(mission.status)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
