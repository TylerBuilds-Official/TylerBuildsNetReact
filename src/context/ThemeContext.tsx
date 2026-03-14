import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "auto";

type ThemeContextValue = {
  theme: Theme;
  resolved: "light" | "dark";
  cycle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "auto",
  resolved: "dark",
  cycle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "tb-theme";
const CYCLE_ORDER: Theme[] = ["auto", "light", "dark"];

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "auto") return theme;
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "auto") return stored;
    return "auto";
  });

  const [resolved, setResolved] = useState<"light" | "dark">(() => resolveTheme(theme));

  const apply = useCallback((t: Theme) => {
    const r = resolveTheme(t);
    setResolved(r);
    document.documentElement.setAttribute("data-theme", r);
  }, []);

  useEffect(() => {
    apply(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, apply]);

  // Listen for OS preference changes when in auto mode
  useEffect(() => {
    if (theme !== "auto") return;

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => apply("auto");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, apply]);

  const cycle = useCallback(() => {
    setTheme((prev) => {
      const idx = CYCLE_ORDER.indexOf(prev);
      return CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, cycle }}>
      {children}
    </ThemeContext.Provider>
  );
};
