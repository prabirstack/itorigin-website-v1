"use client";

import acmeLogo from "../../../assets/brand/acme.png";
import quantumLogo from "../../../assets/brand/quantum.png";
import echoLogo from "../../../assets/brand/echo.png";
import celestialLogo from "../../../assets/brand/celestial.png";
import pulseLogo from "../../../assets/brand/pulse.png";
import appexLogo from "../../../assets/brand/apex.png";
import { motion } from "motion/react";
import { Container } from "@/components/common/container";
import Image from "next/image";
import React from "react";

const images = [
  { src: acmeLogo, alt: "Acme Logo" },
  { src: quantumLogo, alt: "Quantum Logo" },
  { src: echoLogo, alt: "Echo Logo" },
  { src: celestialLogo, alt: "Celestial Logo" },
  { src: pulseLogo, alt: "Pulse Logo" },
  { src: appexLogo, alt: "Appex Logo" },
];

export const LogoTicker = () => {
  return (
    <section className="py-24 overflow-x-clip relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <Container>
        <h2 className=" text-2xlmd:text-3xl lg:text-4xl font-primary text-center text-foreground font-medium">
          Trusted by the world&apos;s most Leading Companies
        </h2>
        <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_left,transparent,white_10%,black_90%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: "-50%" }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="flex flex-none gap-24 pr-24"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <React.Fragment key={i}>
                {images.map(({ src, alt }) => (
                  <Image src={src} alt={alt} key={alt} className="flex-none h-8 object-cover" />
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Custom CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

/***
 *  flex overflow-hidden mt-12 relative before:content-[''] after:content-[''] before:absolute after:absolute before:top-0 after:top-0
    before:left-0 after:right-0 before:h-full after:h-full before:w-8 after:w-8
    before:pointer-events-none after:pointer-events-none before:bg-gradient-to-r before:from-background before:to-transparent after:bg-gradient-to-l after:from-background after:to-transparent
 * 
 * 
 * 
 */
