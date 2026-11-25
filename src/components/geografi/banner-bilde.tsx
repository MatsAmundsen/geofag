import {
  BANNER_BREDDE,
  BANNER_HOYDE,
  bannerSrcSet,
  type GeografiBanner,
} from "@/lib/geografi-banner";

/** Kapittelbanner med AVIF/WebP/JPEG og 1×/2×. Heltebildet lastes straks, kortene lazy. */
export function BannerBilde({
  banner,
  sizes,
  hero = false,
  className,
}: {
  banner: GeografiBanner;
  sizes: string;
  hero?: boolean;
  className?: string;
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={bannerSrcSet(banner, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={bannerSrcSet(banner, "webp")} sizes={sizes} />
      <img
        src={`${banner.base}.jpg`}
        srcSet={bannerSrcSet(banner, "jpg")}
        sizes={sizes}
        width={BANNER_BREDDE}
        height={BANNER_HOYDE}
        alt={banner.alt}
        loading={hero ? "eager" : "lazy"}
        decoding={hero ? "sync" : "async"}
        fetchPriority={hero ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}
