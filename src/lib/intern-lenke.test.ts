import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";

const root = new URL("../..", import.meta.url).pathname;

function walk(dir: string, out: string[]) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(md|tsx|ts|xml)$/.test(name)) out.push(path);
  }
}

function files(): string[] {
  const out: string[] = [];
  for (const rel of ["src/lib/posts", "src/components", "src/routes", "src/lib/eksamen"]) {
    walk(join(root, rel), out);
  }
  for (const rel of ["src/lib/nav.ts", "src/lib/gemini-by-path.ts", "public/sitemap.xml"]) {
    out.push(join(root, rel));
  }
  return out;
}

function routes(): Set<string> {
  const found = new Set<string>(["/"]);
  const routeDir = join(root, "src/routes");
  const paths: string[] = [];
  walk(routeDir, paths);
  for (const path of paths) {
    const source = readFileSync(path, "utf8");
    for (const match of source.matchAll(/createFileRoute\(\s*["']([^"']+)["']/g)) {
      const route = match[1]!.replace(/\/$/, "") || "/";
      found.add(route);
    }
  }
  return found;
}

function linksIn(source: string): string[] {
  const found: string[] = [];
  const patterns = [
    /\]\((\/[^)\s]+)\)/g,
    /\bto:\s*["'](\/[^"'?#\s]+)/g,
    /\bto=["'](\/[^"'?#\s]+)/g,
    /\bhref=["'](\/[^"'?#\s]+)/g,
    /<loc>https:\/\/geofag\.com(\/[^<]*)</g,
  ];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) found.push(match[1]!);
  }
  return found;
}

function pathOnly(link: string): string {
  const bare = link.split("#")[0]!.split("?")[0]!;
  return bare.replace(/\/$/, "") || "/";
}

describe("internal links", () => {
  it("resolves every internal link to a real route", () => {
    const known = routes();
    const missing: string[] = [];
    for (const path of files()) {
      const source = readFileSync(path, "utf8");
      for (const link of linksIn(source)) {
        const target = pathOnly(link);
        if (target.startsWith("/images/") || target.startsWith("/fonts/") || /\.[a-z0-9]+$/i.test(target)) continue;
        if (!known.has(target)) missing.push(`${relative(root, path)} -> ${link}`);
      }
    }
    assert.deepEqual(missing, []);
  });

  it("keeps chapter prose off the old naturfare and ENSO addresses", () => {
    const posts = join(root, "src/lib/posts");
    const names: string[] = [];
    walk(posts, names);
    for (const path of names) {
      const source = readFileSync(path, "utf8");
      assert.equal(source.includes("](/geofag-1/jordskjelv-naturfare"), false, path);
      assert.equal(source.includes("](/tema/enso)"), false, path);
    }
  });
});
