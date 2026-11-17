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

