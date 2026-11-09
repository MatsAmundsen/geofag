import { circleMarker } from "leaflet";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { DatakartProps } from "./datakart";
export default function Datakart({data,center,zoom,property="faregrad",colors={},basemap=false,label}:DatakartProps){
 return <MapContainer center={center} zoom={zoom} maxZoom={11} scrollWheelZoom={false} className="h-96 w-full rounded border border-border" aria-label={label??"Supplerende temakart. Samme opplysninger finnes i tabellen."}>
 {basemap?<TileLayer maxZoom={11} url="https://cache.kartverket.no/v1/service?layer=topo&style=default&tilematrixset=webmercator&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={z}&TileCol={x}&TileRow={y}" attribution='© <a href="https://www.kartverket.no/">Kartverket</a>, CC BY 4.0'/>:null}
 <GeoJSON data={data} pointToLayer={(_f,latlng)=>circleMarker(latlng,{radius:7})} style={f=>({color:"#394554",weight:1,fillColor:colors[String(f?.properties?.[property])]??"#a0a0a0",fillOpacity:.65,dashArray:f?.properties?.objekttype==="UtlopOmr"?"5 3":undefined})} onEachFeature={(f,l)=>{const name=String(f.properties?.skredomrnavn??f.properties?.name??f.properties?.navn??"Område"),value=String(f.properties?.[property]??"Mangler data");const label=document.createElement("span");label.textContent=`${name}: ${value}`;l.bindTooltip(label);}}/>
 </MapContainer>;
}
