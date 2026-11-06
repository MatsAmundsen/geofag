import { Arrow, C, Diagram, L } from "@/components/diagrams/svg-kit";
import { NAERING_KILDE, NAERING_STRUKTUR } from "@/lib/geografi-naeringsdata";

const format = (n: number) => n.toLocaleString("nb-NO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const navn = ["Primærnæring", "Sekundærnæring", "Tertiærnæring"];
const farger = [C.warm, C.teal, C.cold];

export function GeografiNaeringsstruktur() {
  const x = (ar: number) => 85 + (ar - 1970) / 53 * 615;
  const y = (andel: number) => 330 - andel * 2.7;
  const sum = (andeler: number[], n: number) => andeler.slice(0, n).reduce((a, b) => a + b, 0);
  const siste = NAERING_STRUKTUR.at(-1)!;
  return <div className="space-y-3">
    <Diagram title="Andel sysselsatte i tre næringsgrupper i Norge, utvalgte år 1970–2023, beregnet fra SSB tabell 09174" heading="Figur 9.2 – Næringsstruktur i Norge, 1970–2023"
      caption="Data fra Statistisk sentralbyrå (2026a), tabell 09174, sysselsatte personer: lønnstakere og selvstendige. Norge samlet, ikke bare Fastlands-Norge. Egen gruppering og prosentberegning. Tjenesteyting er beregnet rest. Rette linjer forbinder sju valgte år og viser ikke observerte mellomår."
      viewBox="0 0 1000 410" wide scroll>
      {() => <>
        <L x="85" y="30" size={17}>Andel av sysselsatte, prosent</L>
        {[0, 25, 50, 75, 100].map((v) => <g key={v}><line x1="85" x2="700" y1={y(v)} y2={y(v)} stroke={C.dim} /><L x="72" y={y(v) + 5} anchor="end">{v}</L></g>)}
        {navn.map((label, i) => {
          const points = [...NAERING_STRUKTUR.map((d) => `${x(d.ar)},${y(sum(d.andeler, i + 1))}`), ...NAERING_STRUKTUR.slice().reverse().map((d) => `${x(d.ar)},${y(sum(d.andeler, i))}`)].join(" ");
          return <polygon key={label} points={points} fill={farger[i]} fillOpacity="0.75" stroke={C.bg} strokeWidth="1" />;
        })}
        {NAERING_STRUKTUR.map((d, i) => <g key={d.ar}>
          <line x1={x(d.ar)} x2={x(d.ar)} y1="330" y2="338" stroke={C.fg} />
          <L x={x(d.ar)} y={i === 6 ? 378 : 357} anchor="middle" size={14}>{d.ar}</L>
        </g>)}
        {navn.map((label, i) => {
          const mid = y(sum(siste.andeler, i) + siste.andeler[i] / 2);
          const labelY = [324, 292, 156][i];
          return <g key={label}><path d={`M705 ${mid} L727 ${labelY - 5}`} fill="none" stroke={farger[i]} strokeWidth="2" /><L x="738" y={labelY} fill={farger[i]} size={17} weight={700}>{label}: {format(siste.andeler[i])} %</L></g>;
        })}
      </>}
    </Diagram>
    <p className="text-sm text-muted-foreground">Kilde: <a className="underline" href={NAERING_KILDE.href}>SSB 09174</a>, versjon 28. mai 2026. Data er aggregert og andeler beregnet her. Lisens: <a className="underline" href={NAERING_KILDE.lisens}>CC BY 4.0</a> (SSB, u.å.). <a className="underline" href="/downloads/geografi-naering-ssb09174.csv">Last ned kildeuttrekket som CSV</a>.</p>
    <details className="rounded-lg border border-border p-4">
      <summary className="cursor-pointer font-semibold">Vis antall, andeler og beregningsmåte som tabell</summary>
      <p className="my-3 text-sm">Antall er i tusen personer. Primær: jordbruk, skogbruk og fiske. Sekundær: bergverk og oljeutvinning, industri, kraftforsyning, vann/avløp/renovasjon og bygg/anlegg. Tertiær: total minus primær og sekundær. Prosentandel = gruppe delt på total, ganger hundre. Avrundede andeler kan summere til 99,9 eller 100,1.</p>
      <div className="overflow-x-auto"><table className="w-full text-left text-sm">
        <caption className="py-2 text-left">Norge, utvalgte år 1970–2023. SSB 09174: sysselsatte personer, lønnstakere og selvstendige. Antall i 1000 personer, andeler i prosent.</caption>
        <thead><tr>{["År", "Totalt, tusen", "Primær, tusen", "Sekundær, tusen", "Tertiær, tusen (rest)", "Primær, prosent", "Sekundær, prosent", "Tertiær, prosent"].map((t) => <th key={t} scope="col" className="p-2">{t}</th>)}</tr></thead>
        <tbody>{NAERING_STRUKTUR.map((d) => <tr key={d.ar}><th scope="row" className="p-2">{d.ar}</th>{[d.total, d.primaer, d.sekundaer, d.tertiaer, ...d.andeler].map((v, i) => <td key={i} className="p-2">{format(v)}</td>)}</tr>)}</tbody>
      </table></div>
    </details>
  </div>;
}

function Boks({ x, y, tittel, tekst, farge = C.teal }: { x: number; y: number; tittel: string; tekst: string; farge?: string }) {
  return <g><rect x={x} y={y} width="265" height="85" rx="10" fill={C.bg} stroke={farge} strokeWidth="2" /><L x={x + 132.5} y={y + 32} anchor="middle" size={18} weight={700}>{tittel}</L><L x={x + 132.5} y={y + 62} anchor="middle" size={15}>{tekst}</L></g>;
}

export function GeografiLokaliseringsfaktorer() {
  const faktorer = [["Råvarer og energi", "Hva trengs, og hvor finnes det?"], ["Arbeidskraft", "Hvilken kompetanse trengs?"], ["Marked", "Hvor finnes kundene?"], ["Transport og infrastruktur", "Hva må flyttes og samordnes?"], ["Andre virksomheter", "Hva kan nærhet bety?"], ["Rammer og berørte", "Hvilke hensyn må undersøkes?"]];
  return <Diagram title="Seks spørsmål om lokalisering, uten poeng eller rangering av steder" heading="Figur 9.3 – Hvorfor ligger virksomheten her?" caption="Egen kvalitativ spørsmålsmodell etter Isaksen (2025), med ressurs- og arealperspektivet fra Udir (u.å.). Ingen vekter eller beregnet fasit. Rjukan viser hvorfor blant annet energitilgang må ses sammen med transport, kunnskap og historiske forhold (UNESCO, u.å.; Moe og Thorsnæs, 2026)." viewBox="0 0 900 255" wide scroll>
    {() => <>{faktorer.map(([tittel, tekst], i) => <Boks key={tittel} x={20 + i % 3 * 297} y={25 + Math.floor(i / 3) * 115} tittel={tittel} tekst={tekst} />)}</>}
  </Diagram>;
}

export function GeografiRingvirkninger() {
  return <Diagram title="Leverandørvirkninger, inntektsforbindelser og eksterne belastninger må undersøkes hver for seg" heading="Figur 9.4 – Ulike forbindelser fra en virksomhet" caption="Egen kvalitativ modell etter SSB (2026c) og Onshuus og Idsø (2025). Pilene viser mulige forbindelser, ikke beløp, sikre jobbeffekter eller full samfunnsøkonomisk lønnsomhet. SSBs omtalte leverandøranalyse omfatter ikke alle inntekts- og forbruksvirkninger." viewBox="0 0 920 425" wide scroll>
    {(m) => <>
      <Boks x={20} y={160} tittel="Virksomheten" tekst="Direkte aktivitet" />
      <Boks x={345} y={20} tittel="Innkjøp" tekst="Leverandører og underleverandører" />
      <Boks x={345} y={160} tittel="Lønn og inntekter" tekst="Hvor brukes inntektene videre?" />
      <Boks x={345} y={300} tittel="Eksterne virkninger" tekst="For eksempel støy for naboer" farge={C.warm} />
      {[62, 202, 342].map((yy, i) => <Arrow key={yy} d={`M285 202 L330 ${yy}`} marker={i === 2 ? m.warm : m.teal} color={i === 2 ? C.warm : C.teal} />)}
      <L x="650" y="52" size={16}>Leveranser kan komme</L><L x="650" y="78" size={16}>fra andre regioner og land.</L>
      <L x="650" y="193" size={16}>Forbruk må avgrenses</L><L x="650" y="219" size={16}>særskilt i beregningen.</L>
      <L x="650" y="333" size={16}>Belastninger er ikke</L><L x="650" y="359" size={16}>det samme som jobbtall.</L>
    </>}
  </Diagram>;
}

export function GeografiTelefonVerdikjede() {
  return <Diagram title="Forenklede aktiviteter fra råvare til bruk, reparasjon og gjenvinning, uten antatte leverandørland" heading="Figur 9.5 – En telefon gjennom flere aktiviteter" caption="Egen skjematisk modell etter Rolstadås (2024) og UNEP (2019, 2023). Forenklet, ikke komplett leverandørliste. Ingen telefonmodells faktiske rute, landfordeling, utslipp eller fortjeneste er lagt inn. Utvikling, innkjøp og transport kan knytte flere ledd sammen. Ombruk og gjenvinning er mulige videre veier, ikke en garanti om at alle materialer går i kretsløp." viewBox="0 0 940 390" wide scroll>
    {(m) => <>
      <Boks x={15} y={20} tittel="Råvarer" tekst="Materialer hentes og bearbeides" />
      <Boks x={335} y={20} tittel="Komponenter" tekst="Deler framstilles og samordnes" />
      <Boks x={655} y={20} tittel="Montering" tekst="Delene blir et produkt" />
      <Boks x={655} y={205} tittel="Salg og bruk" tekst="Tjenester følger den fysiske varen" />
      <Boks x={335} y={205} tittel="Reparasjon og ombruk" tekst="Kan gi lengre brukstid" />
      <Boks x={15} y={205} tittel="Gjenvinning" tekst="Noen materialer kan brukes igjen" />
      <Arrow d="M280 62 H320" marker={m.teal} color={C.teal} /><Arrow d="M600 62 H640" marker={m.teal} color={C.teal} />
      <Arrow d="M787 105 V190" marker={m.teal} color={C.teal} /><Arrow d="M655 247 H615" marker={m.teal} color={C.teal} />
      <Arrow d="M468 290 V320 H787 V290" marker={m.warm} color={C.warm} /><L x="630" y="348" anchor="middle" fill={C.warm}>Mulig tilbake til bruk</L>
      <Arrow d="M655 265 L295 370 L147 290" marker={m.teal} color={C.teal} />
      <Arrow d="M147 205 V120" marker={m.teal} color={C.teal} dash="6 5" />
    </>}
  </Diagram>;
}
