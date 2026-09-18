#!/usr/bin/env node
/**
 * Ensure the Cloudflare D1 database used for hybrid CMS posts exists, and
 * write its UUID into wrangler.toml so `wrangler deploy` can bind POSTS_DB.
 *
 * Production has no DATABASE_URL (GitHub Actions migrate step skips Neon).
 * PGLite cannot run on Workers (it throws "Invalid URL string"), so posts
 * persist in D1 instead. Local `npm run dev` still uses PGLite.
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

/** wrangler-action preCommands do not always have `wrangler` on PATH. */
function wranglerFileAndArgs(args) {
  const local = join(projectRoot(), "node_modules", ".bin", "wrangler");
  if (existsSync(local)) return { file: local, argv: args };
  return { file: "npx", argv: ["--yes", "wrangler", ...args] };
}

async function wranglerJson(args) {
  const { file, argv } = wranglerFileAndArgs(args);
  const { stdout } = await execFileAsync(file, argv, {
    encoding: "utf8",
    env: process.env,
    cwd: projectRoot(),
  });
  return stdout;
}

async function resolveDatabaseId() {
  const listedRaw = await wranglerJson(["d1", "list", "--json"]);
  const listed = parseWranglerJson(listedRaw);
  const existing = idFromWranglerList(listed, D1_DATABASE_NAME);
  if (existing) {
    console.log(`[ensure-d1] using existing ${D1_DATABASE_NAME} (${existing})`);
    return existing;
  }
  console.log(`[ensure-d1] creating ${D1_DATABASE_NAME}`);
  const created = await wranglerJson(["d1", "create", D1_DATABASE_NAME]);
  const id = idFromCreateOutput(created);
  if (!id) {
    throw new Error(`wrangler d1 create did not print a database_id:\n${created}`);
  }
  console.log(`[ensure-d1] created ${D1_DATABASE_NAME} (${id})`);
  return id;
}

async function main() {
  const root = projectRoot();
  const wranglerPath = join(root, "wrangler.toml");
  const id = await resolveDatabaseId();
  const next = patchWranglerToml(readFileSync(wranglerPath, "utf8"), id);
  writeFileSync(wranglerPath, next);
  console.log(`[ensure-d1] wrote ${id} to wrangler.toml`);
}

if (isMainModule(import.meta.url)) {
  main().catch((err) => {
    // Deploy must still succeed: the Worker falls back to an in-memory seed
    // when POSTS_DB is missing. Blocking deploy here would leave geofag.com
    // on the old PGLite crash ("Invalid URL string").
    console.error(
      "[ensure-d1] failed, deploying without D1 (edits will not persist):",
      err?.message || err,
    );
    process.exit(0);
  });
}
