import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero, SectionHeading, CtaBand } from "@/components/site/ui";
import { VALUES } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Musembi S. Educational Consultancy" },
      { name: "description", content: "Our mission, vision and commitment to excellence in education, research support and professional development." },
      { property: "og:title", content: "About Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Transforming education through innovation, mentorship, research support and professional excellence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Transforming education through innovation and mentorship."
        intro="We are dedicated to transforming education through innovation, mentorship, research support, and professional excellence. We empower learners, educators, researchers, professionals, and institutions to unlock their potential, achieve their goals, and thrive in a changing world." />

      <section className="container-site grid gap-10 py-24 md:grid-cols-[1fr_1.3fr] md:py-28">
        <SectionHeading eyebrow="Our approach" title="Reliable. Accessible. Client-centred." />
        <p className="font-display text-2xl leading-snug text-primary-deep md:pt-10 md:text-3xl">
          “Through reliable, accessible, and client-centred services, we support academic achievement, professional development, research excellence, effective communication, and lifelong learning.”
        </p>
      </section>

      <section className="container-site grid gap-6 pb-24 lg:grid-cols-3">
        <div className="rounded-2xl bg-primary p-10 text-primary-foreground">
          <p className="eyebrow text-gold">Our Mission</p>
          <p className="mt-6 text-xl leading-relaxed">To empower learners, educators, researchers, professionals, and institutions through excellence, innovation, mentorship, and lifelong learning.</p>
        </div>
        <div className="rounded-2xl border-2 border-gold/60 bg-accent p-10">
          <p className="eyebrow">Our Vision</p>
          <p className="mt-6 text-xl leading-relaxed text-primary-deep">To establish Musembi S. Educational Consultancy as a premier centre for transformative education, research support, professional development, and lifelong learning.</p>
        </div>
        <div className="rounded-2xl border bg-card p-10 shadow-soft">
          <p className="eyebrow">Our Commitment</p>
          <ul className="mt-6 space-y-3">
            {VALUES.map((v) => (
              <li key={v.title} className="flex items-start gap-3 text-primary-deep">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> <span className="font-medium">{v.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
