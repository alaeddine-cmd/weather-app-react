import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  /* on mount */
  useEffect(() => {
    const weatherTheme = localStorage.getItem("weather-theme");
    if (weatherTheme) {
      setTheme(weatherTheme);
    }
  }, []);

  /* add theme when changed */
  useEffect(() => {
    document.documentElement.setAttribute("weather-theme", theme);
    localStorage.setItem("weather-theme", theme);
  }, [theme]);

  const ThemeChange = (data) => {
    setTheme(data);
  };

  return (
    <ThemeContext.Provider value={{ theme, ThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
