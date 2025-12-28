"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, CheckCircle, Loader2 } from "lucide-react";
import { Container } from "@/components/common/container";
import { PageHero } from "@/components/about/page-hero";
import { SectionHeader } from "@/components/about/section-header";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Metric[];
  services: string[];
  featured: boolean;
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch("/api/case-studies?limit=50");
        const data = await res.json();
        setCaseStudies(data.caseStudies || []);
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);
  const otherCaseStudies = caseStudies.filter((cs) => !cs.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge={{ icon: "Award", text: "Client Success" }}
        title="Real Results for"
        highlight="Real Challenges"
        description="Explore how we've helped organizations across industries strengthen their security posture, achieve compliance, and protect against evolving cyber threats."
      />

      {/* Stats */}
      <section className="py-12 -mt-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Retention</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Industries Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-primary">$50M+</div>
              <div className="text-sm text-muted-foreground">Breaches Prevented</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-20">
          <Container>
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          </Container>
        </section>
      )}

      {/* Featured Case Studies */}
      {!isLoading && featuredCaseStudies.length > 0 && (
        <section className="py-20 md:py-32 bg-accent/30">
          <Container>
            <SectionHeader
              title="Featured Case Studies"
              description="In-depth looks at how we've solved complex security challenges."
            />

            <div className="space-y-12">
              {featuredCaseStudies.map((study) => (
                <div
                  key={study.id}
                  className="p-8 rounded-2xl border border-border bg-card"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {study.industry}
                    </span>
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-black mb-2">{study.title}</h3>
                  <p className="text-muted-foreground mb-6">{study.client}</p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Challenge
                      </h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Solution
                      </h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  {study.metrics && study.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {study.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="text-center p-4 bg-muted/50 rounded-lg"
                        >
                          <div className="text-2xl font-black text-primary">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Results */}
                  {study.results && study.results.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Key Results</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {study.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* More Case Studies */}
      {!isLoading && otherCaseStudies.length > 0 && (
        <section className="py-20 md:py-32">
          <Container>
            <SectionHeader
              title="More Success Stories"
              description="Additional examples of how we've helped organizations achieve their security goals."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCaseStudies.map((study) => (
                <div
                  key={study.id}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary transition-colors"
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {study.challenge}
                  </p>

                  {study.metrics && study.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {study.metrics.slice(0, 3).map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* No Case Studies Message */}
      {!isLoading && caseStudies.length === 0 && (
        <section className="py-20 md:py-32">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Case Studies Yet</h2>
              <p className="text-muted-foreground">
                Check back soon for our client success stories.
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Industries */}
      <section className="py-20 md:py-32 bg-accent/30">
        <Container>
          <SectionHeader
            title="Industries We Serve"
            description="Deep expertise across sectors with unique security requirements."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Financial Services",
              "Healthcare",
              "Technology",
              "Manufacturing",
              "Retail",
              "Government",
              "Energy",
              "Education",
              "Legal",
              "Telecommunications",
              "Insurance",
              "Non-Profit",
            ].map((industry) => (
              <div
                key={industry}
                className="p-4 rounded-lg border border-border bg-card text-center hover:border-primary transition-colors"
              >
                <span className="text-sm font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Let&apos;s discuss how we can help you achieve your security and
              compliance goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services/managed-soc-services"
                className="px-8 py-4 border border-primary-foreground/30 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
