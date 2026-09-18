/** Shared seed for PGLite (SQL migration) and Cloudflare D1 (first request). */
export const PLATETEKTONIKK_SEED = {
  slug: "platetektonikk",
  title: "Platetektonikk",
  summary: "Bevegelser i mantelen driver platene — konsekvensene skriver seg i jordskorpa.",
  ingress:
    "Jordas ytre skall er delt i plater som glir på astenosfæren; der de møtes, endres både skorpe og overflate.",
  thumbnail: "/images/gf1-platetektonikk.jpg",
  bodyMarkdown:
    "## Jordas lag og hva en plate egentlig er\n\nEn plate er ikke «et stykke skorpe». Den er **litosfære**: skorpe pluss den øvre, kalde og stive delen av mantelen. Litosfæren glir på **astenosfæren**, et varmere og mykere lag lenger ned i mantelen.\n\n- **Divergente grenser** — platene går fra hverandre. Ny havbunn dannes ved midthavsrygger.\n- **Konvergente grenser** — platene møtes. Subduksjon, dyphavsgrøfter og fjellkjeder.\n- **Transforme grenser** — platene glir sidelengs. Store forkastninger og jordskjelv.\n\n## Hva driver bevegelsen\n\nVarme fra jordas indre setter opp treg konveksjon i mantelen. Sammen med *ridge push* og *slab pull* trekker og skyver dette platene. Der trykket faller når mantelberg stiger, kan berget smelte — kilden til vulkanene langs mange plategrenser.\n\n![Midthavsrygg og plategrense](/images/gf1-platetektonikk.jpg)\n\n> Rediger denne teksten i redigeringsvisningen og lagre — endringen vises umiddelbart her, uten ny bygging.",
  published: 1,
  createdAt: "2026-09-18 00:00:00.000000",
  updatedAt: "2026-09-18 00:00:00.000000",
};

export function nowStamp(): string {
  const d = new Date();
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}.000000`;
}
