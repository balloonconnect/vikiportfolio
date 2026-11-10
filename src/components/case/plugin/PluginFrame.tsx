"use client";
import { useEffect, useRef } from "react";
import { createHost } from "./mockHost";
import { SourceGate } from "./SourceGate";

const isDark = () => document.documentElement.dataset.theme === "dark";

// Runs the plugin's real interface (public/plugin/ui.html, synced from the GitHub repo) in a 420 x 700 frame.
// A stand-in for Figma (mockHost) answers its messages with a sample file, so nothing needs Figma or a network.
export function PluginFrame() {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const win = () => frame.current?.contentWindow ?? null;
    const host = createHost((m) => win()?.postMessage({ pluginMessage: m }, "*"), { dark: isDark() });
    const onMsg = (e: MessageEvent) => { if (e.source !== win()) return; const m = e.data?.pluginMessage; if (m) host.handle(m); };
    addEventListener("message", onMsg);
    const el = frame.current;
    const onLoad = () => host.setDark(isDark()); // also covers a "ready" message sent before this listener existed
    el?.addEventListener("load", onLoad);
    if (el?.contentDocument?.readyState === "complete") onLoad(); // frame finished loading before this effect ran
    const mo = new MutationObserver(() => host.setDark(isDark()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { removeEventListener("message", onMsg); el?.removeEventListener("load", onLoad); mo.disconnect(); host.dispose(); };
  }, []);
  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <div className="overflow-hidden rounded-[14px] border border-secondary shadow-[0_10px_50px_#00000024]" data-cursor="grow">
        <iframe ref={frame} src="/plugin/ui.html" title="Global Design Check plugin, interactive demo" loading="lazy" className="block h-[700px] w-full border-0 bg-surface" />
      </div>
      <figcaption className="mt-3 text-[14px] text-muted">The plugin's real interface running on a sample file, so scanning and fixing here don't touch anything. <SourceGate />.</figcaption>
    </figure>
  );
}
