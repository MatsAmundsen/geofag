import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PhotoFigure } from "@/components/photo-figure";
import { TableScroll } from "@/components/scroll-frame";
import { getPosterPhotoFigure } from "@/lib/poster-figures";
import { cn } from "@/lib/utils";

function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  const photo = getPosterPhotoFigure(typeof src === "string" ? src : undefined);
  if (photo) {
    return (
      <PhotoFigure
        src={photo.src}
        alt={photo.alt || alt || ""}
        heading={photo.heading}
        caption={photo.caption}
        marks={photo.marks}
        points={photo.points}
      />
    );
  }
  return (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="w-full rounded-xl border border-border"
      loading="lazy"
    />
  );
}

/**
 * Render post Markdown to styled HTML. Element overrides (rather than a
 * `prose` plugin, which this project does not include) keep the output in the
 * site's typographic voice. Used both for the published post and for the live
 * editor preview, so what you type is what you get.
 */
type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  children?: HastNode[];
  properties?: Record<string, unknown>;
};

function hastText(node: HastNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(hastText).join("");
}

function plainInlineMd(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Last ATX heading in a markdown chunk, used as a table caption across widget splits. */
export function lastMarkdownHeading(markdown: string): string {
  let last = "";
  for (const match of markdown.matchAll(/^#{1,6}[ \t]+(.+)$/gm)) {
    const text = plainInlineMd(match[1] ?? "");
    if (text) last = text;
  }
  return last;
}

function labelParagraph(node: HastNode): string {
  if (node.tagName !== "p") return "";
  const meaningful = (node.children ?? []).filter(
    (child) => child.type === "element" || (child.type === "text" && (child.value ?? "").trim()),
  );
  if (meaningful.length !== 1 || meaningful[0]?.tagName !== "strong") return "";
  const text = hastText(node).replace(/\s+/g, " ").trim();
  if (!text || text.length > 90) return "";
  return text;
}

/**
 * Give each table a caption from the heading already in the chapter, or from a
 * short bold label immediately above the table (for example «Magmatyper»).
 */
function rehypeTableCaptions(fallback: string) {
  return () => (tree: HastNode) => {
    let heading = fallback;
    const walk = (node: HastNode) => {
      const children = node.children ?? [];
      let pendingLabel = "";
      for (const child of children) {
        if (child.type === "text" && !(child.value ?? "").trim()) continue;
        if (child.type === "element" && child.tagName && /^h[1-6]$/.test(child.tagName)) {
          const text = hastText(child).replace(/\s+/g, " ").trim();
          if (text) heading = text;
          pendingLabel = "";
          walk(child);
          continue;
        }
        const label = child.type === "element" ? labelParagraph(child) : "";
        if (label) {
          pendingLabel = label;
          continue;
        }
        if (child.type === "element" && child.tagName === "table") {
          const kids = child.children ?? [];
          const hasCaption = kids.some((kid) => kid.tagName === "caption");
          const text = (pendingLabel || heading).trim();
          if (!hasCaption && text) {
            kids.unshift({
              type: "element",
              tagName: "caption",
              properties: pendingLabel ? { className: ["sr-only"] } : {},
              children: [{ type: "text", value: text }],
            });
            child.children = kids;
          }
          pendingLabel = "";
          continue;
        }
        pendingLabel = "";
        if (child.type === "element") walk(child);
      }
    };
    walk(tree);
  };
}

function classTokens(className: unknown): string[] {
  if (typeof className === "string") return className.split(/\s+/).filter(Boolean);
  if (Array.isArray(className)) return className.flatMap(classTokens);
  return [];
}

function splitCaption(children: ReactNode): { caption: ReactNode | null; hidden: boolean; body: ReactNode[] } {
  const body: ReactNode[] = [];
  let caption: ReactNode | null = null;
  let hidden = false;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      body.push(child);
      return;
    }
    const props = child.props as {
      node?: { tagName?: string; properties?: { className?: unknown } };
      className?: unknown;
      children?: ReactNode;
    };
    const tag = typeof child.type === "string" ? child.type : props.node?.tagName;
    if (tag === "caption") {
      caption = props.children ?? null;
      const tokens = [
        ...classTokens(props.className),
        ...classTokens(props.node?.properties?.className),
      ];
      hidden = tokens.includes("sr-only");
      return;
    }
    body.push(child);
  });
  return { caption, hidden, body };
}

export function Markdown({
  children,
  className,
  scrollTables = false,
  wrapTables = false,
  captionFallback = "",
}: {
  children: string;
  className?: string;
  /** Keep table text on one line and scroll the frame sideways. */
  scrollTables?: boolean;
  /** Let table text wrap so the page itself does not scroll sideways. */
  wrapTables?: boolean;
  /** Heading from the previous markdown chunk, when a widget sits between heading and table. */
  captionFallback?: string;
}) {
  const nowrap = scrollTables && !wrapTables;
  return (
    <div className={cn("space-y-4 text-base leading-relaxed text-foreground/90", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeTableCaptions(captionFallback)]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-8 font-display text-2xl font-medium tracking-tight text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 font-display text-lg font-medium tracking-tight text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => {
            const visible = Children.toArray(children).filter(
              (child) => !(typeof child === "string" && !child.trim()),
            );
            if (
              visible.length === 1 &&
              isValidElement(visible[0]) &&
              (visible[0].type === PhotoFigure || visible[0].type === MarkdownImage)
            ) {
              return visible[0];
            }
            return <p>{children}</p>;
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline decoration-1 underline-offset-[0.18em] hover:decoration-2"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 pl-6">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/50 pl-4 text-muted-foreground">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
          ),
          img: MarkdownImage,
          hr: () => <hr className="border-border" />,
          table: ({ children }: { children?: ReactNode }) => {
            const { caption, hidden, body } = splitCaption(children);
            return (
              <TableScroll
                caption={caption ?? "Tabell"}
                visuallyHiddenCaption={hidden || caption == null}
                tableClassName={
                  nowrap
                    ? "w-max border-collapse text-left text-sm"
                    : "w-full border-collapse text-left text-sm"
                }
              >
                {body}
              </TableScroll>
            );
          },
          th: ({ children }: { children?: ReactNode }) => (
            <th
              className={
                nowrap
                  ? "whitespace-nowrap border border-border px-2 py-1 font-medium"
                  : "border border-border px-2 py-1 align-top font-medium [overflow-wrap:anywhere]"
              }
            >
              {children}
            </th>
          ),
          td: ({ children }: { children?: ReactNode }) => (
            <td
              className={
                nowrap
                  ? "whitespace-nowrap border border-border px-2 py-1 align-top"
                  : "border border-border px-2 py-1 align-top [overflow-wrap:anywhere]"
              }
            >
              {children}
            </td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
