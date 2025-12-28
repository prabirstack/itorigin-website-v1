import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Link href={"/"} className="block">
        <motion.div
          className="relative w-32 sm:w-36 h-10 sm:h-12"
          whileHover={{ scale: 1.05 }}
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
            src="/images/logo/logo-liight.webp"
            alt="IT Origin Logo"
            fill
            className="hidden dark:block object-contain"
            priority
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
