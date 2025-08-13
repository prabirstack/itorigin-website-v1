import { BenifitGrid } from "@/components/marketing/home/benifit-grid";
import HeroCarousel from "@/components/marketing/home/Hero";
import { LogoTicker } from "@/components/marketing/home/logo-ticker";
import { ServiceSection } from "@/components/marketing/home/service-section";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <LogoTicker />
      <BenifitGrid />
      <ServiceSection />
    </>
  );
}
