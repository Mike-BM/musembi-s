import { createFileRoute } from "@tanstack/react-router";

/** robots.txt is generated so it can point to the sitemap on whatever domain the site is served from. */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = ["User-agent: *", "Allow: /", "Disallow: /admin", "", `Sitemap: ${origin}/sitemap.xml`, ""].join("\n");
        return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
