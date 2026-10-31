import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Award, BookOpen, Users, Clock, Phone, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.jpeg";
import { SERVICES, VALUES, AUDIENCES, CONTACT, whatsappLink } from "@/lib/site";
import { btn, SectionHeading, CtaBand, WhatsAppIcon } from "@/components/site/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Musembi S. Educational Consultancy — Learning, Research & Professional Excellence" },
      { name: "description", content: "Academic research guidance, scholarly writing, mentorship, tutoring, translation, and professional development for learners, researchers, and institutions in Kenya." },
      { property: "og:title", content: "Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Empowering learning. Advancing research. Building professional excellence." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-border/60 bg-background pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Column: Heading & Content */}
            <div className="lg:col-span-7">
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-sm bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                <span>Education · Research · Mentorship</span>
              </div>

              {/* Main Heading */}
              <h1 className="mt-5 font-display text-3xl font-normal leading-[1.15] text-primary-deep sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
                Empowering learning. Advancing research.{" "}
                <span className="text-primary font-medium">Building professional excellence.</span>
              </h1>

              {/* Body Copy */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Musembi S. Educational Consultancy provides structured academic support, research methodology guidance, and professional development. We partner with learners, educators, researchers, professionals, and institutions to achieve rigorous scholarship and durable career growth.
              </p>

              {/* Primary Calls to Action */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/services" className={btn.primary}>
                  <span>Explore Our Services</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className={btn.outline}>
                  <span>Request a Consultation</span>
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-foreground/80 hover:text-primary transition-colors py-2 px-1"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#1EBE5D]" />
                  <span>WhatsApp: {CONTACT.phoneDisplay}</span>
                </a>
              </div>

              {/* Discrete Credibility Strip */}
              <div className="mt-10 pt-6 border-t border-border/60 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="font-display text-lg font-semibold text-primary-deep">10 Services</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Academic & writing practice</p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-primary-deep">1-on-1</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Individualized mentorship</p>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-primary-deep">Ethics First</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Confidentiality & integrity</p>
                </div>
              </div>
            </div>

            {/* Right Column: Practice Overview & Consultation Desk (replacing hero image) */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-border bg-card p-6 sm:p-8 shadow-soft space-y-6">
                
                {/* Official Logo Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-border/60">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white border border-border/80 p-1.5 shadow-2xs">
                    <img
                      src={logoImg}
                      alt="Musembi S. Educational Consultancy Official Logo"
                      className="h-full w-full object-contain"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-primary-deep leading-tight">
                      Musembi S.
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary/80">
                      Educational Consultancy
                    </p>
                    <p className="mt-1 text-xs italic font-serif text-gold">
                      Unlocking Potential, Shaping Futures
                    </p>
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-primary-deep text-sm">
                    Academic Consultation & Advisory Desk
                  </p>
                  <p>
                    Direct, professional guidance for academic research proposals, substantive manuscript editing, referencing standards, and career portfolios.
                  </p>
                </div>

                {/* Key Commitments */}
                <div className="space-y-2.5 pt-2 border-t border-border/50 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span><strong>10 Practice Areas:</strong> Research, writing, translation & tutoring</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span><strong>Academic Integrity:</strong> Ethical support & strict confidentiality</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span><strong>Fast Review:</strong> Inquiries reviewed within 24 business hours</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <Link
                    to="/contact"
                    className={cn(btn.primary, "w-full justify-center py-2.5 text-xs")}
                  >
                    <span>Request a Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(btn.whatsapp, "w-full justify-center py-2.5 text-xs")}
                  >
                    <WhatsAppIcon />
                    <span>WhatsApp Office</span>
                  </a>
                </div>

                {/* Location indicator */}
                <div className="pt-2 text-center text-[0.7rem] text-muted-foreground">
                  <span>Based in Nairobi, Kenya · Serving Scholars & Institutions Globally</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT OVERVIEW */}
      <section className="container-site py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 items-start">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="Our Practice"
              title="Academic rigor, ethical standards, and tailored guidance."
            />
          </div>
          <div className="md:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              Navigating university research, publishing scholarly work, and drafting institutional documents require precision, clarity, and dependable academic guidance. Musembi S. Educational Consultancy works alongside candidates and organizations to meet these standards with confidence.
            </p>
            <p>
              Whether you are framing a thesis problem statement, preparing a manuscript for peer review, restructuring an executive CV, or organizing team capacity training, our approach is defined by personalized attention, intellectual integrity, and clear deliverables.
            </p>
            <div className="pt-2">
              <Link to="/about" className={btn.text}>
                <span>Learn more about our mission, approach and ethical commitments</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE PILLARS */}
      <section className="border-y border-border/60 bg-secondary/40 py-16 sm:py-20 lg:py-24">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Core Areas of Practice"
              title="Structured services tailored to study, research, and career."
              intro="Explore our four primary practice areas designed for learners, academics, and organizations."
            />
            <Link to="/services" className={btn.outline}>
              View All 10 Services
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Pillar 1 */}
            <div className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded-md bg-secondary text-primary-deep grid place-items-center mb-4 border border-border/60">
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-normal text-primary-deep">
                Research & Academic Guidance
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                Conceptual framework design, methodology auditing, dissertation feedback, and defense preparation.
              </p>
              <ul className="mt-4 pt-3 border-t border-border/50 space-y-1 text-xs text-foreground/80">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Theses & Dissertations</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Proposal Development</span>
                </li>
              </ul>
              <Link to="/services" search={{ service: "Educational Consultancy & Research Support" }} className="mt-4 text-xs font-semibold text-primary hover:underline">
                Learn more →
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded-md bg-secondary text-primary-deep grid place-items-center mb-4 border border-border/60">
                <Award className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-normal text-primary-deep">
                Scholarly Writing & Editing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                Substantive copyediting, proofreading, citation alignment (APA, Harvard, Chicago), and manuscript polishing.
              </p>
              <ul className="mt-4 pt-3 border-t border-border/50 space-y-1 text-xs text-foreground/80">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Journal Paper Editing</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Referencing & Formatting</span>
                </li>
              </ul>
              <Link to="/services" search={{ service: "Academic Writing & Editing" }} className="mt-4 text-xs font-semibold text-primary hover:underline">
                Learn more →
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded-md bg-secondary text-primary-deep grid place-items-center mb-4 border border-border/60">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-normal text-primary-deep">
                Mentorship & Online Tutoring
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                One-to-one virtual academic tutoring, study methodology coaching, and ongoing intellectual mentorship.
              </p>
              <ul className="mt-4 pt-3 border-t border-border/50 space-y-1 text-xs text-foreground/80">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Individualized Tutoring</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Study Strategy Coaching</span>
                </li>
              </ul>
              <Link to="/training" className="mt-4 text-xs font-semibold text-primary hover:underline">
                Learn more →
              </Link>
            </div>

            {/* Pillar 4 */}
            <div className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="h-9 w-9 rounded-md bg-secondary text-primary-deep grid place-items-center mb-4 border border-border/60">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="font-display text-lg font-normal text-primary-deep">
                Documentation & Translation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                Targeted academic CVs, institutional manuals, concept notes, and nuanced English ↔ Kiswahili translation.
              </p>
              <ul className="mt-4 pt-3 border-t border-border/50 space-y-1 text-xs text-foreground/80">
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Academic CVs & Resumes</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>Bilingual Translation</span>
                </li>
              </ul>
              <Link to="/services" search={{ service: "CV Writing & Review Services" }} className="mt-4 text-xs font-semibold text-primary hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO WE SUPPORT (AUDIENCES) */}
      <section className="container-site py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="Who We Support"
          title="Designed for scholars, professionals, and institutions."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {AUDIENCES.map((aud) => {
            const Icon = aud.icon;
            return (
              <div key={aud.title} className="rounded-lg border border-border bg-card p-5 text-left flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="h-8 w-8 rounded bg-secondary text-primary flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary-deep">
                    {aud.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {aud.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40">
                  <p className="text-[0.68rem] font-semibold text-primary">
                    {aud.services}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. GUIDING PRINCIPLES */}
      <section className="border-t border-border/60 bg-secondary/30 py-16 sm:py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Commitments"
            title="Principles that guide every consultation and review."
            intro="We maintain high standards of intellectual rigor and dependable client collaboration."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ title, subtitle, text, icon: Icon }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded bg-secondary text-primary border border-border/50">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary-deep">{title}</h3>
                    <p className="text-[0.7rem] uppercase tracking-wider text-gold font-semibold">{subtitle}</p>
                  </div>
                </div>
                <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <CtaBand />
    </>
  );
}
