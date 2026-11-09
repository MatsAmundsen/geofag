import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import type { GeoJsonObject } from "geojson";
export type DatakartProps={data:GeoJsonObject;center:[number,number];zoom:number;property?:string;colors?:Record<string,string>;basemap?:boolean;label?:string};
const Kart=lazy(()=>import("./datakart-leaflet"));
export function GeografiDatakart(props:DatakartProps){
 const fallback=<p className="rounded border border-border p-4">Kartet vises når nettleseren har lastet. Les datatabellen og forklaringen under kartet.</p>;
 return <ClientOnly fallback={fallback}><Suspense fallback={fallback}><Kart {...props}/></Suspense></ClientOnly>;
}
