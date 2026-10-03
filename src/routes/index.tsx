import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, Eye } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { SERVICES, VALUES } from "@/lib/site";
import { btn, SectionHeading, CtaBand, Motif } from "@/components/site/ui";
import { ServiceCard } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musembi S. Educational Consultancy — Learning, Research & Professional Excellence" },
      { name: "description", content: "Research support, academic writing, mentorship, tutoring, translation and training for learners, educators, researchers, professionals and institutions." },
      { property: "og:title", content: "Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Empowering learning. Advancing research. Building professional excellence." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-secondary lg:block" aria-hidden="true" />
        <div className="container-site relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="animate-rise">
            <p className="eyebrow">Education · Research · Mentorship</p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] text-primary-deep sm:text-5xl xl:text-6xl">
              Empowering Learning. Advancing Research. <span className="italic text-primary">Building Professional Excellence.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We are dedicated to transforming education through innovation, mentorship, research support, and professional excellence. We empower learners, educators, researchers, professionals, and institutions to unlock their potential, achieve their goals, and thrive in a changing world.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/services" className={btn.primary}>Explore Our Services <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/contact" className={btn.outline}>Get in Touch</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -left-10 -top-10 h-40 w-40 text-gold"><Motif className="h-full w-full [&_.stroke-primary-foreground\/40]:stroke-primary/30 [&_.stroke-primary-foreground\/30]:stroke-primary/20" /></div>
            <div className="relative overflow-hidden rounded-2xl shadow-lift">
              <img src={hero} alt="A mentor reviewing research papers with a young researcher" width={1280} height={1536} className="aspect-[5/6] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 max-w-[15rem] rounded-xl border bg-card p-5 shadow-lift md:-left-10">
              <span className="gold-rule" />
              <p className="mt-3 font-display text-lg leading-snug text-primary-deep">Together, we learn. Together, we grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-site grid gap-10 py-24 md:grid-cols-[1fr_1.4fr] md:py-32">
        <SectionHeading eyebrow="Who we are" title="A consultancy built around learning that lasts." />
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground md:pt-10">
          <p>Musembi S. Educational Consultancy supports academic achievement, professional development, research excellence, effective communication, and lifelong learning.</p>
          <p>Through reliable, accessible, and client-centred services, we work alongside individuals and institutions — from a first research proposal to a polished CV, a translated document, or a full training programme.</p>
          <Link to="/about" className="inline-flex items-center gap-2 pt-2 text-base font-semibold text-primary hover:gap-3 transition-all">More about us <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-secondary/60 py-24 md:py-28">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="What we do" title="Support across study, research and work." />
            <Link to="/services" className={btn.outline}>View all services</Link>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Why choose us — list layout, not cards */}
      <section className="container-site py-24 md:py-32">
        <SectionHeading eyebrow="Why choose us" title="Principles that guide every engagement." align="center" />
        <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ title, text, icon: Icon }) => (
            <div key={title} className="flex gap-5 border-t pt-8">
              <Icon className="h-7 w-7 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-bold text-primary-deep">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / vision */}
      <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
        <Motif className="absolute -left-24 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 opacity-15" />
        <div className="container-site relative grid gap-14 py-24 md:grid-cols-2 md:py-28">
          {[
            { icon: Target, label: "Our Mission", text: "To empower learners, educators, researchers, professionals, and institutions through excellence, innovation, mentorship, and lifelong learning." },
            { icon: Eye, label: "Our Vision", text: "To establish Musembi S. Educational Consultancy as a premier centre for transformative education, research support, professional development, and lifelong learning." },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label}>
              <div className="flex items-center gap-3 text-gold"><Icon className="h-5 w-5" strokeWidth={1.5} /><p className="eyebrow text-gold">{label}</p></div>
              <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
