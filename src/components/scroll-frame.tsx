import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Keyboard-focusable horizontal scroll region (WCAG 2.1.1 / 1.3.1).
 * The region is only placed in the tab order when the content actually
 * overflows, and it keeps the existing focus ring colour.
 */
export function ScrollFrame({
  label,
  labelledBy,
  children,
  className,
  frameClassName,
  fade,
  axis = "x",
}: {
  /** Accessible name when no external element labels the region. */
  label?: string;
  /** Id of an existing heading or caption that names the region. */
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  /** Colour used to fade the scroll-edge shadow into the surface behind the frame. */
  fade?: string;
  /** Horizontal regions scroll sideways. Vertical regions scroll up and down. */
  axis?: "x" | "y";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const [overflowing, setOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const wide = el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1;
      const tall = el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 1;
      const next = axis === "y" ? tall || wide : wide;
      setOverflowing((prev) => (prev === next ? prev : next));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    for (const child of Array.from(el.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [axis]);

  return (
    <div
      className={cn("scroll-frame", className)}
      data-scroll-frame=""
      data-overflow={overflowing ? "true" : "false"}
      style={fade ? ({ "--scroll-fade": fade } as React.CSSProperties) : undefined}
    >
      {axis === "x" ? (
        <p className="scroll-frame__hint" aria-hidden="true">
          Sveip →
        </p>
      ) : null}
      <span id={hintId} className="sr-only">
        {axis === "y" ? "Rull med piltastene." : "Rull sideveis med piltastene."}
      </span>
      <div
        ref={scrollerRef}
        className={cn("scroll-frame__scroller", frameClassName)}
        data-axis={axis}
        tabIndex={overflowing ? 0 : undefined}
        role={overflowing ? "region" : undefined}
        aria-label={overflowing && !labelledBy ? label : undefined}
        aria-labelledby={overflowing && labelledBy ? labelledBy : undefined}
        aria-describedby={overflowing ? hintId : undefined}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const el = scrollerRef.current;
          if (!el) return;
          const distance = Math.max(48, Math.round(el.clientWidth * 0.6));
          if (axis === "x" && (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "End" || event.key === "Home")) {
            if (event.key === "End") el.scrollLeft = el.scrollWidth;
            else if (event.key === "Home") el.scrollLeft = 0;
            else el.scrollLeft += event.key === "ArrowRight" ? distance : -distance;
            event.preventDefault();
          }
          if (axis === "y" && (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "End" || event.key === "Home")) {
            if (event.key === "End") el.scrollTop = el.scrollHeight;
            else if (event.key === "Home") el.scrollTop = 0;
            else el.scrollTop += event.key === "ArrowDown" ? distance : -distance;
            event.preventDefault();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Table inside a ScrollFrame, with a caption taken from existing heading text. */
export function TableScroll({
  caption,
  children,
  className,
  tableClassName,
  visuallyHiddenCaption = false,
  fade,
}: {
  caption: ReactNode;
  children: ReactNode;
  className?: string;
  tableClassName?: string;
  /** Hide the caption visually when the same text is already the heading just above. */
  visuallyHiddenCaption?: boolean;
  fade?: string;
}) {
  const captionId = useId();
  return (
    <ScrollFrame labelledBy={captionId} className={className} fade={fade}>
      <table className={tableClassName}>
        <caption id={captionId} className={visuallyHiddenCaption ? "sr-only" : "table-scroll__caption"}>
          {caption}
        </caption>
        {children}
      </table>
    </ScrollFrame>
  );
}
