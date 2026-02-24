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

import { Container } from "@/components/common/container";
import Image from "next/image";
import React, { useState } from "react";
import { logoTickerHeading } from "@/utils/data/home/logo-ticker-data";

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
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-24 overflow-x-clip relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <Container>
        <h2 className=" text-2xlmd:text-3xl lg:text-4xl font-primary text-center text-foreground font-medium">
          {logoTickerHeading}
        </h2>
        <div
          className="flex overflow-hidden mt-12 mask-[linear-gradient(to_left,transparent,white_10%,black_90%,transparent)] dark:mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex flex-none gap-24 pr-24 animate-scroll ${isPaused ? "paused" : "running"}`}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <React.Fragment key={i}>
                {images.map(({ src, alt }) => (
                  <Image
                    src={src}
                    alt={alt}
                    key={alt}
                    className="flex-none h-8 object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>

      {/* Custom CSS for grid pattern and scroll animation */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll.paused {
          animation-play-state: paused;
        }
        .animate-scroll.running {
          animation-play-state: running;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
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
