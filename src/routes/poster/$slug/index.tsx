import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { PosterBody } from "@/components/poster-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { GUEST_CMS, getCmsStatus } from "@/lib/cms";
import { getPost } from "@/lib/posts";
import { posterNeedsRefresh } from "@/lib/poster-fresh";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/poster/$slug/")({
  staleTime: 0,
  preloadStaleTime: 0,
  gcTime: 0,
  shouldReload: true,
  loader: async ({ params }) => {
    // Fetch the post on its own. A CMS-status failure must not replace the
    // saved body with the bundled seed chapter.
    const post = await getPost({ data: params.slug });
    if (!post) throw notFound();
    let cms = GUEST_CMS;
    try {
      cms = await getCmsStatus();
    } catch (err) {
      console.error("[poster] cms status failed", err);
    }
    return { post, cms };
  },
  head: ({ loaderData }) =>
    topicHead({
      title: loaderData ? `${loaderData.post.title} · Post` : "Post",
      description: loaderData?.post.summary ?? "",
      path: `/poster/${loaderData?.post.slug ?? ""}`,
    }),
  component: PostView,
});

function PostView() {
  const { post, cms } = Route.useLoaderData();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const displayed = { bodyMarkdown: post.bodyMarkdown, updatedAt: post.updatedAt };
    void getPost({ data: post.slug }).then((fresh) => {
      if (cancelled || !posterNeedsRefresh(displayed, fresh)) return;
      void router.invalidate();
    });
    return () => {
      cancelled = true;
    };
  }, [post.bodyMarkdown, post.slug, post.updatedAt, router]);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <div className="flex items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">Post</p>
              {post.published === 1 ? null : (
                <span className="rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-muted-foreground">
                  Utkast
                </span>
              )}
            </div>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.ingress ? (
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{post.ingress}</p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="secondary" size="sm">
                <Link to="/poster/$slug/rediger" params={{ slug: post.slug }}>
                  <Pencil className="size-4" />
                  {cms.allowed ? "Rediger" : "Rediger / logg inn"}
                </Link>
              </Button>
              <span className="text-xs text-muted-foreground">
                Sist oppdatert: {post.updatedAt || post.createdAt || "—"}
              </span>
            </div>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt=""
              className="mb-8 w-full rounded-2xl border border-border object-cover"
            />
          ) : null}
          <PosterBody>{post.bodyMarkdown}</PosterBody>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
