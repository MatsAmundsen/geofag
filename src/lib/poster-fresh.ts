/** True when the on-screen post is not the latest stored version. */
export function posterNeedsRefresh(
  displayed: { bodyMarkdown: string; updatedAt: string },
  fresh: { bodyMarkdown: string; updatedAt: string } | null,
): boolean {
  if (!fresh) return false;
  return displayed.bodyMarkdown !== fresh.bodyMarkdown || displayed.updatedAt !== fresh.updatedAt;
}
