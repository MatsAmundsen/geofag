/** Egen Gall–Peters-projeksjon. SVG-enheter, ikke kilometer. */
export function gallPeters(lon: number, lat: number): [number, number] {
 const standard = Math.cos(Math.PI / 4);
 return [450 + 190 * lon * Math.PI / 180 * standard, 280 - 190 * Math.sin(lat * Math.PI / 180) / standard];
}
