import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { handlePostsDoOp, memoryDoStorage } from "./posts-durable-object.ts";
import type { Post } from "./post-types.ts";

const seed: Post = {
  id: 1,
  slug: "platetektonikk",
  title: "Platetektonikk",
  summary: "s",
  ingress: "i",
  thumbnail: "/x.jpg",
  bodyMarkdown: "## Jordens dynamiske indre: Litosfære\n\nseed",
  published: 1,
  createdAt: "2026-09-18 00:00:00.000000",
  updatedAt: "2026-09-18 00:00:00.000000",
};

describe("handlePostsDoOp", () => {
  it("seeds Platetektonikk and round-trips a save", async () => {
    const storage = memoryDoStorage();
    const listed = (await handlePostsDoOp(storage, { op: "list" }, seed)) as {
      slug: string;
      bodyMarkdown: string;
    }[];
    assert.equal(listed[0]?.slug, "platetektonikk");
    assert.match(listed[0]?.bodyMarkdown ?? "", /Jordens dynamiske indre/);

    await handlePostsDoOp(
      storage,
      {
        op: "save",
        input: {
          slug: "platetektonikk",
          title: "Platetektonikk",
          summary: "s",
          ingress: "i",
          thumbnail: "/x.jpg",
          bodyMarkdown: "Lagret av Mats — hele kapittelet.",
          published: 1,
        },
      },
      seed,
    );
    const got = (await handlePostsDoOp(storage, { op: "get", slug: "platetektonikk" }, seed)) as {
      bodyMarkdown: string;
    };
    assert.equal(got.bodyMarkdown, "Lagret av Mats — hele kapittelet.");
  });

  it("does not overwrite a short user edit with the seed", async () => {
    const storage = memoryDoStorage();
    await handlePostsDoOp(
      storage,
      {
        op: "save",
        input: {
          slug: "platetektonikk",
          title: "Platetektonikk",
          summary: "s",
          ingress: "i",
          thumbnail: "/x.jpg",
          bodyMarkdown: "Mitt korte utkast.",
          published: 1,
        },
      },
      seed,
    );
    const got = (await handlePostsDoOp(storage, { op: "get", slug: "platetektonikk" }, seed)) as {
      bodyMarkdown: string;
    };
    assert.equal(got.bodyMarkdown, "Mitt korte utkast.");
  });

  it("stores CMS session meta", async () => {
    const storage = memoryDoStorage();
    await handlePostsDoOp(storage, { op: "setMeta", key: "session", value: "abc" }, seed);
    assert.equal(await handlePostsDoOp(storage, { op: "getMeta", key: "session" }, seed), "abc");
  });

  it("fills in missing chapter seeds without overwriting existing posts", async () => {
    const vulkaner: Post = {
      ...seed,
      id: 2,
      slug: "vulkaner",
      title: "Vulkaner",
      bodyMarkdown: "## Magmakjemi\n\nseed",
    };
    const storage = memoryDoStorage();
    await handlePostsDoOp(storage, { op: "list" }, [seed]);
    const afterFirst = (await handlePostsDoOp(storage, { op: "list" }, [seed, vulkaner])) as {
      slug: string;
    }[];
    assert.deepEqual(
      afterFirst.map((p) => p.slug).sort(),
      ["platetektonikk", "vulkaner"],
    );

    await handlePostsDoOp(
      storage,
      {
        op: "save",
        input: {
          slug: "vulkaner",
          title: "Vulkaner",
          summary: "s",
          ingress: "i",
          thumbnail: "/x.jpg",
          bodyMarkdown: "Mitt vulkanutkast.",
          published: 1,
        },
      },
      [seed, vulkaner],
    );
    const got = (await handlePostsDoOp(storage, { op: "get", slug: "vulkaner" }, [
      seed,
      { ...vulkaner, bodyMarkdown: "## Magmakjemi\n\nNY SEED" },
    ])) as { bodyMarkdown: string };
    assert.equal(got.bodyMarkdown, "Mitt vulkanutkast.");
  });
});
