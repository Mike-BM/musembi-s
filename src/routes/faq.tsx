import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHero, CtaBand } from "@/components/site/ui";
import { Section } from "@/components/site/blocks";
import { BRAND } from "@/lib/site";
import { pageHead } from "@/lib/seo";

const FAQS: { q: string; a: string }[] = [
  { q: "Who can use your services?", a: "Our services are intended for learners, students, parents, educators, researchers, professionals, schools, learning institutions, community groups and organisations, depending on the service required." },
  { q: "Where are you based?", a: "We are based in Kikima Town, Mbooni West Sub-County, Makueni County, Kenya." },
  { q: "Do you work with clients outside Makueni County?", a: "Yes. Suitable services may be provided online and, by arrangement, in person within Kenya. Support outside Kenya may be arranged where practical and legally permitted." },
  { q: "Can I receive services online?", a: "Yes. Online and digital delivery may be arranged for suitable services. The platform and schedule are agreed with the client." },
  { q: "How do I request a service?", a: "Contact us by phone, WhatsApp or email, or submit an enquiry through the website. Describe the service you need, your objectives and your preferred timeline. We will review your request and advise on the next steps." },
  { q: "How much do services cost?", a: "Fees depend on the agreed scope, complexity, length, timing, location and any direct costs. We confirm the fee before work begins. Customised and institutional assignments are quoted separately." },
  { q: "How quickly will you respond?", a: "We aim to review and respond to enquiries within 24 business hours. The delivery time for the actual service is agreed separately after reviewing the requirements." },
  { q: "Do you provide academic writing support?", a: "We provide ethical academic support, including tutoring, research-methodology guidance, feedback, proofreading, editing and referencing assistance. We do not complete examinations or produce work for dishonest submission as another person’s independent work." },
  { q: "Will my information be kept confidential?", a: "We handle client and learner information with care and use it for legitimate service and communication purposes. We apply reasonable safeguards and handle personal information in accordance with applicable Kenyan data-protection requirements. Please refer to our Privacy Notice for details." },
  { q: "Can I request corrections or revisions?", a: "Any included revision or correction arrangements are agreed in the quotation or service agreement before work begins. Requests that change the original scope may require a revised quotation." },
  { q: "How can an institution arrange training?", a: "Send us your training needs, intended participants, objectives, preferred dates, location or online requirements and expected duration. We can discuss a suitable programme and provide a quotation." },
];

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "Frequently Asked Questions",
      description: "Answers about who we serve, where we work, how to request a service, fees, response times, academic integrity and confidentiality.",
      path: "/faq",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" intro={`Clear answers about working with ${BRAND.name}.`} />
      <Section>
        <div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border bg-card">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-base font-semibold text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {f.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
                {f.q.startsWith("Will my information") && (
                  <>
                    {" "}
                    <Link to="/privacy" className="font-semibold text-primary underline underline-offset-4">
                      Read the Privacy Notice
                    </Link>
                    .
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand title="Still have a question?" text="Contact us by phone, WhatsApp, email or the enquiry form and we will gladly help." button="Contact Us" />
    </>
  );
}
