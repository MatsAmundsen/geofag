import type { ReactNode } from "react";

export function FigureFrame({
  heading,
  caption,
  action,
  children,
}: {
  heading?: string;
  caption: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      {heading || action ? (
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 sm:px-6">
          {heading ? (
            <p className="text-sm font-medium text-foreground">{heading}</p>
          ) : (
            <div />
          )}
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      <div className="px-2 py-4 sm:px-5 sm:py-6">{children}</div>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
