/** Bumped in storage when the seeded chapter list changes, so existing rows are not re-read on every visit. */
export const CHAPTER_SEED_FLAG = "chapter-seed-version";

export function chapterSeedVersion(slugs: readonly string[]): string {
  return slugs.join("\n");
}

export function chapterSeedIsCurrent(saved: string | null | undefined, version: string): boolean {
  return saved === version;
}
