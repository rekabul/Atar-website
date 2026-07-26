import { useEffect, useRef, useState, type RefObject } from "react";

interface InViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Native IntersectionObserver reveal hook (per the scroll-animations skill).
 * Returns a ref + whether the element is in view. `triggerOnce` keeps it
 * revealed after the first intersection.
 */
export function useInView<T extends HTMLElement>(
  options: InViewOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}

/** Whether the user has requested reduced motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}
