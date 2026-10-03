import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading, WhatsAppButton } from "@/components/site/ui";
import { ServiceCard } from "@/components/site/ServiceCard";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Musembi S. Educational Consultancy" },
      { name: "description", content: "Research support, academic writing and editing, proposals, CV writing, tutoring, English–Kiswahili translation, content development and training." },
      { property: "og:title", content: "Our Services — Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Ten services supporting academic achievement, research and professional growth." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Expert support for every stage of learning and work."
        intro="Choose a service to learn more and send an enquiry — we'll respond with next steps tailored to your needs." />
      <section className="container-site py-20 md:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </section>
      <section id="enquire" className="bg-secondary/60 py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeading eyebrow="Service enquiry" title="Tell us what you need." intro="Fill in the form and we'll get back to you through your preferred contact method. Prefer to talk now?" />
            <WhatsAppButton className="mt-6" />
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-soft md:p-10"><EnquiryForm /></div>
        </div>
      </section>
    </>
  );
}
