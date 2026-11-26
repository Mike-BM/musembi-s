import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.jpeg";
import { AUDIENCES, BRAND } from "@/lib/site";
import { useSite } from "@/lib/portal/context";
import { btn, SectionHeading, CtaBand, WhatsAppIcon } from "@/components/site/ui";
import { Section, Ticks } from "@/components/site/blocks";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: BRAND.name,
      description:
        "Quality tuition and learning support, educational guidance, teacher development, research support, professional services and practical learning resources in Kikima, Makueni County, Kenya.",
      path: "/",
    }),
  component: Home,
});

const WHAT_WE_DO = [
  { t: "Tuition and learner support", d: "Online and in-person tuition, revision, remedial learning, study skills and academic mentorship." },
  { t: "Teacher development and CBC/CBE support", d: "Professional learning, lesson planning, curriculum implementation, assessment and instructional improvement." },
  { t: "Educational consultancy", d: "Guidance and advisory support for learners, educators, parents, schools and institutions." },
  { t: "Research and academic support", d: "Research-methodology guidance, data support, editing, proofreading and responsible academic development." },
  { t: "Professional and language services", d: "CVs, professional documents, English–Kiswahili and Kiswahili–English translation, editing and proofreading." },
  { t: "Digital learning and educational resources", d: "ICT-integrated learning, digital literacy, e-learning support and educational content." },
  { t: "Environmental education", d: "Conservation awareness, climate resilience learning and community sustainability initiatives." },
];

const WHY = [
  "A client-centred approach shaped around identified needs and agreed objectives.",
  "A commitment to integrity, quality, confidentiality and responsible practice.",
  "Practical educational support that builds understanding, skills and confidence.",
  "Flexible delivery through online sessions and in-person arrangements.",
  "Clear communication about scope, fees, timelines and expected outputs.",
];

function Home() {
  const { contact, whatsapp } = useSite();
  return (
    <>
      <section className="border-b border-border/60 bg-background pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-sm bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              {BRAND.name}
            </p>
            <h1 className="mt-5 font-display text-4xl font-normal leading-[1.12] text-primary-deep sm:text-5xl">
              {BRAND.tagline}
            </h1>
            <p className="mt-4 text-lg font-semibold text-primary sm:text-xl">{BRAND.strapline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {BRAND.name} provides quality tuition and learning support, educational guidance, teacher development, research support, professional services and practical learning resources. We work with learners, parents, educators, researchers, professionals, schools and institutions to strengthen knowledge, skills and opportunities for lifelong learning.
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Our approach is learner-centred, ethical and responsive to each client’s needs. Whether you are seeking academic support, professional development, research guidance or an educational programme for your institution, we work with you to identify suitable support and clear outcomes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/services" className={btn.primary}>
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className={btn.outline}>
                Request a Consultation
              </Link>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
                <WhatsAppIcon />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg border border-border bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-4 border-b border-border/60 pb-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border/80 bg-white p-1.5">
                  <img src={logoImg} alt="Musembi S. Educational Consultancy logo" className="h-full w-full object-contain" width={160} height={160} />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold leading-tight text-primary-deep">{BRAND.short}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary/80">Educational Consultancy</p>
                  <p className="mt-1 font-serif text-xs italic text-gold">{BRAND.tagline}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>Based in Kikima, Makueni County, Kenya. Serving clients through in-person arrangements in Kenya and online services where suitable.</span>
                </p>
                <p>
                  Call or WhatsApp <a className="font-semibold text-primary hover:underline" href={`tel:+${contact.phoneIntl}`}>{contact.phoneDisplay}</a>
                </p>
                <p className="text-xs">{contact.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="What we do" title="Educational support, professional guidance and practical solutions" intro="We bring these together through the following areas:" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.map((w) => (
            <Link key={w.t} to="/services" className="group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <h3 className="font-display text-lg text-primary-deep group-hover:text-primary">{w.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.d}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/services" className={btn.text}>
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Who we support" title="Our services are designed for" />
            <Ticks className="mt-6" items={AUDIENCES} />
          </div>
          <div>
            <SectionHeading eyebrow="Why work with us" title="What you can expect" />
            <Ticks className="mt-6" items={WHY} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading align="center" eyebrow="Our commitment" title="Education that is meaningful, inclusive and practical" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We believe education should be meaningful, inclusive, practical and responsive to a changing world. We promote critical thinking, creativity, confidence, digital competence, responsible citizenship and lifelong learning.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Tell us what you want to learn, develop or achieve."
        text="Contact Musembi S. Educational Consultancy to discuss the support or programme that meets your needs."
        button="Request a Consultation"
      />
    </>
  );
}
