import { useState, type ReactNode } from "react";
import {
  M5_DEPTH_M,
  M5_RECEIVER,
  M5_SOURCE,
  constantDepthTimeS,
  greenHeightRatio,
  initialLiftM,
  msToKmh,
  routeThroughWater,
  slideSketch,
  straightCrossesLand,
  travelTimeS,
  townReadout,
  waveSpeedMs,
  wavelengthM,
  type SourceMode,
  type TownAction,
  type TownScenario,
} from "@/lib/tsunami-fysikk";
import { Merke, Skyv, TsunamiRamme, Valg, useTsunamiTid } from "./tsunami-skall";

const NOAA_PROP = "https://www.noaa.gov/jetstream/tsunamis/tsunami-propagation";
const NOAA_SCI = "https://www.noaa.gov/explainers/science-behind-tsunamis";
const NOAA_INN = "https://www.noaa.gov/jetstream/tsunamis/tsunami-inundation";
const NOAA_WARN = "https://www.noaa.gov/jetstream/tsunamis/detection-warning-and-forecasting";

function Scene({ label, children, tall }: { label: string; children: ReactNode; tall?: boolean }) {
  return (
    <svg viewBox={tall ? "0 0 360 420" : "0 0 640 280"} className="h-auto w-full" role="img" aria-label={label}>
      <rect width="100%" height="100%" fill="var(--color-card)" />
      {children}
    </svg>
  );
}

export function TsunamiM1() {
  const tid = useTsunamiTid();
  const [mode, setMode] = useState<SourceMode>("loddrett");
  const [meter, setMeter] = useState(4);
  const [bredde, setBredde] = useState(80);
  const lift = initialLiftM(mode, meter);
  const phase = tid.tid;
  const bend = phase < 0.45 ? phase / 0.45 : 1;
  const released = phase > 0.55;
  const wave = released ? (phase - 0.55) / 0.45 : 0;
  const liftPx = lift * 4 * (released ? 1 : bend);
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M1"
      title="Havbunnen flytter vannet"
      lead="Sammenlign loddrett løft med sidebevegelse. Samme skala, to utfall."
      kildeHref={NOAA_SCI}
      antakelser="Skjematisk snitt. Ren sidebevegelse løfter ikke vannflaten i denne modellen. Ingen omregning fra magnitude til bølgehøyde."
      konklusjon={
        lift > 0
          ? `Løftet på ${lift} m setter i gang en bølge som brer seg ut når låsen ryker.`
          : "Sidebevegelse flytter berget, men gir ikke et løft av vannflaten her."
      }
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={tid.reset}
      onTid={tid.setTid}
      controls={
        <>
          <Valg
            label="Kilde"
            value={mode}
            onChange={(id) => setMode(id as SourceMode)}
            options={[
              { id: "loddrett", label: "Loddrett løft" },
              { id: "sidelengs", label: "Mest sidelengs" },
            ]}
          />
          <Skyv label="Forskyvning" min={1} max={8} step={1} value={meter} unit="m" onChange={setMeter} />
          <Skyv label="Bredde på sonen" min={40} max={140} step={10} value={bredde} unit="skala" onChange={setBredde} />
        </>
      }
      scene={
        <Scene tall={tid.narrow} label="Snitt av havbunn og vannflate">
          <rect x="0" y="150" width="640" height="130" fill="var(--color-primary)" opacity="0.25" />
          <path
            d={`M 40 150 C ${220 - bredde} ${150 - liftPx}, ${420 + bredde * 0.2} ${150 - liftPx}, 600 150`}
            fill="none"
            stroke="var(--color-foreground)"
            strokeWidth="3"
          />
          <rect x={320 - bredde} y={190 + (mode === "sidelengs" ? 0 : -liftPx)} width={bredde * 2} height="40" fill="var(--color-muted-foreground)" opacity="0.7" />
          {wave > 0 && lift > 0 ? (
            <circle cx={80 + wave * 480} cy={150 - liftPx * 0.4} r="7" fill="var(--color-lava)" />
          ) : null}
          <text x="24" y="28" fill="var(--color-foreground)" fontSize="16">
            {mode === "loddrett" ? "A loddrett" : "B sidelengs"}
          </text>
        </Scene>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Vannflate, start</dt>
          <dd>{lift} m, modell</dd>
          <dt>Forløp</dt>
          <dd>{Math.round(phase * 100)} %</dd>
        </dl>
      }
    />
  );
}

