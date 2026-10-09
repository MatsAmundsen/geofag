import { useId, type ReactNode } from "react";
import { ScrollFrame } from "@/components/scroll-frame";

export function FigureFrame({
  heading,
  caption,
  action,
  children,
  scroll,
}: {
  heading?: string;
  caption: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  /** On narrow screens the graphic keeps a readable width and scrolls inside the frame. */
  scroll?: boolean;
}) {
  const headingId = useId();
  const body = scroll ? (
    <ScrollFrame
      labelledBy={heading ? headingId : undefined}
      label={heading ? undefined : "Figur"}
      frameClassName="px-2 py-4 sm:px-5 sm:py-6"
      fade="var(--color-card)"
    >
      {children}
    </ScrollFrame>
  ) : (
    <div className="min-w-0 px-2 py-4 sm:px-5 sm:py-6">{children}</div>
  );
  return (
    <figure className="my-8 max-w-full overflow-hidden rounded-xl border border-border bg-card">
      {heading || action ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5 sm:px-6">
          {heading ? (
            <p id={headingId} className="min-w-0 flex-1 text-sm font-medium leading-snug text-foreground">
              {heading}
            </p>
          ) : (
            <div />
          )}
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {body}
      <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
