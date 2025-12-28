"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
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
  BookOpen,
} from "lucide-react";

// Proper TypeScript interfaces
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children: React.ReactNode;
  className?: string; // Add this line
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

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

// Mock UI components styled to match ITOrigin design
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  asChild = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`,
      onClick,
      disabled,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 ${className}`}>{children}</div>
);

// const CardHeader: React.FC<CardProps> = ({ children, className = "" }) => (
//   <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className}`}>{children}</div>
// );

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "text-foreground",
  };
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
};

const Input: React.FC<InputProps> = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label: React.FC<LabelProps> = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);
interface DialogChildProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { open, onOpenChange } as DialogChildProps)
          : child
      )}
    </div>
  );
};

// const DialogTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({
//   children,
// }) => {
//   return React.Children.only(children) as React.ReactElement;
// };

const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className = "",
  open,
  onOpenChange,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={`relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 rounded-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
    {children}
  </div>
);

const DialogTitle: React.FC<DialogTitleProps> = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

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

const BlogSection: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
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
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto relative min-h-screen">
      {/* Background Elements - Matching ITOrigin Style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-32 sm:-left-64 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-32 sm:-right-64 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-l from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-br from-primary/3 via-transparent to-primary/3 rounded-full blur-3xl animate-pulse"
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
        {/* Header - ITOrigin Style */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Knowledge Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Security Intelligence{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-2">
            Access comprehensive cybersecurity resources, industry insights, and expert analysis to
            strengthen your security posture and stay ahead of evolving threats.
          </p>
        </motion.div>

        {/* Download Resources Grid - ITOrigin Style */}
        <motion.div variants={itemVariants} className="mb-16 sm:mb-20">
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
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
              <motion.div
                key={resource.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group w-full"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-border/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 shrink-0">
                        {resource.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="text-xs bg-primary/10 text-primary border-primary/20"
                          >
                            {resource.type}
                          </Badge>
                        </div>
                        <h4 className="text-base sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                          {resource.title}
                        </h4>
                        <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors text-sm leading-relaxed flex-grow">
                          {resource.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary hover:text-primary group/btn text-sm"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover/btn:animate-bounce" />
                        Download Resource
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

        {/* Blog Highlights - ITOrigin Style */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
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
              <motion.div
                key={highlight.id}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group cursor-pointer w-full"
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border-2 border-border/40 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 relative overflow-hidden">
                  <CardContent className="p-4 sm:p-6 h-full flex flex-col relative z-10">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-border/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/40 transition-all duration-500 shrink-0">
                        {highlight.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="outline"
                            className="text-xs bg-primary/10 text-primary border-primary/20"
                          >
                            {highlight.readTime}
                          </Badge>
                        </div>
                        <h4 className="text-base sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground group-hover:text-muted-foreground/90 transition-colors text-sm leading-relaxed flex-grow">
                          {highlight.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 mt-auto">
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

        {/* CTA - ITOrigin Style */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
            >
              Access Resources
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal - ITOrigin Style */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Mail className="w-5 h-5 text-primary" />
              Access Security Resources
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your details to receive instant access to our comprehensive cybersecurity
              resource library.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-card/50 border-border/60 focus:border-primary/50"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-border/60 hover:border-border/80"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                {isSubmitting ? "Sending..." : "Get Access"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogSection;
