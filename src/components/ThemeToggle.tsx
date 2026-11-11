"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { currentTheme, setManual } from "@/lib/theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const apply = () => { const d = currentTheme() === "dark"; setDark(d); document.documentElement.dataset.theme = d ? "dark" : "light"; };
    apply();
    const id = setInterval(apply, 30000); // flips at 06:00 / 18:00 local time, or when a manual choice expires
    return () => clearInterval(id);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.dataset.theme = d ? "dark" : "light";
    setManual(d ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={dark}
      className="relative flex h-6 w-11 items-center rounded-full border-[0.8px] border-border bg-surface px-[3px]">
      <span className="absolute left-[5px] text-fg">{dark ? <Moon size={12} /> : <Sun size={12} />}</span>
      <span className={`block h-[18px] w-[18px] rounded-full border-[0.8px] border-border bg-bg transition-transform duration-[420ms] ease-out ${dark ? "translate-x-0" : "translate-x-5"}`} />
    </button>
  );
}
