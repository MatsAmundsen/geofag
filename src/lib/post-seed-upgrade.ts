/** True when the stored post is the original short stub, not author content. */
export function isShortPlatetektonikkBody(body: string): boolean {
  const text = body.trim();
  if (!text) return true;
  if (text.includes("Jordens dynamiske indre: Litosfære")) return false;
  return (
    text.includes("Rediger denne teksten i redigeringsvisningen") ||
    text.includes("## Jordas lag og hva en plate egentlig er")
  );
}
