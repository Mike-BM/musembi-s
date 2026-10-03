import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, Mail } from "lucide-react";
import { PageHero, WhatsAppButton, WhatsAppIcon, btn } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CONTACT, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Contact — Musembi S. Educational Consultancy" },
      { name: "description", content: "Call or WhatsApp 0794 191 690, or email info.musembisconsultancy@gmail.com to enquire about our services." },
      { property: "og:title", content: "Contact Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Send an enquiry or chat with us on WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { service } = Route.useSearch();
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your goals." intro="Reach us directly or send an enquiry below — we'll respond through your preferred channel." />
      <section className="container-site grid gap-10 py-20 md:py-24 lg:grid-cols-[1fr_1.5fr]">
        <aside className="space-y-5">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl bg-whatsapp p-8 text-whatsapp-foreground shadow-soft transition hover:shadow-lift">
            <WhatsAppIcon className="h-8 w-8" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider opacity-90">Call / WhatsApp</p>
            <p className="mt-1 text-3xl font-bold">{CONTACT.phoneDisplay}</p>
            <p className="mt-4 text-sm font-semibold underline-offset-4 group-hover:underline">Chat on WhatsApp →</p>
          </a>
          <div className="rounded-2xl border bg-card p-8 shadow-soft">
            <Mail className="h-6 w-6 text-gold" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
            <a href={`mailto:${CONTACT.email}`} className="mt-1 block break-all text-lg font-bold text-primary-deep hover:text-primary">{CONTACT.email}</a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT.email}`} className={btn.outline}><Mail className="h-4 w-4" /> Send Email</a>
              <a href={`tel:+${CONTACT.phoneIntl}`} className={btn.outline}><Phone className="h-4 w-4" /> Call</a>
            </div>
          </div>
        </aside>
        <div className="rounded-2xl border bg-card p-6 shadow-soft md:p-10">
          <h2 className="font-display text-3xl font-medium text-primary-deep">Service enquiry</h2>
          <p className="mt-2 text-muted-foreground">All fields are required.</p>
          <div className="mt-8"><EnquiryForm key={service} defaultService={service ?? ""} /></div>
          <div className="mt-8 border-t pt-6"><WhatsAppButton /></div>
        </div>
      </section>
    </>
  );
}
