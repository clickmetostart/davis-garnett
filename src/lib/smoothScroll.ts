/**
 * Glides the viewport to a target section ID using a 760ms ease-in-out
 * requestAnimationFrame curve so visitors can visually follow the scroll
 * down long hub pages without abrupt browser jump cuts.
 */
export function smoothScrollToId(
  elementId: string,
  offsetPx = 88,
  durationMs = 760
): void {
  if (typeof window === "undefined") return;
  const target = document.getElementById(elementId.replace(/^#/, ""));
  if (!target) return;

  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  const startY = window.scrollY;
  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offsetPx
  );
  const distance = targetY - startY;

  if (Math.abs(distance) < 4) {
    html.style.scrollBehavior = previousScrollBehavior;
    return;
  }

  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      html.style.scrollBehavior = previousScrollBehavior;
    }
  };

  requestAnimationFrame(step);
}

/**
 * Smoothly glides the viewport back to the top of the page (y = 0).
 */
export function smoothScrollToTop(durationMs = 480): void {
  if (typeof window === "undefined") return;
  const startY = window.scrollY;
  if (startY < 4) return;

  const html = document.documentElement;
  const previousScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";

  let startTime: number | null = null;
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    window.scrollTo(0, startY * (1 - easeInOutCubic(progress)));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      html.style.scrollBehavior = previousScrollBehavior;
    }
  };

  requestAnimationFrame(step);
}

/**
 * Steps a horizontal card slider smoothly by exactly one rendered card width
 * plus its computed flex gap so left/right arrow buttons always snap cleanly
 * onto the next full card across phone, tablet, and desktop viewports.
 */
export function scrollCardTrack(
  el: HTMLElement | null,
  dir: "left" | "right"
): void {
  if (!el || typeof window === "undefined") return;
  const firstCard = el.firstElementChild as HTMLElement | null;
  const styles = window.getComputedStyle(el);
  const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
  const step = firstCard
    ? firstCard.getBoundingClientRect().width + gap
    : el.clientWidth;

  el.scrollBy({
    left: dir === "left" ? -step : step,
    behavior: "smooth",
  });
}

