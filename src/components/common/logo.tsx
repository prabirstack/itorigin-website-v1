import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-20 h-7",
  md: "w-32 sm:w-36 h-10 sm:h-12",
  lg: "w-40 h-14",
};

export const Logo = ({
  href = "/",
  size = "md",
  animated = true,
  className,
}: LogoProps) => {
  const logoContent = (
    <motion.div
      className={cn("relative", sizeClasses[size], className)}
      whileHover={animated ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Light mode logo */}
      <Image
        src="/images/logo/logo-dark.webp"
        alt="IT Origin Logo"
        fill
        className="block dark:hidden object-contain"
        priority
      />

      {/* Dark mode logo */}
      <Image
        src="/images/logo/logo-light.webp"
        alt="IT Origin Logo"
        fill
        className="hidden dark:block object-contain"
        priority
      />
    </motion.div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href={href} className="block">
          {logoContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <Link href={href} className="block">
      {logoContent}
    </Link>
  );
};

