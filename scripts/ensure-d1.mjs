#!/usr/bin/env node
/**
 * Ensure the Cloudflare D1 database used for hybrid CMS posts exists, and
 * write its UUID into wrangler.toml *and* the Nitro-generated
 * `.output/server/wrangler.json` so `wrangler deploy` actually binds POSTS_DB.
 *
 * Nitro copies wrangler.toml into `.output/server/wrangler.json` at build
 * time, and Wrangler then deploys that file (via `.wrangler/deploy/config.json`).
 * Patching only the source toml after `npm run build` is ignored.
 *
 * D1 is optional: Durable Objects (`POSTS_DO`) persist edits even when the
 * API token cannot create D1. Local `npm run dev` still uses PGLite.
 */
import { execFile } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { isMainModule } from "./with-app-env.mjs";

const execFileAsync = promisify(execFile);

export const D1_BINDING = "POSTS_DB";
export const D1_DATABASE_NAME = "geofag-posts";
export const PLACEHOLDER_ID = "00000000-0000-0000-0000-000000000000";

/**
 * Replace `database_id` in the D1 block for `database_name`, or append a block.
 * @param {string} toml
 * @param {string} databaseId
 * @param {{ binding?: string, databaseName?: string }} [opts]
 */
export function patchWranglerToml(toml, databaseId, opts = {}) {
  const binding = opts.binding ?? D1_BINDING;
  const databaseName = opts.databaseName ?? D1_DATABASE_NAME;
  const blockRe = new RegExp(
    `(\\[\\[d1_databases\\]\\][\\s\\S]*?database_name\\s*=\\s*"${databaseName}"[\\s\\S]*?database_id\\s*=\\s*")([^"]+)(")`,
  );
  if (blockRe.test(toml)) return toml.replace(blockRe, `$1${databaseId}$3`);
  const block = `
[[d1_databases]]
binding = "${binding}"
database_name = "${databaseName}"
database_id = "${databaseId}"
`;
  return toml.trimEnd() + "\n" + block;
}

/**
 * @param {string} jsonText
 * @param {string} databaseId
 */
export function patchWranglerJson(jsonText, databaseId) {
  const cfg = JSON.parse(jsonText);
  const dbs = Array.isArray(cfg.d1_databases) ? cfg.d1_databases : [];
  const idx = dbs.findIndex(
    (row) => row && (row.database_name === D1_DATABASE_NAME || row.binding === D1_BINDING),
  );
  const row = {
    ...(idx >= 0 ? dbs[idx] : {}),
    binding: D1_BINDING,
    database_name: D1_DATABASE_NAME,
    database_id: databaseId,
  };
  if (idx >= 0) dbs[idx] = row;
  else dbs.push(row);
  cfg.d1_databases = dbs;
  return `${JSON.stringify(cfg, null, 2)}\n`;
}

export function cloudflareAuthFromEnv(env = process.env) {
  const accountId = String(env.CLOUDFLARE_ACCOUNT_ID ?? env.CF_ACCOUNT_ID ?? "").trim();
  const token = String(env.CLOUDFLARE_API_TOKEN ?? env.CF_API_TOKEN ?? "").trim();
  return { accountId, token };
}

function projectRoot() {
  return dirname(dirname(fileURLToPath(import.meta.url)));
}

/**
 * @param {unknown} list
 * @param {string} name
 * @returns {string | null}
 */
export function idFromWranglerList(list, name) {
  const rows = Array.isArray(list)
    ? list
    : list && typeof list === "object" && Array.isArray(list.result)
      ? list.result
      : [];
  const row = rows.find((item) => item && typeof item === "object" && item.name === name);
  if (!row) return null;
  const id = row.uuid ?? row.id;
  return typeof id === "string" && id ? id : null;
}

function parseWranglerJson(stdout) {
  const trimmed = stdout.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.search(/[[{]/);
    if (start < 0) throw new Error(`wrangler output was not JSON:\n${trimmed.slice(0, 500)}`);
    return JSON.parse(trimmed.slice(start));
  }
}

/**
 * @param {string} stdout
 * @returns {string | null}
 */
export function idFromCreateOutput(stdout) {
  const match = stdout.match(/database_id\s*=\s*"([^"]+)"/i);
  return match?.[1] ?? null;
}

/** Prefer PATH/`npx` wrangler (wrangler-action). Nitro's nested CLI often fails. */
function wranglerFileAndArgs(args) {
  if (process.env.WRANGLER_BIN) return { file: process.env.WRANGLER_BIN, argv: args };
  return { file: "npx", argv: ["--yes", "wrangler", ...args] };
}

