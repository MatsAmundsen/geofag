import { Suspense, useState } from "react";
import { lazyWithReload as lazy } from "@/lib/lazy-with-reload";
import { C, Diagram, L } from "@/components/diagrams/svg-kit";
import { GeografiDatakart } from "./datakart";
import { PlateKartForklaring, PlateKartSvg } from "./platekart";
import { ScrollFrame } from "@/components/scroll-frame";
import { RIFT_STATUS } from "@/components/diagrams/indre-rift-tekst";
import { TSUNAMI_STATUS } from "@/components/diagrams/indre-tsunami-tekst";
import kartdata from "@/lib/geografi-kap3-kart.json";
import type { GeoJsonObject } from "geojson";
const PLATENAVN_3_0 = "Den eurasiske platen, Den nordamerikanske platen, Stillehavsplaten, Den søramerikanske platen, Nazcaplaten, Kokosplaten, Den karibiske platen, Den filippinske platen, Scotiaplaten, Antarktisplaten, Nubiaplaten, Somaliaplaten, Den arabiske platen, Den indiske platen og Den australske platen";
export function GeografiPlateKart() {
  return <figure className="my-6 space-y-3 rounded-xl border border-border bg-card p-4 text-card-foreground sm:p-5"><h3 className="font-semibold">Figur 3.0. Tektoniske plater – et forenklet verdenskart</h3><ScrollFrame label="Figur 3.0. Tektoniske plater – et forenklet verdenskart" fade="var(--color-card)"><PlateKartSvg visPlatenavn ariaLabel={`Verdenskart sentrert på Stillehavet med plategrensene og norske platenavn: ${PLATENAVN_3_0}. Den eurasiske platen står både helt til venstre og helt til høyre fordi kartet går litt mer enn én gang rundt jorda.`} /></ScrollFrame><PlateKartForklaring /><figcaption className="text-sm text-muted-foreground">Egen tegning med norske platenavn som i USGS (2026). Plategrenser: USGS-karttjenesten Tectonic Plate Boundaries, bygd på Bird (2003), med grensen mellom Nubia- og Somaliaplaten (Den østafrikanske riftsonen) fra samme tjeneste. Land: Natural Earth 5.1.1. Alle er offentlige data (Public Domain). Millers sylindriske projeksjon, sentrert på Stillehavet. Kartet går litt mer enn én gang rundt jorda, så Den eurasiske platen står to ganger. India og Australia er skilt, og Afrikas Nubia- og Somaliaplater er ikke én uoppdelt plate her. Kartet viser plater, ikke observerte skjelv/vulkaner, aktive varsler eller presise faresoner (USGS, u.å.-k; Bird, 2003; Natural Earth, u.å.).</figcaption></figure>;
}
/** Figur 3.3 og 3.11 er stegmodeller (avspilling, pause, trinnknapper, nummermerker på smal skjerm). De lastes ved behov. */
const RiftFigur = lazy(() => import("@/components/diagrams/indre-rift-figur").then((m) => ({ default: m.GeografiRiftFigur })));
const TsunamiFigur = lazy(() => import("@/components/diagrams/indre-tsunami-figur").then((m) => ({ default: m.GeografiTsunamiFigur })));
function Reserve({ heading }: { heading: string }) {
  return <figure className="my-6 min-h-[38rem] rounded-xl border border-border bg-card p-4 text-card-foreground"><p className="font-semibold">{heading}</p><p className="text-sm text-muted-foreground">Laster figur.</p></figure>;
}
export function GeografiRiftHav() {
  const heading = "Figur 3.3. Fra tøying til et mulig hav";
  return <div><Suspense fallback={<Reserve heading={heading} />}><RiftFigur heading={heading} caption="Egen Vg1-prinsippfigur etter USGS (u.å.-h) og NGU (u.å.-a), ikke målte lagtykkelser eller en tidsprognose. Tøying → riftdal → mulig hav er ikke en nødvendig kjede. Oslo-riften utviklet seg ikke til et nytt hav." /></Suspense><details><summary>Les hele forklaringen</summary><ol className="list-decimal space-y-2 pl-6">{RIFT_STATUS.map((t) => <li key={t}>{t}</li>)}</ol></details></div>;
}
export function GeografiTsunamiSteg() {
  const heading = "Figur 3.11. Fra vannforskyvning til kyst";
  return <div><Suspense fallback={<Reserve heading={heading} />}><TsunamiFigur heading={heading} caption="Egen forklaringsskisse etter NOAA (u.å.-a, u.å.-b), med fast perspektiv. Formene er illustrasjoner, ikke beregnede bølgehøyder, ankomsttider, oversvømmelse eller sikkerhetssoner. Flere bølger kan følge; følg lokale myndigheters råd." /></Suspense><details><summary>Les alle fire prosesstrinn</summary><ol className="list-decimal space-y-2 pl-6">{TSUNAMI_STATUS.map((t) => <li key={t}>{t}</li>)}</ol></details></div>;
}
export function GeografiTyrkiaKart() {
  return <figure className="my-6 space-y-3 rounded-xl border border-border bg-card p-4 text-card-foreground sm:p-5"><h3 className="font-semibold">Figur 3.7. To episentre i jordskjelvsekvensen 6. februar 2023</h3><GeografiDatakart data={kartdata.kart.tyrkia as GeoJsonObject} center={[37, 36]} zoom={5} property="klasse" colors={{Landkontur:"#cbd5e1","M 7,5":"#9f1239","M 7,8":"#9f1239"}} /><table className="w-full text-left text-sm"><caption>USGS-katalogen: punkter, ikke hele bruddflater</caption><thead><tr><th scope="col">Hendelse</th><th scope="col">Magnitude</th><th scope="col">Breddegrad N</th><th scope="col">Lengdegrad Ø</th></tr></thead><tbody>{kartdata.skjelv.map((d) => <tr key={d.id}><th scope="row"><a href={d.url} className="inline-flex min-h-6 min-w-6 items-center underline">{d.id}</a></th><td>{d.mag.toLocaleString("nb-NO")}</td><td>{d.lat.toLocaleString("nb-NO")}</td><td>{d.lon.toLocaleString("nb-NO")}</td></tr>)}</tbody></table><figcaption>USGS (2023a), eget katalogutvalg: to hendelser med magnitude minst 7, denne dagen og i dette området. Landkonturer: Natural Earth (u.å.), public domain. Røde punkter er episentre, ikke skred, byer, kartlagte brudd eller rystelsesfelt. Ingen konstruerte bruddlinjer, skadegrenser eller dødstall er lagt til.</figcaption><p><strong>Tenk over:</strong> Bruddet omfatter en flate, rystelsene varierer fra sted til sted, og bygningers sårbarhet avgjør hvordan de tåler bevegelsen. Hvorfor kan ingen av disse tre forholdene leses direkte av to episenterprikker?</p></figure>;
}
export function GeografiReykjanes() {
  return <figure className="my-6 space-y-3 rounded-xl border border-border bg-card p-4 text-card-foreground sm:p-5"><h3 className="font-semibold">Figur 3.10. Reykjanes – opptak 19. desember 2023</h3><img src="/images/geografi/reykjanes-19-desember-2023.webp" width="2000" height="1286" loading="lazy" decoding="async" alt="Infrarød satellittframstilling med et tydelig gult og oransje varmesignal nær Grindavík på Reykjanes, 19. desember 2023." className="h-auto w-full rounded" /><div className="max-w-md"><GeografiDatakart data={kartdata.kart.island as GeoJsonObject} center={[64.8,-19]} zoom={4} property="klasse" colors={{Landkontur:"#7eb8c9"}} /></div><p>Lokatoren viser Island; Reykjanes ligger sørvest på øya. Den viser ikke satellittbildets nøyaktige fotavtrykk. Landkontur: Natural Earth (u.å.), public domain.</p><figcaption className="text-sm"><span>Contains modified Copernicus Sentinel data 2023</span>. European Union (2023), Copernicus Sentinel-3/SLSTR. Opptaket er fra 19. desember, publiseringen fra 21. desember 2023. Infrarød/falskfarget framstilling med grov romlig oppløsning, ikke et vanlig fotografi eller en faresone. Bildet er nedskalert og WebP-komprimert, ikke omtegnet. Fri bruk med attribusjon etter Copernicus-vilkårene (European Commission, u.å.), ingen antydet EU-godkjenning. Dette dokumenterer ikke dagens aktivitet.</figcaption></figure>;
}
/** Pilleknapp i samme stil som zoomknappene i Geofag 1 (Den geologiske tidsskalaen). */
function Pille({ aktiv, onClick, children }: { aktiv: boolean; onClick: () => void; children: string }) {
  return <button type="button" aria-pressed={aktiv} onClick={onClick} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${aktiv ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted/40 text-foreground hover:bg-muted"}`}>{children}</button>;
}

/** Gneisstriper i grunnfjellet (bølgete foliasjon). */
const gneis = Array.from({ length: 7 }, (_, i) => {
  const y = 246 + i * 8;
  let d = `M35 ${y}`;
  for (let x = 35; x <= 765; x += 20) d += ` Q${x + 10} ${y + (i % 2 ? 4 : -4) * Math.sin(x / 37 + i)} ${x + 20} ${y}`;
  return d;
});

const skyvegrenser: [number, number][][] = [[[270, 236], [592, 236]], [[300, 214], [556, 214]], [[372, 176], [420, 186], [470, 170], [518, 185]]];
/** Punkter med fast avstand langs en brutt linje (plass til trekantene på en skyvegrense). */
function tenner(linje: [number, number][], avstand: number) {
  const ut: [number, number][] = [];
  for (let i = 1; i < linje.length; i++) {
    const [x0, y0] = linje[i - 1], [x1, y1] = linje[i];
    const n = Math.max(1, Math.floor(Math.hypot(x1 - x0, y1 - y0) / avstand));
    for (let k = 0; k < n; k++) { const t = (k + 0.5) / n; ut.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]); }
  }
  return ut;
}

