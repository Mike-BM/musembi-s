import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, CtaBand, btn } from "@/components/site/ui";
import { Section, Ticks, H3, Prose } from "@/components/site/blocks";
import { TRAINING_AREAS } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/training")({
  head: () =>
    pageHead({
      title: "Training & Professional Development",
      description: "Workshops, seminars, short courses and tailored training for educators, institutions, professionals and community groups, designed around your objectives.",
      path: "/training",
    }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title="Learning that builds practical knowledge, confidence and capability."
        intro="Musembi S. Educational Consultancy provides training and professional development support for learners, educators, institutions, professionals and community groups. Training is designed around participants’ needs and the objectives of the requesting organisation."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <H3>Training areas</H3>
            <Ticks className="mt-4" items={TRAINING_AREAS} />
          </div>
          <div>
            <H3>Training formats</H3>
            <Prose className="mt-4">
              <p>
                Depending on programme requirements, training may be delivered through workshops, seminars, short courses, group sessions, online learning or tailored institutional engagements. Programme objectives, content, participant numbers, delivery mode, duration, materials and fees are agreed before confirmation.
              </p>
            </Prose>
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <H3>Request a tailored training programme</H3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Discuss your organisation’s capacity-development needs. Tell us who the participants are, your objectives, preferred dates and whether you prefer online or in-person delivery.</p>
          </div>
          <Link to="/contact" search={{ service: "Workshops and training" }} className={btn.primary}>
            <span>Request a Training Programme</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
