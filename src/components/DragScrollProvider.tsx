"use client";

import { useEffect } from "react";

/**
 * Site-wide click-and-drag scrolling for horizontal scrollers (mouse only).
 *
 * - Touch / pen input is left to the browser's native momentum scrolling, so phones
 *   and tablets get a smooth swipe with no JS in the way.
 * - Works on ANY element whose computed overflow-x is auto/scroll and that actually
 *   overflows, so new sliders get it for free. Opt out with `data-no-drag`.
 * - Scroll-snap and smooth-scroll are suspended only while dragging (otherwise the
 *   browser fights the drag and it jitters), then restored so the slider settles.
 * - A click that ends a drag is swallowed so cards/links don't open by accident.
 */
const IGNORE_SELECTOR =
  "input, textarea, select, option, label, [contenteditable='true'], [data-no-drag]";
const DRAG_THRESHOLD_PX = 5;

function findHorizontalScroller(start: EventTarget | null): HTMLElement | null {
  let el = start instanceof HTMLElement ? start : null;
  while (el && el !== document.body && el !== document.documentElement) {
    const { overflowX } = getComputedStyle(el);
    if ((overflowX === "auto" || overflowX === "scroll") && el.scrollWidth > el.clientWidth + 1) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default function DragScrollProvider() {
  useEffect(() => {
    let scroller: HTMLElement | null = null;
    let pointerId = -1;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let suppressClick = false;
    let saved = { snap: "", behavior: "", userSelect: "" };

    const finish = () => {
      if (scroller && dragging) {
        scroller.style.scrollSnapType = saved.snap;
        scroller.style.scrollBehavior = saved.behavior;
        scroller.style.userSelect = saved.userSelect;
        scroller.removeAttribute("data-dragging");
        try {
          scroller.releasePointerCapture(pointerId);
        } catch {
          /* pointer already released */
        }
        suppressClick = true;
        window.setTimeout(() => (suppressClick = false), 60);
      }
      scroller = null;
      dragging = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (!target || target.closest(IGNORE_SELECTOR)) return;
      scroller = findHorizontalScroller(target);
      if (!scroller) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startLeft = scroller.scrollLeft;
      dragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!scroller || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
        dragging = true;
        saved = {
          snap: scroller.style.scrollSnapType,
          behavior: scroller.style.scrollBehavior,
          userSelect: scroller.style.userSelect,
        };
        scroller.style.scrollSnapType = "none";
        scroller.style.scrollBehavior = "auto";
        scroller.style.userSelect = "none";
        scroller.setAttribute("data-dragging", "true");
        scroller.setPointerCapture(pointerId);
        window.getSelection()?.removeAllRanges();
      }
      scroller.scrollLeft = startLeft - dx;
    };

    const onClickCapture = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onDragStart = (e: DragEvent) => {
      // Stop native image/link ghost-dragging inside scrollers.
      if (findHorizontalScroller(e.target)) e.preventDefault();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", finish);
    document.addEventListener("pointercancel", finish);
    document.addEventListener("click", onClickCapture, true);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", finish);
      document.removeEventListener("pointercancel", finish);
      document.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}