export function GeografiBerggrunnSkisse() {
  return <Diagram heading="Figur 3.13. Byggeklosser i Norges berggrunn" title="Skjematisk kobling mellom gammel berggrunn, skyvedekker, Oslofeltet og sedimenter på sokkelen. Ikke et geografisk profil eller kart." viewBox="0 0 800 330" scroll caption="Egen prinsippskisse etter NGU (u.å.-a, u.å.-d). Ikke et NGU-kart, geografisk profil eller virkelige grenser, arealer og lagtykkelser. Sokkelens sedimentbassenger er ikke det samme som grunnfjell. Ingen NGU-raster er brukt.">
    {() => <>
      <defs>
        <linearGradient id="bg313-hav" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3f8fc0" /><stop offset="100%" stopColor="#1b4f72" /></linearGradient>
        <linearGradient id="bg313-grunn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d79a7c" /><stop offset="100%" stopColor="#b07560" /></linearGradient>
      </defs>
      {/* grunnfjell */}
      <path d="M35 236 H765 V296 H35Z" fill="url(#bg313-grunn)" stroke="#3a2420" strokeWidth="1.5" />
      {gneis.map((d, i) => <path key={i} d={d} fill="none" stroke="#5e3328" strokeOpacity=".45" strokeWidth="1.3" />)}
      <ellipse cx="150" cy="272" rx="40" ry="9" fill="#7c4a3d" opacity=".55" /><ellipse cx="610" cy="262" rx="34" ry="7" fill="#7c4a3d" opacity=".5" />
      {/* sokkel: hav og sedimentlag */}
      <path d="M35 138 H232 L262 172 H35Z" fill="url(#bg313-hav)" opacity=".9" />
      {[["#e7d29a", 172, 186], ["#c9b27a", 186, 202], ["#a8946a", 202, 218], ["#8a7a5c", 218, 236]].map(([f, y0, y1]) => <path key={String(y0)} d={`M35 ${y0} H${262 + (Number(y0) - 172) * 0.5} L${262 + (Number(y1) - 172) * 0.5} ${y1} H35Z`} fill={String(f)} stroke="#3a2c1f" strokeOpacity=".5" />)}
      <path d="M140 172 L160 236 M205 172 L222 236" stroke="#3a2c1f" strokeWidth="1.6" strokeOpacity=".7" />
      {/* kaledonske skyvedekker: bergflak stablet over hverandre */}
      <path d="M262 236 L300 214 H560 L600 236Z" fill="#4f8f8a" stroke="#1d3a38" strokeWidth="1.4" />
      <path d="M292 214 L330 188 L372 176 L420 186 L470 170 L520 186 L548 214Z" fill="#6fb3b8" stroke="#1d3a38" strokeWidth="1.4" />
      <path d="M340 188 L372 162 L404 152 L436 160 L468 146 L500 162 L520 186 L470 170 L420 186 L372 176Z" fill="#9fcfc6" stroke="#1d3a38" strokeWidth="1.4" />
      {/* skyvegrenser med trekanter på det overliggende flaket */}
      {skyvegrenser.map((linje, i) => <g key={i}><path d={`M${linje.map((q) => q.join(" ")).join(" L")}`} fill="none" stroke="#10201f" strokeWidth="1.8" />{tenner(linje, 30).map(([tx, ty], k) => <path key={k} d={`M${tx - 5} ${ty} l5 -7 l5 7Z`} fill="#10201f" />)}</g>)}
      {/* Oslofeltet: graben mellom forkastninger, med lava og dypbergart */}
      <path d="M600 236 L615 214 H765 V236Z" fill="#c8ab82" stroke="#3a2c1f" strokeWidth="1.2" />
      <path d="M640 214 L668 270 H712 L740 214Z" fill="#5a3b44" />
      <path d="M646 226 H734 L728 238 H652Z" fill="#a8434a" /><path d="M652 238 H728 L722 250 H658Z" fill="#7a3a3f" />
      <ellipse cx="690" cy="276" rx="26" ry="12" fill="#e08a6a" stroke="#5e3328" />
      <path d="M640 210 L672 290 M740 210 L708 290" stroke="#ff6b6b" strokeWidth="3.2" strokeLinecap="round" />
      {/* etiketter */}
      <L x="60" y="104" weight={700}>Sokkel: sedimenter</L>
      <L x="60" y="122" size={13} fill={C.muted}>lag over eldre berggrunn</L>
      <L x="300" y="110" weight={700}>Kaledonske skyvedekker</L>
      <L x="300" y="128" size={13} fill={C.muted}>bergflak skjøvet over hverandre</L>
      <L x="600" y="156" weight={700}>Oslofelt: riftspor</L>
      <L x="600" y="174" size={13} fill={C.muted}>strekk, forkastninger og magma</L>
      <L x="410" y="290" anchor="middle" weight={700} fill="#1f0f0b">Grunnfjell under yngre enheter</L>
      <L x="400" y="322" anchor="middle" fill={C.muted} size={13}>Bare sammenhenger – ikke ett bestemt sted</L>
    </>}
  </Diagram>;
}
export function GeografiTidsskala() {
  const [zoom, setZoom] = useState(false); const maks = zoom ? 600 : 4540; const x = (ma: number) => 715 - ma / maks * 650;
  const steg = zoom ? 100 : 1000;
  const merker = Array.from({ length: Math.floor(maks / steg) + 1 }, (_, i) => i * steg);
  const hendelse = "#e0b48a", kal = "#6fb3b8", oslo = "#ef8a8a";
  return <Diagram heading="Figur 3.1. To lineære utsnitt av geologisk tid" title={zoom ? "Siste 600 millioner år, lineær akse" : "Jordas historie, lineær akse fra 4540 millioner år siden til nå"} viewBox="0 0 800 340" scroll toolbar={<div role="group" aria-label="Velg tidsutsnitt" className="flex flex-wrap gap-2"><Pille aktiv={!zoom} onClick={() => setZoom(false)}>Hele jordas historie</Pille><Pille aktiv={zoom} onClick={() => setZoom(true)}>Forstørr siste 600 mill. år</Pille></div>} caption="Egen framstilling. USGS (u.å.-a): Jorda ca. 4,54 milliarder år; NGU (u.å.-a): kaledonsk fjellkjededannelse ca. 400–500 millioner år og starten på Osloriften ca. 310 millioner år. Dette er tre utvalgte holdepunkter, ikke en komplett formell tidsskala. Hvert utsnitt er lineært; målestokken skifter mellom knappene.">
    {() => <>
      <defs><linearGradient id="gt31-bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5b4a6b" /><stop offset="100%" stopColor={zoom ? "#4a6b74" : "#5b4a6b"} /></linearGradient></defs>
      <rect x="65" y="200" width="650" height="40" rx="4" fill="url(#gt31-bar)" stroke="#8b7aa0" strokeOpacity=".6" />
      {merker.map((v) => <g key={v}><path d={`M${x(v)} 240 v8`} stroke={C.fg} strokeOpacity=".8" /><L x={x(v)} y="266" anchor="middle" size={13} fill={C.muted}>{v.toLocaleString("nb-NO")}</L></g>)}
      <L x="65" y="292" size={13} fill={C.muted}>Millioner år siden · eldst til venstre · lineær akse</L>
      <L x="715" y="292" anchor="end" size={13} weight={700}>Nå</L>
      {!zoom ? <>
        <rect x={x(600)} y="194" width={x(0) - x(600)} height="52" rx="4" fill="none" stroke={hendelse} strokeWidth="2" strokeDasharray="5 4" />
        <L x={x(600) + (x(0) - x(600)) / 2} y="320" anchor="middle" size={12} fill={hendelse}>Utsnittet som forstørres</L>
        <path d={`M${x(4540)} 200 V86`} stroke={hendelse} strokeWidth="2.5" /><circle cx={x(4540)} cy="200" r="4" fill={hendelse} />
        <L x={x(4540) + 8} y="80" weight={700} fill={hendelse}>Jordas dannelse, ca. 4 540 mill. år</L>
      </> : <L x="65" y="80" fill={C.muted}>Jordas dannelse ligger utenfor dette utsnittet</L>}
      <rect x={x(500)} y="200" width={Math.max(4, x(400) - x(500))} height="40" fill={kal} opacity=".85" />
      <path d={`M${x(450)} 200 V120`} stroke={kal} strokeWidth="2" />
      <L x={zoom ? x(450) : x(450) - 8} y="114" anchor={zoom ? "middle" : "end"} weight={700} fill={kal}>Kaledonsk: ca. 400–500 mill. år</L>
      <path d={`M${x(310)} 196 V${zoom ? 120 : 156}`} stroke={oslo} strokeWidth="3" /><circle cx={x(310)} cy="200" r="4.5" fill={oslo} stroke="#0f171c" />
      <L x={zoom ? x(310) + 8 : x(310) - 8} y={zoom ? 114 : 150} anchor={zoom ? "start" : "end"} weight={700} fill={oslo}>Osloriften starter: ca. 310 mill. år</L>
    </>}
  </Diagram>;
}
