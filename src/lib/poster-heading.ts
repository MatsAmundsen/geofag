import { createElement, type ReactNode } from "react";

/** Bare disse to kapitlene får overskriftsanker i poster-modus. Andre sider er urørt. */
export const POSTER_HEADING_ANCHOR_SLUGS = ["jordskjelv", "jordskjelv-naturfare"] as const;

export function posterHeadingAnchorsEnabled(slug: string | null | undefined): boolean {
  return POSTER_HEADING_ANCHOR_SLUGS.some((item) => item === slug);
}

export type HeadingIdCursor = {
  ids: readonly (string | null)[];
  index: number;
};

export function takeHeadingId(cursor: HeadingIdCursor | undefined): string | undefined {
  if (!cursor) return undefined;
  const id = cursor.ids[cursor.index];
  cursor.index += 1;
  return id || undefined;
}

/** Samme element som poster-Markdown bruker på h2 og h3. */
export function posterHeadingElement(
  tag: "h2" | "h3",
  children: ReactNode,
  cursor: HeadingIdCursor | undefined,
  className: string,
) {
  const id = takeHeadingId(cursor);
  return createElement(tag, { id, className: id ? `${className} scroll-mt-44` : className }, children);
}
