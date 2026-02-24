import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";
import { iconMap } from "@/lib/icon-map";
import {
  servicesPageHero,
  servicesPageSectionHeaders,
  servicesPageCards,
  servicesPageStats,
  servicesPageIndustries,
  servicesPageCTA,
} from "@/utils/data/services";

export const metadata: Metadata = {
  title: "Cybersecurity Services | ITOrigin",
  description: "Comprehensive cybersecurity services including Managed SOC, Offensive Security, Penetration Testing, Vulnerability Assessment, GRC Services, and Security Auditing.",
  keywords: [
    "cybersecurity services",
    "managed SOC",
    "penetration testing",
    "vulnerability assessment",
    "GRC services",
    "security audit",
    "offensive security",
    "ITOrigin services"
  ],
  alternates: {
    canonical: "https://itorigin.com/services"
  }
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={servicesPageHero.badge}
        title={servicesPageHero.title}
        highlight={servicesPageHero.highlight}
        description={servicesPageHero.description}
      />

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title={servicesPageSectionHeaders.services.title}
            description={servicesPageSectionHeaders.services.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesPageCards.map((service) => {
              const Icon = iconMap[service.iconName];
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {Icon && <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-accent rounded text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title={servicesPageSectionHeaders.whyChoose.title}
            description={servicesPageSectionHeaders.whyChoose.description}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {servicesPageStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeader
            title={servicesPageSectionHeaders.industries.title}
            description={servicesPageSectionHeaders.industries.description}
          />

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {servicesPageIndustries.map((industry) => (
              <div
                key={industry}
                className="px-6 py-3 rounded-full border border-border bg-card hover:border-primary hover:bg-primary/5 transition-colors cursor-default"
              >
                <span className="font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              {servicesPageCTA.title}
            </h2>
            <p className="text-lg opacity-90 mb-8">
              {servicesPageCTA.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {servicesPageCTA.buttons.map((button) => (
                <Link
                  key={button.text}
                  href={button.href}
                  className={
                    button.primary
                      ? "px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
                      : "px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
                  }
                >
                  {button.text}
                  {button.primary && <ArrowRight className="w-4 h-4" />}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
