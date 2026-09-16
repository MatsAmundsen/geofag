import { useEffect, useState } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/**
 * Bygger innholdsliste av kapitlets H2-er etter mount.
 * Setter id på overskrifter som mangler anker, slik at tykke sider
 * får TOC uten å skrives om.
 */
export function ChapterToc() {
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const root = document.getElementById("kapittel-kropp");
    if (!root) return;

    const used = new Set<string>();
    const next: { id: string; label: string }[] = [];

    for (const heading of root.querySelectorAll("h2")) {
      const label = (heading.textContent ?? "").replace(/\s+/g, " ").trim();
      if (!label) continue;

      let id = heading.id || slugify(label) || "avsnitt";
      const base = id;
      let n = 2;
      while (used.has(id)) {
        id = `${base}-${n}`;
        n += 1;
      }
      used.add(id);
      if (heading.id !== id) heading.id = id;
      heading.classList.add("scroll-mt-24");
      next.push({ id, label });
    }

    setItems(next);
  }, []);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Innhold i kapitlet"
      className="rounded-xl border border-border bg-card/60 p-4 sm:p-5"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-primary">I dette kapitlet</p>
      <ol className="mt-3 space-y-1.5 text-sm">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-8 items-baseline gap-2 text-muted-foreground hover:text-foreground"
            >
              <span className="tabular-nums text-primary/80">{index + 1}.</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
