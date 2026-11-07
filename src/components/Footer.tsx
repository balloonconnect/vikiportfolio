import { site } from "@/data/site";
export function Footer() {
  return (
    <footer className="border-t border-secondary py-8">
      <div className="wrap flex justify-between text-[13px] text-muted max-sm:flex-col max-sm:gap-1">
        <span>© {new Date().getFullYear()} {site.name}</span><span>{site.role}</span>
      </div>
    </footer>
  );
}
