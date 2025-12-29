"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Star, Quote, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/common/container";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage: string | null;
  quote: string;
  rating: number;
  industry: string | null;
  serviceUsed: string | null;
  featured: boolean;
  verified: boolean;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  featured?: boolean;
  limit?: number;
  industry?: string;
  className?: string;
}

export function TestimonialsSection({
  title = "What Our Clients Say",
  subtitle = "Trusted by leading organizations worldwide",
  featured = false,
  limit = 6,
  industry,
  className,
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const params = new URLSearchParams({ limit: limit.toString() });
        if (featured) params.set("featured", "true");
        if (industry) params.set("industry", industry);

        const res = await fetch(`/api/testimonials?${params}`);
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data.testimonials || []);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [featured, limit, industry]);

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <section className={cn("py-20", className)}>
        <Container>
          <div className="text-center">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mx-auto mb-4" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card animate-pulse">
                <div className="h-24 bg-muted rounded mb-4" />
                <div className="h-4 w-32 bg-muted rounded mb-2" />
                <div className="h-3 w-24 bg-muted rounded" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-20 bg-muted/30", className)}>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Testimonials
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-black mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Desktop Grid View */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {testimonial.authorImage ? (
                  <Image
                    src={testimonial.authorImage}
                    alt={testimonial.authorName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.authorName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{testimonial.authorName}</span>
                    {testimonial.verified && (
                      <Shield className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.authorRole} at {testimonial.authorCompany}
                  </p>
                </div>
              </div>

              {renderStars(testimonial.rating)}

              <blockquote className="mt-4 text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {testimonial.serviceUsed && (
                <div className="mt-4 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    Service: {testimonial.serviceUsed}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="p-6 rounded-2xl border bg-card">
                    <div className="flex items-start gap-4 mb-4">
                      {testimonial.authorImage ? (
                        <Image
                          src={testimonial.authorImage}
                          alt={testimonial.authorName}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {testimonial.authorName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{testimonial.authorName}</span>
                          {testimonial.verified && (
                            <Shield className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.authorRole} at {testimonial.authorCompany}
                        </p>
                      </div>
                    </div>

                    {renderStars(testimonial.rating)}

                    <blockquote className="mt-4 text-muted-foreground leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
