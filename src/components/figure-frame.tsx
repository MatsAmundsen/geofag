import type { ReactNode } from "react";

export function FigureFrame({
  heading,
  caption,
  children,
}: {
  heading?: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      {heading ? (
        <p className="border-b border-border px-4 py-3 text-sm font-medium text-foreground sm:px-6">
          {heading}
        </p>
      ) : null}
      <div className="px-2 py-4 sm:px-5 sm:py-6">{children}</div>
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
