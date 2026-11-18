"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HubCardSliderProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  bgClass?: string;
  dark?: boolean;
  children: React.ReactNode;
}

export default function HubCardSlider({
  id,
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  bgClass = "bg-white",
  dark = false,
  children,
}: HubCardSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-24 px-6 md:px-8 border-b scroll-mt-24 ${
        dark ? "border-[#D4AF37]/20 text-white" : "border-[#111]/8 text-[#111]"
      } ${bgClass}`}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span
              className={`text-xs uppercase tracking-[0.3em] font-bold block mb-3 ${
                dark ? "text-[#D4AF37]" : "text-[#9A7D3A]"
              }`}
            >
              {eyebrow}
            </span>
            <h2
              className={`font-aiveritas text-3xl md:text-5xl mb-3 leading-tight ${
                dark ? "text-white" : "text-[#111]"
              }`}
            >
              {title}
            </h2>
            {description && (
              <p
                className={`font-light text-base md:text-[17px] leading-relaxed ${
                  dark ? "text-white/75" : "text-[#111]/70"
                }`}
              >
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {ctaHref && ctaLabel && (
              <Link
                href={ctaHref}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                  dark
                    ? "bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#111] border border-white/15"
                    : "bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111]"
                }`}
              >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={`Scroll ${title} Left`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider("right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label={`Scroll ${title} Right`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

