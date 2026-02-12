"use client";

import { ReactNode } from "react";
import { DonateProvider, useDonate } from "@/lib/donate/context";
import { DonateSidebar } from "@/components/ui/DonateSidebar";

function DonateUI() {
  const { isOpen, closeDonate, options } = useDonate();

  return (
    <DonateSidebar
      isOpen={isOpen}
      onClose={closeDonate}
      defaultAmount={options.defaultAmount}
      project={options.project}
      title={options.title}
      description={options.description}
    />
  );
}

export function DonateWrapper({ children }: { children: ReactNode }) {
  return (
    <DonateProvider>
      {children}
      <DonateUI />
    </DonateProvider>
  );
}
