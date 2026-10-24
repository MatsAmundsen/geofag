import { queueTollbitLog } from "../../src/lib/tollbit-log";

/**
 * Sender én TollBit-loggrad per forespørsel som går gjennom Workeren.
 * Filnavnet starter med 00 så denne kjører ytterst og ser endelig respons.
 * Responsen returneres uendret; loggen sendes via waitUntil.
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
  const result = await next();
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
