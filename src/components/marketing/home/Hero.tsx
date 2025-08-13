"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Target,
  FileCheck,
  Play,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/common/container";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "SOC as a Service",
      subtitle: "24/7 Security Operations Center",
      description:
        "Advanced threat detection and response with our state-of-the-art SOC platform. Monitor, analyze, and respond to security incidents around the clock.",
      videoUrl: "/videos/it-origin-vid-1.mp4",
      icon: Shield,
      features: ["24/7 Monitoring", "Real-time Alerts", "Expert Analysis", "Instant Response"],
      buttonText: "Explore SOC Services",
    },
    {
      id: 2,
      title: "Offensive Security",
      subtitle: "Penetration Testing & Red Team Operations",
      description:
        "Identify vulnerabilities before attackers do. Our ethical hacking services simulate real-world attacks to strengthen your security posture.",
      videoUrl: "/videos/it-origin-vid-2.mp4",
      icon: Target,
      features: [
        "Penetration Testing",
        "Red Team Exercises",
        "Vulnerability Assessment",
        "Security Auditing",
      ],
      buttonText: "Start Security Testing",
    },
    {
      id: 3,
      title: "Governance, Risk & Compliance",
      subtitle: "Strategic Security Framework",
      description:
        "Comprehensive GRC solutions to align your security strategy with business objectives and regulatory requirements.",
      videoUrl: "/videos/it-origin-vid-3.mp4",
      icon: FileCheck,
      features: ["Compliance Management", "Risk Assessment", "Policy Development", "Audit Support"],
      buttonText: "View GRC Solutions",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slide.videoUrl} type="video/mp4" />
            </video>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <Container className="mt-2 lg:mt-0">
          <div className="max-w-4xl">
            {/* Animated Content */}
            <div key={currentSlide} className="animate-fade-in">
              {/* Icon and Badge */}
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mr-4">
                  <IconComponent className="w-6 h-6 not-only:sm:w-8 sm:h-8 text-primary" />
                </div>
                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-xs font-medium text-white/90">
                    IT Origin - Cybersecurity Excellence
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-primary tracking-tight text-white mb-4 leading-none">
                {currentSlideData.title}
              </h1>

              <h2 className="text-base sm:text-2xl lg:text-3xl text-primary font-semibold mb-6">
                {currentSlideData.subtitle}
              </h2>

              <p className="text-sm sm:text-lg lg:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {currentSlideData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span className="text-xs sm:text-sm text-white/90 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/25">
                  <span>{currentSlideData.buttonText}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300">
                  <Play className="mr-2 w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
          >
            {isPlaying ? (
              <div className="w-3 h-3 flex space-x-1">
                <div className="w-1 h-3 bg-white rounded-full" />
                <div className="w-1 h-3 bg-white rounded-full" />
              </div>
            ) : (
              <Play className="w-3 h-3 text-white fill-white" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 right-8 z-20 flex flex-col items-center">
        <span className="text-white/60 text-sm mb-2 rotate-90 origin-center">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
