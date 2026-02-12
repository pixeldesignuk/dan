"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface HeroCtaContextType {
  isHeroCtaVisible: boolean;
  setHeroCtaVisible: (visible: boolean) => void;
}

const HeroCtaContext = createContext<HeroCtaContextType | undefined>(undefined);

export function HeroCtaProvider({ children }: { children: ReactNode }) {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);

  const setHeroCtaVisible = useCallback((visible: boolean) => {
    setIsHeroCtaVisible(visible);
  }, []);

  return (
    <HeroCtaContext.Provider value={{ isHeroCtaVisible, setHeroCtaVisible }}>
      {children}
    </HeroCtaContext.Provider>
  );
}

export function useHeroCta() {
  const context = useContext(HeroCtaContext);
  if (!context) {
    throw new Error("useHeroCta must be used within HeroCtaProvider");
  }
  return context;
}
