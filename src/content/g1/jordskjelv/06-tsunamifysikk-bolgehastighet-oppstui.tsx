import { Link } from "@tanstack/react-router";
import { PhotoFigure } from "@/components/photo-figure";

export function TsunamifysikkBolgehastighetOppstui() {
  return (
    <>
      {/* SEKSJON 6: TSUNAMIFYSIKK */}
      <section className="pt-6 space-y-4">
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Tsunamifysikk: Bølgehastighet, oppstuing (shoaling) og Greens lov
        </h2>
        <p>
          En <em>tsunami</em> er ikke en vanlig vindbølge, men en serie gravitasjonelle sjøbølger utløst av en plutselig,
          storskala vertikal forskyvning av vannsøylen. Fordi bølgelengden (λ) typisk er mellom 100 og 300 kilometer,
          oppfyller tsunamier kriteriet for <strong>grunntvannsbølger</strong> (λ ≫ d) selv over de dypeste
          havslettene på 4000 til 6000 meters dyp!
        </p>

        <PhotoFigure
          src="/images/geo-tsunami-shoaling.jpg"
          alt="Tsunami fra dyphavsforplantning i 800 km/t til kystoppstuing (shoaling) og tilbaketrekning"
          heading="Tsunamifysikk: Fra dypvannsbølge til kystoppstuing (shoaling)"
          caption="På 4000 meters dyp beveger tsunamien seg med jetflyfart (v = √(gd) ≈ 700–800 km/t) med en bølgehøyde på under én meter. Når bølgen nærmer seg land og dypet faller, bremser bunnfriksjonen bølgefronten. Energibevaring og Greens lov (H₂ = H₁ · (d₁/d₂)¼) tvinger bølgelengden til å komprimeres og vannet opp i en livsfarlig flodbølge."
          marks={[
            { x: 15, y: 78, n: "1", text: "Vertikalt forkastningssprang", tone: "warm" },
            { x: 38, y: 45, n: "2", text: "Dypvannsbølge (800 km/t)", tone: "cold" },
            { x: 68, y: 55, n: "3", text: "Tilbaketrekning (drawback)", tone: "warm" },
            { x: 84, y: 38, n: "4", text: "Shoaling & oppskylling", tone: "warm" },
          ]}
          points={[
            { n: "1", label: "Havbunnsforskyvning: Megathrust-jordskjelv eller undersjøisk skred løfter momentant kubikkilometere med vannmasser." },
            { n: "2", label: "Dypvannsforplantning: Fart v = √(g·d) ≈ 200 m/s (720 km/t). Bølgen passerer umerkelig under skip på åpent hav." },
            { n: "3", label: "Tilbaketrekning (drawback): Når bølgedalen ankommer først, suges vannet ut fra strendene og tørrlegger havbunnen minutter før bølgetoppen slår inn." },
            { n: "4", label: "Shoaling: Fronten bremses mens hekken raser på med høyere fart; bølgen komprimeres horisontalt og tvinges opp i en massiv vannvegg." },
          ]}
        />

        <div className="space-y-2 text-sm text-muted-foreground pt-2">
          <ul className="list-disc pl-6 space-y-1.5">
            <li>
              <strong className="text-foreground">Fart i dypet (v = √(g · d)):</strong> På 4000 meters dyp
              er farten v = √(9,81 m/s² × 4000 m) ≈ 198 m/s ≈ 713 km/t.
              Tsunamien krysser hele Atlanterhavet på under 7 timer.
            </li>
            <li>
              <strong className="text-foreground">Greens lov og Shoaling (H₂ = H₁ · (d₁ / d₂)¼):</strong> Når
              dypet avtar fra 4000 til 10 meter nær land, synker hastigheten fra 713 km/t til 36 km/t. Bølgehøyden
              ganges med (4000 / 10)^0,25 ≈ 4,5 — eller over 10–20 ganger i trange viker og V-formede fjorder.
            </li>
          </ul>
        </div>

        <h3 className="pt-2 font-display text-xl font-medium tracking-tight text-primary">
          Tsunamirisiko i Norge: Fjellskred fremfor subduksjon
        </h3>
        <p>
          I Stillehavet utløses katastrofale tsunamier av gigantiske megathrust-jordskjelv i subduksjonssoner.
          I Norge er situasjonen en helt annen: Norske tsunamier forårsakes nesten utelukkende av{" "}
          <strong className="text-foreground"> gravitasjonelle skred</strong>!
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Fjellskred i trange fjorder:</strong> Historiske ulykker som Tafjord (1934, 40 døde,
            opptil 62 m flodbølgehøyde) og Loen (1905 og 1936, 135 døde) skyldtes ustabile fjellpartier som raste rett i fjorden.
            I dag overvåker NVE det ustabile partiet <em>Åknes</em> i Storfjorden døgnkontinuerlig.
          </li>
          <li>
            <strong className="text-foreground">Ubåt-skred på sokkelskråningen:</strong> Det gigantiske <em>Storeggaskredet</em> for
            om lag 8150 år siden var et enormt undersjøisk sedimentras på 3000 km³ utenfor Møre. Skredet utløste en
            tsunami med opptil 10–12 meters oppskyllingshøyde langs norskekysten og over 20 meter på Shetland.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Les mer om skredmekanismer, stabilitetsberegninger og overvåking i vårt dedikerte{" "}
          <Link to="/geofag-1/skred" className="font-semibold text-primary underline-offset-4 hover:underline">
            kapittel om skred og massesukkessjon
          </Link>
          .
        </p>
      </section>

    </>
  );
}
