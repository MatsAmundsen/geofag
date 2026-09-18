import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Render post Markdown to styled HTML. Element overrides (rather than a
 * `prose` plugin, which this project does not include) keep the output in the
 * site's typographic voice. Used both for the published post and for the live
 * editor preview, so what you type is what you get.
 */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("space-y-4 text-base leading-relaxed text-foreground/90", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
          p: ({ children }) => <p>{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline-offset-4 hover:underline"
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
          img: ({ src, alt }) => (
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              className="w-full rounded-xl border border-border"
              loading="lazy"
            />
          ),
          hr: () => <hr className="border-border" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
