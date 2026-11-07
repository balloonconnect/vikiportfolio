"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const d = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(d);
    document.documentElement.dataset.theme = d ? "dark" : "light";
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.dataset.theme = d ? "dark" : "light";
    try { localStorage.setItem("theme", d ? "dark" : "light"); } catch {}
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={dark}
      className="relative flex h-6 w-11 items-center rounded-full border-[0.8px] border-border bg-surface px-[3px]">
      <span className="absolute left-[5px] text-fg">{dark ? <Moon size={12} /> : <Sun size={12} />}</span>
      <span className={`block h-[18px] w-[18px] rounded-full border-[0.8px] border-border bg-bg transition-transform duration-[420ms] ease-out ${dark ? "translate-x-0" : "translate-x-5"}`} />
    </button>
  );
}
