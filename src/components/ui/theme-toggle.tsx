"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "@/lib/cn";

/**
 * Self-contained theme toggle — the only theming-related client code on the
 * page. Reads/writes the `.dark` class on <html> directly; no context provider.
 * Adds a short-lived `.theme-transition` class so the whole page glides between
 * light and dark instead of snapping.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true); // dark is the default

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable — ignore */
    }
    setIsDark(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 500);
  };

  // Before hydration we assume the default (dark) → show the sun.
  const showSun = !mounted || isDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={showSun ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-fg transition-all duration-300 ease-smooth hover:scale-110 hover:border-accent hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
    >
      <span
        className="transition-transform duration-500 ease-spring"
        style={{ transform: showSun ? "rotate(0deg)" : "rotate(-90deg)" }}
      >
        {showSun ? <FaSun size={16} /> : <FaMoon size={16} />}
      </span>
    </button>
  );
}