export function TsunamiM2() {
  const tid = useTsunamiTid();
  const [depth, setDepth] = useState(4000);
  const [periodMin, setPeriodMin] = useState(20);
  const [green, setGreen] = useState(false);
  const [profile, setProfile] = useState<"dypt" | "grunnere">("grunnere");
  const periodS = periodMin * 60;
  const deepSpeed = waveSpeedMs(depth);
  const segments =
    profile === "dypt"
      ? [depth, depth, depth, depth].map((d) => ({ lengthM: 100_000, depthM: d }))
      : [depth, Math.max(40, depth / 4), Math.max(40, depth / 20), 40].map((d) => ({
          lengthM: 100_000,
          depthM: d,
        }));
  const seconds = travelTimeS(segments);
  const speed = waveSpeedMs(segments[Math.min(3, Math.floor(tid.tid * 4))]!.depthM);
  const lambdaKm = wavelengthM(deepSpeed, periodS) / 1000;
  const coastRatio = greenHeightRatio(depth, 40);
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M2"
      title="Bølgelaboratoriet"
      lead="Endre dyp og periode. Fart, bølgelengde og gangtid følger med."
      kildeHref={NOAA_PROP}
      antakelser="Langbølgeformelen v = √(g d) med g = 9,8 m/s². Den gjelder ikke i selve skrednedslaget. Grunning vises kvalitativt."
      konklusjon={`På ${depth} m er farten ${msToKmh(deepSpeed).toFixed(0)} km/t. Over profilet bruker bølgen ${Math.round(seconds / 60)} min.`}
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={tid.reset}
      onTid={tid.setTid}
      controls={
        <>
          <Skyv label="Dyp" min={50} max={6000} step={50} value={depth} unit="m" onChange={setDepth} />
          <Skyv label="Periode" min={5} max={40} step={1} value={periodMin} unit="min" onChange={setPeriodMin} />
          <Valg
            label="Profil"
            value={profile}
            onChange={(id) => setProfile(id as "dypt" | "grunnere")}
            options={[
              { id: "dypt", label: "A jevnt dyp" },
              { id: "grunnere", label: "B inn mot grunt vann" },
            ]}
          />
          <button type="button" className="min-h-11 rounded-md border border-border px-3 text-sm" aria-pressed={green} onClick={() => setGreen((v) => !v)}>
            {green ? "Skjul Green-tilnærming" : "Vis Green-tilnærming"}
          </button>
        </>
      }
      scene={
        <Scene tall={tid.narrow} label="To havbunnsprofiler og en bølgetopp">
          {segments.map((segment, index) => (
            <rect
              key={index}
              x={40 + index * 140}
              y={220 - Math.min(160, segment.depthM / 40)}
              width="120"
              height={Math.min(160, segment.depthM / 40)}
              fill="var(--color-primary)"
              opacity={0.35 + index * 0.1}
            />
          ))}
          <circle cx={70 + tid.tid * 500} cy="70" r="8" fill="var(--color-lava)" />
          <text x="24" y="28" fill="var(--color-foreground)" fontSize="16">
            {profile === "dypt" ? "A" : "B"} · {msToKmh(speed).toFixed(0)} km/t her
          </text>
        </Scene>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Fart på valgt dyp</dt>
          <dd>
            {deepSpeed.toFixed(0)} m/s ({msToKmh(deepSpeed).toFixed(0)} km/t)
          </dd>
          <dt>Bølgelengde</dt>
          <dd>{lambdaKm.toFixed(0)} km</dd>
          <dt>Gangtid</dt>
          <dd>{Math.round(seconds / 60)} min</dd>
          <dt>Green, merket tilnærming</dt>
          <dd>{green ? `${coastRatio.toFixed(2)} ganger mot 40 m. Ikke oppskylling.` : "av"}</dd>
        </dl>
      }
    />
  );
}

