import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LogoMark } from "../ui/Logo";
import { buildStageDetails } from "../../data/lifecycle";

/**
 * Variant 3 — "Orbital". Adapted from a community shadcn/ui component
 * ("radial-orbital-timeline"). This project doesn't use the shadcn CLI (no
 * components.json), but it already has hand-adapted Card/Badge primitives at
 * src/components/ui/{card,badge}.tsx wired to Atar's own tokens — those are
 * reused here instead of pulling in class-variance-authority/@radix-ui/react
 * -slot for a fresh shadcn Button. lucide-react was added as the one new
 * dependency, for the icon set the original component expects. Two pieces of
 * dead state from the source (`viewMode`, `centerOffset` — declared via
 * useState but never actually updated anywhere in the original) were
 * simplified to plain constants, since this project's stricter tsconfig
 * (`noUnusedLocals`) fails the build on unused setters.
 *
 * Re-themed to Atar's own palette (was a black/white demo aesthetic) — white
 * panel, primary/teal accents, dark: variants throughout like every other
 * component on this page — with the Atar logo mark pulsing at the centre
 * instead of a generic gradient orb.
 *
 * The per-stage icon/content/status data lives in ../../data/lifecycle
 * (`buildStageDetails`), shared with InteractiveLifecycleStrip so both
 * variants always show the same label, icon, and detail for a given stage.
 */
export default function OrbitalLifecycleTimeline({
  locale,
  compact = false,
}: {
  locale: string;
  /** Smaller radius/height for embedding beside text (e.g. the hero), rather than as a full-width standalone section. */
  compact?: boolean;
}) {
  const timelineData = buildStageDetails(locale);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  // Always orbital, and the node cluster is never re-centred — kept as plain
  // constants rather than dead useState (see file header comment).
  const centerOffset = { x: 0, y: 0 };

  const handleContainerClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        if (Number(key) !== id) newState[Number(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = compact ? 165 : 225;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center ${
        compact
          ? "h-[500px] rounded-3xl"
          : "h-[680px] rounded-3xl border border-grey-100 bg-white shadow-card dark:border-white/10 dark:bg-white/5"
      }`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
        >
          <div
            className={`absolute z-10 flex items-center justify-center rounded-full bg-primary shadow-lift ${
              compact ? "h-14 w-14" : "h-16 w-16"
            }`}
          >
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-primary/30 opacity-70" />
            <div
              className="absolute h-24 w-24 animate-ping rounded-full border border-primary/20 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <LogoMark className={compact ? "h-7 w-7 text-white" : "h-8 w-8 text-white"} />
          </div>

          <div
            className={`absolute rounded-full border border-grey-200 dark:border-white/10 ${
              compact ? "h-[21rem] w-[21rem]" : "h-[29rem] w-[29rem]"
            }`}
          />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(0,142,165,0.18) 0%, rgba(0,142,165,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`flex h-10 w-10 transform items-center justify-center rounded-full border-2 shadow-card transition-all duration-300 ${
                    isExpanded
                      ? "scale-150 border-primary bg-primary text-white shadow-lg shadow-primary/30"
                      : isRelated
                      ? "border-primary bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                      : "border-grey-200 bg-white text-ink-soft dark:border-white/15 dark:bg-white/5 dark:text-white/70"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "scale-125 text-primary dark:text-primary-light" : "text-ink-soft dark:text-white/60"
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute left-1/2 top-20 w-64 -translate-x-1/2 overflow-visible shadow-lift">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-grey-300 dark:bg-white/30" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-start">
                        <span className="font-mono text-xs text-ink-muted dark:text-white/50">{item.stageNo}</span>
                      </div>
                      <CardTitle className="mt-2 text-sm">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-ink-soft dark:text-white/70">
                      <p>{item.content}</p>

                      <div className="mt-4 border-t border-grey-100 pt-3 dark:border-white/10">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center">
                            <Zap size={10} className="me-1" />
                            {locale === "ar" ? "تغطية الوحدات" : "Module coverage"}
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-grey-100 dark:bg-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-grey-100 pt-3 dark:border-white/10">
                          <div className="mb-2 flex items-center">
                            <LinkIcon size={10} className="me-1 text-ink-muted dark:text-white/50" />
                            <h4 className="text-xs font-medium uppercase tracking-wider text-ink-muted dark:text-white/50">
                              {locale === "ar" ? "المراحل المجاورة" : "Adjacent Stages"}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  className="flex h-6 items-center rounded-md border border-grey-200 bg-white px-2 py-0 text-xs text-ink-soft transition-all hover:border-primary hover:text-primary dark:border-white/15 dark:bg-white/5 dark:text-white/70"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ms-1 text-ink-muted dark:text-white/40" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
