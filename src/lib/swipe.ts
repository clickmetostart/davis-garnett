import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";

type SwipeEl = HTMLElement & { __swipe?: { x: number; y: number }; __swiped?: boolean };

/**
 * Pointer-based swipe/drag for state-driven (prev/next) galleries — mouse drag on
 * desktop, finger swipe on phones/tablets. Hook-free so it can be used anywhere.
 *
 * Pair with `touch-action: pan-y` on the element (see `SWIPE_STYLE`): the browser keeps
 * handling vertical page scroll, while horizontal gestures are ours, so the page never
 * jiggles or scrolls sideways while swiping. A drag that triggers a swipe also swallows
 * the trailing click so it doesn't open lightboxes/links by accident.
 */
export function swipeHandlers(onPrev: () => void, onNext: () => void, threshold = 50) {
  return {
    onPointerDown(e: ReactPointerEvent<HTMLElement>) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const el = e.currentTarget as SwipeEl;
      el.__swipe = { x: e.clientX, y: e.clientY };
      el.__swiped = false;
    },
    onPointerUp(e: ReactPointerEvent<HTMLElement>) {
      const el = e.currentTarget as SwipeEl;
      const start = el.__swipe;
      el.__swipe = undefined;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.5) {
        el.__swiped = true;
        window.setTimeout(() => (el.__swiped = false), 80);
        if (dx < 0) onNext();
        else onPrev();
      }
    },
    onPointerCancel(e: ReactPointerEvent<HTMLElement>) {
      (e.currentTarget as SwipeEl).__swipe = undefined;
    },
    onClickCapture(e: ReactMouseEvent<HTMLElement>) {
      const el = e.currentTarget as SwipeEl;
      if (el.__swiped) {
        e.preventDefault();
        e.stopPropagation();
        el.__swiped = false;
      }
    },
  };
}

export const SWIPE_STYLE = { touchAction: "pan-y", userSelect: "none" } as const;