const COASTS = {
  flat: { runup: 3, depth: 1, reach: 400, label: "slak kyst" },
  bratt: { runup: 8, depth: 2, reach: 60, label: "bratt kyst" },
} as const;

export function TsunamiM3() {
  const tid = useTsunamiTid();
  const [coast, setCoast] = useState<keyof typeof COASTS>("flat");
  const [point, setPoint] = useState(0);
  const scene = COASTS[coast];
  const names = ["ute i vannet", "i vannkanten", "på land"];
  const values = [`1,2 m bølgehøyde`, `${scene.runup} m oppskylling`, `${scene.depth} m vanndyp, ${scene.reach} m inn`];
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M3"
      title="Fire ulike høyder"
      lead="Samme illustrerte bølge ute, to kyster. Tallene er ikke en faresone."
      kildeHref={NOAA_INN}
      antakelser="Forhåndsvalgte illustrasjoner, ikke regnet ut fra bølgehøyde ganger en faktor. Ikke Tafjord-målinger."
      konklusjon={`På ${names[point]} leser du ${values[point]}. ${scene.label} har en annen oppskylling enn den andre kysten, med samme bølge ute.`}
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={() => {
        tid.reset();
        setPoint(0);
      }}
      onTid={(next) => {
        tid.setTid(next);
        setPoint(next < 0.34 ? 0 : next < 0.67 ? 1 : 2);
      }}
      controls={
        <>
          <Merke />
          <Valg
            label="Kyst"
            value={coast}
            onChange={(id) => setCoast(id as keyof typeof COASTS)}
            options={[
              { id: "flat", label: "A slak" },
              { id: "bratt", label: "B bratt" },
            ]}
          />
          <Valg
            label="Målepunkt"
            value={String(point)}
            onChange={(id) => setPoint(Number(id))}
            options={[
              { id: "0", label: "Ute" },
              { id: "1", label: "Kant" },
              { id: "2", label: "Land" },
            ]}
          />
        </>
      }
      scene={
        <Scene tall={tid.narrow} label="Målepunkter for bølgehøyde, oppskylling og inntrenging">
          <path d={coast === "flat" ? "M 0 180 L 420 180 L 640 230" : "M 0 180 L 460 180 L 560 80 L 640 80"} fill="var(--color-muted)" />
          <rect x="0" y="120" width="460" height="60" fill="var(--color-primary)" opacity="0.35" />
          {[80, 430, 560].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy={index === 2 ? 150 : 150} r={point === index ? 10 : 6} fill={point === index ? "var(--color-lava)" : "var(--color-foreground)"} />
              <text x={x - 16} y="40" fill="var(--color-foreground)" fontSize="14">
                {index + 1}
              </text>
            </g>
          ))}
        </Scene>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Bølgehøyde ute</dt>
          <dd>1,2 m, illustrasjon</dd>
          <dt>Oppskylling</dt>
          <dd>{scene.runup} m, illustrasjon</dd>
          <dt>Vanndyp på land</dt>
          <dd>{scene.depth} m</dd>
          <dt>Inntrenging</dt>
          <dd>{scene.reach} m</dd>
        </dl>
      }
    />
  );
}

