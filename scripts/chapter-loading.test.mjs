import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

describe("chapter text loading boundary", () => {
  it("keeps the whole static text-renderer graph free of diagrams and models", () => {
    const visited = new Set();
    function visit(path) {
      if (visited.has(path)) return;
      visited.add(path);
      assert.doesNotMatch(path, /components\/(diagrams|models)\/|poster-widget-renderer|poster-widgets-b|g2-pakke-a-widgets/);
      const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
      for (const node of source.statements) {
        if (!ts.isImportDeclaration(node) || node.importClause?.isTypeOnly) continue;
        const spec = node.moduleSpecifier.text;
        const base = spec.startsWith("@/") ? resolve(root, "src", spec.slice(2))
          : spec.startsWith(".") ? resolve(dirname(path), spec) : null;
        if (!base) continue;
        const target = [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`]
          .find((candidate) => /\.tsx?$/.test(candidate) && existsSync(candidate));
        if (target) visit(target);
      }
    }
    visit(resolve(root, "src/components/poster-body.tsx"));
    assert.ok(visited.size > 5, "check transitive imports, not just the entry point");
  });

  it("loads the registry dynamically under a figure-local Suspense boundary", () => {
    const body = read("src/components/poster-body.tsx");
    assert.match(body, /lazy\([\s\S]*import\("@\/components\/poster-widget-renderer"\)/);
    assert.match(body, /part\.type === "widget"[\s\S]*<Suspense[\s\S]*<PosterWidget/);
    assert.match(read("src/components/poster-widget-renderer.tsx"), /export function PosterWidget/);
  });

  for (const route of ["src/routes/geofag-1/index.tsx", "src/routes/geofag-2.tsx"]) {
    it(`${route}: defers card images while retaining the high-priority hero`, () => {
      const source = read(route);
      const card = source.match(/<img\s[^>]*src=\{tema\.image\}[^>]*\/>/s)?.[0];
      assert.ok(card);
      assert.match(card, /loading="lazy"/);
      assert.match(card, /decoding="async"/);
      assert.match(card, /fetchPriority="low"/);
      assert.match(source, /loading="eager"/);
      assert.match(source, /fetchPriority="high"/);
    });
  }
});
