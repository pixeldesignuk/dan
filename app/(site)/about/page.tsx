import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { pageBySlugQuery, type Page } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/ui/PortableText";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Dental Aid Network's mission to provide free dental care to underserved communities worldwide.",
};

async function getPage(): Promise<Page | null> {
  try {
    return await client.fetch<Page>(pageBySlugQuery, { slug: "about" });
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const page = await getPage();

  return (
    <article>
      {/* Hero */}
      {page?.heroImage && (
        <div className="relative h-[30vh] min-h-[200px] md:h-[40vh]">
          <Image
            src={urlFor(page.heroImage).width(1920).height(600).url()}
            alt={page.heroImage.alt || "About us"}
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
            <h1 className="heading-1 mb-8">{page?.title || "About Us"}</h1>

            {page?.body ? (
              <PortableText value={page.body} />
            ) : (
              <div className="space-y-6 text-ink-light">
                <p className="text-lg leading-relaxed">
                  Dental Aid Network is dedicated to providing free, high-quality dental
                  care to underserved communities around the world. Founded on the belief
                  that everyone deserves access to dental health, we organize mission
                  trips staffed by volunteer dental professionals.
                </p>

                <h2 className="heading-2 mt-10 mb-4">Our Mission</h2>
                <p>
                  To improve global oral health by delivering free dental services,
                  education, and sustainable care programs to communities with limited
                  access to dental professionals.
                </p>

                <h2 className="heading-2 mt-10 mb-4">Our Vision</h2>
                <p>
                  A world where everyone has access to the dental care they need, regardless
                  of their location or economic status.
                </p>

                <h2 className="heading-2 mt-10 mb-4">What We Do</h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Organize dental mission trips to underserved regions</li>
                  <li>Provide free dental treatments including cleanings, fillings, and extractions</li>
                  <li>Educate communities on oral health and hygiene</li>
                  <li>Train local healthcare workers in basic dental care</li>
                  <li>Establish sustainable dental programs in partner communities</li>
                </ul>

                <h2 className="heading-2 mt-10 mb-4">Our Impact</h2>
                <p>
                  Since our founding, we&apos;ve treated over 10,000 patients across 15+
                  countries. Our volunteer network includes hundreds of dedicated dental
                  professionals who donate their time and expertise to make smiles possible.
                </p>

                <p className="mt-6 text-ink">
                  <strong>
                    Join us in our mission. Whether you donate, volunteer, or spread the
                    word, you can help bring smiles to communities in need.
                  </strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
