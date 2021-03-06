import React, {
  createContext,
  useState,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Checks system theme before loading page to assign appropriate theme
  useLayoutEffect(() => {
    // check if theme is in local storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
    else {
      // otherwise set theme on system preference
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) setTheme("dark");
      else setTheme("light");
    }
  }, []);

  // set local storage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const colors =
    theme === "light"
      ? {
          // light mode
          primary: "#c45a5a",
          link: "#46cdf3",
          foreground: "#fff",
          background: "#f2f2f2",
          caption: "#636366",
          text: "#0f0f0f",
        }
      : {
          // dark mode
          primary: "#e37878",
          link: "#61dafb",
          foreground: "#2c2c2e",
          background: "#1c1c1e",
          caption: "#ababab",
          text: "#fff",
        };

  return (
    <ThemeContext.Provider value={{ colors, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within the ThemeProvider");
  }

  return context;
}
