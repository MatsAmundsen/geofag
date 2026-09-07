import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type BadgeVariant =
  | "default"
  | "positive"
  | "negative"
  | "neutral"
  | "warning"
  | "primary"
  | "teal"
  | "amber"
  | "sky";

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  defaultOpen?: boolean;
  icon?: ReactNode;
  id?: string;
  children: ReactNode;
}

const BADGE_STYLES: Record<BadgeVariant, string> = {
  default: "bg-muted/60 text-muted-foreground border-border/80",
  positive: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  negative: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  neutral: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  warning: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  primary: "bg-primary/15 text-primary border-primary/30",
  teal: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  sky: "bg-sky-500/15 text-sky-300 border-sky-500/30",
};

export function CollapsibleSection({
  title,
  subtitle,
  badge,
  badgeVariant = "default",
  defaultOpen = false,
  icon,
  id,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className={`my-5 overflow-hidden rounded-xl border transition-all duration-200 ${
        isOpen
          ? "border-primary/40 bg-card shadow-md ring-1 ring-primary/20"
          : "border-border/80 bg-card/60 hover:border-primary/30 hover:bg-card/80"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2.5">
            {icon && <span className="shrink-0">{icon}</span>}
            {badge && (
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${BADGE_STYLES[badgeVariant]}`}
              >
                {badge}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-medium tracking-tight text-foreground transition group-hover:text-primary sm:text-xl">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-xs font-medium text-muted-foreground sm:inline-block">
            {isOpen ? "Skjul" : "Vis innhold"}
          </span>
          <div
            className={`flex size-8 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-muted-foreground transition-transform duration-200 group-hover:border-primary/40 group-hover:text-primary ${
              isOpen ? "rotate-180 bg-primary/10 text-primary" : ""
            }`}
          >
            <ChevronDown className="size-4" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="space-y-5 border-t border-border/60 bg-background/40 px-5 py-6 sm:px-7">
          {children}
        </div>
      )}
    </section>
  );
}
