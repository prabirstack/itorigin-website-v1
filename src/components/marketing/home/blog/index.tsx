"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Download, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { downloadResources, blogHighlights } from "@/lib/data/blog-resources-data";
import { ResourceCard } from "./resource-card";
import { HighlightCard } from "./highlight-card";
import { AccessModal } from "./access-modal";

export function BlogSection() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    if (!email || !name) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "download",
          message: "Resource access request from homepage",
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEmail("");
        setName("");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 sm:-left-64 w-48 sm:w-96 h-48 sm:h-96 bg-linear-to-r from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 sm:-right-64 w-48 sm:w-96 h-48 sm:h-96 bg-linear-to-l from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-75 sm:w-150 h-75 sm:h-150 bg-linear-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] hidden sm:block"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 sm:right-20 w-16 sm:w-32 h-16 sm:h-32 border border-primary/10 rounded-xl transform rotate-12 hidden sm:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-10 sm:left-20 w-12 sm:w-24 h-12 sm:h-24 border border-primary/10 rounded-full hidden sm:block"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Knowledge Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Security Intelligence{" "}
            <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-2">
            Access comprehensive cybersecurity resources, industry insights, and expert analysis to
            strengthen your security posture and stay ahead of evolving threats.
          </p>
        </motion.div>

        {/* Download Resources Grid */}
        <motion.div variants={fadeInUp} className="mb-16 sm:mb-20">
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
              Download Resources
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Essential tools and guides to enhance your cybersecurity strategy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {downloadResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                {...resource}
                index={index}
                onDownloadClick={() => setIsModalOpen(true)}
              />
            ))}
          </div>
        </motion.div>

        {/* Blog Highlights */}
        <motion.div variants={fadeInUp} className="mb-12 sm:mb-16">
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
              Blog Highlights
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Stay informed with our latest security insights and expert analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {blogHighlights.map((highlight, index) => (
              <HighlightCard key={highlight.id} {...highlight} index={index} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              Access Resources
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Access Modal */}
      <AccessModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        name={name}
        email={email}
        isSubmitting={isSubmitting}
        onNameChange={setName}
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default BlogSection;
