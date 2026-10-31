import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ShieldCheck, Award, HeartHandshake, Compass, BookOpen, Target, Eye } from "lucide-react";
import { PageHero, SectionHeading, CtaBand, btn } from "@/components/site/ui";
import { VALUES, CONTACT } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Musembi S. Educational Consultancy" },
      { name: "description", content: "Our mission, academic approach, ethical standards, and commitment to excellence in educational research, mentorship, and professional writing." },
      { property: "og:title", content: "About Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Empowering learners, researchers, and professionals through rigorous educational guidance and mentorship." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Consultancy"
        title="Dedicated to academic rigor, intellectual mentorship, and professional communication."
        intro="Founded on the belief that meaningful scholarship and professional excellence require meticulous guidance, ethical commitment, and dependable personal collaboration."
      />

      {/* Purpose & Approach Section */}
      <section className="container-site py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="Our Foundation"
              title="A consultancy built around learning that lasts."
            />
            <div className="mt-8 rounded-lg border border-border/80 bg-secondary/40 p-6 text-sm">
              <p className="font-serif italic text-primary-deep text-base">
                “Through reliable, accessible, and client-centred services, we support academic achievement, professional development, research excellence, effective communication, and lifelong learning.”
              </p>
              <p className="mt-3 text-xs uppercase tracking-wider text-gold font-bold">
                — Practice Statement
              </p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong>Musembi S. Educational Consultancy</strong> was established to address a persistent challenge in education and professional scholarship: the gap between academic theory, institutional expectations, and the practical execution of high-quality research and documentation.
            </p>
            <p>
              Undergraduate and postgraduate students often navigate complex research requirements, complex referencing styles (APA, Harvard, Chicago), and stringent thesis defenses without sufficient individualized feedback. Similarly, researchers, institutions, and working professionals face demanding standards when preparing journal articles, project proposals, and corporate documents.
            </p>
            <p>
              We provide structured, ethical, and client-focused support at every stage—from framing an initial research problem and refining methodology, to line-by-line substantive editing, 1-on-1 tutoring, and team capacity building.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="border-y border-border/60 bg-secondary/30 py-16 sm:py-20">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Mission */}
            <div className="rounded-lg border border-border bg-card p-8 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded bg-secondary text-primary border border-border/50">
                  <Target className="h-5 w-5" />
                </span>
                <span className="eyebrow text-primary/80">Our Mission</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-normal text-primary-deep">
                To empower learners, educators, researchers, professionals, and institutions through excellence, innovation, mentorship, and lifelong learning.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                We achieve this by providing accessible, rigorous, and individualized educational and research consulting services that enable our clients to achieve measurable results and long-term capability.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-lg border border-border bg-card p-8 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded bg-secondary text-primary border border-border/50">
                  <Eye className="h-5 w-5" />
                </span>
                <span className="eyebrow text-primary/80">Our Vision</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-normal text-primary-deep">
                To establish Musembi S. Educational Consultancy as a premier centre for transformative education, research support, professional development, and lifelong learning.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                We aspire to be recognized nationally and regionally as a benchmark of intellectual rigor, academic ethics, and dependable advisory support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Academic Ethics & Quality Assurance */}
      <section className="container-site py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Academic Integrity Policy"
            title="Our ethical code and commitments to authentic scholarship."
          />
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              At Musembi S. Educational Consultancy, we are steadfastly committed to academic honesty and intellectual integrity. We believe that genuine education develops independent thinking and intellectual ownership.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <h4 className="text-sm font-bold text-primary-deep flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold shrink-0" />
                  What We Do
                </h4>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li>• Critical methodology review and structural guidance</li>
                  <li>• Grammatical, stylistic, and citation copyediting</li>
                  <li>• Substantive feedback on logic and argumentation</li>
                  <li>• One-to-one coaching and defense preparation</li>
                  <li>• Reference auditing and plagiarism prevention advice</li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <h4 className="text-sm font-bold text-primary-deep flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                  What We Uphold
                </h4>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li>• We do not ghostwrite student theses or assignments</li>
                  <li>• We do not complete academic examinations for clients</li>
                  <li>• All research data and personal drafts remain strictly confidential</li>
                  <li>• We adhere strictly to institutional research ethics guidelines</li>
                  <li>• Clear attribution and citation honesty in all documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Practice Standards */}
        <div className="mt-16 pt-12 border-t border-border/60">
          <h3 className="font-display text-2xl font-normal text-primary-deep mb-8">
            The Standards We Bring to Every Engagement
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ title, subtitle, text, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-5 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded bg-secondary text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="text-sm font-bold text-primary-deep">{title}</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Location summary */}
      <section className="border-t border-border/60 bg-secondary/40 py-16">
        <div className="container-site">
          <div className="max-w-2xl">
            <span className="eyebrow">Consultancy Details</span>
            <h3 className="mt-3 font-display text-2xl font-normal text-primary-deep">
              Based in Nairobi, Kenya · Serving Clients Globally
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Consultations are conducted through scheduled virtual sessions (Google Meet, Zoom, WhatsApp) as well as by appointment in Nairobi, Kenya. Every client is assigned a designated contact to ensure continuity and prompt communication.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className={btn.primary}>
                Contact the Consultancy
              </Link>
              <Link to="/services" className={btn.outline}>
                Explore Practice Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
