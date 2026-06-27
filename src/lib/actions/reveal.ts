import type { Action } from "svelte/action";

export const reveal: Action<HTMLElement, { delay?: number; duration?: number; y?: number } | undefined> = (
  node,
  params = {},
) => {
  const { delay = 0, duration = 600, y = 30 } = params;

  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;

  node.style.opacity = "0";
  node.style.transform = `translateY(${y}px)`;
  node.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.style.opacity = String(opacity || 1);
          node.style.transform = transform || "translateY(0)";
          observer.unobserve(node);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};
