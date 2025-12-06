import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    root.classList.remove("light", "dark");

    // Always use light theme for brutalist design system
    root.classList.add("light");
    localStorage.setItem(storageKey, "light");
  }, [theme]);

  const value = {
    theme: "light",
    setTheme: (theme) => {
      // Force light theme only - no dark mode for brutalist design
      localStorage.setItem(storageKey, "light");
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );

}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};