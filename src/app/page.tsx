import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { PlaySection } from "@/components/PlaySection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (<><Hero /><FeaturedWork /><PlaySection /><AboutSection /><ContactSection /><Footer /></>);
}
