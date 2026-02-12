import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AnnouncementBarProps {
  text: string;
  linkLabel?: string;
  linkUrl?: string;
}

export function AnnouncementBar({ text, linkLabel, linkUrl }: AnnouncementBarProps) {
  return (
    <div className="bg-brand-orange text-white">
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-sm">
        <span>{text}</span>
        {linkLabel && linkUrl && (
          <Link
            href={linkUrl}
            className="inline-flex items-center gap-1 font-semibold underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange rounded"
          >
            {linkLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
