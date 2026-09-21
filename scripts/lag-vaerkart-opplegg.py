#!/usr/bin/env python3
"""Bygg redigerbar Word-fil: værkartfelt på Sognsvann."""

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn, nsmap
from docx.shared import Cm, Pt, RGBColor

OUT = "/workspace/opplegg/vaerkart-sognsvann.docx"

NAVY = RGBColor(0x1B, 0x3A, 0x4B)
TEAL = RGBColor(0x1F, 0x6F, 0x6A)
INK = RGBColor(0x1A, 0x1A, 0x1A)
MUTED = RGBColor(0x4A, 0x55, 0x5A)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
HEADER_BG = "1B3A4B"
ZEBRA = "F4F7F7"
LINE = "D5DEDE"


def set_run_font(run, name="Calibri", size=11, bold=False, color=INK, italic=False):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color


def shade_cell(cell, hex_color):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), hex_color)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_border(cell):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), "4")
        el.set(qn("w:space"), "0")
        el.set(qn("w:color"), LINE)
        tcBorders.append(el)
    tcPr.append(tcBorders)


def set_cell_margins(cell, margin=80):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = OxmlElement("w:tcMar")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:w"), str(margin))
        el.set(qn("w:type"), "dxa")
        tcMar.append(el)
    tcPr.append(tcMar)


def prevent_row_split(row):
    tr = row._tr
    trPr = tr.get_or_add_trPr()
    cant = OxmlElement("w:cantSplit")
    trPr.append(cant)


def write_cell(cell, text, bold=False, color=INK, size=10.5, center=False, fill=None):
    cell.text = ""
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER if center else WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.08
    run = p.add_run(text)
    set_run_font(run, size=size, bold=bold, color=color)
    set_cell_border(cell)
    set_cell_margins(cell)
    if fill:
        shade_cell(cell, fill)


def set_row_height(row, cm):
    tr = row._tr
    trPr = tr.get_or_add_trPr()
    trHeight = OxmlElement("w:trHeight")
    trHeight.set(qn("w:val"), str(int(cm * 567)))
    trHeight.set(qn("w:hRule"), "atLeast")
    trPr.append(trHeight)


