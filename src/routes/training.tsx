import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, btn, WhatsAppButton } from "@/components/site/ui";
import { AUDIENCES, PROGRAMMES } from "@/lib/site";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training & Mentorship — Musembi S. Educational Consultancy" },
      { name: "description", content: "Academic mentorship, research support, online tutoring, workshops and capacity building for learners, educators, researchers, professionals and institutions." },
      { property: "og:title", content: "Training & Mentorship — Musembi S." },
      { property: "og:description", content: "Workshops, tutoring and mentorship for individuals and institutions." },
    ],
  }),
  component: Training,
});

function Training() {
  return (
    <>
      <PageHero eyebrow="Training & Mentorship" title="Guidance that builds lasting capability."
        intro="Training, workshops, tutoring and mentorship designed around real goals — for individuals and for teams." />

      <section className="container-site py-20 md:py-24">
        <SectionHeading eyebrow="Who we support" title="From individual learners to whole institutions." />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {AUDIENCES.map(({ title, icon: Icon }) => (
            <li key={title} className="flex flex-col items-start gap-4 border-l-2 border-gold py-2 pl-5">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-bold text-primary-deep">{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary/60 py-20 md:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Programmes" title="How we can work together." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMMES.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-xl border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-6 w-6" strokeWidth={1.5} /></span>
                <h3 className="mt-6 text-lg font-bold text-primary-deep">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <Link to="/contact" search={{ service: "Training & Capacity Building" }} className={btn.primary}>Request Training / Mentorship</Link>
            <WhatsAppButton text="Hello, I would like to request training / mentorship." />
          </div>
        </div>
      </section>
    </>
  );
}
