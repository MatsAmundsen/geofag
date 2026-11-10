// Laster TypeScript-filene i src/components/diagrams/tsunami direkte i Node for testene,
// med TypeScript fra repoet og uten ekstern laster. Importer denne før komponentene.
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

export const tsunamiDir = new URL("../src/components/diagrams/tsunami/", import.meta.url);

registerHooks({
  resolve(specifier, context, next) {
    if (
      specifier.startsWith(".") &&
      context.parentURL?.startsWith(tsunamiDir.href) &&
      !/\.[a-z]+$/.test(specifier)
    ) {
      for (const ext of [".ts", ".tsx"]) {
        const url = new URL(specifier + ext, context.parentURL);
        try {
          readFileSync(url);
          return { url: url.href, shortCircuit: true };
        } catch {
          // prøv neste filendelse
        }
      }
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.startsWith(tsunamiDir.href) && /\.tsx?$/.test(url)) {
      const out = ts.transpileModule(readFileSync(fileURLToPath(url), "utf8"), {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.ReactJSX,
        },
        fileName: fileURLToPath(url),
      });
      return { format: "module", source: out.outputText, shortCircuit: true };
    }
    return next(url, context);
  },
});
