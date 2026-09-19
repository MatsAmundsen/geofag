import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CmsGate } from "@/components/cms-gate";
import { PosterBody } from "@/components/poster-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chapterMetaBySlug } from "@/lib/chapter-posts";
import { GUEST_CMS, cmsLogout, getCmsStatus, type CmsStatus } from "@/lib/cms";
import { deletePost, getPost, savePost, type Post } from "@/lib/posts";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/poster/$slug/rediger")({
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  shouldReload: true,
  loader: async ({ params }) => {
    const post = await getPost({ data: params.slug });
    let cms = GUEST_CMS;
    try {
      cms = await getCmsStatus();
    } catch (err) {
      console.error("[poster] editor cms status failed", err);
    }
    return { post, slug: params.slug, cms };
  },
  head: () => topicHead({ title: "Rediger post", description: "", path: "" }),
  component: EditPost,
});

/** Empty draft used when editing a slug that does not exist yet (create mode). */
function emptyPost(slug: string): Post {
  return {
    id: 0,
    slug,
    title: "",
    summary: "",
    ingress: "",
    thumbnail: "",
    bodyMarkdown: "",
    published: 0,
    createdAt: "",
    updatedAt: "",
  };
}

type Status = { kind: "idle" | "saving" | "saved" | "error"; message?: string };

