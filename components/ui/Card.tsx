import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/queries";

interface CardProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  excerpt?: string;
  image?: SanityImage;
  badge?: string;
  className?: string;
}

export function Card({
  href,
  title,
  subtitle,
  excerpt,
  image,
  badge,
  className = "",
}: CardProps) {
  return (
    <Link
      href={href}
      className={`group block bg-surface-card border border-edge overflow-hidden will-change-transform transition-all duration-400 ease-smooth hover:-translate-y-1 hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 ${className}`}
    >
      {image && (
        <div className="relative aspect-[3/2] overflow-hidden bg-surface-warm">
          <Image
            src={urlFor(image).width(600).height(400).url()}
            alt={image.alt || title}
            fill
            className="object-cover transition-transform duration-600 ease-smooth group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {badge && (
            <span className="absolute left-0 top-0 bg-ink text-white px-3 py-1.5 text-caption font-medium uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-6 lg:p-8">
        {subtitle && (
          <div className="mb-3 text-caption text-ink-muted">{subtitle}</div>
        )}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-display-sm text-ink group-hover:text-brand-blue transition-colors duration-300">
            {title}
          </h3>
          <ArrowUpRight
            className="w-5 h-5 text-ink-faint flex-shrink-0 transition-all duration-300 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
        {excerpt && (
          <p className="mt-3 text-body-sm text-ink-secondary line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
