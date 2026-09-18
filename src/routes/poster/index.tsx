import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { listPosts } from "@/lib/posts";
import { topicHead } from "@/lib/seo";

export const Route = createFileRoute("/poster/")({
  loader: async () => {
    const posts = await listPosts();
    return { posts };
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
  const { posts } = Route.useLoaderData();
  const published = posts.filter((p) => p.published === 1);

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

          {published.length === 0 ? (
            <p className="mt-10 text-muted-foreground">Ingen publiserte poster ennå.</p>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {published.map((post) => (
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
                      <h2 className="font-display text-2xl font-medium tracking-tight">
                        {post.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {post.summary}
                      </p>
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
