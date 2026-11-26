import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Check, Clock, Search } from "lucide-react";
import { PageHero, CtaBand, inputCls, btn } from "@/components/site/ui";
import { Section } from "@/components/site/blocks";
import { useSite } from "@/lib/portal/context";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/articles")({
  head: () =>
    pageHead({
      title: "Articles & Insights",
      description: "Educational perspectives, teaching and learning strategies, study and examination guidance, CBC/CBE discussions, research insights and digital-learning practices.",
      path: "/articles",
    }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { articles } = useSite();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const cats = useMemo(() => ["All", ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (cat === "All" || a.category === cat) &&
        (!needle || [a.title, a.excerpt, a.category, ...a.highlights].some((t) => t.toLowerCase().includes(needle))),
    );
  }, [articles, q, cat]);

  return (
    <>
      <PageHero
        eyebrow="Articles & Insights"
        title="Educational perspectives and practical guidance."
        intro="Our Articles & Insights section shares educational perspectives, practical teaching and learning strategies, study and examination guidance, CBC/CBE discussions, research insights, professional-development ideas, digital-learning practices and environmental education."
      />
      <Section>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input type="search" aria-label="Search articles" className={cn(inputCls, "pl-9")} placeholder="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  cat === c ? "bg-primary text-white" : "bg-secondary text-foreground/80 hover:bg-secondary/70",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-14 text-center text-sm text-muted-foreground">
            {articles.length === 0 ? "New articles are being prepared. Please check back soon." : "No articles match your search."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => (
              <article key={a.slug} className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs transition-shadow hover:shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{a.category}</p>
                <h2 className="mt-3 font-display text-lg leading-snug text-primary-deep">{a.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                <ul className="mt-4 space-y-1.5 border-t border-border/50 pt-4 text-xs text-foreground/80">
                  {a.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-gold" aria-hidden="true" />{a.publishedDate}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-gold" aria-hidden="true" />{a.readTime}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link to="/contact" className={btn.outline}>
            <span>Have a topic you would like us to cover? Tell us</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