export function TsunamiM4() {
  const tid = useTsunamiTid();
  const [above, setAbove] = useState(true);
  const [volume, setVolume] = useState<"liten" | "stor">("stor");
  const [tempo, setTempo] = useState<"langsom" | "rask">("rask");
  const sketch = slideSketch({ above, volume, tempo });
  const other = slideSketch({ above, volume, tempo: tempo === "rask" ? "langsom" : "rask" });
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M4"
      title="Skred i en stilisert fjord"
      lead="Likt volum er ikke samme forløp. Kurven er ikke meter og ikke Tafjord."
      kildeHref={NOAA_SCI}
      antakelser="Generisk fjord. Amplitude er en illustrativ indeks fra 0 til 1. Langbølgeformelen brukes ikke som fasit i nedslaget."
      konklusjon={`Nær bredden er indeksen ${sketch.near.toFixed(2)}. Det andre tempoet gir ${other.near.toFixed(2)} med samme volum.`}
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={tid.reset}
      onTid={tid.setTid}
      controls={
        <>
          <Merke />
          <Valg
            label="Skred"
            value={above ? "over" : "under"}
            onChange={(id) => setAbove(id === "over")}
            options={[
              { id: "over", label: "Over vann" },
              { id: "under", label: "Under vann" },
            ]}
          />
          <Valg
            label="Volum"
            value={volume}
            onChange={(id) => setVolume(id as "liten" | "stor")}
            options={[
              { id: "liten", label: "Lite" },
              { id: "stor", label: "Stort" },
            ]}
          />
          <Valg
            label="Tempo"
            value={tempo}
            onChange={(id) => setTempo(id as "langsom" | "rask")}
            options={[
              { id: "langsom", label: "Langsomt" },
              { id: "rask", label: "Raskt" },
            ]}
          />
        </>
      }
      scene={
        <Scene tall={tid.narrow} label="Stilisert fjord med bølger på begge bredder">
          <path d="M 40 40 L 80 240 L 560 240 L 600 40" fill="var(--color-primary)" opacity="0.3" />
          <rect x="70" y={above ? 70 : 150} width="36" height="50" fill="var(--color-muted-foreground)" />
          {Array.from({ length: sketch.waves }, (_, index) => (
            <circle
              key={index}
              cx={140 + ((tid.tid + index / sketch.waves) % 1) * 360}
              cy={200 - sketch.near * 40}
              r={6 + sketch.near * 8}
              fill="none"
              stroke="var(--color-foreground)"
              strokeDasharray={index === 0 ? "0" : "4 3"}
            />
          ))}
        </Scene>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Indeks nær</dt>
          <dd>{sketch.near.toFixed(2)}</dd>
          <dt>Indeks motstående bredd</dt>
          <dd>{sketch.far.toFixed(2)}</dd>
          <dt>Bølger i serien</dt>
          <dd>{sketch.waves}</dd>
          <dt>Sammenligning</dt>
          <dd>samme volum, annet tempo: {other.near.toFixed(2)}</dd>
        </dl>
      }
    />
  );
}

export function TsunamiM5() {
  const tid = useTsunamiTid();
  const route = routeThroughWater(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER);
  const naive = constantDepthTimeS(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER, 4000);
  const crosses = straightCrossesLand(M5_DEPTH_M, M5_SOURCE, M5_RECEIVER);
  const showRoute = tid.tid > 0.45;
  const cell = tid.narrow ? 36 : 28;
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M5"
      title="Ankomsttid"
      lead="Konstant dyp gir en sirkel. Land og grunt vann gjør ruten lengre. Ingen bølgehøyde."
      kildeHref={NOAA_PROP}
      antakelser="Idealisert rutenett. 200 km er valgt cellestørrelse. Historiske kart er ikke tegnet inn som beregning."
      konklusjon={
        crosses
          ? `Den rette linjen krysser land og tar ${Math.round(naive / 60)} min på 4000 m. Ruten rundt tar ${Math.round((route?.seconds ?? 0) / 60)} min.`
          : "Ruten går i vann."
      }
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={tid.reset}
      onTid={tid.setTid}
      controls={<p className="text-sm">Kilde til venstre, mottaker til høyre. Tidslinjen bytter fra sirkel til dybderute.</p>}
      scene={
        <svg viewBox={`0 0 ${8 * cell + 16} ${6 * cell + 16}`} className="h-auto w-full max-w-xl" role="img" aria-label="Idealisert hav med landmaske">
          {M5_DEPTH_M.map((row, r) =>
            row.map((depth, c) => (
              <rect
                key={`${r}-${c}`}
                x={8 + c * cell}
                y={8 + r * cell}
                width={cell - 2}
                height={cell - 2}
                fill={depth === 0 ? "var(--color-muted-foreground)" : "var(--color-primary)"}
                opacity={depth === 0 ? 0.85 : 0.2 + Math.min(0.6, depth / 8000)}
              />
            )),
          )}
          {showRoute
            ? route?.cells.map((p) => (
                <circle key={`${p.row}-${p.col}`} cx={8 + p.col * cell + cell / 2} cy={8 + p.row * cell + cell / 2} r="4" fill="var(--color-lava)" />
              ))
            : (
              <line
                x1={8 + cell / 2}
                y1={8 + 2 * cell + cell / 2}
                x2={8 + 7 * cell + cell / 2}
                y2={8 + 2 * cell + cell / 2}
                stroke="var(--color-foreground)"
                strokeDasharray="5 4"
              />
            )}
        </svg>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Sirkel, 4000 m</dt>
          <dd>{Math.round(naive / 60)} min</dd>
          <dt>Rute i vann</dt>
          <dd>{Math.round((route?.seconds ?? 0) / 60)} min</dd>
          <dt>Krysser linjen land?</dt>
          <dd>{crosses ? "ja" : "nei"}</dd>
          <dt>Amplitude</dt>
          <dd>ikke beregnet</dd>
        </dl>
      }
    />
  );
}

