import { BenifitGrid } from "@/components/marketing/home/benifit-grid";
import { BlogSection } from "@/components/marketing/home/blog-section";
import { CyberFusion } from "@/components/marketing/home/cyber-fusion";
import HeroCarousel from "@/components/marketing/home/Hero";
import { IndustryExperience } from "@/components/marketing/home/industry-experience";
import { LogoTicker } from "@/components/marketing/home/logo-ticker";
import { ServiceSection } from "@/components/marketing/home/service-section";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <LogoTicker />
      <BenifitGrid />
      <ServiceSection />
      <CyberFusion />
      <IndustryExperience />
      <BlogSection />
    </>
  );
}