async function wranglerCapture(args) {
  const { file, argv } = wranglerFileAndArgs(args);
  try {
    return await execFileAsync(file, argv, {
      encoding: "utf8",
      env: process.env,
      cwd: projectRoot(),
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (err) {
    const stdout = String(err.stdout ?? "");
    const stderr = String(err.stderr ?? "");
    throw new Error(
      `${err.message}\nstdout: ${stdout.slice(0, 2000)}\nstderr: ${stderr.slice(0, 2000)}`,
    );
  }
}

async function resolveDatabaseIdViaApi(auth, fetchImpl = fetch) {
  const headers = { Authorization: `Bearer ${auth.token}` };
  const url = `https://api.cloudflare.com/client/v4/accounts/${auth.accountId}/d1/database`;
  const listed = await fetchImpl(url, { headers });
  const listJson = await listed.json();
  if (!listed.ok || listJson.success === false) {
    throw new Error(
      `D1 list API ${listed.status}: ${JSON.stringify(listJson.errors ?? listJson)}`,
    );
  }
  const existing = idFromWranglerList(listJson.result ?? listJson, D1_DATABASE_NAME);
  if (existing) {
    console.log(`[ensure-d1] using existing ${D1_DATABASE_NAME} (${existing})`);
    return existing;
  }
  console.log(`[ensure-d1] creating ${D1_DATABASE_NAME} via API`);
  const created = await fetchImpl(url, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ name: D1_DATABASE_NAME }),
  });
  const createdJson = await created.json();
  if (!created.ok || createdJson.success === false) {
    throw new Error(
      `D1 create API ${created.status}: ${JSON.stringify(createdJson.errors ?? createdJson)}`,
    );
  }
  const id = createdJson.result?.uuid ?? createdJson.result?.id;
  if (typeof id !== "string" || !id) {
    throw new Error(`D1 create returned no id: ${JSON.stringify(createdJson)}`);
  }
  console.log(`[ensure-d1] created ${D1_DATABASE_NAME} (${id})`);
  return id;
}

async function resolveDatabaseIdViaCli() {
  const listedRaw = (await wranglerCapture(["d1", "list", "--json"])).stdout;
  const listed = parseWranglerJson(listedRaw);
  const existing = idFromWranglerList(listed, D1_DATABASE_NAME);
  if (existing) {
    console.log(`[ensure-d1] using existing ${D1_DATABASE_NAME} (${existing})`);
    return existing;
  }
  console.log(`[ensure-d1] creating ${D1_DATABASE_NAME}`);
  const created = (await wranglerCapture(["d1", "create", D1_DATABASE_NAME])).stdout;
  const id = idFromCreateOutput(created);
  if (!id) {
    throw new Error(`wrangler d1 create did not print a database_id:\n${created}`);
  }
  console.log(`[ensure-d1] created ${D1_DATABASE_NAME} (${id})`);
  return id;
}

async function resolveDatabaseId() {
  const auth = cloudflareAuthFromEnv();
  if (auth.accountId && auth.token) {
    try {
      return await resolveDatabaseIdViaApi(auth);
    } catch (err) {
      console.warn("[ensure-d1] Cloudflare API failed, trying wrangler CLI:", err?.message || err);
    }
  }
  return resolveDatabaseIdViaCli();
}

function patchConfigFiles(root, id) {
  const wranglerPath = join(root, "wrangler.toml");
  writeFileSync(wranglerPath, patchWranglerToml(readFileSync(wranglerPath, "utf8"), id));
  console.log(`[ensure-d1] wrote ${id} to wrangler.toml`);

  const generated = [
    join(root, ".output/server/wrangler.json"),
    join(root, "dist/server/wrangler.json"),
  ];
  const deployPointer = join(root, ".wrangler/deploy/config.json");
  if (existsSync(deployPointer)) {
    try {
      const pointed = JSON.parse(readFileSync(deployPointer, "utf8")).configPath;
      if (typeof pointed === "string") {
        generated.push(join(dirname(deployPointer), pointed));
      }
    } catch {
      /* ignore */
    }
  }
  for (const path of generated) {
    if (!existsSync(path)) continue;
    writeFileSync(path, patchWranglerJson(readFileSync(path, "utf8"), id));
    console.log(`[ensure-d1] wrote ${id} to ${path}`);
  }
}

async function main() {
  const id = await resolveDatabaseId();
  patchConfigFiles(projectRoot(), id);
}

if (isMainModule(import.meta.url)) {
  main().catch((err) => {
    // Durable Objects still persist posts when D1 cannot be created.
    console.error(
      "[ensure-d1] failed, deploying without D1 (POSTS_DO still persists edits):",
      err?.message || err,
    );
    process.exit(0);
  });
}
