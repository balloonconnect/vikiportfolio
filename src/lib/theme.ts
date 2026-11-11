// Time-based theme using the visitor's own local clock (so it follows their country/time zone).
// Dark from 18:00 to 06:00, light otherwise. A manual toggle overrides it until the next switch time.
export const DARK_FROM = 18, DARK_TO = 6;
export type Theme = "light" | "dark";

export const autoTheme = (d = new Date()): Theme => { const h = d.getHours(); return h >= DARK_FROM || h < DARK_TO ? "dark" : "light"; };

// Next moment the automatic theme flips (06:00 or 18:00 local).
export const nextSwitch = (d = new Date()): number => {
  const t = new Date(d); const h = d.getHours();
  if (h < DARK_TO) t.setHours(DARK_TO, 0, 0, 0);
  else if (h < DARK_FROM) t.setHours(DARK_FROM, 0, 0, 0);
  else { t.setDate(t.getDate() + 1); t.setHours(DARK_TO, 0, 0, 0); }
  return t.getTime();
};

export const currentTheme = (): Theme => {
  try {
    const raw = localStorage.getItem("theme-override");
    if (raw) { const o = JSON.parse(raw); if (o && Date.now() < o.until) return o.theme as Theme; localStorage.removeItem("theme-override"); }
  } catch {}
  return autoTheme();
};

export const setManual = (theme: Theme) => { try { localStorage.setItem("theme-override", JSON.stringify({ theme, until: nextSwitch() })); } catch {} };
