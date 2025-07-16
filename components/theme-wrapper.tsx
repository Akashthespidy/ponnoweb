"use client";

import { useEffect, useState } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("theme");
    if (saved) setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  // Apply theme toggle and save to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <button
        aria-label="Toggle dark mode"
        title="Toggle theme"
        className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 rounded-lg p-1 shadow hover:scale-110 transition h-8 w-8 flex items-center justify-center text-lg"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "🌙" : "🌞"}
      </button>
      {children}
    </>
  );
}
