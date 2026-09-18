/**
 * Hybrid CMS posts: database-backed, Markdown-bodied content rendered at request
 * time. Reads are public. Writes are local-dev or CMS-password gated.
 */
export type Post = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  ingress: string;
  thumbnail: string;
  bodyMarkdown: string;
  /** 0 = draft, 1 = published. */
  published: number;
  /** Formatted text, e.g. "2026-07-01 21:02:30.618003". */
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  slug: string;
  title: string;
  summary: string;
  ingress: string;
  thumbnail: string;
  bodyMarkdown: string;
  published: number;
};

export type CmsPersist = "d1" | "do" | "postgres" | "memory";

export type CmsStatus = {
  allowed: boolean;
  signedIn: boolean;
  needsSetup: boolean;
  persist: CmsPersist;
};
