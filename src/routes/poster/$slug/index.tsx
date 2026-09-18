import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { PosterBody } from "@/components/poster-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getCmsStatus } from "@/lib/cms";
import { getPost } from "@/lib/posts";
import { PLATETEKTONIKK_SEED } from "@/lib/post-seed";
import { topicHead } from "@/lib/seo";

const guestCms = {
  allowed: false,
  signedIn: false,
  needsSetup: true,
  persist: "memory" as const,
};

export const Route = createFileRoute("/poster/$slug/")({
  loader: async ({ params }) => {
    try {
      const [post, cms] = await Promise.all([getPost({ data: params.slug }), getCmsStatus()]);
      if (!post) throw notFound();
      return { post, cms };
    } catch (err) {
      if (params.slug === PLATETEKTONIKK_SEED.slug) {
        console.error("[poster] slug loader failed, using seed", err);
        return { post: { id: 1, ...PLATETEKTONIKK_SEED }, cms: guestCms };
      }
      throw err;
    }
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
              <span className="text-xs text-muted-foreground">Opprettet: {post.createdAt}</span>
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
