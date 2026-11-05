import {
  GEO_MARIA_CHANNEL,
  youtubeNocookieEmbedSrc,
  youtubeWatchUrl,
} from "@/lib/youtube-geo-maria";

/** Responsiv, personvernvennlig YouTube-innbygging med synlig tittel, kanal og lengde. */
export function YouTubeVideo({
  youtubeId,
  title,
  duration,
}: {
  youtubeId: string;
  title: string;
  duration: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-card">
      <figcaption className="border-b border-border px-4 py-3 sm:px-5">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Video · {GEO_MARIA_CHANNEL}
        </p>
        <p className="mt-1 font-display text-lg font-medium tracking-tight">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          <span>{duration}</span>
          <span aria-hidden="true"> · </span>
          <a
            href={youtubeWatchUrl(youtubeId)}
            className="font-medium text-primary underline underline-offset-2"
          >
            Åpne på YouTube
          </a>
        </p>
      </figcaption>
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full"
          src={youtubeNocookieEmbedSrc(youtubeId)}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </figure>
  );
}
