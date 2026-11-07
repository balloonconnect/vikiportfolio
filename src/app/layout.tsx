import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { AIAssistant } from "@/components/AIAssistant";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = { title: `${site.name} — ${site.role}`, description: site.intro };
export const viewport: Viewport = { themeColor: "#0d0d0d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(!t&&matchMedia('(prefers-color-scheme: dark)').matches)t='dark';if(t)document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[5000] focus:bg-surface focus:p-2">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <AIAssistant />
        <CustomCursor />
      </body>
    </html>
  );
}
