export type PosterPlaceholderStatus = "ready" | "loading" | "error";

/**
 * Placeholder while a poster chapter has no markdown.
 * A resolved empty body is the same failure as a failed fetch.
 * Loading keeps the spinner text.
 */
export function posterPlaceholderText(status: PosterPlaceholderStatus): string {
  if (status === "loading") return "Laster teksten…";
  return "Teksten kunne ikke lastes.";
}
