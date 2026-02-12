import { BenifitGrid } from "@/components/marketing/home/benifit-grid";
import { BlogSection } from "@/components/marketing/home/blog";
import { CTASection } from "@/components/marketing/home/cta";
import { CertificationsSection } from "@/components/marketing/certifications-section";
import { CyberFusion } from "@/components/marketing/home/cyber-fusion";
import HeroCarousel from "@/components/marketing/home/Hero";
import { IndustryExperience } from "@/components/marketing/home/industry-experience";
import { LogoTicker } from "@/components/marketing/home/logo-ticker";
import { ServiceSection } from "@/components/marketing/home/service-section";
// TODO: Re-enable when real testimonials are available
// import { TestimonialsSection } from "@/components/marketing/testimonials";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <LogoTicker />
      <CertificationsSection />
      <BenifitGrid />
      <ServiceSection />
      <CyberFusion />
      <IndustryExperience />
      {/* TODO: Re-enable when real testimonials are available */}
      {/* <TestimonialsSection /> */}
      <BlogSection />
      <CTASection />
    </>
  );
}
