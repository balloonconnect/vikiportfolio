"use client";
import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

const REPO = "https://github.com/balloonconnect/global-design-check";
// SHA-256 of "vgdc-source:" + password. The password itself is not stored anywhere in this code.
const HASH = "b845edf7d5fb7ded45581ddedad6b0563e74d2f564ef38af5f1b0450ecacb996";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// "View the plugin source" asks for a password before opening the repository link.
// This is a courtesy gate in the browser, not real access control (the repository itself is private).
export function SourceGate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [fails, setFails] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = () => { setOpen(false); setValue(""); setError(""); trigger.current?.focus(); };
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => e.key === "Escape" && close(); addEventListener("keydown", k); return () => removeEventListener("keydown", k); });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Date.now() < lockedUntil) { setError("Too many attempts. Try again in a moment."); return; }
    const ok = (await sha256("vgdc-source:" + value)) === HASH;
    if (ok) { window.open(REPO, "_blank", "noopener,noreferrer"); close(); setFails(0); return; }
    const n = fails + 1; setFails(n); setValue(""); setError("Incorrect password.");
    if (n >= 5) { setLockedUntil(Date.now() + 15000); setFails(0); setError("Too many attempts. Try again in 15 seconds."); }
    input.current?.focus();
  };

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className="underline underline-offset-2 hover:text-fg">View the plugin source</button>
      {open && (
        <div className="fixed inset-0 z-[3000] grid place-items-center bg-black/40 p-4" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="src-gate-title" className="w-full max-w-[380px] rounded-[10px] border border-secondary bg-surface p-6 text-fg shadow-[0_10px_50px_#00000040]">
            <div className="flex items-center gap-2"><Lock size={18} /><h3 id="src-gate-title" className="text-[20px] font-semibold">Plugin source</h3></div>
            <p className="mt-2 text-[15px] text-muted">Enter the password to open the repository.</p>
            <label className="sr-only" htmlFor="src-gate-pw">Password</label>
            <input id="src-gate-pw" ref={input} type="password" autoComplete="off" value={value} onChange={(e) => { setValue(e.target.value); setError(""); }}
              className="mt-4 w-full rounded-[6px] border border-secondary bg-transparent px-3 py-2 text-[16px]" aria-invalid={!!error} aria-describedby={error ? "src-gate-err" : undefined} />
            {error && <p id="src-gate-err" role="alert" className="mt-2 text-[14px] text-[#d84646]">{error}</p>}
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={close} className="px-3 py-2 text-[15px] text-muted hover:text-fg">Cancel</button>
              <button type="submit" disabled={!value} className="press rounded-full bg-fg px-5 py-2 text-[15px] text-bg disabled:opacity-40">Open</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
