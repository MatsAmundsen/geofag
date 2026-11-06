/** Egen sfærisk modell, ingen avledet kartgrafikk. Vinkler inn i grader. */
export function gallPeters(lon: number, lat: number): [number, number] {
  const rad = Math.PI / 180;
  return [lon * rad * Math.SQRT1_2, Math.sin(lat * rad) / Math.SQRT1_2];
}
export function tissotSkala(lat: number) {
  const parallell = Math.SQRT1_2 / Math.cos(lat * Math.PI / 180);
  return { parallell, meridian: 1 / parallell };
}
