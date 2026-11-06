import { useState } from "react";
import type { GeoJsonObject } from "geojson";
import data from "@/lib/geografi-fosen-vinter-vind.json";
import { GeografiDatakart } from "./datakart";
const lag = ["Senvinterland", "Tidlig vinterland", "Vindkraftområde"];
const colors = {"Senvinterland":"#047857","Tidlig vinterland":"#7e22ce","Vindkraftområde":"#b45309"};
export function GeografiFosenKart(){
 const [valgt,setValgt] = useState(lag);
 const alle = [...data.beite,...data.vind];
 const features = alle.filter(f=>valgt.includes(f.properties.lag));
 return <figure className="my-6 space-y-3 rounded-xl border p-4"><h3 className="font-semibold">Figur 7.7. Fosen: vinterbeite og vindkraftområder</h3><p>Storheia og Roan sett sammen med to registrerte vinterbeitekategorier for Fovsen-Njaarke/Fosen. Velg kartlag. Tomme områder betyr ikke at reindrift mangler.</p>
 <div className="flex flex-wrap gap-2">{lag.map(l=><button key={l} type="button" className="rounded border px-3 py-2" aria-pressed={valgt.includes(l)} onClick={()=>setValgt(v=>v.includes(l)?v.filter(x=>x!==l):[...v,l])}><span aria-hidden="true" className="mr-2 inline-block h-3 w-3" style={{backgroundColor:colors[l as keyof typeof colors]}}/>{l}</button>)}</div>
 <GeografiDatakart key={valgt.join()} data={{type:"FeatureCollection",features} as GeoJsonObject} center={[63.95,10.35]} zoom={8} property="lag" colors={colors}/>
 <table className="w-full text-sm"><caption className="text-left">Kildeobjekter i utvalget, ikke arealer eller antall berørte dyr</caption><thead><tr><th scope="col" className="text-left">Lag</th><th scope="col">Objekter</th></tr></thead><tbody>{lag.map(l=><tr key={l}><th scope="row" className="text-left">{l}</th><td className="text-center">{alle.filter(f=>f.properties.lag===l).length}</td></tr>)}</tbody></table>
 <p>Beitelaget har 63 objekter, sist oppdatert i 2016 eller 2024. Senvinterland er intensivt brukte vinterområder; tidlig vinterland brukes normalt tidligere og mindre intensivt. Vindkraftlaget har tre områdeobjekter for to anlegg, registrert med status Drift i NVE-kilden.</p>
 <p>Kartene har ulike oppdateringstidspunkt. De viser ikke alle årstidsbeiter, flyttleier, veier, faktisk bruk et bestemt år, samlet belastning eller rettslige grenser. Overlapp alene avgjør ikke rettigheter, tap av beite eller om en avtale er gjennomført. Suppler med reindriftsutøvernes kunnskap.</p>
 <figcaption className="text-sm">Beite: Landbruksdirektoratet (u.å.), via NIBIO, NLOD 2.0. Vindkraft: NVE (u.å.), NLOD. Bakgrunn: © Kartverket, CC BY 4.0, maksimalt zoom 11. Hentet 6. november 2026. Eget distriktsutvalg og koordinatomregning; NVE-geometri er generalisert. <a className="underline" href="/downloads/geografi-fosen-vinter-vind.geojson">Last ned kartobjektene (GeoJSON)</a>.</figcaption></figure>;
}
