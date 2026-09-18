/**
 * Local `vite dev` skips the CMS password. On the deployed Worker, editing is
 * gated by a password (CMS_PASSWORD secret, or the first-run setup stored in D1).
 */
export const isLocalDev: boolean = import.meta.env.DEV === true;

/** @deprecated use getCmsStatus() — true only on the local dev server */
export const editingAllowed: boolean = isLocalDev;

/** Shown when a write is attempted without a CMS session. */
export const READ_ONLY_MESSAGE =
  "Redigering på geofag.com krever admin-passord. Lokalt (npm run dev) trenger du ikke passord.";
