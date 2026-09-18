import { DurableObject } from "cloudflare:workers";
import { PLATETEKTONIKK_SEED } from "./src/lib/post-seed";
import { handlePostsDoRequest } from "./src/lib/posts-durable-object";

const seed = { id: 1, ...PLATETEKTONIKK_SEED };

/**
 * SQLite-backed Durable Object that holds CMS posts and the admin session.
 * Exported from the Worker entry via Nitro's `exports.cloudflare.ts` merge.
 */
export class PostsDurableObject extends DurableObject {
  fetch(request: Request): Promise<Response> {
    return handlePostsDoRequest(this.ctx.storage, request, seed);
  }
}