const NEAR = [
  { t: 0, label: "Skjelv registrert" },
  { t: 0.15, label: "Mulig varsel" },
  { t: 0.35, label: "Bølge ved kysten" },
  { t: 0.55, label: "Bølge bekreftet" },
  { t: 0.8, label: "Avblåsing" },
];
const FAR = [
  { t: 0, label: "Skjelv registrert" },
  { t: 0.12, label: "Mulig varsel" },
  { t: 0.35, label: "Bølge bekreftet" },
  { t: 0.7, label: "Bølge ved kysten" },
  { t: 0.9, label: "Avblåsing" },
];

export function TsunamiM6() {
  const tid = useTsunamiTid();
  const [near, setNear] = useState(true);
  const [wait, setWait] = useState(true);
  const steps = near ? NEAR : FAR;
  const arrived = steps.find((step) => step.label.startsWith("Bølge ved"));
  const confirmed = steps.find((step) => step.label.startsWith("Bølge bekreftet"));
  const late = near && wait && (arrived?.t ?? 1) < (confirmed?.t ?? 0);
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M6"
      title="Varslingskjeden"
      lead="Nær kilde kan bølgen komme før bekreftelsen. Første melding kan likevel gå ut fra seismikken. Tidene er valgte øvelsestider."
      kildeHref={NOAA_WARN}
      antakelser="Ikke et norsk varslingssystem og ikke amerikanske faregrader. Forsinkelsen er valgt for øvelsen."
      konklusjon={
        late
          ? "Hvis du venter på bekreftelse nær kilden, er bølgen allerede inne. Bruk naturlige tegn."
          : near
            ? "Nær kilden er tiden kort selv om du ikke venter."
            : "Langt unna rekker bekreftelsen å komme før bølgen."
      }
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={tid.reset}
      onTid={tid.setTid}
      controls={
        <>
          <Valg
            label="Kilde"
            value={near ? "naer" : "fjern"}
            onChange={(id) => setNear(id === "naer")}
            options={[
              { id: "naer", label: "Nær" },
              { id: "fjern", label: "Fjern" },
            ]}
          />
          <Valg
            label="Handling"
            value={wait ? "vent" : "gaa"}
            onChange={(id) => setWait(id === "vent")}
            options={[
              { id: "vent", label: "Vent på bekreftelse" },
              { id: "gaa", label: "Gå ved kraftig skjelv" },
            ]}
          />
        </>
      }
      scene={
        <ol className="space-y-2">
          {steps.map((step) => (
            <li key={step.label} className="flex items-center gap-3 text-sm">
              <span className="inline-block size-3 rounded-full border border-foreground" style={{ background: tid.tid >= step.t ? "var(--color-primary)" : "transparent" }} />
              <span className={tid.tid >= step.t ? "font-medium" : ""}>{step.label}</span>
            </li>
          ))}
        </ol>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Type</dt>
          <dd>{near ? "nærkilde" : "fjernkilde"}</dd>
          <dt>Venter på bekreftelse</dt>
          <dd>{wait ? "ja" : "nei"}</dd>
          <dt>For sent i øvelsen</dt>
          <dd>{late ? "ja" : "nei"}</dd>
        </dl>
      }
    />
  );
}

