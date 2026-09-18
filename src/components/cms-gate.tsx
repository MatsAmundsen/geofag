import { useState } from "react";
import { cmsUnlock, type CmsStatus } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CmsGate({
  status,
  onChange,
}: {
  status: CmsStatus;
  onChange: (next: CmsStatus) => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const setup = status.needsSetup;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const next = await cmsUnlock({ data: { password } });
      onChange(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ukjent feil");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="font-display text-2xl font-medium tracking-tight">
        {setup ? "Velg admin-passord" : "Admin-innlogging"}
      </h2>
      <p className="text-sm text-muted-foreground">
        {setup
          ? "Første gang: velg et passord (minst 8 tegn) for å redigere poster på geofag.com."
          : "Skriv inn det samme admin-passordet som du satte forrige gang."}
      </p>
      <div className="space-y-1.5">
        <Label htmlFor="cms-password">Passord</Label>
        <Input
          id="cms-password"
          type="password"
          autoComplete={setup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={setup ? 8 : undefined}
          required
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Vent…" : setup ? "Sett passord" : "Logg inn"}
      </Button>
    </form>
  );
}
