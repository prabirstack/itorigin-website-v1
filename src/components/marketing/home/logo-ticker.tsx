"use client";

import alrahibank from "../../../assets/brand/alrahibank.png";
import tatacom from "../../../assets/brand/tata-com.png";
import ajourney from "../../../assets/brand/ajourney.png";
import hexaware from "../../../assets/brand/hexaware.png";
import hitachi from "../../../assets/brand/hitachi.png";
import jsw from "../../../assets/brand/jswsteel.png";
import khalifafund from "../../../assets/brand/khalifafund.png";
import mcx from "../../../assets/brand/mcx.png";
import novo from "../../../assets/brand/novo.png";
import patton from "../../../assets/brand/patton.png";
import rakinsurance from "../../../assets/brand/rakinsurance.png";
import redington from "../../../assets/brand/redington.png";
import sbi from "../../../assets/brand/sbi.png";
import sevensees from "../../../assets/brand/sevensees.png";
import veedol from "../../../assets/brand/veedol.png";

import { motion } from "motion/react";
import { Container } from "@/components/common/container";
import Image from "next/image";
import React from "react";

const images = [
  { src: alrahibank, alt: "Alrahi Bank" },
  { src: tatacom, alt: "Tata Com" },
  { src: ajourney, alt: "Ajourney" },
  { src: hexaware, alt: "Hexaware" },
  { src: hitachi, alt: "Hitachi" },
  { src: jsw, alt: "JSW Steel" },
  { src: khalifafund, alt: "Khalifa Fund" },
  { src: mcx, alt: "MCX" },
  { src: novo, alt: "Novo" },
  { src: patton, alt: "Patton" },
  { src: rakinsurance, alt: "Rak Insurance" },
  { src: redington, alt: "Redington" },
  { src: sbi, alt: "SBI" },
  { src: sevensees, alt: "Seven Sees" },
  { src: veedol, alt: "Veedol" },
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
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
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
