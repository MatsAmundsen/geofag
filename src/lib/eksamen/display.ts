/** Ren tekstbehandling for oppgaver. Ingen eksamensdata her (brukes i klientkoden). */

export function displayPrompt(prompt: string): string {
  let body = prompt
    .replace(/^REA ?3043[^\n]*\n/gim, "")
    .replace(/^\/\n/gm, "")
    .replace(/^\.\.\.\n/gm, "")
    .replace(/^Eksamen (høsten|våren) \d+ fra Udir\n/gim, "")
    .replace(/^Eksempeloppgaver[^\n]*\n/gim, "")
    .replace(/^Geofag 2 · Øv baklengs\n/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const lines = body.split("\n");
  if (lines.length >= 2 && /^oppgave\s+\d+/i.test(lines[0]) && /^oppgave\s+\d+/i.test(lines[1])) {
    body = lines.slice(1).join("\n").trim();
  }
  return body;
}

export function taskHeading(prompt: string, fallback: string): string {
  const lines = displayPrompt(prompt)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  for (const line of lines) {
    const titled = line.match(/^oppgave\s+\d+\s*[:.–-]+\s*(.+)$/i);
    if (titled?.[1] && titled[1].length < 80) return titled[1].trim();
    if (/^oppgave/i.test(line)) continue;
    if (/av \d+ til tema/i.test(line)) continue;
    if (/du skal svare/i.test(line)) continue;
    if (/kilde:/i.test(line)) continue;
    if (line.length > 3 && line.length < 48) return line;
  }
  return fallback;
}