def add_table(doc, headers, rows, col_widths, row_cm=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    tbl = table._tbl
    tblPr = tbl.tblPr if tbl.tblPr is not None else OxmlElement("w:tblPr")
    tblW = OxmlElement("w:tblW")
    tblW.set(qn("w:w"), str(int(sum(col_widths) * 567)))
    tblW.set(qn("w:type"), "dxa")
    tblPr.append(tblW)
    layout = OxmlElement("w:tblLayout")
    layout.set(qn("w:type"), "fixed")
    tblPr.append(layout)

    for i, header in enumerate(headers):
        write_cell(table.rows[0].cells[i], header, bold=True, color=WHITE, size=10.5, fill=HEADER_BG)
        table.rows[0].cells[i].width = Cm(col_widths[i])
    prevent_row_split(table.rows[0])

    for r, row in enumerate(rows):
        fill = ZEBRA if r % 2 == 1 else "FFFFFF"
        for c, value in enumerate(row):
            write_cell(table.rows[r + 1].cells[c], value, size=10.5, fill=fill)
            table.rows[r + 1].cells[c].width = Cm(col_widths[c])
        prevent_row_split(table.rows[r + 1])
        if row_cm:
            set_row_height(table.rows[r + 1], row_cm)

    doc.add_paragraph()
    return table


def add_heading_styled(doc, text, level):
    p = doc.add_heading(text, level=level)
    for run in p.runs:
        set_run_font(run, size=16 if level == 1 else 13, bold=True, color=NAVY if level == 1 else TEAL)
    p.paragraph_format.space_before = Pt(16 if level == 1 else 12)
    p.paragraph_format.space_after = Pt(6)
    return p


def add_body(doc, text, bold=False, italic=False, space_after=8):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    set_run_font(run, size=11, bold=bold, italic=italic)
    return p


def add_rich(doc, parts, space_after=8):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    for text, bold, italic in parts:
        run = p.add_run(text)
        set_run_font(run, size=11, bold=bold, italic=italic)
    return p


def add_bullet(doc, text, bold_lead=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.12
    if bold_lead:
        r1 = p.add_run(bold_lead)
        set_run_font(r1, size=11, bold=True)
        r2 = p.add_run(text)
        set_run_font(r2, size=11)
    else:
        r = p.add_run(text)
        set_run_font(r, size=11)
    return p


def add_numbered(doc, n, text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(0.75)
    p.paragraph_format.first_line_indent = Cm(-0.75)
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.12
    lead = p.add_run(f"{n}.  ")
    set_run_font(lead, size=11, bold=True, color=TEAL)
    r = p.add_run(text)
    set_run_font(r, size=11)
    return p


def set_doc_defaults(doc):
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(11)
    normal.font.color.rgb = INK
    normal._element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    lang = OxmlElement("w:lang")
    lang.set(qn("w:val"), "nb-NO")
    lang.set(qn("w:eastAsia"), "nb-NO")
    normal._element.rPr.append(lang)
    pf = normal.paragraph_format
    pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    pf.line_spacing = 1.15

    for style_name in ("List Bullet", "List Number"):
        style = doc.styles[style_name]
        style.font.name = "Calibri"
        style.font.size = Pt(11)
        style.font.color.rgb = INK

    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(2.0)
    section.right_margin = Cm(2.0)
    section.top_margin = Cm(1.8)
    section.bottom_margin = Cm(1.8)
    section.header_distance = Cm(0.6)
    section.footer_distance = Cm(0.5)

    header = section.header
    header.is_linked_to_previous = False
    hp = header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r = hp.add_run("Geofag 2  ·  Feltarbeid  ·  Sognsvann")
    set_run_font(r, size=9, color=TEAL, bold=True)
    hp.paragraph_format.space_after = Pt(2)

    # header line
    pPr = hp._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "8")
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), "1F6F6A")
    pBdr.append(bottom)
    pPr.append(pBdr)

    footer = section.footer
    footer.is_linked_to_previous = False
    fp = footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r1 = fp.add_run("Værkartet den dagen  ·  side ")
    set_run_font(r1, size=9, color=MUTED)
    add_page_number(fp)


def add_page_number(paragraph):
    run = paragraph.add_run()
    set_run_font(run, size=9, color=MUTED)
    fld_begin = OxmlElement("w:fldChar")
    fld_begin.set(qn("w:fldCharType"), "begin")
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = " PAGE "
    fld_end = OxmlElement("w:fldChar")
    fld_end.set(qn("w:fldCharType"), "end")
    run._r.append(fld_begin)
    run._r.append(instr)
    run._r.append(fld_end)


