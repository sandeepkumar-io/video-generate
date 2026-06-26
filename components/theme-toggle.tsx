"use client";

import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  function toggleTheme() {
    const nextDark = !isDark;
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  }

  return (
    <Button aria-label="Toggle dark mode" size="icon" variant="ghost" onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
