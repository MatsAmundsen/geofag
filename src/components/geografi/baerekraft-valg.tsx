import { useEffect, useId, useRef, useState } from "react";
import { HDI_BNP } from "@/lib/geografi-hdi-data";
import { TRANSPORT_FAKTORER, transportCO2 } from "@/lib/geografi-transport-co2";
const navn: Record<string, string> = { BRA: "Brasil", CRI: "Costa Rica", IND: "India", JPN: "Japan", NER: "Niger", NOR: "Norge", ZAF: "Sør-Afrika", USA: "USA" };
const tall = (x: number, desimaler = 0) => x.toLocaleString("nb-NO", { maximumFractionDigits: desimaler });
export function GeografiHdiBnp() {
  return <figure className="my-6 space-y-3 rounded-xl border p-4">
    <h3 className="font-semibold">Figur 8.2 – HDI og BNP per innbygger, 2023</h3>
    <svg viewBox="0 0 760 450" role="img" aria-label="Punktdiagram over HDI og kjøpekraftsjustert BNP for åtte utvalgte land. Eksakte tall følger i tabellen." className="w-full text-foreground">
      {[0, .2, .4, .6, .8, 1].map((v) => <g key={v}><line x1="65" x2="710" y1={365 - v * 300} y2={365 - v * 300} stroke="currentColor" opacity=".18" /><text x="52" y={370 - v * 300} textAnchor="end" fill="currentColor" fontSize="15">{tall(v, 1)}</text></g>)}
      <path d="M65 60 V365 H710" fill="none" stroke="currentColor" />
      {[0, 20000, 40000, 60000, 80000, 100000].map((v) => <text key={v} x={65 + v / 100000 * 620} y="390" textAnchor="middle" fill="currentColor" fontSize="14">{tall(v)}</text>)}
      <text x="65" y="36" fill="currentColor" fontSize="17">HDI (0–1)</text><text x="380" y="430" fill="currentColor" fontSize="16" textAnchor="middle">BNP per innbygger, kjøpekraftsjustert (konstante 2021-dollar)</text>
      {HDI_BNP.map((d) => { const x = 65 + d.bnpPPP / 100000 * 620, y = 365 - d.hdi * 300; return <g key={d.iso3}><circle cx={x} cy={y} r={d.iso3 === "NOR" ? 8 : 5} fill={d.iso3 === "NOR" ? "#9f1239" : "#0369a1"} stroke="currentColor" /><text x={x + 10} y={y + (["NER", "IND", "ZAF"].includes(d.iso3) ? 17 : -8)} fill="currentColor" fontSize="15" fontWeight={d.iso3 === "NOR" ? "bold" : "normal"}>{navn[d.iso3]}</text></g>; })}
    </svg>
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tabell: Åtte valgte land, ikke et representativt utvalg av verden"><table className="w-full text-sm"><caption className="text-left">Åtte valgte land, ikke et representativt utvalg av verden</caption><thead><tr><th scope="col" className="text-left">Land</th><th scope="col">HDI</th><th scope="col">BNP per innbygger (PPP, 2021-dollar)</th></tr></thead><tbody>{HDI_BNP.map((d) => <tr key={d.iso3}><th scope="row" className="text-left">{navn[d.iso3]}</th><td className="text-center">{tall(d.hdi, 3)}</td><td className="text-center">{tall(d.bnpPPP)}</td></tr>)}</tbody></table></div>
    <figcaption className="text-sm">UNDP (2025), HDI, CC BY 3.0 IGO; World Bank (u.å.), WDI NY.GDP.PCAP.PP.KD, CC BY 4.0. Eget utvalg og framstilling. HDI bruker BNI, ikke BNP. Landsgjennomsnitt og samvariasjon dokumenterer verken fordeling, årsak eller miljøavtrykk. <a className="underline" href="/downloads/geografi-hdi-bnp-2023.csv">Last ned tallene (CSV)</a>.</figcaption>
  </figure>;
}
export function GeografiLokalFotavtrykk() {
  const id = useId();
  const [svar, setSvar] = useState(["", "", ""]);
  const gyldig = svar.every((v) => v.trim() === "" || (/^\d+(?:[.,]\d+)?$/.test(v.trim()) && Number(v.replace(",", ".")) <= 1000000));
  const km = svar.map((v) => v.trim() === "" ? 0 : Number(v.replace(",", ".")));
  const utslipp = gyldig ? transportCO2(km) : null;
  return <figure className="my-6 space-y-4 rounded-xl border p-4">
    <h3 className="font-semibold">Figur 8.5a – Lokal kalkulator: forenklet transportavtrykk</h3>
    <p>Oppgi personkilometer for en selvvalgt periode, gjerne en oppdiktet øvingsprofil. Én person som reiser én kilometer, gir én personkilometer. Tomme felt regnes som null. Tallene sendes ikke og lagres ikke.</p>
    {TRANSPORT_FAKTORER.map((f, i) => <div key={f.id} className="flex flex-wrap items-center gap-3"><label className="min-w-56" htmlFor={`${id}-${f.id}`}>{f.navn}, personkilometer</label><input id={`${id}-${f.id}`} type="text" inputMode="decimal" value={svar[i]} aria-invalid={!gyldig} className="w-36 rounded border bg-background p-2" onChange={(e) => setSvar(svar.map((v, j) => j === i ? e.target.value : v))} /><span className="text-sm">× {tall(f.gram, 1)} g CO₂/personkm (2020)</span></div>)}
    <p aria-live="polite" className="font-medium">{utslipp === null ? "Skriv positive tall eller null, maksimalt 1 000 000 personkilometer per felt. Komma eller punktum kan brukes." : `Beregnet direkte CO₂: ${tall(utslipp, 2)} kg for den oppgitte perioden.`}</p>
    <button type="button" onClick={() => setSvar(["", "", ""])} className="rounded border px-3 py-2">Nullstill</button>
    <details><summary className="cursor-pointer font-medium">Metode, faktorer og begrensninger</summary><div className="space-y-2 pt-2"><p>Formel: summen av personkilometer × gram CO₂ per personkilometer ÷ 1 000 = kg CO₂. Faktorene over er norske gjennomsnitt for 2020 fra Engedal et al. (2021), SSB, tabell 1 (CC BY 4.0). De inneholder gjennomsnittlig belegg; ikke del på antall personer en gang til.</p><p>2020 var et pandemiår med særlig lavt bussbelegg. Dette er en datert regneøvelse, ikke en rangering av dagens transportvalg. Faktorene er ikke målinger av din bil eller buss. Produksjon av kjøretøy, energi, veier og øvrig livsløp er ikke med.</p><p>Dette er bare direkte CO₂, ikke alle klimagasser eller CO₂-ekvivalenter. Kalkulatoren måler ikke mat, bolig, varer, offentlige tjenester, økologisk fotavtrykk i globale hektar eller antall jordkloder. Ingen GFN-data eller poengskala er brukt.</p></div></details>
    <figcaption className="text-sm">Kilde: Engedal et al. (2021), SSB. Egen forenkling og beregning. Endrer du ett tall, kan du undersøke modellens respons uten å rangere medelevers forbruk.</figcaption>
  </figure>;
}

