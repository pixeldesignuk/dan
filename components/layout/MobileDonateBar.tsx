"use client";

import { ArrowUpRight } from "lucide-react";
import { useDonate } from "@/lib/donate/context";
import { useHeroCta } from "@/lib/hero/context";
import { trackDonateClick } from "@/lib/posthog/events";

export function MobileDonateBar() {
  const { openDonate } = useDonate();
  const { isHeroCtaVisible } = useHeroCta();

  const handleClick = () => {
    trackDonateClick({
      placement: "mobile-sticky",
      destinationUrl: "donate-sidebar",
    });
    openDonate();
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface-card/95 backdrop-blur-md border-t border-edge safe-area-bottom transition-transform duration-300 ${
        isHeroCtaVisible ? "translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={isHeroCtaVisible}
    >
      <div className="container-editorial py-3">
        <button
          onClick={handleClick}
          tabIndex={isHeroCtaVisible ? -1 : 0}
          className="w-full inline-flex items-center justify-center font-semibold px-8 py-4 text-base bg-brand-orange text-white rounded-full hover:bg-brand-orange-hover focus-visible:ring-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-[background-color,transform] duration-300 ease-out hover:-translate-y-0.5 shadow-elevated"
        >
          Donate now
          <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
