import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/ui";
import { Section } from "@/components/site/blocks";
import { useSite } from "@/lib/portal/context";
import { pageHead } from "@/lib/seo";

const STEPS = [
  { t: "Make an enquiry", d: "Contact us by phone, WhatsApp, email or the website enquiry form. Briefly describe the service you need, your objectives and preferred timeline." },
  { t: "Initial review", d: "We review your enquiry to understand your needs and whether the request fits our service scope." },
  { t: "Discuss requirements", d: "Where necessary, we arrange a consultation to clarify the assignment, intended audience, expected outputs, source materials and practical requirements." },
  { t: "Receive a quotation", d: "We provide the proposed scope, deliverables, fee, estimated timeline and relevant terms. Work proceeds after the client approves the arrangement." },
  { t: "Work and communication", d: "We undertake the agreed work and communicate through the agreed channel. Any material change in scope, timing or cost is discussed before additional work is undertaken." },
  { t: "Review and completion", d: "The client reviews the agreed deliverables. Included corrections are handled according to the revision terms agreed before work begins, and final outputs are handed over." },
];

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    pageHead({
      title: "How It Works",
      description: "A clear six-step process: enquiry, review, requirements, quotation, work and communication, review and completion.",
      path: "/how-it-works",
    }),
  component: HowItWorks,
});

function HowItWorks() {
  const { contact } = useSite();
  return (
    <>
      <PageHero eyebrow="How It Works" title="A clear process, so you know what to expect." intro="We use a clear process so clients understand what to expect before a service begins." />
      <Section>
        <ol className="mx-auto max-w-3xl space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4 rounded-lg border border-border bg-card p-5 sm:p-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground">{i + 1}</span>
              <div>
                <h2 className="font-display text-lg text-primary-deep">{s.t}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-primary-deep">Tuition, mentorship and training:</strong> the process may be simpler. We confirm the learning or training need, agree on the session format and fee, schedule the session and deliver the agreed support.
          </p>
          <p>
            <strong className="text-primary-deep">Enquiry response target:</strong> {contact.responseGuarantee} This is a response target, not a promise that every assignment will be completed within that period. Delivery times are agreed after reviewing the work.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