const F85 = "/images/geografi/figur-8-5";
const F85_ALT =
  "Linjediagram over verdens økologiske fotavtrykk og biokapasitet fra 1961 til 2025, i globale hektar per person. Biokapasiteten synker jevnt fra 3,17 i 1961 til 1,48 i 2025. Fotavtrykket stiger fra 2,20 i 1961, krysser biokapasiteten i 1973 og ligger mellom om lag 2,3 og 2,8 resten av perioden, med 2,51 i 2025. Feltet mellom linjene er overforbruket. De siste to årene er stiplet fordi de er anslag.";

/** Én temavariant av figur 8.5: mobil (≤599 px) og desktop, WebP med PNG som reserve. */
function Fotavtrykk85Bilde({ tema }: { tema: "lys" | "mork" }) {
  const b = `${F85}-${tema}`;
  return (
    <picture className={`geo-tema-figur__${tema}`}>
      <source media="(max-width: 599px)" type="image/webp" srcSet={`${b}-mobil-390.webp 390w, ${b}-mobil-780.webp 780w`} sizes="calc(100vw - 4.5rem)" />
      <source media="(max-width: 599px)" srcSet={`${b}-mobil-780.png 780w`} sizes="calc(100vw - 4.5rem)" />
      <source type="image/webp" srcSet={`${b}-960.webp 960w, ${b}-1920.webp 1920w`} sizes="(min-width: 896px) 800px, 100vw" />
      <img src={`${b}-1920.png`} width={960} height={756} alt={F85_ALT} loading="lazy" decoding="async" className="h-auto w-full rounded-lg" />
    </picture>
  );
}

/** Figur 8.5. Datafigur med egen lys og mørk utgave; temaet følger siden (styles.css, .geo-tema-figur). */
export function GeografiFotavtrykkBiokapasitet() {
  const figurRef = useRef<HTMLElement>(null);
  // Begge utgavene er lazy, så den skjulte ikke lastes. Chrome starter ikke alltid lastingen når
  // et skjult lazy-bilde blir synlig ved temabytte, så den synlige utgaven settes da til eager.
  useEffect(() => {
    const figur = figurRef.current;
    if (!figur) return;
    const observer = new MutationObserver(() => {
      for (const img of figur.querySelectorAll<HTMLImageElement>("img[loading='lazy']")) {
        if (img.offsetParent !== null) img.loading = "eager";
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
    return () => observer.disconnect();
  }, []);
  return (
    <figure ref={figurRef} className="geo-tema-figur my-6 space-y-3 rounded-xl border p-4">
      <h3 className="font-semibold">Figur 8.5 – Økologisk fotavtrykk og biokapasitet i verden, 1961–2025</h3>
      <Fotavtrykk85Bilde tema="lys" />
      <Fotavtrykk85Bilde tema="mork" />
      <figcaption className="text-sm">
        Kilde: Lo mfl. (2026), National Ecological Footprint and Biocapacity Accounts, 2026-utgaven, CC BY-SA 4.0, bearbeidet av Geofag.com. Overforbruksdager: Lin og Wackernagel (2026), GFN (u.å.-b) og WWF (u.å.). Figuren deles under CC BY-SA 4.0. Den oransje linja viser verdens økologiske fotavtrykk, og den grønne linja viser biokapasiteten, begge i globale hektar per person. Det brune feltet mellom linjene er overforbruket. Fotavtrykket var større enn biokapasiteten første gang i 1973 og har vært det hvert år siden. I 2023 var fotavtrykket 2,56 og biokapasiteten 1,50 globale hektar per person. Tallene for 2024 og 2025 er anslag i samme utgave og vises stiplet. Jordas overforbruksdag 2026 er 30. juli og gjelder hele menneskehetens forbruk. En nasjonal overforbruksdag måler et lands forbruk per person mot verdens biokapasitet per person. Norges nasjonale overforbruksdag var 16. april 2025. Norge er utelatt i 2026 på grunn av datakvaliteten, ikke fordi forbruket har blitt bærekraftig.
      </figcaption>
    </figure>
  );
}
