import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/ui";
import { ARTICLES } from "@/lib/site";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Musembi S. Educational Consultancy" },
      { name: "description", content: "Articles and guidance on research, academic writing, career development and lifelong learning." },
      { property: "og:title", content: "Resources — Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Research tips, writing guidance and professional development resources." },
    ],
  }),
  component: Resources,
});

function Resources() {
  const [featured, ...rest] = ARTICLES;
  return (
    <>
      <PageHero eyebrow="Resources" title="Insights for learning, research and work."
        intro="Practical articles and guides. New resources are being prepared and will be published here soon." />
      <section className="container-site py-20 md:py-24">
        <article className="grid gap-8 rounded-2xl border bg-card p-8 shadow-soft md:grid-cols-[1fr_1.2fr] md:p-12">
          <div className="flex aspect-[4/3] items-end rounded-xl bg-primary p-6"><span className="eyebrow text-gold">{featured.category}</span></div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Featured · Coming soon</p>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary-deep">{featured.title}</h2>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{featured.readTime}</p>
          </div>
        </article>
        <div className="mt-8 grid gap-x-8 gap-y-2 md:grid-cols-2">
          {rest.map((a) => (
            <article key={a.slug} className="group border-b py-8">
              <p className="eyebrow">{a.category}</p>
              <h3 className="mt-3 text-xl font-bold text-primary-deep transition group-hover:text-primary">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{a.readTime} · Coming soon</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Need personalised guidance?" />
    </>
  );
}
