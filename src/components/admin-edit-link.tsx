import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { editingAllowed } from "@/lib/editing";

/**
 * A small "edit this as a post" link, shown ONLY to a signed-in user (the admin
 * path). Regular visitors never see it. With auth disabled locally
 * (`VITE_AUTH_ENABLED=false`) the dev user is always present, so it shows during
 * local editing. It links a hardcoded chapter to its editable post counterpart.
 */
export function AdminEditLink({ slug }: { slug: string }) {
  const { user, isPending } = useCurrentUserState();
  // Option A: no editing affordance off the local dev server.
  if (!editingAllowed || isPending || !user) return null;

  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm">
      <span className="text-muted-foreground">
        Redigeringsmodus — du er innlogget som{" "}
        <span className="text-foreground">{user.displayName ?? "admin"}</span>.
      </span>
      <Link
        to="/poster/$slug/rediger"
        params={{ slug }}
        className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline"
      >
        <Pencil className="size-4" />
        Rediger som post
      </Link>
    </div>
  );
}
