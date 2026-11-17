"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

interface EmailActionBoxProps {
  /** Email address (assembled client-side without rendering a raw mailto: link) */
  email: string;
  /** Optional prefix label, e.g. "Team Desk:" */
  prefixLabel?: string;
  /** Visual theme matching container background */
  variant?: "dark" | "light";
  /** Optional extra classes on trigger text */
  className?: string;
  /** Show mail icon beside email */
  showIcon?: boolean;
  /** Optional compact size */
  size?: "xs" | "sm";
}

export default function EmailActionBox({
  email,
  prefixLabel,
  variant = "dark",
  className = "",
  showIcon = true,
  size = "xs",
}: EmailActionBoxProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [localPart, domainPart = ""] = email.split("@");

  const handleOpen = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const handleDelayedClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 180);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const fullEmail = `${localPart}@${domainPart}`;
    try {
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback copy
      const input = document.createElement("input");
      input.value = fullEmail;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const triggerColor =
    variant === "dark"
      ? "text-[#D4AF37] hover:text-white"
      : "text-[#9A7D3A] hover:text-[#111]";

  const panelBg =
    variant === "dark"
      ? "bg-[#141923] border-[#D4AF37]/45 text-white shadow-xl shadow-black/40"
      : "bg-[#faf7ee] border-[#D4AF37]/50 text-[#111] shadow-lg";

  return (
    <div
      className={`relative inline-block max-w-full ${className}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleDelayedClose}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 text-left transition-colors cursor-pointer select-text ${
          size === "sm" ? "text-sm" : "text-xs"
        } ${triggerColor}`}
        aria-expanded={open}
        aria-label={`Email actions for ${localPart} at ${domainPart}`}
      >
        {showIcon && <Mail className="w-3.5 h-3.5 shrink-0" />}
        {prefixLabel && (
          <span className={variant === "dark" ? "text-white/55" : "text-[#111]/60"}>
            {prefixLabel}
          </span>
        )}
        <span className="truncate">
          {localPart}
          <span>&#64;</span>
          {domainPart}
        </span>
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full mt-1.5 p-2.5 rounded-lg border ${panelBg} w-[210px] z-40 transition-all`}
          onMouseEnter={handleOpen}
          onMouseLeave={handleDelayedClose}
        >
          <p
            className={`text-[10px] leading-snug mb-2 ${
              variant === "dark" ? "text-white/80" : "text-[#111]/75"
            }`}
          >
            Copy email or send us a message:
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#D4AF37] hover:bg-white text-[#111] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? "Copied!" : "Copy Email"}
            </button>
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-[#ef5728] hover:bg-white text-white hover:text-[#111] text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

