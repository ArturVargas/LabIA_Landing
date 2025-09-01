"use client";

import { useEffect } from "react";

interface LanguageProviderProps {
  children: React.ReactNode;
  language: "es" | "en";
}

export function LanguageProvider({ children, language }: LanguageProviderProps) {
  useEffect(() => {
    // Actualizar el atributo lang del HTML dinámicamente
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
