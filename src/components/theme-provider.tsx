/* eslint-disable react-refresh/only-export-components */
import { loadTheme, saveTheme } from "@/lib/storage";
import type { Theme } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeProviderState {
  theme: Theme;
  setTheme: (nextTheme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());

  useEffect(() => {
    const root = window.document.documentElement;

    switch (theme) {
      case "system": {
        function syncTheme(media: MediaQueryList | MediaQueryListEvent) {
          root.classList.toggle("dark", media.matches);
        }

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        syncTheme(media);
        media.addEventListener("change", syncTheme);

        return () => media.removeEventListener("change", syncTheme);
      }
      case "light": {
        root.classList.remove("dark");
        break;
      }
      case "dark": {
        root.classList.add("dark");
        break;
      }
      default: {
        console.error("Invalid theme:", theme);
      }
    }
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (nextTheme: Theme) => {
      saveTheme(nextTheme);
      setTheme(nextTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
