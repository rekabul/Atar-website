import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../hooks/useInView";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
  /** Selector (scoped to this container) for the items to animate in. */
  itemSelector?: string;
  /** Extra classes for the wrapping container (e.g. the grid classes). */
  className?: string;
  /** Vertical travel distance, in px. */
  y?: number;
  /** Per-item stagger delay, in seconds. */
  stagger?: number;
};

/**
 * Groups card/grid items and reveals them together with a coordinated,
 * scroll-triggered stagger (via GSAP's ScrollTrigger.batch) instead of each
 * card firing its own independent IntersectionObserver reveal. Gives dense
 * grids (role cards, plan cards, FAQ items) a slightly more premium,
 * choreographed entrance while staying just as subtle as the site's existing
 * fade-up reveal. Falls back to a static render when reduced motion is set.
 */
export default function StaggerReveal({
  children,
  itemSelector = ":scope > *",
  className = "",
  y = 28,
  stagger = 0.1,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;
      const items = gsap.utils.toArray<HTMLElement>(itemSelector, containerRef.current);
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y });

      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger,
            overwrite: true,
          }),
      });
    },
    { scope: containerRef, dependencies: [itemSelector] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
