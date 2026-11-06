import { createElement, isValidElement, useState, type ReactNode } from "react";

/** Bare disse to kapitlene får overskriftsanker i poster-modus. Andre sider er urørt. */
export const POSTER_HEADING_ANCHOR_SLUGS = ["jordskjelv", "jordskjelv-naturfare"] as const;

export function posterHeadingAnchorsEnabled(slug: string | null | undefined): boolean {
  return POSTER_HEADING_ANCHOR_SLUGS.some((item) => item === slug);
}

export type HeadingIdCursor = {
  ids: readonly (string | null)[];
  index: number;
  lastText?: string;
  lastId?: string;
};

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

export function takeHeadingId(cursor: HeadingIdCursor | undefined): string | undefined {
  if (!cursor) return undefined;
  const id = cursor.ids[cursor.index];
  cursor.index += 1;
  return id || undefined;
}

/** Samme tekst to ganger på rad er samme overskrift, ikke den neste. */
export function takeHeadingForText(cursor: HeadingIdCursor | undefined, children: ReactNode): string | undefined {
  if (!cursor) return undefined;
  const key = textOf(children).replace(/\s+/g, " ").trim();
  if (key && cursor.lastText === key) return cursor.lastId;
  const id = takeHeadingId(cursor);
  cursor.lastText = key;
  cursor.lastId = id;
  return id;
}

/** Samme element som poster-Markdown bruker på h2 og h3. */
export function posterHeadingElement(
  tag: "h2" | "h3",
  children: ReactNode,
  cursor: HeadingIdCursor | undefined,
  className: string,
) {
  const id = takeHeadingId(cursor);
  return createElement(tag, { id, className }, children);
}

/** Ekte komponent, så id-en overlever at React kaller rendereren to ganger. */
export function AnchoredHeading({
  tag,
  className,
  cursor,
  children,
}: {
  tag: "h2" | "h3";
  className: string;
  cursor?: HeadingIdCursor;
  children?: ReactNode;
}) {
  const [id] = useState(() => takeHeadingForText(cursor, children));
  return createElement(tag, { id: id || undefined, className }, children);
}
