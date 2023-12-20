"use client";

import { useLocalStorageState } from "@/hooks/useLocalStroage";
import React, { createContext, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useLocalStorageState(getSystemTheme(), "theme");

  useEffect(() => {
    mode || setMode(getSystemTheme());
  });

  useEffect(() => {
    if (mode === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

function getSystemTheme() {
  if (typeof window !== "undefined") {
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    return system;
  }
  return "dark";
}
