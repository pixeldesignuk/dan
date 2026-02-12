"use client";

import { DonateButton } from "@/components/ui/DonateButton";

interface MobileDonateBarProps {
  donateUrl: string;
}

export function MobileDonateBar({ donateUrl }: MobileDonateBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface-card/95 backdrop-blur-md border-t border-edge safe-area-bottom">
      <div className="container-editorial py-3">
        <DonateButton
          url={donateUrl}
          placement="mobile-sticky"
          variant="primary"
          showArrow
          className="w-full justify-center shadow-elevated"
        >
          Donate now
        </DonateButton>
      </div>
    </div>
  );
}
