import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, btn, WhatsAppButton } from "@/components/site/ui";
import { AUDIENCES, PROGRAMMES, type Programme } from "@/lib/site";
import { Check, Clock, Users, Laptop, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training & Mentorship — Musembi S. Educational Consultancy" },
      { name: "description", content: "Structured academic mentorship, thesis coaching, scholarly writing workshops, proposal training, and institutional capacity building." },
      { property: "og:title", content: "Training & Mentorship — Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Building enduring academic and professional capability through structured workshops and 1-on-1 mentorship." },
    ],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training & Mentorship"
        title="Intellectual capability and practical skills designed for lasting impact."
        intro="Structured academic mentorship, thesis coaching, scholarly writing workshops, proposal training, and institutional capacity building delivered virtually and by arrangement."
      />

      {/* Delivery Models */}
      <section className="container-site py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
            <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
              <Laptop className="h-4 w-4" />
            </div>
            <h3 className="font-display text-lg font-normal text-primary-deep">
              1-on-1 Academic Mentorship
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Personalized sessions focused directly on your dissertation, thesis milestones, or coursework challenges. Scheduled around your availability via Google Meet or Zoom.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
            <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="font-display text-lg font-normal text-primary-deep">
              Small Cohort Seminars
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Intensive, interactive group workshops focusing on core scholarly competencies: research design, academic publishing, and proposal drafting.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
            <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
              <Building2 className="h-4 w-4" />
            </div>
            <h3 className="font-display text-lg font-normal text-primary-deep">
              Institutional Capacity Building
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Tailored training modules designed specifically for academic faculty, NGO project teams, and educational organizations in Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Core Available Programs */}
      <section className="border-t border-border/60 bg-secondary/30 py-16 sm:py-20 lg:py-24">
        <div className="container-site space-y-12">
          <SectionHeading
            eyebrow="Available Programs"
            title="Curriculum & Learning Objectives"
            intro="Explore our core mentorship and training syllabi. Each program is delivered with practical exercises, direct feedback, and comprehensive reference materials."
          />

          <div className="space-y-8">
            {PROGRAMMES.map((prog: Programme) => {
              const Icon = prog.icon;
              return (
                <article
                  key={prog.id}
                  className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-2xs transition-all hover:border-primary/30"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-secondary text-primary border border-border/60 mt-0.5">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-normal text-primary-deep">
                          {prog.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {prog.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:self-start">
                      <span className="inline-flex items-center gap-1.5 rounded bg-secondary px-2.5 py-1 text-xs text-muted-foreground font-medium">
                        <Clock className="h-3 w-3 text-gold" />
                        <span>{prog.duration}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded bg-secondary px-2.5 py-1 text-xs text-muted-foreground font-medium">
                        <span>{prog.format}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/50 grid gap-6 md:grid-cols-12">
                    <div className="md:col-span-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Target Participants
                      </p>
                      <p className="text-xs leading-relaxed text-foreground/80 font-medium">
                        {prog.targetAudience}
                      </p>
                      <div className="pt-3">
                        <Link
                          to="/contact"
                          search={{ service: `Training: ${prog.title}` }}
                          className={cn(btn.primary, "text-xs py-2 px-4 w-full sm:w-auto")}
                        >
                          <span>Enquire / Register</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="md:col-span-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                        Core Learning Objectives
                      </p>
                      <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                        {prog.learningOutcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audiences Supported */}
      <section className="container-site py-16 sm:py-20">
        <SectionHeading
          eyebrow="Participants"
          title="Who we train and mentor."
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {AUDIENCES.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-lg border border-border bg-card p-5 shadow-2xs">
              <Icon className="h-5 w-5 text-primary mb-3" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-primary-deep">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border/80 bg-secondary/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-lg font-normal text-primary-deep">
              Need a tailored institutional training program?
            </h4>
            <p className="text-xs text-muted-foreground">
              We design bespoke workshop curricula for universities, secondary schools, NGOs, and corporate teams.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/contact" search={{ service: "Training & Capacity Building" }} className={btn.primary}>
              Request Institutional Training
            </Link>
            <WhatsAppButton text="Hello, I would like to request customized training for our institution." />
          </div>
        </div>
      </section>
    </>
  );
}
