"use client";

import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

/**
 * A bulletproof background video component for Next.js.
 * 
 * iOS Safari is notoriously strict about video autoplay. If React hydrates the video element
 * and applies the `autoPlay` attribute via JavaScript, Safari often blocks it.
 * By using dangerouslySetInnerHTML, we force the browser to parse raw HTML, satisfying
 * Safari's strict autoplay policies.
 */
export default function BackgroundVideo({ src, className = "" }: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback: force play if paused by scrolling or low power mode interruptions
  useEffect(() => {
    const videoElement = containerRef.current?.querySelector('video');
    if (!videoElement) return;

    const attemptPlay = () => {
      if (videoElement.paused) {
        videoElement.play().catch(() => {
          // Silent catch: if the user is in Low Power Mode, play() will reject.
          // There is no bypass for Low Power Mode.
        });
      }
    };

    // Attempt to play immediately on mount
    attemptPlay();

    // Attempt to play on any touch interaction just in case it got paused
    document.addEventListener('touchstart', attemptPlay, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', attemptPlay);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      dangerouslySetInnerHTML={{
        __html: `
          <video
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;"
          >
            <source src="${src}" type="video/mp4" />
          </video>
        `,
      }}
    />
  );
}
