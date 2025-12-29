"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Star, Quote, Shield, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/common/container";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
  subtitle = "Trusted by leading organizations across industries for comprehensive cybersecurity solutions",
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
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/20"
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

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <section className={cn("py-24", className)}>
        <Container>
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-muted animate-pulse rounded-lg mx-auto mb-4" />
            <div className="h-4 w-96 bg-muted animate-pulse rounded-lg mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-8">
                  <div className="h-32 bg-muted rounded-lg mb-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted rounded" />
                      <div className="h-3 w-24 bg-muted rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
    <section className={cn("py-24 relative overflow-hidden", className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Container className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5">
              <Quote className="w-4 h-4 mr-2 text-primary" />
              Client Testimonials
            </Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
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
          className="hidden lg:grid lg:grid-cols-3 gap-8"
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              custom={index}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Quote icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 text-muted-foreground leading-relaxed mb-6 text-[15px]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <Avatar className="w-12 h-12 ring-2 ring-background shadow-lg">
                      <AvatarImage src={testimonial.authorImage || undefined} alt={testimonial.authorName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.authorName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground truncate">
                          {testimonial.authorName}
                        </span>
                        {testimonial.verified && (
                          <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {testimonial.authorRole}
                      </p>
                      <p className="text-sm text-primary/80 font-medium truncate">
                        {testimonial.authorCompany}
                      </p>
                    </div>
                  </div>

                  {/* Service badge */}
                  {testimonial.serviceUsed && (
                    <div className="mt-4">
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.serviceUsed}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tablet View - 2 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid lg:hidden md:grid-cols-2 gap-8"
        >
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              custom={index}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                    {renderStars(testimonial.rating)}
                  </div>

                  <blockquote className="flex-1 text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <Avatar className="w-11 h-11">
                      <AvatarImage src={testimonial.authorImage || undefined} alt={testimonial.authorName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {testimonial.authorName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm truncate">
                          {testimonial.authorName}
                        </span>
                        {testimonial.verified && (
                          <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.authorRole} at {testimonial.authorCompany}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 px-1"
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Quote className="w-5 h-5 text-primary" />
                        </div>
                        {renderStars(testimonial.rating)}
                      </div>

                      <blockquote className="text-muted-foreground leading-relaxed mb-6 text-sm">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={testimonial.authorImage || undefined} alt={testimonial.authorName} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                            {testimonial.authorName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-foreground text-sm">
                              {testimonial.authorName}
                            </span>
                            {testimonial.verified && (
                              <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {testimonial.authorRole} at {testimonial.authorCompany}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full h-10 w-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      i === currentIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full h-10 w-10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-muted/50 border border-border/50">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">500+ Clients Protected</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="w-px h-6 bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">CERT-IN Empanelled</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