def build():
    doc = Document()
    set_doc_defaults(doc)

    title = doc.add_paragraph()
    title.paragraph_format.space_before = Pt(4)
    title.paragraph_format.space_after = Pt(2)
    r = title.add_run("Værkartet den dagen")
    set_run_font(r, size=26, bold=True, color=NAVY)

    sub = doc.add_paragraph()
    sub.paragraph_format.space_before = Pt(0)
    sub.paragraph_format.space_after = Pt(8)
    r = sub.add_run("Feltarbeid på Sognsvann  ·  flere grupper samtidig")
    set_run_font(r, size=13, color=TEAL)

    add_body(
        doc,
        "Gruppene går samme runde rundt vannet og starter på hver sin post. "
        "Da står det bare én gruppe om gangen ved hver av de tre værstasjonene. "
        "Runden er grusstien rundt Sognsvann, om lag 3,3 km, og tar omtrent en time når stoppene er regnet med.",
    )

    add_heading_styled(doc, "Mål og utstyr", 1)
    add_body(doc, "Kompetansemålene oppgaven treffer:", space_after=4)
    add_bullet(
        doc,
        "Gjøre rede for hvordan ulike værsystemer oppstår og utvikler seg på global, regional og lokal skala, og tolke ulike værkart og værutvikling.",
    )
    add_bullet(
        doc,
        "Gjennomføre geofaglig feltarbeid knyttet til atmosfæren, bearbeide og tolke de innsamlede dataene og presentere resultatene.",
    )
    add_body(doc, "Utstyr til hele klassen:", space_after=4)
    add_bullet(doc, "Tre værstasjoner. De blir stående fast på post A, B og D.")
    add_bullet(doc, "Kompass, eller telefon med kompass, og en stoffstrimmel til post C.")
    add_bullet(
        doc,
        "iPhone 6 eller nyere, med en barometer-app som viser lufttrykk i hPa. Appen installeres og prøves i klasserommet før dagen.",
    )
    add_bullet(doc, "Feltbok eller tabellen bakerst i dette dokumentet.")
    add_bullet(doc, "Noe som viser posten for neste gruppe: sekk, kjegle eller jakke.")

    add_heading_styled(doc, "Løypa", 1)
    add_body(
        doc,
        "Alle går med klokka, med vannet på høyre hånd. Hver gruppe besøker alle fire postene og stopper når den er tilbake der den startet.",
    )
    add_table(
        doc,
        ["Post", "Sted", "Utstyr", "Hva stedet tester"],
        [
            [
                "A",
                "Badeplassen i sør. På gresset ved hovedbrygga, ikke ute på brygga.",
                "Værstasjon 1",
                "Åpent. Denne posten skal ligne mest på værkartet.",
            ],
            [
                "B",
                "Midt på vestsida, der stien ligger tett mellom vannet og skråningen opp mot Vettakollen.",
                "Værstasjon 2",
                "Le for vestavind. Skogen bremser.",
            ],
            [
                "C",
                "Nordenden, der Pinabekken renner ut i vannet.",
                "Ingen stasjon. Kompass og stoffstrimmel.",
                "Trangt og skogkledd.",
            ],
            [
                "D",
                "Østsida, der stien mot Svartkulp tar av fra runden.",
                "Værstasjon 3",
                "Mer åpent drag østover.",
            ],
        ],
        [1.6, 6.2, 3.6, 5.3],
    )

    add_heading_styled(doc, "Grupper og start", 1)
    add_body(doc, "Fire grupper starter samtidig, på fire ulike poster.")
    add_table(
        doc,
        ["Gruppe", "Startpost", "Veien dit fra T-banen, uten å måle"],
        [
            ["1", "A", "Blir ved badeplassen."],
            ["2", "B", "Går vestsida til midten, under Vettakollen."],
            ["3", "C", "Går vestsida helt til Pinabekken i nordenden."],
            ["4", "D", "Går østsida til der stien mot Svartkulp tar av."],
        ],
        [2.5, 3.0, 11.2],
    )
    add_body(
        doc,
        "Målingene starter på et avtalt minutt, når alle gruppene er framme. På veien ut til startposten skriver de ingenting i tabellen.",
    )
    add_body(
        doc,
        "Har klassen fem eller seks grupper, venter de ekstra i ti minutter ved T-banen. Gruppe 5 følger ruta til gruppe 1. Gruppe 6 følger ruta til gruppe 2.",
    )

    add_heading_styled(doc, "Stasjonene", 1)
    add_body(
        doc,
        "Læreren setter ut de tre værstasjonene før start og henter dem inn etterpå. De blir stående, så alle gruppene leser av det samme instrumentet på samme sted.",
    )
    add_body(
        doc,
        "Én elev er vakt ved hver stasjon. Vakta passer instrumentet og sørger for at bare én gruppe leser av om gangen. Når egen gruppe har gått runden og er tilbake, bytter vakta, så alle får gått.",
    )

    add_heading_styled(doc, "Før dere går", 1)
    add_body(
        doc,
        "Ta et skjermbilde av et analysenkart med isobarer, høytrykk, lavtrykk og fronter for samme formiddag. Yr sitt vindkart for Oslo brukes som kontroll etterpå. Det er ikke svaret dere skriver av før dere går.",
    )
    add_body(doc, "På kartet skal hver gruppe skrive tre ting før de ser vindpilen på Yr:", space_after=4)
    add_numbered(doc, 1, "Hvor lavtrykket og høytrykket ligger i forhold til Oslo.")
    add_numbered(
        doc,
        2,
        "Hvilken vindretning det gir over Oslo. På nordlig halvkule går vinden omtrent langs isobarene, med lavtrykk til venstre. Rundt et lavtrykk betyr det mot klokka.",
    )
    add_numbered(doc, 3, "Om isobarene er tette eller glisne, og dermed om dere venter sterk eller svak vind.")
    add_body(
        doc,
        "Skriv også skydekke og nedbør dere venter hvis en front ligger nær Oslo. En varmfront gir jevn nedbør. En kaldfront gir byger.",
        space_after=8,
    )
    add_rich(
        doc,
        [
            ("Hypotese, felles for klassen, skrives ferdig før avgang. ", True, False),
            (
                "Vindretningen på post A er den samme som værkartet gir for Oslo, innenfor ett kompass-strekk. På B og C er vinden svakere fordi skogen står i veien.",
                False,
                True,
            ),
        ],
    )

    add_heading_styled(doc, "På hver post", 1)
    add_body(
        doc,
        "Gruppen stiller seg ved siden av stien, ikke midt i løypa. Løpere bruker grusen. Mål i åtte minutter, og gå videre. Er posten opptatt, vent ti meter unna til den er fri. To grupper måler ikke samtidig.",
    )
    add_body(doc, "Les av dette:", space_after=4)
    add_bullet(doc, "Klokkeslett.")
    add_bullet(
        doc,
        "Vindretning, dit vinden kommer fra, i åtte strekk: N, NØ, Ø, SØ, S, SV, V, NV. Bruk stasjonens vindfløy. Mangler den fløy, hold en stoffstrimmel i skulderhøyde og les telefonkompasset mot den retningen strimmelen kommer fra.",
    )
    add_bullet(doc, "Vindstyrke i m/s. Middel over ett minutt, ikke kastet.")
    add_bullet(doc, "Temperatur og luftfuktighet der stasjonen viser det.")
    add_bullet(doc, "Skydekke i åttedeler. 0 er klart, 8 er helt dekket.")
    add_bullet(doc, "Nedbør: ingen, yr, regn eller byge.")
    add_bullet(doc, "Le eller åpent: vann, skog, bakke eller bygninger i vindretningen.")
    add_body(
        doc,
        "På post C gjør dere alt unntatt tallene fra en stasjon. Styrken settes som stille, svak, frisk eller sterk, ved å sammenligne med det dere kjente på forrige post.",
    )
    add_body(
        doc,
        "Stasjonen skal stå i ro. Gruppen står ikke i vindskyggen av den, og ikke tett inntil den, så kroppsvarme ikke trekker temperaturen opp.",
    )

    add_heading_styled(doc, "Tidsplan", 1)
    add_body(doc, "Regn et kvarter per etappe, inkludert gange. Hele runden tar om lag en time.")
    add_table(
        doc,
        ["Tid", "Gruppe 1", "Gruppe 2", "Gruppe 3", "Gruppe 4"],
        [
            ["Start", "A", "B", "C", "D"],
            ["+15 min", "B", "C", "D", "A"],
            ["+30 min", "C", "D", "A", "B"],
            ["+45 min", "D", "A", "B", "C"],
            ["+60 min", "Tilbake på A", "Tilbake på B", "Tilbake på C", "Tilbake på D"],
        ],
        [3.0, 3.4, 3.4, 3.4, 3.5],
    )

    add_heading_styled(doc, "Etterarbeid", 1)
    add_body(
        doc,
        "Samle tallene i én tabell, med postene under hverandre og gruppene ved siden av hverandre. Dere var der til ulike minutter. Det er i orden så lenge klokkeslettet står i tabellen.",
    )
    add_body(doc, "Svar på dette:", space_after=4)
    add_numbered(doc, 1, "Hvilken vindretning ga værkartet, og hva målte post A?")
    add_numbered(doc, 2, "Ligger A innenfor ett strekk av kartet? Ett strekk er for eksempel fra sør til sørvest.")
    add_numbered(doc, 3, "Var vinden svakere på B og C enn på A og D?")
    add_numbered(doc, 4, "Var skydekket og nedbøren det fronten på kartet tilsa?")
    add_numbered(doc, 5, "Yr sin vindpil for Sognsvann: stemmer den med A, eller ligger den nærmere en av de andre postene?")

    add_body(doc, "Konklusjonen kan lande på ett av disse sporene.", space_after=4)
    add_bullet(
        doc,
        "A stemmer med kartet, og B og C er svakere. Da beskrev kartet dagen, og skogen dempet vinden lokalt.",
    )
    add_bullet(
        doc,
        "Alle postene har samme retning, men en annen enn kartet. Da traff ikke kartet den timen, eller vinden snudde mens dere gikk. Klokkeslettene viser hva som er mulig.",
    )
    add_bullet(
        doc,
        "A skiller seg fra kartet, mens de andre spriker. Da dominerte le, stien og vannkanten over det storstilte vindfeltet.",
    )
    add_body(
        doc,
        "Skriv det dere kan si om denne timen. En time på Sognsvann er ikke været i Oslo resten av døgnet. Forskjellen mellom to poster noen hundre meter fra hverandre er friksjon og le.",
    )

    add_heading_styled(doc, "Isobarer for et større område", 1)
    add_body(
        doc,
        "Runden rundt vannet er for liten til å tegne isobarer. Trykkforskjellen langs en ekte isobar over 3 km er mindre enn forskjellen mellom to telefoner. Isobarene tegnes derfor for et større område: fra Vetakolltoppen og Sognsvann sørover langs T-banen til Blindern, med ett punkt østover mot Svartkulp.",
    )
    add_body(doc, "iPhone som barometer", bold=True, space_after=4)
    add_bullet(doc, "iPhone 6 og nyere har barometer. Eldre telefoner har det ikke.")
    add_bullet(doc, "Appen skal vise hektopascal (hPa). En app som bare viser høyde, holder ikke.")
    add_bullet(
        doc,
        "Telefonen ligger stille på en benk, eller holdes i brysthøyde. Ute, ikke i lomma, og ikke rett fra en varm jakke.",
    )
    add_bullet(doc, "Vent til tallet roer seg, omtrent ett minutt. Skriv verdien med én desimal hvis appen viser det.")
    add_body(
        doc,
        "Før gruppene sprer seg, står alle samlet ved Sognsvann stasjon. På samme minutt leser alle telefonene, og værstasjonen hvis den viser hPa. Referansen er værstasjonen. Mangler den trykk, er referansen én avtalt telefon. Hver telefon skriver avvik = referanse minus egen avlesning. I felt er korrigert trykk = avlesning pluss avvik.",
    )
    add_body(
        doc,
        "Gruppene går hver sin vei med en gang, og leser av på samme avtalte minutt. Mål ute, ikke i togvognen.",
    )
    add_table(
        doc,
        ["Gruppe", "Punkt", "Vei", "Høyde"],
        [
            [
                "1",
                "Vetakolltoppen",
                "Gå vest fra Sognsvann.",
                "419 m. Sjekk koten der dere står.",
            ],
            [
                "2",
                "Sognsvann stasjon",
                "Blir på perrongen, ute.",
                "198 m. Det er stasjonen, ikke vannflaten på 183 m.",
            ],
            [
                "3",
                "Svartkulp, øst for Sognsvann",
                "Gå østover, om lag 10 minutter.",
                "Les koten på kartet der dere står.",
            ],
            [
                "4",
                "Tåsen stasjon",
                "T-bane linje 5 sørover.",
                "123 m.",
            ],
            [
                "5",
                "Ullevål stadion stasjon",
                "T-bane linje 5 sørover.",
                "98 m.",
            ],
            [
                "6",
                "Blindern stasjon",
                "T-bane linje 5 sørover.",
                "75 m.",
            ],
        ],
        [2.2, 4.4, 5.2, 4.9],
    )
    add_body(
        doc,
        "Har klassen bare fire grupper, tar de Sognsvann, Tåsen, Ullevål stadion og Blindern. Da er målingene et snitt nord–sør. Isobarene tegnes på tvers av det snittet, der tallene gir grunnlag for det.",
    )
    add_body(
        doc,
        "Avtalt klokkeslett er 40 minutter etter at gruppene har skilt lag, så gruppen til Vetakolltoppen rekker fram. De andre venter ute ved punktet sitt til minuttet.",
    )
    add_body(doc, "Omregning til havnivå", bold=True, space_after=4)
    add_body(
        doc,
        "Isobarene på værkartet er trykk redusert til havnivå. Telefonen måler trykket der dere står. Nær bakken faller trykket med om lag 1 hPa per 8 meter.",
    )
    add_rich(
        doc,
        [
            ("Havnivåtrykk = korrigert telefontrykk + høyde / 8. ", True, False),
            (
                "Eksempel: 980,0 hPa på Sognsvann stasjon, 198 m, gir 980,0 + 198/8 = 980,0 + 24,8 = 1004,8 hPa.",
                False,
                False,
            ),
        ],
    )
    add_body(
        doc,
        "Høyden tas fra tabellen, eller fra koten på kartet der dere faktisk står. Telefonens egen høydemåler brukes ikke. Den bommer ofte med titalls meter.",
    )
    add_body(doc, "Slik tegnes isobarene", bold=True, space_after=4)
    add_bullet(doc, "På et kart som dekker Vetakolltoppen til Blindern skriver dere havnivåtrykket ved hvert punkt.")
    add_bullet(doc, "Velg intervall 1 hPa hvis spennet i tallene er over 2 hPa. Er spennet mindre, bruk 0,5 hPa.")
    add_bullet(
        doc,
        "Trekk linjer gjennom like verdier. Linjene krysser ikke. Der to nabopunkt skiller mindre enn intervallet, tegnes ingen linje mellom dem.",
    )
    add_bullet(doc, "Ikke tegn buer der dere ikke har et punkt.")
    add_body(
        doc,
        "Sammenlign med analysenkartet fra formiddagen. Faller trykket samme vei, og er linjene like tette? Vinden går langs isobarene, med lavtrykk til venstre.",
    )
    add_body(
        doc,
        "Uten høydekorreksjon vil linjene følge bakken: lavere tall på Vetakolltoppen enn på Blindern, selv om været er det samme. Det kartet viser terrenget. Havnivåkartet er det som kan sammenlignes med værkartet.",
    )

    add_heading_styled(doc, "HMS", 1)
    add_bullet(doc, "Grusstien er trafikkert. Mål fra siden av stien.")
    add_bullet(doc, "Bryggene er glatte. Mål fra land.")
    add_bullet(doc, "Vannet er kaldt. Ingen går uti for å lese av.")
    add_bullet(doc, "Hold dere på grusstien rundt vannet. Det ligger gamle gruver i åsen vest for vannet.")
    add_bullet(doc, "T-banen: mål ute på stasjonen, ikke i vognen. Gruppen holder sammen og har billett.")
    add_bullet(
        doc,
        "Vetakolltoppen er bratt. Gruppen snur hvis stien er glatt eller de ikke rekker minuttet, og måler da på et lavere punkt der koten er kjent.",
    )

    add_heading_styled(doc, "Elevark", 1)
    add_body(doc, "Fylles ut før avgang.", space_after=4)
    add_table(
        doc,
        ["", "Vårt svar, skrevet før vi går"],
        [
            ["Lavtrykk ligger", ""],
            ["Høytrykk ligger", ""],
            ["Vindretning værkartet gir over Oslo", ""],
            ["Isobarene er tette eller glisne", ""],
            ["Forventet vindstyrke", ""],
            ["Front nær Oslo, og hva vi venter av sky og nedbør", ""],
            ["Hypotese", ""],
        ],
        [8.0, 8.7],
        row_cm=1.1,
    )

    add_body(doc, "Målinger. Én rad per post. Skriv klokkeslettet dere faktisk leste av.", space_after=4)
    add_table(
        doc,
        ["Post", "Kl.", "Vind fra", "m/s", "°C", "Fukt %", "Sky /8", "Nedbør", "Le eller åpent"],
        [
            ["A", "", "", "", "", "", "", "", ""],
            ["B", "", "", "", "", "", "", "", ""],
            ["C", "", "", "", "", "", "", "", ""],
            ["D", "", "", "", "", "", "", "", ""],
        ],
        [1.5, 1.6, 2.0, 1.5, 1.4, 1.7, 1.6, 2.2, 3.2],
        row_cm=1.3,
    )

    add_body(doc, "Sammenligning etter runden.", space_after=4)
    add_table(
        doc,
        ["Spørsmål", "Svar"],
        [
            ["Vindretning fra værkartet", ""],
            ["Vindretning på post A", ""],
            ["A innenfor ett strekk av kartet?", ""],
            ["Svakere vind på B og C?", ""],
            ["Sky og nedbør som fronten tilsa?", ""],
            ["Yr-pilen likest hvilken post?", ""],
            ["Hvilket av de tre sporene landet vi på?", ""],
        ],
        [8.0, 8.7],
        row_cm=1.1,
    )

    add_body(doc, "Isobarer. Én rad per punkt. Havnivåtrykk = korrigert trykk + høyde / 8.", space_after=4)
    add_table(
        doc,
        ["Punkt", "Kl.", "Telefon", "Avvik", "Korrigert", "Høyde m", "Havnivå"],
        [
            ["Vetakolltoppen", "", "", "", "", "419", ""],
            ["Sognsvann stasjon", "", "", "", "", "198", ""],
            ["Svartkulp", "", "", "", "", "", ""],
            ["Tåsen", "", "", "", "", "123", ""],
            ["Ullevål stadion", "", "", "", "", "98", ""],
            ["Blindern", "", "", "", "", "75", ""],
        ],
        [3.4, 1.6, 2.3, 1.8, 2.4, 2.0, 3.2],
        row_cm=1.05,
    )
    add_table(
        doc,
        ["", "Svar"],
        [
            ["Intervall på isobarene", ""],
            ["Laveste havnivåtrykk", ""],
            ["Høyeste havnivåtrykk", ""],
            ["Trykket faller mot", ""],
            ["Stemmer retningen med værkartet?", ""],
            ["Er linjene like tette som på kartet?", ""],
        ],
        [8.0, 8.7],
        row_cm=1.0,
    )

    add_body(doc, "Kort konklusjon om denne timen:", space_after=4)
    for _ in range(4):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(" ")
        set_run_font(r, size=11)
        pPr = p._p.get_or_add_pPr()
        pBdr = OxmlElement("w:pBdr")
        bottom = OxmlElement("w:bottom")
        bottom.set(qn("w:val"), "single")
        bottom.set(qn("w:sz"), "6")
        bottom.set(qn("w:space"), "1")
        bottom.set(qn("w:color"), "C5D0D0")
        pBdr.append(bottom)
        pPr.append(pBdr)

    core = doc.core_properties
    core.title = "Værkartet den dagen – feltarbeid på Sognsvann"
    core.subject = "Geofag 2. Redigerbar feltoppgave."
    core.category = "Feltarbeid"
    core.language = "nb-NO"

    doc.save(OUT)
    print(OUT)


if __name__ == "__main__":
    build()
