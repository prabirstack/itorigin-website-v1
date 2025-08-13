"use client";

import React, { useState } from "react";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  BarChart3,
  Shield,
  Target,
  Download,
  ArrowRight,
  TrendingUp,
  Lock,
  AlertCircle,
  Building2,
  Mail,
  User,
  
} from "lucide-react";

interface DownloadResource {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
}

interface BlogHighlight {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  readTime: string;
}

const downloadResources: DownloadResource[] = [
  {
    id: "1",
    title: "Cybersecurity Assessment Checklist",
    description: "Comprehensive evaluation framework for your security posture",
    icon: <FileText className="w-6 h-6" />,
    type: "Checklist",
  },
  {
    id: "2",
    title: "Annual Threat Landscape Report 2025",
    description: "Latest threat trends and attack vectors analysis",
    icon: <BarChart3 className="w-6 h-6" />,
    type: "Report",
  },
  {
    id: "3",
    title: "Compliance Readiness Guide",
    description: "ISO 27001, SOC2, and GDPR implementation roadmap",
    icon: <Shield className="w-6 h-6" />,
    type: "Guide",
  },
  {
    id: "4",
    title: "Incident Response Playbook Template",
    description: "Step-by-step incident handling and recovery procedures",
    icon: <Target className="w-6 h-6" />,
    type: "Template",
  },
];

const blogHighlights: BlogHighlight[] = [
  {
    id: "1",
    title: "Latest cybersecurity trends and analysis",
    description: "Stay ahead of emerging threats with our expert analysis",
    icon: <TrendingUp className="w-5 h-5" />,
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Compliance guides and best practices",
    description: "Navigate regulatory requirements with confidence",
    icon: <Lock className="w-5 h-5" />,
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Threat intelligence updates",
    description: "Real-time insights from our security operations center",
    icon: <AlertCircle className="w-5 h-5" />,
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Industry-specific security insights",
    description: "Tailored security strategies for your sector",
    icon: <Building2 className="w-5 h-5" />,
    readTime: "7 min read",
  },
];

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

export const BlogSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      setEmail("");
      setName("");
      // Add success notification here
    }, 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-to-r from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gradient-to-l from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating geometric shapes */}
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
          className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-xl transform rotate-12"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            <span>Knowledge Center</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Security Intelligence
            </span>{" "}
            Resources
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
            Access comprehensive cybersecurity resources, industry insights, and expert analysis to
            strengthen your security posture and stay ahead of evolving threats.
          </p>
        </motion.div>

        {/* Download Resources Grid */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-primary-foreground" />
              </div>
              Download Resources
            </h3>
            <p className="text-muted-foreground">
              Essential tools and guides to enhance your cybersecurity strategy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {downloadResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-border/30 flex items-center justify-center text-primary group-hover:scale-105 group-hover:border-primary/40 transition-all duration-500">
                        {resource.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {resource.type}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {resource.title}
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary hover:text-primary group/btn"
                        >
                          <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                          Download Resource
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Blog Highlights */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              Blog Highlights
            </h3>
            <p className="text-muted-foreground">
              Stay informed with our latest security insights and expert analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-border/30 flex items-center justify-center text-primary group-hover:scale-105 group-hover:border-primary/40 transition-all duration-500">
                        {highlight.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                            {highlight.readTime}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors text-sm leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-sm font-medium mr-2">Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group px-8 py-4 text-lg"
                >
                  Access Resources
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/50">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    Access Security Resources
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Enter your details to receive instant access to our comprehensive cybersecurity resource library.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 border-border/60 hover:border-border/80"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      {isSubmitting ? "Sending..." : "Get Access"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};