function EditPost() {
  const { post: loaded, slug, cms: initialCms } = Route.useLoaderData();
  const chapterMeta = chapterMetaBySlug(slug);
  const router = useRouter();
  const navigate = Route.useNavigate();
  const [cms, setCms] = useState<CmsStatus>(initialCms);

  const initial = loaded ?? emptyPost(slug);
  const [title, setTitle] = useState(initial.title);
  const [summary, setSummary] = useState(initial.summary);
  const [ingress, setIngress] = useState(initial.ingress);
  const [thumbnail, setThumbnail] = useState(initial.thumbnail);
  const [createdAt, setCreatedAt] = useState(initial.createdAt);
  const [publishedField, setPublishedField] = useState(String(initial.published));
  const [body, setBody] = useState(initial.bodyMarkdown);
  const [previewBody, setPreviewBody] = useState(initial.bodyMarkdown);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    const timer = window.setTimeout(() => setPreviewBody(body), 300);
    return () => window.clearTimeout(timer);
  }, [body]);

  const exists = (loaded?.id ?? 0) > 0;
  const readOnly = !cms.allowed;
  const headings = markdownH2(body);

  async function refresh() {
    await router.invalidate();
  }

  async function onSave() {
    if (readOnly) return;
    setStatus({ kind: "saving" });
    try {
      await savePost({
        data: {
          slug,
          title,
          summary,
          ingress,
          thumbnail,
          bodyMarkdown: body,
          published: Number(publishedField) === 1 ? 1 : 0,
        },
      });
      await refresh();
      setStatus({ kind: "saved" });
    } catch (err) {
      setStatus({ kind: "error", message: errorText(err) });
    }
  }

  async function onDelete() {
    if (readOnly) return;
    if (!confirm(`Slette posten «${title || slug}»? Dette kan ikke angres.`)) return;
    setStatus({ kind: "saving" });
    try {
      await deletePost({ data: slug });
      await refresh();
      void navigate({ to: "/poster" });
    } catch (err) {
      setStatus({ kind: "error", message: errorText(err) });
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {cms.persist === "memory" ? (
          <div className="mb-6 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
            Poster kjører uten varig lagring akkurat nå — det du lagrer forsvinner
            når serveren restarter. Etter siste deploy med Durable Object / D1 er
            endringene varige.
          </div>
        ) : null}

        {readOnly ? (
          <div className="mb-10">
            <h1 className="mb-6 font-display text-4xl font-medium tracking-tight">Rediger post</h1>
            <CmsGate
              status={cms}
              onChange={(next) => {
                setCms(next);
                void refresh();
              }}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-medium tracking-tight">Rediger post</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {loaded
                    ? `Sist oppdatert: ${loaded.updatedAt || "—"}`
                    : `Ny post · slug: ${slug}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={status} />
                {chapterMeta ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      void router.invalidate().then(() => {
                        window.location.href = chapterMeta.path;
                      });
                    }}
                  >
                    Gå til kapittelet (Live)
                  </Button>
                ) : null}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    void router.invalidate().then(() =>
                      navigate({ to: "/poster/$slug", params: { slug } }),
                    );
                  }}
                >
                  Se posten
                </Button>
                <Button size="sm" onClick={onSave} disabled={status.kind === "saving"}>
                  {status.kind === "saving" ? "Lagrer…" : "Lagre"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    void cmsLogout().then((next) => {
                      setCms(next);
                      void refresh();
                    });
                  }}
                >
                  Logg ut
                </Button>
              </div>
            </div>

            <form
              className="mt-8 space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                void onSave();
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Title of post">
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </Field>
                <Field label="Catchy summary">
                  <Input value={summary} onChange={(e) => setSummary(e.target.value)} />
                </Field>
                <Field label="1 sentence ingress">
                  <Input value={ingress} onChange={(e) => setIngress(e.target.value)} />
                </Field>
                <Field label="Thumbnail, e.g. '/images/nice-image.jpg'">
                  <Input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
                </Field>
                <Field label="Date Created Year-Month-Day HH:MM:SS.000000">
                  <Input
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    placeholder="settes automatisk"
                    disabled
                  />
                </Field>
                <Field label="Not published=0, Published=1">
                  <Input
                    value={publishedField}
                    inputMode="numeric"
                    onChange={(e) => setPublishedField(e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Field
                  label={`Hele kapittelet (markdown) · ${body.length.toLocaleString("nb-NO")} tegn`}
                >
                  <p className="text-xs text-muted-foreground">
                    Rull inne i feltet for å redigere hele fagteksten, ikke bare starten. Diagrammer,
                    quizer, kart og den interaktive modellen vises i forhåndsvisningen til høyre.
                    Bilder: /images/image.jpg
                  </p>
                  {headings.length > 0 ? (
                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer">
                        {headings.length} avsnitt i kapittelet
                      </summary>
                      <ul className="mt-1 list-disc space-y-0.5 pl-4">
                        {headings.map((heading) => (
                          <li key={heading}>{heading}</li>
                        ))}
                      </ul>
                    </details>
                  ) : null}
                  <Textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    spellCheck={false}
                    className="h-[min(70vh,44rem)] min-h-[24rem] resize-y overflow-y-auto font-mono text-xs leading-relaxed"
                  />
                </Field>
                <div className="lg:sticky lg:top-6 lg:self-start">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Forhåndsvisning (sanntid)
                  </p>
                  <div className="mt-3 max-h-[min(70vh,44rem)] overflow-y-auto rounded-2xl border border-border bg-card p-6">
                    <h2 className="font-display text-3xl font-medium tracking-tight">
                      {title || "Uten tittel"}
                    </h2>
                    {ingress ? (
                      <p className="mt-3 text-lg text-muted-foreground">{ingress}</p>
                    ) : null}
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt=""
                        className="mt-6 w-full rounded-xl border border-border object-cover"
                      />
                    ) : null}
                    <div className="mt-6">
                      <PosterBody>{previewBody}</PosterBody>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={status.kind === "saving"}>
                  {status.kind === "saving" ? "Lagrer…" : "Lagre"}
                </Button>
                {exists ? (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={onDelete}
                    disabled={status.kind === "saving"}
                  >
                    Slett post
                  </Button>
                ) : null}
              </div>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function markdownH2(md: string): string[] {
  return [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1] ?? "").filter(Boolean);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  if (status.kind === "saved") {
    return <span className="text-sm text-primary">Lagret ✓</span>;
  }
  if (status.kind === "error") {
    return <span className="text-sm text-destructive">Feil: {status.message}</span>;
  }
  return null;
}

function errorText(err: unknown): string {
  if (err instanceof Error) {
    if (err.message === "Unauthorized") return "Du må være innlogget for å lagre.";
    return err.message;
  }
  return "Ukjent feil";
}
