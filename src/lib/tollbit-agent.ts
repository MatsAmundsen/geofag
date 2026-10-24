/**
 * TollBit Agent Site / bot-paywall (docs.tollbit.com/docs/cloudflare, "combined Worker").
 * Kjente AI-agenter (User-Agent, uten hensyn til store/små bokstaver) hentes fra
 * https://tollbit.<host><sti>. Vanlige besøkende og søkemotorer (Googlebot, Bingbot) berøres ikke.
 * GET/HEAD faller tilbake til egen origin hvis Agent Site gir 5xx eller bruker >10 s.
 */
// TollBits anbefalte (ikke-uttømmende) liste.
export const TOLLBIT_BOT_LIST = [
 'AgentNativeSearchBot', 'AI2Bot', 'AionBot', 'AIWebIndex', 'Amazonbot',
 'Amzn-SearchBot', 'Amzn-User', 'anthropic-ai', 'AteveSearchSourceUrlDiscovery',
 'AzureAI-SearchBot', 'Bravebot', 'Bytespider', 'CCBot', 'ChatGPT-User',
 'claude-code', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'Claude/',
 'ClaudeBot', 'CloudflareBrowserRenderingCrawler', 'cohere-ai', 'Comet/',
 'Cursor/', 'DesearchBot', 'Devin/', 'Diffbot', 'DuckAssistBot', 'Exabot',
 'ExaSearchBot', 'ExaUser', 'Fellou', 'Gensparkbot', 'GitHubCopilotRuntime',
 'goose/', 'GPTBot', 'grok-agent', 'GrokBot', 'Hermes-Agent', 'iaskspider',
 'ibou-search', 'IbouBot', 'IsonSearchBot', 'Keenable', 'Kimi-SearchBot',
 'KimiBot', 'Lightpanda', 'LinkupBot', 'Manus-User', 'meta-externalagent',
 'meta-externalfetcher', 'meta-webindexer', 'MistralAI-User', 'MojeekBot',
 'MySearchBot', 'OAI-AdsBot', 'OAI-SearchBot', 'OpenClaw', 'Perplexity-User',
 'Perplexity/', 'PerplexityBot', 'rednote-websearch-bot', 'Reflectionbot',
 'Shap-User', 'ShapBot', 'SofyaBot', 'TalarionSearchBot', 'Timpibot', 'YouBot'
];

const LOWER = TOLLBIT_BOT_LIST.map((b) => b.toLowerCase());

export function isTollbitBot(userAgent: string | null | undefined): boolean {
  const ua = (userAgent ?? "").toLowerCase();
  return ua !== "" && LOWER.some((b) => ua.includes(b));
}

export function tollbitAgentUrl(requestUrl: string): string {
  const u = new URL(requestUrl);
  const host = u.host.replace(/^www\./, "");
  return `https://tollbit.${host}${u.pathname}${u.search}`;
}

/** Returnerer respons fra Agent Site, eller null hvis vi skal falle tilbake til origin. */
export async function fetchFromAgentSite(request: Request): Promise<Response | null> {
  const safe = request.method === "GET" || request.method === "HEAD";
  try {
    const res = await fetch(
      new Request(tollbitAgentUrl(request.url), {
        method: request.method,
        headers: request.headers,
        body: safe ? undefined : request.body,
        redirect: "manual",
        signal: safe ? AbortSignal.timeout(10_000) : undefined,
      }),
    );
    if (safe && res.status >= 500) {
      await res.body?.cancel();
      return null;
    }
    const headers = new Headers(res.headers);
    headers.set("Cache-Control", "no-store");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  } catch {
    return safe ? null : new Response("Bad Gateway", { status: 502 });
  }
}
