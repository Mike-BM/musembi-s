import { createFileRoute } from "@tanstack/react-router";
import { fetchUpload } from "@/lib/portal/content.server";

/** Serves files uploaded in the admin portal (stored on the private data branch, not in the public folder). */
export const Route = createFileRoute("/files/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const name = (params as { _splat?: string })._splat ?? "";
        try {
          const file = await fetchUpload(name);
          if (!file) return new Response("Not found", { status: 404 });
          return new Response(file.body, {
            headers: {
              "Content-Type": file.type,
              "Content-Disposition": `inline; filename="${name}"`,
              "Cache-Control": "public, max-age=3600",
              "X-Content-Type-Options": "nosniff",
            },
          });
        } catch (e) {
          console.error("File route error", e);
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
