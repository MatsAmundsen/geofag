import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getCmsStatus, type CmsStatus } from "@/lib/cms";

/**
 * "Rediger som post" — shown when the visitor may use the hybrid CMS
 * (local `npm run dev`, or a signed-in CMS session on the live site).
 */
export function AdminEditLink({ slug }: { slug: string }) {
  const [status, setStatus] = useState<CmsStatus | null>(null);
  useEffect(() => {
    void getCmsStatus().then(setStatus).catch(() => setStatus(null));
  }, []);
  if (!status?.allowed) return null;

  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm">
      <span className="text-muted-foreground">Redigeringsmodus er på.</span>
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
