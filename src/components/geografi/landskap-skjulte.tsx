import { useId } from "react";

export function GeografiGeirangerFoto() {
  const id = useId();
  return (
    <figure aria-labelledby={id} className="my-8 space-y-3 rounded-xl border p-4">
      <h3 id={id} className="text-xl font-semibold">
        Figur 4.10 – Geirangerfjorden sett ovenfra
      </h3>
      <img
        src="/images/geografi/geirangerfjorden-beck-2025.webp"
        width="1600"
        height="1068"
        loading="lazy"
        className="w-full rounded-lg"
        alt="Smal, grønnblå fjord mellom bratte fjellsider under lave skyer. Fjellsidene går nesten loddrett ned i vannet, og en liten båt lager kjølvann midt i fjorden."
      />
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>
          Se etter de bratte fjordsidene og den smale fjorden. Det er typiske spor etter breerosjon.
        </li>
        <li>
          Bildet viser lite av bosettingen. Gårder og tettsteder må du finne på kartet over (figur
          4.10a).
        </li>
        <li>Åknes ligger ved Sunnylvsfjorden og er ikke med på bildet.</li>
      </ul>
      <figcaption className="text-sm text-muted-foreground">
        Foto: Lukas Beck, 29. juli 2025, Wikimedia Commons, CC BY 4.0. Ifølge Commons er bildet tatt
        fra Ørnesvingen. Nedskalert og konvertert til WebP, ellers uendret (Beck, 2025).
      </figcaption>
    </figure>
  );
}
