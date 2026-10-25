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
  const size = response.headers.get("content-length");
  // Feltnavn nøyaktig som i TollBits offisielle Cloudflare-snippet (flatt objekt).
  return JSON.stringify({
    timestamp: now.toISOString(),
    ip_address: h.get("cf-connecting-ip"),
    geo_country: cf.country ?? null,
    geo_city: cf.city ?? null,
    geo_postal_code: cf.postalCode ?? null,
    geo_latitude: cf.latitude ?? null,
    geo_longitude: cf.longitude ?? null,
    host: h.get("host") ?? url.host,
    url: url.pathname + url.search,
    request_method: request.method,
    request_protocol: (cf.httpProtocol as string | undefined) ?? null,
    request_user_agent: h.get("user-agent"),
    request_latency: null,
    request_referer: h.get("referer"),
    response_state: null,
    response_status: response.status,
    response_reason: response.statusText,
    response_body_size: size ? Number(size) : null,
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
