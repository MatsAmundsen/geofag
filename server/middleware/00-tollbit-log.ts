import { queueTollbitLog } from "../../src/lib/tollbit-log";
import { fetchFromAgentSite, isTollbitBot } from "../../src/lib/tollbit-agent";

/**
 * Sender én TollBit-loggrad per forespørsel som går gjennom Workeren.
 * Filnavnet starter med 00 så denne kjører ytterst og ser endelig respons.
 * Kjente AI-agenter sendes til TollBit Agent Site (tollbit.geofag.com, bot-paywall);
 * alle andre får vanlig respons. Loggen sendes via waitUntil med faktisk status.
 * Merk: statiske filer i ./.output/public serveres av Cloudflare Assets
 * før Workeren og kommer derfor ikke hit.
 */
type CfReq = Request & {
  waitUntil?: (p: Promise<unknown>) => void;
  runtime?: { cloudflare?: { env?: { TOLLBIT_KEY?: string } } };
};
type NitroEvent = { req: CfReq };

export default async function tollbitLogMiddleware(
  event: NitroEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  let result: unknown;
  try {
    result = isTollbitBot(event.req.headers.get("user-agent"))
      ? ((await fetchFromAgentSite(event.req)) ?? (await next()))
      : await next();
  } catch {
    result = await next();
  }
  try {
    const req = event.req;
    const key = req.runtime?.cloudflare?.env?.TOLLBIT_KEY;
    if (key && result instanceof Response) {
      queueTollbitLog(key, req.waitUntil, req, result);
    }
  } catch {
    // Logging skal aldri påvirke siden.
  }
  return result;
}
