import { createFileRoute } from "@tanstack/react-router";

const PATHS = ["/", "/about", "/services", "/training", "/resources", "/articles", "/contact", "/faq", "/how-it-works", "/pricing", "/privacy"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = PATHS.map((p) => `  <url><loc>${origin}${p === "/" ? "" : p}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
