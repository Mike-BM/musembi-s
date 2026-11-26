import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero, CtaBand, btn } from "@/components/site/ui";
import { Section } from "@/components/site/blocks";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ACADEMIC_INTEGRITY, SERVICE_CATEGORIES } from "@/lib/site";
import { useSite } from "@/lib/portal/context";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Services",
      description: "Educational consultancy, tuition, mentorship, teacher support, CBC/CBE, research, career, language, digital learning, workshops, projects and environmental education.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = useSite();
  const [cat, setCat] = useState<(typeof SERVICE_CATEGORIES)[number]>("All Services");
  const shown = cat === "All Services" ? services : services.filter((s) => s.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support for education, research, careers and community development."
        intro="Our services respond to educational, research, professional and community-development needs. Each engagement is discussed and scoped according to the client’s objectives, the nature of the service and the resources required."
      />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter services">
          {SERVICE_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors",
                cat === c ? "bg-primary text-white" : "bg-secondary text-foreground/80 hover:bg-secondary/70",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
        {shown.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No services in this category.</p>}

        <div className="mt-14 flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-6">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg text-primary-deep">Academic integrity and responsible support</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ACADEMIC_INTEGRITY}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className={btn.primary}>
            <span>Request a Consultation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/how-it-works" className={btn.outline}>
            <span>See How It Works</span>
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
