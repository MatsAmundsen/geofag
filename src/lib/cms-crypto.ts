/** Hex SHA-256. Works in Node 20+ and Cloudflare Workers (Web Crypto). */
export async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time string compare for equal-length hex hashes. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function passwordCookieValue(password: string): Promise<string> {
  return sha256Hex(`geofag-cms:v1:${password}`);
}
