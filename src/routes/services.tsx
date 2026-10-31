import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, SectionHeading, WhatsAppButton, btn } from "@/components/site/ui";
import { ServiceCard } from "@/components/site/ServiceCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SERVICES, SERVICE_CATEGORIES, type Service } from "@/lib/site";
import { BookOpen, FileCheck, Languages, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Musembi S. Educational Consultancy" },
      { name: "description", content: "Academic research support, scholarly editing, proposal drafting, CV review, online tutoring, and English–Kiswahili translation for scholars and institutions." },
      { property: "og:title", content: "Our Services — Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Ten specialized services supporting academic achievement, research rigor, and professional growth." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [activeTab, setActiveTab] = useState<typeof SERVICE_CATEGORIES[number]>("All Services");

  const filteredServices = activeTab === "All Services"
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeTab);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Expert support for every stage of study, research, and professional work."
        intro="Browse our specialized services across academic research, scholarly writing, career documentation, bilingual translation, and institutional capacity building."
      />

      {/* Services Directory Section */}
      <section className="container-site py-12 sm:py-16 lg:py-20">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-border/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2">
            Filter by:
          </span>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                activeTab === cat
                  ? "bg-primary text-white shadow-2xs"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Differentiated Practice Pillars (Deep Dive) */}
      <section className="border-t border-border/60 bg-secondary/30 py-16 sm:py-20">
        <div className="container-site space-y-16">
          <SectionHeading
            eyebrow="Service Structure"
            title="How our practice areas work together."
            intro="We organize our engagements to ensure clear deliverables, measurable progress, and academic integrity."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-normal text-primary-deep">
                1. Academic & Research
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Targeted support for theses, dissertations, methodology instruments, and proposal concept notes.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-normal text-primary-deep">
                2. Documentation & Career
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                High-impact academic CVs, executive resumes, institutional manuals, and publication-ready editing.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
                <Languages className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-normal text-primary-deep">
                3. Linguistic & Translation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                High-fidelity English ↔ Kiswahili translation for research instruments, surveys, and formal texts.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded bg-secondary text-primary flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-normal text-primary-deep">
                4. Mentorship & Training
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                One-to-one virtual tutoring, research coaching, and structured faculty and team workshops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquire" className="container-site py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow="Request a Service"
              title="Tell us about your requirements."
              intro="Submit an enquiry below with your specific requirements, stage, and timeline. We review each submission personally and respond within 24 hours."
            />
            <div className="space-y-3 pt-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                Prefer immediate assistance?
              </p>
              <WhatsAppButton text="Hello Musembi S. Educational Consultancy, I would like to enquire about your services." />
            </div>
          </div>

          <div className="lg:col-span-7 rounded-lg border border-border bg-card p-6 sm:p-8 shadow-soft">
            <h3 className="font-display text-xl font-normal text-primary-deep mb-6">
              Consultation & Service Enquiry
            </h3>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
