import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModelFrame({
  kicker,
  title,
  lead,
  toolbar,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  toolbar?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6">
      <figcaption className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">{kicker}</p>
          <p className="mt-1 font-display text-xl font-medium tracking-tight sm:text-2xl">{title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{lead}</p>
        </div>
        {toolbar ? <div className="flex shrink-0 flex-wrap gap-2">{toolbar}</div> : null}
      </figcaption>
      <div className="pt-5">{children}</div>
    </figure>
  );
}

export function ModelTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "secondary"}
      aria-pressed={active}
      onClick={onClick}
      className="shrink-0"
    >
      {children}
    </Button>
  );
}

export function ModelPanel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      {children}
    </div>
  );
}

export function ModelNote({
  title,
  tone = "teal",
  children,
}: {
  title: string;
  tone?: "teal" | "warm" | "low";
  children: ReactNode;
}) {
  const border =
    tone === "warm"
      ? "border-lava/35 bg-lava/10"
      : tone === "low"
        ? "border-[#e08a8a]/35 bg-[#e08a8a]/10"
        : "border-primary/30 bg-primary/10";
  const titleColor =
    tone === "warm" ? "text-lava" : tone === "low" ? "text-[#e08a8a]" : "text-primary";
  return (
    <div className={cn("rounded-xl border p-4", border)}>
      <p className={cn("text-sm font-medium", titleColor)}>{title}</p>
      <div className="mt-2 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

/** Shared SVG markers so every fane/modell kan peke på dem. */
export function ModelMarkers() {
  return (
    <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
      <defs>
        <marker id="mdl-red" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
        </marker>
        <marker id="mdl-blue" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#93c5fd" />
        </marker>
        <marker id="mdl-cyan" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
        </marker>
        <marker id="mdl-green" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#34d399" />
        </marker>
        <marker id="mdl-amber" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#fbbf24" />
        </marker>
        <marker id="mdl-yellow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#facc15" />
        </marker>
        <marker id="mdl-wind" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
        </marker>
        <marker id="mdl-polar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#7dd3fc" />
        </marker>
      </defs>
    </svg>
  );
}
