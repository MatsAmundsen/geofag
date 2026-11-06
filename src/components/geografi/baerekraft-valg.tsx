import { useId, useState } from "react";
import { HDI_BNP } from "@/lib/geografi-hdi-data";
import { TRANSPORT_FAKTORER, transportCO2 } from "@/lib/geografi-transport-co2";
const navn: Record<string, string> = { BRA: "Brasil", CRI: "Costa Rica", IND: "India", JPN: "Japan", NER: "Niger", NOR: "Norge", ZAF: "Sør-Afrika", USA: "USA" };
const tall = (x: number, desimaler = 0) => x.toLocaleString("nb-NO", { maximumFractionDigits: desimaler });
export function GeografiHdiBnp() {
  return <figure className="my-6 space-y-3 rounded-xl border p-4">
    <h3 className="font-semibold">Figur 8.2. HDI og BNP per innbygger, 2023</h3>
    <svg viewBox="0 0 760 450" role="img" aria-label="Punktdiagram over HDI og kjøpekraftsjustert BNP for åtte utvalgte land. Eksakte tall følger i tabellen." className="w-full text-foreground">
      {[0, .2, .4, .6, .8, 1].map((v) => <g key={v}><line x1="65" x2="710" y1={365 - v * 300} y2={365 - v * 300} stroke="currentColor" opacity=".18" /><text x="52" y={370 - v * 300} textAnchor="end" fill="currentColor" fontSize="15">{tall(v, 1)}</text></g>)}
      <path d="M65 60 V365 H710" fill="none" stroke="currentColor" />
      {[0, 20000, 40000, 60000, 80000, 100000].map((v) => <text key={v} x={65 + v / 100000 * 620} y="390" textAnchor="middle" fill="currentColor" fontSize="14">{tall(v)}</text>)}
      <text x="65" y="36" fill="currentColor" fontSize="17">HDI (0–1)</text><text x="380" y="430" fill="currentColor" fontSize="16" textAnchor="middle">BNP per innbygger, kjøpekraftsjustert (konstante 2021-dollar)</text>
      {HDI_BNP.map((d) => { const x = 65 + d.bnpPPP / 100000 * 620, y = 365 - d.hdi * 300; return <g key={d.iso3}><circle cx={x} cy={y} r={d.iso3 === "NOR" ? 8 : 5} fill={d.iso3 === "NOR" ? "#9f1239" : "#0369a1"} stroke="currentColor" /><text x={x + 10} y={y + (["NER", "IND", "ZAF"].includes(d.iso3) ? 17 : -8)} fill="currentColor" fontSize="15" fontWeight={d.iso3 === "NOR" ? "bold" : "normal"}>{navn[d.iso3]}</text></g>; })}
    </svg>
    <div className="overflow-x-auto"><table className="w-full text-sm"><caption className="text-left">Åtte valgte land, ikke et representativt utvalg av verden</caption><thead><tr><th scope="col" className="text-left">Land</th><th scope="col">HDI</th><th scope="col">BNP per innbygger (PPP, 2021-dollar)</th></tr></thead><tbody>{HDI_BNP.map((d) => <tr key={d.iso3}><th scope="row" className="text-left">{navn[d.iso3]}</th><td className="text-center">{tall(d.hdi, 3)}</td><td className="text-center">{tall(d.bnpPPP)}</td></tr>)}</tbody></table></div>
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
    <h3 className="font-semibold">Figur 8.6a. Lokal kalkulator: forenklet transportavtrykk</h3>
    <p>Oppgi personkilometer for en selvvalgt periode, gjerne en oppdiktet øvingsprofil. Én person som reiser én kilometer, gir én personkilometer. Tomme felt regnes som null. Tallene sendes ikke og lagres ikke.</p>
    {TRANSPORT_FAKTORER.map((f, i) => <div key={f.id} className="flex flex-wrap items-center gap-3"><label className="min-w-56" htmlFor={`${id}-${f.id}`}>{f.navn}, personkilometer</label><input id={`${id}-${f.id}`} type="text" inputMode="decimal" value={svar[i]} aria-invalid={!gyldig} className="w-36 rounded border bg-background p-2" onChange={(e) => setSvar(svar.map((v, j) => j === i ? e.target.value : v))} /><span className="text-sm">× {tall(f.gram, 1)} g CO₂/personkm (2020)</span></div>)}
    <p aria-live="polite" className="font-medium">{utslipp === null ? "Skriv positive tall eller null, maksimalt 1 000 000 personkilometer per felt. Komma eller punktum kan brukes." : `Beregnet direkte CO₂: ${tall(utslipp, 2)} kg for den oppgitte perioden.`}</p>
    <button type="button" onClick={() => setSvar(["", "", ""])} className="rounded border px-3 py-2">Nullstill</button>
    <details><summary className="cursor-pointer font-medium">Metode, faktorer og begrensninger</summary><div className="space-y-2 pt-2"><p>Formel: summen av personkilometer × gram CO₂ per personkilometer ÷ 1 000 = kg CO₂. Faktorene over er norske gjennomsnitt for 2020 fra Engedal et al. (2021), SSB, tabell 1 (CC BY 4.0). De inneholder gjennomsnittlig belegg; ikke del på antall personer en gang til.</p><p>2020 var et pandemiår med særlig lavt bussbelegg. Dette er en datert regneøvelse, ikke en rangering av dagens transportvalg. Faktorene er ikke målinger av din bil eller buss. Produksjon av kjøretøy, energi, veier og øvrig livsløp er ikke med.</p><p>Dette er bare direkte CO₂, ikke alle klimagasser eller CO₂-ekvivalenter. Kalkulatoren måler ikke mat, bolig, varer, offentlige tjenester, økologisk fotavtrykk i globale hektar eller antall jordkloder. Ingen GFN-data eller poengskala er brukt.</p></div></details>
    <figcaption className="text-sm">Kilde: Engedal et al. (2021), SSB. Egen forenkling og beregning. Endrer du ett tall, kan du undersøke modellens respons uten å rangere medelevers forbruk.</figcaption>
  </figure>;
}
