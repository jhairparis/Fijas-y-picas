"use client";

import { useEffect } from "react";

interface LanguageProviderProps {
  lang: string;
  children: React.ReactNode;
}

export default function LanguageProvider({
  lang,
  children,
}: LanguageProviderProps) {
  useEffect(() => {
    // Actualizar el atributo lang del documento
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return <>{children}</>;
}
