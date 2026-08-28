import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Callout({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "my-6 rounded-xl border border-border bg-muted px-5 py-4",
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-primary">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/90">{children}</div>
    </aside>
  );
}
