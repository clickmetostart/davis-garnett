"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DevelopmentImageSliderProps {
  images: string[];
  alt: string;
  intervalMs?: number;
  sizes?: string;
}

/**
 * Fills its (relatively positioned) parent. Swipe/scroll horizontally on touch or
 * trackpad, or let it auto-advance. Auto-play pauses while hovered or touched.
 */
export default function DevelopmentImageSlider({
  images,
  alt,
  intervalMs = 4500,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: DevelopmentImageSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, []);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current) return;
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % images.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => setTimeout(() => (pausedRef.current = false), 3000)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full min-w-full snap-center">
            <Image
              src={src}
              alt={`${alt} — image ${i + 1}`}
              fill
              sizes={sizes}
              priority={i === 0}
              draggable={false}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-[#C8A951]" : "w-1.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
