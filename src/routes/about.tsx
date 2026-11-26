import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand, SectionHeading } from "@/components/site/ui";
import { Section, Prose, H3 } from "@/components/site/blocks";
import { VALUES } from "@/lib/site";
import founderImg from "@/assets/samuel-musembi.jpg";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Us",
      description: "Who we are, our vision, mission, values and approach, and the leadership of Samuel Musembi, Founder and Director/CEO.",
      path: "/about",
    }),
  component: AboutPage,
});

const CREDENTIALS = [
  { t: "Academic qualification", d: "Bachelor of Education (Arts) in Kiswahili and Geography, Second Class Honours (Upper Division), Machakos University (Class of 2026). Trained in pedagogy, curriculum implementation, lesson planning, learner assessment, classroom management, educational research and inclusive, learner-centred instruction." },
  { t: "Teaching and educational practice", d: "Kiswahili, Geography and Social Studies educator with practical teaching experience across senior and junior school institutions in Kenya, specialising in Competency-Based Education (CBE/CBC) and ICT-integrated teaching." },
  { t: "Consultancy leadership (3+ years)", d: "Leads Musembi S. Educational Consultancy in delivering personalised tuition and learning support, teacher professional development, ethical research and academic guidance, English–Kiswahili and Kiswahili–English translation, professional documentation, professional development and educational resource development." },
  { t: "Community and environmental engagement", d: "Advocates for environmental awareness, conservation learning, climate change and resilient education, waste-management awareness and community sustainability initiatives that support responsible citizenship and community development." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Every learner, educator and institution has potential." intro="Musembi S. Educational Consultancy was established from the belief that potential can be developed through quality education, purposeful guidance, meaningful mentorship and continuous support." />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Prose>
            <h2 className="font-display text-2xl text-primary-deep">Who we are</h2>
            <p>We provide educational and professional services that respond to the needs of learners, educators, researchers, professionals, institutions and communities. Our work brings together learning support, educational consultancy, mentorship, research guidance, professional development, language services and practical educational resources.</p>
            <p>We view education as more than the acquisition of certificates or examination results. It is a foundation for personal growth, social progress and sustainable development. We therefore encourage critical thinking, creativity, confidence, ethical leadership, digital competence, practical skills and lifelong learning.</p>
          </Prose>
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <H3>Our vision</H3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">To inspire and equip learners, educators, professionals and institutions to excel in the 21st century through knowledge, skills and purposeful guidance.</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <H3>Our mission</H3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">To deliver high-quality, accessible and innovative educational and professional services that empower learners, educators, professionals and institutions through learning, mentorship, consultancy and support.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Our core values" title="What guides our work" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-lg border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-border/60 bg-secondary text-primary">
                <v.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg text-primary-deep">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Prose>
            <h2 className="font-display text-2xl text-primary-deep">Our approach</h2>
            <p>We begin by listening and understanding the client’s needs and intended outcomes. We then agree on the scope of work, deliverables, timeline and fee before work starts. We value clear communication, confidentiality, collaboration and responsible use of information.</p>
            <h2 className="pt-4 font-display text-2xl text-primary-deep">Where we operate</h2>
            <p>The Consultancy is based in Kikima Town, Mbooni West Sub-County, Makueni County, Kenya. Services may be delivered in person by arrangement, online and through appropriate institutional or community partnerships. Support outside Kenya may be arranged where suitable and legally permitted.</p>
          </Prose>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="grid gap-0 sm:grid-cols-[14rem_1fr]">
              <figure className="bg-secondary/40 sm:h-full">
                <img
                  src={founderImg}
                  alt="Samuel Musembi, Founder and Director/CEO of Musembi S. Educational Consultancy"
                  width={720}
                  height={720}
                  loading="lazy"
                  className="aspect-square w-full object-cover object-top sm:aspect-auto sm:h-full"
                />
              </figure>
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-2xl text-primary-deep">Founder and leadership</h2>
                <p className="mt-1 text-sm font-semibold text-primary">Samuel Musembi · Founder and Director/CEO</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Samuel Musembi is the Founder and Director/CEO of Musembi S. Educational Consultancy. He provides leadership and direction for the Consultancy’s work and its commitment to educational support, mentorship, research, professional services and responsible practice.</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">With over three years of experience offering educational, linguistic and professional services, he brings together classroom teaching experience, Competency-Based Education (CBE/CBC) practice, data-driven research support, technical writing and bilingual communication. His approach is grounded in the belief that education should go beyond syllabus coverage to build measurable understanding, digital competence, critical thinking and lifelong capabilities.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Credentials & experience" title="Experience behind the work" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CREDENTIALS.map((c) => (
            <div key={c.t} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-lg text-primary-deep">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Professional standards" title="Safeguarding, inclusion and responsible practice" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { t: "Safeguarding and learner well-being", d: "The dignity, safety and well-being of learners are important to us. We seek to maintain respectful learning environments, appropriate professional boundaries and responsible communication. Where activities involve children, young people or other vulnerable learners, applicable safeguarding and child-protection requirements are observed." },
            { t: "Inclusion and equal opportunity", d: "We value fairness, dignity and equal opportunity. We respect diversity and seek to make our services accessible and responsive to different educational needs and circumstances. Clients may inform us of reasonable access or learning-support needs when making an enquiry." },
            { t: "Responsible environmental practice", d: "Environmental and community activities are planned with attention to safety, appropriate permissions, supervision and relevant precautions. Hazardous waste, chemicals, sharp objects and contaminated materials are handled only by competent persons using appropriate protective measures." },
          ].map((c) => (
            <div key={c.t} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-lg text-primary-deep">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
