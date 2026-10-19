import { CHAPTER_POST_META } from "../chapter-posts.ts";
import {
  injectPosterWidgets,
  parsePosterMarkdown,
  stripChapterEditorNotice,
} from "../poster-markdown.ts";
import { delISetninger, markdownTilBlokker } from "./markdown-tekst.ts";

/** Øk når formatet eller tekstuttrekket endres, så gamle indekser i cachen ikke brukes. */
export const SOK_INDEKS_FORMAT = 1;

export type SokKapittel = {
  /** slug */
  s: string;
  /** sti til kapittelsiden, for eksempel /geofag-1/bergarter */
  p: string;
  /** tittel */
  t: string;
  /** 1 = Geofag 1, 2 = Geofag 2 */
  g: 1 | 2;
  /** setninger og overskrifter i dokumentrekkefølge */
  x: string[];
  /** indeksene i x som er overskrifter */
  o: number[];
};

export type SokIndeks = {
  /** versjon (endres når et publisert kapittel endres) */
  v: string;
  k: SokKapittel[];
};

type PostLike = {
  slug: string;
  title: string;
  bodyMarkdown: string;
  published: number;
  updatedAt: string;
};

/** FNV-1a 32-bit, nok til å skille versjoner. */
function fnv1a(input: string, seed = 0x811c9dc5): number {
  let h = seed >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function sokbare(posts: readonly PostLike[]) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  return CHAPTER_POST_META.flatMap((meta) => {
    const post = bySlug.get(meta.slug);
    if (!post || post.published !== 1 || !post.bodyMarkdown) return [];
    return [{ meta, post }];
  });
}

/**
 * Billig versjon av indeksen: bare slug, updatedAt og lengde. Endres når et
 * kapittel lagres i CMS eller reseedes (begge setter ny updatedAt).
 */
export function sokIndeksVersjon(posts: readonly PostLike[]): string {
  let h = fnv1a(`f${SOK_INDEKS_FORMAT}`);
  for (const { meta, post } of sokbare(posts)) {
    h = fnv1a(`|${meta.slug}:${meta.path}:${post.updatedAt}:${post.bodyMarkdown.length}`, h);
  }
  return `${SOK_INDEKS_FORMAT}-${h.toString(36)}`;
}

/** Brødteksten slik kapittelsiden viser den (samme forbehandling som PosterBody med cleanChapter). */
export function kapittelTekst(bodyMarkdown: string): { x: string[]; o: number[] } {
  const content = stripChapterEditorNotice(bodyMarkdown);
  const parts = parsePosterMarkdown(injectPosterWidgets(content));
  const x: string[] = [];
  const o: number[] = [];
  for (const part of parts) {
    if (part.type !== "markdown") continue;
    for (const blokk of markdownTilBlokker(part.value)) {
      if (blokk.overskrift) {
        o.push(x.length);
        x.push(blokk.tekst);
      } else {
        for (const s of delISetninger(blokk.tekst)) x.push(s);
      }
    }
  }
  return { x, o };
}

/** Bygger hele indeksen fra de publiserte postene i CMS. */
export function byggSokIndeks(posts: readonly PostLike[]): SokIndeks {
  const k: SokKapittel[] = sokbare(posts).map(({ meta, post }) => {
    const { x, o } = kapittelTekst(post.bodyMarkdown);
    return {
      s: meta.slug,
      p: meta.path,
      t: meta.title,
      g: meta.path.startsWith("/geofag-1") ? 1 : 2,
      x,
      o,
    };
  });
  return { v: sokIndeksVersjon(posts), k };
}
