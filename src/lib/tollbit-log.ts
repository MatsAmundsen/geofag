/**
 * TollBit-logging (samme format som TollBits Cloudflare-snippet).
 * Nøkkelen kommer fra Worker-secret TOLLBIT_KEY og logges/hardkodes aldri.
 * Alt er "best effort": feil skal aldri påvirke svaret til siden.
 */
const TOLLBIT_LOG_URL = "https://log.tollbit.com/log";
const BACKOFF_MS = 10_000;

let backoffUntil = 0;

type CfGeo = Record<string, unknown> | undefined;

export function buildTollbitLogLine(request: Request, response: Response, now = new Date()): string {
  const cf = (request as unknown as { cf?: CfGeo }).cf ?? {};
  const url = new URL(request.url);
  const h = request.headers;
  return JSON.stringify({
    timestamp: now.toISOString(),
    ip: h.get("cf-connecting-ip") ?? "",
    geo: {
      country: cf.country ?? "",
      city: cf.city ?? "",
      region: cf.region ?? "",
      regionCode: cf.regionCode ?? "",
      postalCode: cf.postalCode ?? "",
      continent: cf.continent ?? "",
      latitude: cf.latitude ?? "",
      longitude: cf.longitude ?? "",
      timezone: cf.timezone ?? "",
      colo: cf.colo ?? "",
      asn: cf.asn ?? "",
      asOrganization: cf.asOrganization ?? "",
    },
    host: url.host,
    url: url.pathname + url.search,
    method: request.method,
    protocol: (cf.httpProtocol as string | undefined) ?? url.protocol.replace(":", ""),
    userAgent: h.get("user-agent") ?? "",
    referer: h.get("referer") ?? "",
    response: {
      status: response.status,
      statusText: response.statusText,
      size: response.headers.get("content-length") ?? "",
    },
  });
}

export async function sendTollbitLog(key: string, lines: string[]): Promise<void> {
  if (!key || lines.length === 0 || Date.now() < backoffUntil) return;
  try {
    const res = await fetch(TOLLBIT_LOG_URL, {
      method: "POST",
      headers: { TollbitKey: key, "Content-Type": "application/json" },
      body: lines.join("\n"),
    });
    if (res.status === 403 || res.status === 429) backoffUntil = Date.now() + BACKOFF_MS;
    // Les ikke body; frigjør den.
    await res.body?.cancel();
  } catch {
    // Ignorer – logging skal aldri påvirke siden.
  }
}

/** Køer logging med waitUntil. Kaster aldri. */
export function queueTollbitLog(
  key: string | undefined,
  waitUntil: ((p: Promise<unknown>) => void) | undefined,
  request: Request,
  response: Response,
): void {
  try {
    if (!key || !waitUntil || Date.now() < backoffUntil) return;
    waitUntil(sendTollbitLog(key, [buildTollbitLogLine(request, response)]));
  } catch {
    // Ignorer.
  }
}
