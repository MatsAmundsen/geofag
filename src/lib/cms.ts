import { createServerFn } from "@tanstack/react-start";
import type { CmsStatus } from "@/lib/post-types";

export type { CmsStatus };

export const getCmsStatus = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { cmsStatus } = await import("@/lib/post-store.server");
    return cmsStatus();
  } catch (err) {
    console.error("[cms] status failed", err);
    return { allowed: false, signedIn: false, needsSetup: false, persist: "memory" as const };
  }
});

export const cmsLogin = createServerFn({ method: "POST" })
  .validator((input: unknown): { password: string } => {
    const password = String((input as { password?: unknown })?.password ?? "");
    if (!password.trim()) throw new Error("Passord er påkrevd");
    return { password };
  })
  .handler(async ({ data }) => {
    const { loginCms } = await import("@/lib/post-store.server");
    return loginCms(data.password);
  });

export const cmsSetup = createServerFn({ method: "POST" })
  .validator((input: unknown): { password: string } => {
    const password = String((input as { password?: unknown })?.password ?? "");
    if (!password.trim()) throw new Error("Passord er påkrevd");
    return { password };
  })
  .handler(async ({ data }) => {
    const { setupCms } = await import("@/lib/post-store.server");
    return setupCms(data.password);
  });

export const cmsLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutCms } = await import("@/lib/post-store.server");
  return logoutCms();
});
