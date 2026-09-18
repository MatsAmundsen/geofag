/**
 * Option A — production is read-only; post editing happens ONLY on your machine.
 *
 * `import.meta.env.DEV` is `true` only while the local dev server runs
 * (`npm run dev`). Vite constant-folds it to `false` in the production build, so
 * the deployed site can neither write (enforced server-side in `posts.ts`) nor
 * show any editing UI. This binds editing to wherever the dev server runs — your
 * Mac — with no token to leak or account to abuse.
 *
 * To push content to the live database, run the dev server locally with
 * `DATABASE_URL` pointed at production; edits then go straight to Neon from your
 * machine, while the deployed site stays read-only for everyone else.
 */
export const editingAllowed: boolean = import.meta.env.DEV === true;

/** Shown when a write is attempted anywhere but the local dev server. */
export const READ_ONLY_MESSAGE =
  "Redigering er kun tilgjengelig lokalt (npm run dev på din maskin). Den publiserte siden er skrivebeskyttet.";
