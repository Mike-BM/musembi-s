import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, btn } from "@/components/site/ui";
import { Section, Prose, Ticks } from "@/components/site/blocks";
import { WhatsAppButton } from "@/components/site/ui";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      title: "Pricing & Request a Quotation",
      description: "Fees depend on scope, complexity, timing and delivery. Request a quotation and we confirm the fee before any work begins.",
      path: "/pricing",
    }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <PageHero eyebrow="Pricing & Quotations" title="Clear fees, agreed before work begins." intro="Every engagement is discussed and quoted according to your needs." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Prose>
            <p>
              The cost of our services depends on the nature of the assignment, scope, length, complexity, delivery method, urgency and any direct costs involved. We discuss requirements with each client and provide a quotation before work begins. No additional charge will be imposed without prior communication and agreement.
            </p>
            <p>
              For tuition, mentorship and training, fees are confirmed before sessions or programmes are scheduled. Institutional, research, fieldwork and customised assignments are quoted according to the agreed requirements.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/contact" className={btn.primary}>
                <span>Request a Quotation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppButton text="Hello Musembi S. Educational Consultancy. I would like to request a quotation." label="Ask on WhatsApp" />
            </div>
          </Prose>
          <aside className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-lg text-primary-deep">What helps us quote accurately</h2>
            <Ticks
              className="mt-4"
              items={["The service you need and your objectives", "Length, complexity and level of the work", "Your preferred deadline or dates", "Online or in-person delivery", "Number of participants, for training"]}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
