import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SectionHeading, CtaBand, btn } from "@/components/site/ui";
import { ARTICLES, type Article } from "@/lib/site";
import { BookOpen, Clock, Calendar, Check, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Guides — Musembi S. Educational Consultancy" },
      { name: "description", content: "Academic research guides, scholarly writing tips, referencing standards (APA/Harvard), and CV development advice." },
      { property: "og:title", content: "Resources — Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Practical frameworks, research methodologies, and educational guides for scholars and professionals." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const categories = [
    "All Categories",
    "Research Methodology",
    "Academic Writing",
    "Career & Documentation",
    "Study Skills",
  ];

  const featured = ARTICLES[0]!;
  const filteredArticles = selectedCategory === "All Categories"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <>
      <PageHero
        eyebrow="Resources & Guides"
        title="Scholarly insights, methodologies, and practical frameworks."
        intro="Practical editorial guides, thesis framing methods, referencing overviews, and career documentation strategies developed to support rigorous scholarship and professional excellence."
      />

      <section className="container-site py-12 sm:py-16 lg:py-20">
        
        {/* Featured Editorial Guide */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Featured Editorial Guide
          </p>
          <article className="rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-soft grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {featured.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 text-gold" />
                  <span>{featured.publishedDate}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 text-gold" />
                  <span>{featured.readTime}</span>
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-normal text-primary-deep leading-tight">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-deep mb-2">
                  Key Methodological Takeaways
                </p>
                <ul className="space-y-1.5 text-xs text-foreground/80">
                  {featured.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-md border border-border/80 bg-secondary/40 p-6 flex flex-col justify-between h-full space-y-5">
              <div>
                <span className="grid h-10 w-10 place-items-center rounded bg-card text-primary border border-border/80 mb-3">
                  <BookOpen className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-primary-deep">
                  Need Help With Your Research Question?
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  Our principal consultant conducts individualized concept note reviews and thesis formulation sessions.
                </p>
              </div>
              <Link
                to="/contact"
                search={{ service: "Educational Consultancy & Research Support" }}
                className={cn(btn.primary, "w-full justify-center text-xs py-2.5")}
              >
                <span>Request Research Review</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-border/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article: Article) => (
            <article
              key={article.slug}
              className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs transition-all hover:border-primary/30 hover:shadow-soft"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-primary">
                  {article.category}
                </span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="mt-4 font-display text-lg font-normal text-primary-deep leading-snug">
                {article.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                {article.excerpt}
              </p>

              <div className="mt-4 pt-3 border-t border-border/50">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-primary/75 mb-1.5">
                  Core Topics
                </p>
                <ul className="space-y-1 text-[0.72rem] text-muted-foreground">
                  {article.highlights.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="line-clamp-1">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[0.68rem] text-muted-foreground">
                  {article.publishedDate}
                </span>
                <Link
                  to="/contact"
                  search={{ service: "Educational Consultancy & Research Support" }}
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Enquire</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Informational Note */}
        <div className="mt-14 rounded-lg border border-border bg-secondary/30 p-6 text-xs text-muted-foreground flex items-start gap-3">
          <FileText className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>About these materials:</strong> All guides and frameworks published here are developed by Musembi S. Educational Consultancy to support scholarly discipline and professional documentation. Individualized assistance and institutional toolkits are available upon enquiry.
          </p>
        </div>
      </section>

      <CtaBand title="Need individualized guidance for your manuscript or thesis?" />
    </>
  );
}
