import { useMemo, type ReactNode } from "react";
import { useInView, prefersReducedMotion } from "../../hooks/useInView";

type Props = {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  /** vertical travel distance */
  y?: number;
  className?: string;
};

/**
 * Tasteful scroll-reveal wrapper (fade + rise) using a native
 * IntersectionObserver. Fully skipped when the user prefers reduced motion —
 * content renders immediately with no transform.
 */
export default function Reveal({ children, delay = 0, y = 24, className = "" }: Props) {
  const reduced = useMemo(prefersReducedMotion, []);
  const [ref, inView] = useInView<HTMLDivElement>();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
