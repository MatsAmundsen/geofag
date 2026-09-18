import { createServerFn } from "@tanstack/react-start";
import type { CmsStatus } from "@/lib/post-types";

export type { CmsStatus };

export const getCmsStatus = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { cmsStatus } = await import("@/lib/post-store.server");
    return cmsStatus();
  } catch (err) {
    console.error("[cms] status failed", err);
    return { allowed: false, signedIn: false, needsSetup: true, persist: "memory" as const };
  }
});

export const cmsUnlock = createServerFn({ method: "POST" })
  .validator((input: unknown): { password: string } => {
    const password = String((input as { password?: unknown })?.password ?? "");
    if (!password.trim()) throw new Error("Passord er påkrevd");
    return { password };
  })
  .handler(async ({ data }) => {
    const { unlockCms } = await import("@/lib/post-store.server");
    return unlockCms(data.password);
  });

export const cmsLogin = cmsUnlock;
export const cmsSetup = cmsUnlock;

export const cmsLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutCms } = await import("@/lib/post-store.server");
  return logoutCms();
});
