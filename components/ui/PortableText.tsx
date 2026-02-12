"use client";

import { PortableText as PortableTextComponent } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { PortableTextBlock, SanityImage } from "@/lib/sanity/queries";

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

const components = {
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-ink-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href: string };
    }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-brand-blue underline hover:text-brand-green"
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="heading-2 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="heading-3 mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-ink-light leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-brand-green pl-4 italic text-ink-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="ml-6 list-disc space-y-2 text-ink-light">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="ml-6 list-decimal space-y-2 text-ink-light">{children}</ol>
    ),
  },
};

export function PortableText({ value, className = "" }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className={`portable-text space-y-4 ${className}`}>
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}
