import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Download, Search } from "lucide-react";
import { PageHero, CtaBand, inputCls } from "@/components/site/ui";
import { Section } from "@/components/site/blocks";
import { useSite } from "@/lib/portal/context";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () =>
    pageHead({
      title: "Resources",
      description: "Study guides, teaching and learning materials, curriculum and assessment insights, research guidance and professional-development resources.",
      path: "/resources",
    }),
  component: ResourcesPage,
});

const distinct = (xs: (string | undefined)[]) => Array.from(new Set(xs.filter((x): x is string => !!x))).sort();

function ResourcesPage() {
  const { publications } = useSite();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [audience, setAudience] = useState("");
  const [subject, setSubject] = useState("");

  const types = useMemo(() => distinct(publications.map((p) => p.category)), [publications]);
  const levels = useMemo(() => distinct(publications.map((p) => p.level)), [publications]);
  const audiences = useMemo(() => distinct(publications.map((p) => p.audience)), [publications]);
  const subjects = useMemo(() => distinct(publications.map((p) => p.subject)), [publications]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return publications.filter(
      (p) =>
        (!type || p.category === type) &&
        (!level || p.level === level) &&
        (!audience || p.audience === audience) &&
        (!subject || p.subject === subject) &&
        (!needle || [p.title, p.description, p.subject ?? "", ...p.topics].some((t) => t.toLowerCase().includes(needle))),
    );
  }, [publications, q, type, level, audience, subject]);

  const select = (label: string, value: string, set: (v: string) => void, options: string[]) =>
    options.length > 0 && (
      <select aria-label={label} className={cn(inputCls, "sm:w-auto")} value={value} onChange={(e) => set(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Knowledge and resources for learning, teaching and professional growth."
        intro="The Resources section provides useful materials and practical insights for learners, educators, researchers and professionals: study guides, subject notes, revision exercises, teaching and learning materials, curriculum and assessment insights, research guidance, professional-development materials, digital-learning resources and environmental-education content."
      />
      <Section>
        <div className="mb-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
          <div className="relative min-w-0 flex-1 sm:min-w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input type="search" aria-label="Search resources by keyword" className={cn(inputCls, "pl-9")} placeholder="Search resources by keyword" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {select("All types", type, setType, types)}
          {select("All subjects", subject, setSubject, subjects)}
          {select("All levels", level, setLevel, levels)}
          {select("All audiences", audience, setAudience, audiences)}
        </div>

        {shown.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card px-6 py-14 text-center">
            <p className="text-sm text-muted-foreground">
              {publications.length === 0 ? "Resources are being prepared. Please check back soon, or ask us about materials for your needs." : "No resources match your search."}
            </p>
            <Link to="/contact" search={{ service: "Content and learning-resource development" }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Ask about a resource <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <article key={p.id} className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs transition-shadow hover:shadow-soft">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="rounded bg-secondary px-2.5 py-0.5 font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                  <span className="text-muted-foreground">{p.publishedDate}</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-primary-deep">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                {(p.audience || p.level || p.subject) && (
                  <p className="mt-3 text-xs text-muted-foreground">{[p.subject, p.level, p.audience].filter(Boolean).join(" · ")}</p>
                )}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <span>{[p.fileFormat, p.fileSize, p.readTimeOrPages].filter(Boolean).join(" · ")}</span>
                  {p.downloadUrl ? (
                    <a href={p.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                      <span>Download</span>
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link to="/contact" search={{ service: "Content and learning-resource development" }} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                      <span>Request access</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-lg border border-border bg-secondary/40 p-6">
          <h2 className="font-display text-lg text-primary-deep">Resource access</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Selected resources may be freely accessible. Specialised publications, handbooks, training materials or customised resources may be offered for purchase or supplied through an agreed service. For practical insights and guidance, visit{" "}
            <Link to="/articles" className="font-semibold text-primary underline underline-offset-4">Articles &amp; Insights</Link>.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
