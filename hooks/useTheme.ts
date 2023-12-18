import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("theme context used outside of theme provider");
  }

  return context;
}
