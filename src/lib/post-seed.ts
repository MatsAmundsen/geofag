import platetektonikkPost from "./platetektonikk-post.md?raw";

/** Shared seed for PGLite, D1 and the in-memory Worker fallback. */
export const PLATETEKTONIKK_SEED = {
  slug: "platetektonikk",
  title: "Platetektonikk",
  summary: "Bevegelser i mantelen driver platene — konsekvensene skriver seg i jordskorpa.",
  ingress:
    "Jordas ytre skall er delt i plater som glir på astenosfæren; der de møtes, endres både skorpe og overflate.",
  thumbnail: "/images/gf1-platetektonikk.jpg",
  bodyMarkdown: platetektonikkPost,
  published: 1,
  createdAt: "2026-09-18 00:00:00.000000",
  updatedAt: "2026-09-18 00:00:00.000000",
};

export { isShortPlatetektonikkBody } from "./post-seed-upgrade";

export function nowStamp(): string {
  const d = new Date();
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}.000000`;
}
