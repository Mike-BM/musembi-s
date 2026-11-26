import { BRAND } from "@/lib/site";

type JsonLd = Record<string, unknown>;

/** Consistent per-page head: unique title, description and social metadata. */
export function pageHead({
  title,
  description,
  path,
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: JsonLd;
}) {
  const full = path === "/" ? `${BRAND.name} — ${BRAND.tagline}` : `${title} — ${BRAND.name}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BRAND.name },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
    ...(jsonLd ? { scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] } : {}),
  };
}
