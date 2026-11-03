import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  BookOpen, Clock, Calendar, Check, ArrowRight, FileText,
  Upload, FileUp, Sparkles, FolderDown, Download, Plus, X,
  Layers, CheckCircle2, AlertCircle
} from "lucide-react";
import { PageHero, SectionHeading, CtaBand, btn } from "@/components/site/ui";
import { ARTICLES, INITIAL_PUBLICATIONS, type Article, type Publication } from "@/lib/site";
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
  const [publications, setPublications] = useState<Publication[]>(INITIAL_PUBLICATIONS);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newPub, setNewPub] = useState({
    title: "",
    category: "Training Manual" as Publication["category"],
    description: "",
    topics: "",
    fileSize: "1.8 MB",
    pages: "24 pages",
  });

  const categories = [
    "All Categories",
    "Research Methodology",
    "Academic Writing",
    "Career & Documentation",
    "Study Skills",
    "Training Manuals",
    "Scholarly Articles",
    "Newsletters",
  ];

  const featured = ARTICLES[0]!;

  const filteredArticles = selectedCategory === "All Categories"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory);

  const filteredPublications = selectedCategory === "All Categories"
    ? publications
    : selectedCategory === "Training Manuals"
    ? publications.filter((p) => p.category === "Training Manual")
    : selectedCategory === "Scholarly Articles"
    ? publications.filter((p) => p.category === "Scholarly Article")
    : selectedCategory === "Newsletters"
    ? publications.filter((p) => p.category === "Newsletter")
    : [];

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPub.title.trim() || !newPub.description.trim()) {
      toast.error("Please enter a title and description for the publication.");
      return;
    }

    const created: Publication = {
      id: `pub-${Date.now()}`,
      title: newPub.title.trim(),
      category: newPub.category,
      publishedDate: "November 2026",
      readTimeOrPages: newPub.pages || "12 pages",
      fileFormat: "PDF",
      fileSize: newPub.fileSize || "1.5 MB",
      description: newPub.description.trim(),
      topics: newPub.topics
        ? newPub.topics.split(",").map((t) => t.trim()).filter(Boolean)
        : ["Educational Practice", "Institutional Advisory"],
    };

    setPublications([created, ...publications]);
    toast.success(`Publication "${created.title}" successfully indexed into the repository.`);
    setShowUploadModal(false);
    setNewPub({
      title: "",
      category: "Training Manual",
      description: "",
      topics: "",
      fileSize: "1.8 MB",
      pages: "24 pages",
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Resources & Guides"
        title="Scholarly insights, methodologies, and practical frameworks."
        intro="Practical editorial guides, thesis framing methods, referencing overviews, and career documentation strategies developed to support rigorous scholarship and professional excellence."
      />

      <section className="container-site py-12 sm:py-16 lg:py-20">
        
        {/* RESOURCE SYSTEM UPDATE: Feature Implementation Alert Strip */}
        <div className="mb-10 rounded-lg border border-gold/40 bg-gold/5 p-4 sm:p-5 text-xs text-primary-deep shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-gold/20 text-gold-dark mt-0.5">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-bold uppercase tracking-wider text-primary-deep text-[0.72rem]">
                  Resource System Update · Editorial Feature Note
                </p>
                <p className="mt-0.5 text-muted-foreground leading-relaxed">
                  Added dynamic publication management action icon and section layout allowing users to access and upload recent publications — ranging from Training Manuals to Articles and Newsletters.
                </p>
              </div>
            </div>
            
            {/* Dynamic Publication Action Button */}
            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className={cn(btn.primary, "py-2 px-3.5 text-xs shadow-2xs cursor-pointer inline-flex items-center gap-2")}
                aria-label="Upload publication"
              >
                <FileUp className="h-4 w-4 text-gold" />
                <span>Upload Publication</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Editorial Guide */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Featured Editorial Guide & Publications
            </p>
            <span className="text-[0.68rem] text-gold font-bold uppercase tracking-wider bg-secondary px-2.5 py-1 rounded">
              Verified Practice Framework
            </span>
          </div>
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

        {/* Dynamic Publications Section (Training Manuals, Scholarly Articles & Newsletters) */}
        {(selectedCategory === "All Categories" ||
          selectedCategory === "Training Manuals" ||
          selectedCategory === "Scholarly Articles" ||
          selectedCategory === "Newsletters") && filteredPublications.length > 0 && (
          <div className="mb-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <h3 className="font-display text-xl font-normal text-primary-deep">
                  Publications Repository
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Direct access to institutional training manuals, pre-submission reviews, and quarterly advisory bulletins.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-deep cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Submit New Publication</span>
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs transition-all hover:border-primary/40 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded font-semibold uppercase tracking-wider text-[0.68rem]",
                      pub.category === "Training Manual" ? "bg-amber-100 text-amber-900 border border-amber-200" :
                      pub.category === "Scholarly Article" ? "bg-blue-100 text-blue-900 border border-blue-200" :
                      "bg-emerald-100 text-emerald-900 border border-emerald-200"
                    )}>
                      {pub.category}
                    </span>
                    <span className="text-muted-foreground text-[0.7rem]">{pub.publishedDate}</span>
                  </div>

                  <h4 className="mt-4 font-display text-base font-semibold text-primary-deep leading-snug">
                    {pub.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                    {pub.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/50">
                    <ul className="space-y-1 text-[0.72rem] text-muted-foreground mb-3">
                      {pub.topics.map((t, i) => (
                        <li key={i} className="line-clamp-1">• {t}</li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between text-[0.72rem] text-muted-foreground pt-2 border-t border-border/40">
                      <span>{pub.fileFormat} · {pub.fileSize} ({pub.readTimeOrPages})</span>
                      <Link
                        to="/contact"
                        search={{ service: `Publication Access: ${pub.title}` }}
                        className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>Access Document</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-border/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
            Filter by:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                selectedCategory === cat
                  ? "bg-primary text-white shadow-2xs"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 && (
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
                    Published: {article.publishedDate}
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
        )}

        {/* Informational Note */}
        <div className="mt-14 rounded-lg border border-border bg-secondary/30 p-6 text-xs text-muted-foreground flex items-start gap-3">
          <FileText className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>About these materials:</strong> All guides and frameworks published here are developed by Musembi S. Educational Consultancy to support scholarly discipline and professional documentation. Individualized assistance and institutional toolkits are available upon enquiry.
          </p>
        </div>
      </section>

      {/* Dynamic Publication Upload Modal */}
      {showUploadModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
        >
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xl animate-scale-in">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
              <div className="grid h-10 w-10 place-items-center rounded bg-secondary text-primary">
                <FileUp className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 id="upload-modal-title" className="font-display text-lg font-semibold text-primary-deep">
                  Upload & Register Publication
                </h3>
                <p className="text-xs text-muted-foreground">
                  Index a new Training Manual, Scholarly Article, or Newsletter.
                </p>
              </div>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-primary-deep mb-1">
                  Publication Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CBC Classroom Assessment and Facilitation Toolkit"
                  value={newPub.title}
                  onChange={(e) => setNewPub({ ...newPub, title: e.target.value })}
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-primary-deep mb-1">
                    Publication Type *
                  </label>
                  <select
                    value={newPub.category}
                    onChange={(e) => setNewPub({ ...newPub, category: e.target.value as Publication["category"] })}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Training Manual">Training Manual</option>
                    <option value="Scholarly Article">Scholarly Article</option>
                    <option value="Newsletter">Newsletter</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-primary-deep mb-1">
                    Scope / Length
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 32 pages"
                    value={newPub.pages}
                    onChange={(e) => setNewPub({ ...newPub, pages: e.target.value })}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-primary-deep mb-1">
                  Summary / Abstract *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe the educational scope, target beneficiaries, and core findings/modules..."
                  value={newPub.description}
                  onChange={(e) => setNewPub({ ...newPub, description: e.target.value })}
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-primary-deep mb-1">
                  Core Topics / Keywords (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CBC Framework, Junior School, Rubric Design"
                  value={newPub.topics}
                  onChange={(e) => setNewPub({ ...newPub, topics: e.target.value })}
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="rounded-md border border-dashed border-border bg-secondary/30 p-4 text-center">
                <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                <p className="text-[0.72rem] text-muted-foreground">
                  Document file ready for indexing (PDF, DOCX up to 25MB)
                </p>
                <p className="text-[0.68rem] text-gold font-medium mt-1">
                  Pre-Submission Quality Review Applied Automatically
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-md border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={cn(btn.primary, "py-2 px-5 text-xs cursor-pointer")}
                >
                  Register Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Closing Call to Action with authentic wording */}
      <CtaBand
        title="Need individualized guidance for your manuscript or thesis?"
        text="Whether you are preparing a research thesis, refining a grant proposal, or seeking one-to-one mentorship, we provide tailored guidance grounded in academic integrity."
        button="Request a Consultation"
      />
    </>
  );
}
