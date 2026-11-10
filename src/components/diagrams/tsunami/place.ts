import { FONT, LABEL_PX, label, leader } from "./paint";

/** Rektangel i CSS-piksler. */
export type Box = { x0: number; y0: number; x1: number; y1: number };

type LabelOpts = NonNullable<Parameters<typeof label>[4]>;

export type Spot = {
  x: number;
  y: number;
  align?: CanvasTextAlign;
  /** Tekst for akkurat denne plasseringen, for eksempel en kortere variant. */
  text?: string;
  /** Punktet etiketten viser til. Gir en tynn ledelinje fra etiketten. */
  to?: { x: number; y: number };
};

type Seg = { x0: number; y0: number; x1: number; y1: number };

/** Korteste avstand mellom to linjestykker. */
function segDist(a: Seg, b: Seg): number {
  const cross = (ox: number, oy: number, px: number, py: number, qx: number, qy: number) =>
    (px - ox) * (qy - oy) - (py - oy) * (qx - ox);
  const d1 = cross(a.x0, a.y0, a.x1, a.y1, b.x0, b.y0);
  const d2 = cross(a.x0, a.y0, a.x1, a.y1, b.x1, b.y1);
  const d3 = cross(b.x0, b.y0, b.x1, b.y1, a.x0, a.y0);
  const d4 = cross(b.x0, b.y0, b.x1, b.y1, a.x1, a.y1);
  if (d1 * d2 < 0 && d3 * d4 < 0) return 0;
  const pt = (px: number, py: number, s: Seg) => {
    const dx = s.x1 - s.x0;
    const dy = s.y1 - s.y0;
    const l = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((px - s.x0) * dx + (py - s.y0) * dy) / l));
    return Math.hypot(px - (s.x0 + t * dx), py - (s.y0 + t * dy));
  };
  return Math.min(pt(a.x0, a.y0, b), pt(a.x1, a.y1, b), pt(b.x0, b.y0, a), pt(b.x1, b.y1, a));
}

const overlap = (a: Box, b: Box) =>
  Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0)) *
  Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0));

/**
 * Enkel kollisjonsbevisst etikettplassering for én tegning.
 * Hver etikett får en liste med mulige plasser i prioritert rekkefølge.
 * Den første plassen som ligger helt inne i rammen og ikke dekker en
 * tidligere etikett eller et reservert område, blir brukt. Finnes ingen
 * slik plass, brukes den som dekker minst, flyttet inn i rammen.
 */
export class LabelLayout {
  readonly boxes: Box[] = [];
  /** Streker som ledelinjer ikke skal krysse, for eksempel piler. */
  private lines: Seg[] = [];
  constructor(
    private ctx: CanvasRenderingContext2D,
    private frame: Box,
    private pad = 3,
  ) {}

  measure(
    text: string,
    x: number,
    y: number,
    opts: LabelOpts = {},
    align: CanvasTextAlign = "left",
  ): Box {
    const size = Math.max(LABEL_PX, opts.size ?? LABEL_PX);
    this.ctx.font = `${opts.weight ?? "500"} ${size}px ${FONT}`;
    const m = this.ctx.measureText(text);
    const wdt = m.width;
    const x0 =
      align === "center" ? x - wdt / 2 : align === "right" || align === "end" ? x - wdt : x;
    const asc = m.actualBoundingBoxAscent || size * 0.72;
    const desc = m.actualBoundingBoxDescent || size * 0.22;
    return { x0: x0 - 2, y0: y - asc - 2, x1: x0 + wdt + 2, y1: y + desc + 2 };
  }

  reserve(box: Box) {
    this.boxes.push(box);
  }

  /** En strek i tegningen som ledelinjer ikke skal krysse eller gå tett inntil. */
  avoidLine(x0: number, y0: number, x1: number, y1: number) {
    this.lines.push({ x0, y0, x1, y1 });
  }

  /** Ledelinja fra boksen til punktet, eller null når etiketten står så nær at den ikke trengs. */
  private leaderFor(box: Box, to: { x: number; y: number }): Seg | null {
    const ax = Math.max(box.x0, Math.min(box.x1, to.x));
    const ay = Math.max(box.y0, Math.min(box.y1, to.y));
    return Math.hypot(ax - to.x, ay - to.y) > 6 ? { x0: ax, y0: ay, x1: to.x, y1: to.y } : null;
  }

  private leaderCost(box: Box, to?: { x: number; y: number }) {
    if (!to) return 0;
    const seg = this.leaderFor(box, to);
    if (!seg) return 0;
    return this.lines.some((l) => segDist(seg, l) < 3) ? 1e4 : 0;
  }

  private inside(b: Box) {
    const f = this.frame;
    return b.x0 >= f.x0 && b.x1 <= f.x1 && b.y0 >= f.y0 && b.y1 <= f.y1;
  }

  private cost(b: Box) {
    const p = this.pad;
    const grown = { x0: b.x0 - p, y0: b.y0 - p, x1: b.x1 + p, y1: b.y1 + p };
    return this.boxes.reduce((s, o) => s + overlap(grown, o), 0);
  }

  /** Plasserer og tegner etiketten. Gir boksen som ble brukt. */
  place(text: string, spots: Spot[], opts: LabelOpts = {}): Box {
    let best: { spot: Spot; box: Box; cost: number } | null = null;
    for (const spot of spots) {
      const t = spot.text ?? text;
      const box = this.measure(t, spot.x, spot.y, opts, spot.align ?? opts.align);
      const inside = this.inside(box);
      const cost = this.cost(box) + this.leaderCost(box, spot.to) + (inside ? 0 : 1e6);
      if (cost === 0) {
        best = { spot, box, cost };
        break;
      }
      if (!best || cost < best.cost) best = { spot, box, cost };
    }
    if (!best) throw new Error("place() trenger minst én plass");
    let { spot, box } = best;
    // Flytt inn i rammen hvis ingen plass lå helt inne.
    const f = this.frame;
    const dx = box.x0 < f.x0 ? f.x0 - box.x0 : box.x1 > f.x1 ? f.x1 - box.x1 : 0;
    const dy = box.y0 < f.y0 ? f.y0 - box.y0 : box.y1 > f.y1 ? f.y1 - box.y1 : 0;
    if (dx || dy) {
      spot = { ...spot, x: spot.x + dx, y: spot.y + dy };
      box = { x0: box.x0 + dx, y0: box.y0 + dy, x1: box.x1 + dx, y1: box.y1 + dy };
    }
    if (spot.to) {
      const seg = this.leaderFor(box, spot.to);
      if (seg) leader(this.ctx, seg.x0, seg.y0, seg.x1, seg.y1, opts.color);
    }
    label(this.ctx, spot.text ?? text, spot.x, spot.y, {
      ...opts,
      align: spot.align ?? opts.align,
    });
    this.boxes.push(box);
    return box;
  }
}
