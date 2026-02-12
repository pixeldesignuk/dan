"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface DonateContextType {
  isOpen: boolean;
  openDonate: (options?: DonateOptions) => void;
  closeDonate: () => void;
  options: DonateOptions;
}

interface DonateOptions {
  defaultAmount?: number;
  project?: string;
  title?: string;
  description?: string;
  paymentType?: "one_time" | "subscription";
  donationType?: string;
  fromToolbar?: boolean;
}

const DonateContext = createContext<DonateContextType | undefined>(undefined);

export function DonateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DonateOptions>({});

  const openDonate = useCallback((newOptions?: DonateOptions) => {
    setOptions(newOptions || {});
    setIsOpen(true);
  }, []);

  const closeDonate = useCallback(() => {
    setIsOpen(false);
    setOptions({});
  }, []);

  return (
    <DonateContext.Provider value={{ isOpen, openDonate, closeDonate, options }}>
      {children}
    </DonateContext.Provider>
  );
}

export function useDonate() {
  const context = useContext(DonateContext);
  if (context === undefined) {
    throw new Error("useDonate must be used within a DonateProvider");
  }
  return context;
}
