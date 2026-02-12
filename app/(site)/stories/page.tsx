import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allStoriesQuery, type Story } from "@/lib/sanity/queries";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Stories",
  description: "Read inspiring stories from our dental missions and the lives we've changed together.",
};

async function getStories(): Promise<Story[]> {
  try {
    return (await client.fetch<Story[]>(allStoriesQuery)) || [];
  } catch {
    return [];
  }
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mb-10 text-center">
          <h1 className="heading-1 mb-4">Impact Stories</h1>
          <p className="mx-auto max-w-2xl text-lg text-ink-light">
            Every smile has a story. Read about the lives transformed through our
            dental missions and the communities we serve together.
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ink-muted">No stories available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card
                key={story._id}
                href={`/stories/${story.slug.current}`}
                title={story.title}
                subtitle={
                  story.publishedAt
                    ? new Date(story.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : undefined
                }
                excerpt={story.excerpt}
                image={story.heroImage}
                badge={story.featured ? "Featured" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
