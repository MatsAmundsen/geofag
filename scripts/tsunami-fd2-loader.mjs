// Repository-local TypeScript/TSX support for FD2's pure/SSR Node tests.
import ts from "typescript";
import { readFile, access } from "node:fs/promises";

export async function resolve(specifier, context, next) {
  if (specifier.startsWith(".") && context.parentURL) {
    const url = new URL(specifier, context.parentURL);
    if (!/\.[a-z]+$/.test(url.pathname)) {
      for (const ext of [".ts", ".tsx"]) {
        const candidate = new URL(url.href + ext);
        try {
          await access(candidate);
          return { url: candidate.href, shortCircuit: true };
        } catch { /* Try the next extension, then normal resolution. */ }
      }
    }
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (/\.tsx?$/.test(new URL(url).pathname)) {
    const source = await readFile(new URL(url), "utf8");
    const out = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.ReactJSX,
      },
    });
    return { format: "module", source: out.outputText, shortCircuit: true };
  }
  return next(url, context);
}
