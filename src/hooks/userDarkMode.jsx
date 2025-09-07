import { useState, useEffect } from "react";

// Fixed custom hook for dark mode
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme changes to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
