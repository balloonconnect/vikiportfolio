import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { AIAssistant } from "@/components/AIAssistant";
import { ScrollDots } from "@/components/ScrollDots";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = { title: `${site.name} — ${site.role}`, description: site.intro };
export const viewport: Viewport = { themeColor: "#0d0d0d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var h=new Date().getHours(),t=(h>=18||h<6)?'dark':'light',r=localStorage.getItem('theme-override');if(r){var o=JSON.parse(r);if(o&&Date.now()<o.until)t=o.theme}document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[5000] focus:bg-surface focus:p-2">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <AIAssistant />
        <CustomCursor />
        <ScrollDots />
      </body>
    </html>
  );
}