export function TsunamiM7() {
  const tid = useTsunamiTid();
  const [scenario, setScenario] = useState<TownScenario>("liten");
  const [action, setAction] = useState<TownAction>("ingen");
  const before = townReadout(scenario, "ingen");
  const after = townReadout(scenario, action);
  return (
    <TsunamiRamme
      nodeRef={tid.ref}
      kicker="M7"
      title="Risikoverksted"
      lead="Et generisk fjordtettsted. Du flytter en skole eller merker en rute. Ingen dødstall."
      kildeHref="https://www.nve.no/naturfare/overvaking-og-varsling/fjellskredovervaaking/kontinuerlig-overvaakede-fjellpartier/aaknes/"
      antakelser="Ikke NVEs faresoner. To valgte øvelsesscenarioer. Modellen sier hvilket ledd i risikoen tiltaket treffer, ikke hvor trygt det er."
      konklusjon={
        after.changed === "ingen"
          ? `${after.exposed} objekter ligger i sonen. Velg et tiltak og se hvilket ledd som endres.`
          : `Tiltaket treffer ${after.changed}. Før: ${before.exposed} objekter. Etter: ${after.exposed}.`
      }
      tid={tid.tid}
      playing={tid.playing}
      reduced={tid.reduced}
      onToggle={tid.toggle}
      onReset={() => {
        tid.reset();
        setAction("ingen");
      }}
      onTid={tid.setTid}
      controls={
        <>
          <Merke />
          <Valg
            label="Øvelsesscenario"
            value={scenario}
            onChange={(id) => setScenario(id as TownScenario)}
            options={[
              { id: "liten", label: "Liten sone" },
              { id: "stor", label: "Stor sone" },
            ]}
          />
          <Valg
            label="Tiltak"
            value={action}
            onChange={(id) => setAction(id as TownAction)}
            options={[
              { id: "ingen", label: "Ingen" },
              { id: "flytt-skole", label: "Flytt skolen" },
              { id: "tydelig-rute", label: "Tydelig rute" },
              { id: "ikke-bygg", label: "Ikke bygg mer i sonen" },
            ]}
          />
        </>
      }
      scene={
        <Scene tall={tid.narrow} label="Generisk tettsted ved en fjord">
          <rect x="0" y="190" width="640" height="90" fill="var(--color-primary)" opacity="0.3" />
          <rect x="40" y="150" width={scenario === "stor" ? 420 : 220} height="40" fill="var(--color-lava)" opacity="0.35" />
          {Array.from({ length: 6 }, (_, index) => (
            <rect key={index} x={60 + index * 60} y="120" width="28" height="28" fill="var(--color-foreground)" opacity={index < (scenario === "stor" ? 6 : 3) ? 1 : 0.35} />
          ))}
          <rect x={after.schoolExposed ? 300 : 520} y="80" width="40" height="30" fill="var(--color-primary)" />
          {after.routeMarked ? <path d="M 320 100 L 560 70" stroke="var(--color-foreground)" strokeDasharray="6 4" fill="none" /> : null}
          <text x="24" y="28" fill="var(--color-foreground)" fontSize="16">
            {scenario === "stor" ? "Stor sone" : "Liten sone"}
          </text>
        </Scene>
      }
      tall={
        <dl className="grid grid-cols-2 gap-2">
          <dt>Objekter i sonen</dt>
          <dd>{after.exposed}</dd>
          <dt>Skole i sonen</dt>
          <dd>{after.schoolExposed ? "ja" : "nei"}</dd>
          <dt>Ledd som endres</dt>
          <dd>{after.changed}</dd>
          <dt>Mangler</dt>
          <dd>reell rute, mennesker, bølgehøyde</dd>
        </dl>
      }
    />
  );
}
