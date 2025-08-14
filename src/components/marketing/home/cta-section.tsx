"use client";

import React, { useState } from "react";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  Phone,
  Download,
  GraduationCap,
  ArrowRight,
  MapPin,
  Mail,
  Globe,
  Shield,
  CheckCircle2,
  Star,
  User,
  Building2,
  Send,
} from "lucide-react";

// TypeScript interfaces
interface EngagementOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  ctaText: string;
  popular?: boolean;
}

interface ContactInfo {
  id: string;
  type: string;
  value: string;
  icon: React.ReactNode;
  link?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

// Data
const engagementOptions: EngagementOption[] = [
  {
    id: "assessment",
    title: "Free Security Assessment",
    description: "Discover your security gaps with our comprehensive analysis",
    icon: <Search className="w-6 h-6" />,
    gradient: "from-blue-500/20 via-blue-500/10 to-blue-600/5",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    ctaText: "Start Assessment",
    popular: true,
  },
  {
    id: "consultation",
    title: "Expert Consultation",
    description: "Speak with our certified security experts for personalized guidance",
    icon: <Phone className="w-6 h-6" />,
    gradient: "from-green-500/20 via-green-500/10 to-emerald-600/5",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    ctaText: "Book Call",
  },
  {
    id: "resources",
    title: "Resource Download",
    description: "Get our comprehensive security guides and best practices",
    icon: <Download className="w-6 h-6" />,
    gradient: "from-purple-500/20 via-purple-500/10 to-pink-600/5",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
    ctaText: "Download Now",
  },
  {
    id: "training",
    title: "Training Inquiry",
    description: "Explore certification programs and security training options",
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: "from-orange-500/20 via-orange-500/10 to-red-600/5",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    ctaText: "Learn More",
  },
];

const contactInfo: ContactInfo[] = [
  {
    id: "address",
    type: "Headquarters",
    value: "8/14, Sahid Nagar, Wing-A, Kolkata - 700078",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: "phone",
    type: "Phone",
    value: "+91-7439490434",
    icon: <Phone className="w-5 h-5" />,
    link: "tel:+917439490434",
  },
  {
    id: "email",
    type: "Email",
    value: "connect@itorizin.in",
    icon: <Mail className="w-5 h-5" />,
    link: "mailto:connect@itorizin.in",
  },
  {
    id: "website",
    type: "Website",
    value: "www.itorizin.com",
    icon: <Globe className="w-5 h-5" />,
    link: "https://www.itorizin.com",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const CTASection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "assessment",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "assessment",
        message: "",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto relative min-h-screen">
      {/* Background Elements - Matching ITOrigin Style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 sm:-left-64 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 sm:-right-64 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-l from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern overlay - Hidden on mobile for performance */}
        <div
          className="absolute inset-0 opacity-[0.015] hidden sm:block"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating geometric shapes - Responsive */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 sm:right-20 w-16 sm:w-32 h-16 sm:h-32 border border-primary/10 rounded-xl transform rotate-12 hidden sm:block"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-10 sm:left-20 w-12 sm:w-24 h-12 sm:h-24 border border-primary/10 rounded-full hidden sm:block"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Ready to Secure Your Business?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Get Started{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Today
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-2">
            Choose your preferred way to begin your cybersecurity journey with IT Origin. Our
            experts are ready to help you strengthen your security posture.
          </p>
        </motion.div>

        {/* Engagement Options */}
        <motion.div variants={itemVariants} className="mb-16 sm:mb-20">
          <div className="mb-8 sm:mb-12 text-center">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Multiple Engagement Options
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
              Select the option that best fits your immediate security needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {engagementOptions.map((option, index) => (
              <motion.div
                key={option.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group w-full"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 relative overflow-hidden">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
                    {/* Popular badge */}
                    {option.popular && (
                      <div className="absolute -top-2 -right-2 z-20">
                        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          Popular
                        </div>
                      </div>
                    )}

                    <div className="mb-4 sm:mb-6">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${option.gradient} border-2 border-border/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500`}
                      >
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${option.iconBg} flex items-center justify-center shadow-xl`}
                        >
                          <div className="text-white">{option.icon}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                        {option.title}
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base group-hover:text-muted-foreground/90 transition-colors leading-relaxed flex-grow">
                        {option.description}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group/btn text-sm"
                        size="sm"
                      >
                        {option.ctaText}
                        <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
              <CardContent className="p-6 sm:p-8 relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <Send className="w-4 h-4 text-primary-foreground" />
                    </div>
                    Get In Touch
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Ready to start? Fill out the form and our team will contact you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">Thank You!</h4>
                    <p className="text-muted-foreground">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          Full Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground">
                        Company
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Enter your company name"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-foreground">
                        Service Interest
                      </Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 bg-card/50 border border-border/60 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                      >
                        <option value="assessment">Free Security Assessment</option>
                        <option value="consultation">Expert Consultation</option>
                        <option value="resources">Resource Download</option>
                        <option value="training">Training Inquiry</option>
                        <option value="socaas">SOC as a Service</option>
                        <option value="pentest">Penetration Testing</option>
                        <option value="grc">GRC Services</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your security requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[120px] px-3 py-2 bg-card/50 border border-border/60 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-vertical"
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {/* Card shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary-foreground" />
                  </div>
                  Contact Information
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Connect with us through your preferred channel
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.div key={info.id} whileHover={{ scale: 1.02 }} className="group">
                    <Card className="bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                            {info.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              {info.type}
                            </div>
                            {info.link ? (
                              <a
                                href={info.link}
                                className="text-foreground hover:text-primary transition-colors font-medium"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <div className="text-foreground font-medium">{info.value}</div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group px-8 py-4 text-lg"
            >
              Start Your Security Journey
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto">
            Join 500+ organizations that trust IT Origin for their cybersecurity needs
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
