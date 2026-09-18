import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GUEST_CMS, getCmsStatus } from "@/lib/cms";
import { listPosts } from "@/lib/posts";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/poster/")({
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  shouldReload: true,
  loader: async () => {
    const posts = await listPosts();
    let cms = GUEST_CMS;
    try {
      cms = await getCmsStatus();
    } catch (err) {
      console.error("[poster] cms status failed", err);
    }
    return { posts, cms };
  },
  head: () =>
    topicHead({
      title: "Poster",
      description: "Redigerbare poster (hybrid CMS) ved siden av de faste kapitlene.",
      path: "/poster",
    }),
  component: PostsIndex,
});

function PostsIndex() {
  const { posts, cms } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const router = useRouter();
  const [newSlug, setNewSlug] = useState("");
  const visible = cms.allowed ? posts : posts.filter((p) => p.published === 1);

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    const slug = newSlug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!slug) return;
    void navigate({ to: "/poster/$slug/rediger", params: { slug } });
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Hybrid CMS</p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Poster
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Databasedrevne, redigerbare innlegg. De faste kapitlene er fortsatt vanlige kodede
            sider — dette er testsporet ved siden av dem.
          </p>

          {cms.allowed ? (
            <form onSubmit={onCreate} className="mt-8 flex flex-wrap items-end gap-3">
              <div className="min-w-56 flex-1">
                <label htmlFor="new-slug" className="text-xs font-medium text-muted-foreground">
                  Ny post (slug)
                </label>
                <Input
                  id="new-slug"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="f.eks. vulkaner"
                />
              </div>
              <Button type="submit" size="sm">
                <Plus className="size-4" />
                Opprett
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  void router.navigate({ to: "/poster/$slug/rediger", params: { slug: "platetektonikk" } });
                }}
              >
                <Pencil className="size-4" />
                Rediger
              </Button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              For å redigere: åpne{" "}
              <Link
                to="/poster/$slug/rediger"
                params={{ slug: "platetektonikk" }}
                className="text-primary underline-offset-4 hover:underline"
              >
                redigeringssiden
              </Link>{" "}
              og {cms.needsSetup ? "velg et admin-passord (minst 8 tegn)" : "logg inn med admin-passord"}.
            </p>
          )}

          {visible.length === 0 ? (
            <p className="mt-10 text-muted-foreground">Ingen publiserte poster ennå.</p>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {visible.map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/poster/$slug"
                    params={{ slug: post.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
                  >
                    {post.thumbnail ? (
                      <div className="relative aspect-photo overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-2xl font-medium tracking-tight">
                          {post.title}
                        </h2>
                        {post.published === 1 ? null : (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            Utkast
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-primary">
                        Les posten
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
