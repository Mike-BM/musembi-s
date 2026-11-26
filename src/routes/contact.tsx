import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { PageHero, WhatsAppIcon, btn } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { useSite } from "@/lib/portal/context";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () =>
    pageHead({
      title: "Contact Us",
      description: "Call or WhatsApp 0794 191 690, email info.musembisconsultancy@gmail.com or send an enquiry. Based in Kikima Town, Makueni County, Kenya. We aim to respond within 24 business hours.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const { contact: CONTACT, whatsapp: whatsappLink } = useSite();
  const { service } = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let us discuss how we can support your goals."
        intro="Whether you are seeking learning support, educational guidance, research or advisory assistance, professional development, language services or an institutional programme, we invite you to get in touch."
      />

      <section className="container-site py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Direct Contact Info & Consultation Expectations */}
          <aside className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp Direct Card */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded bg-[#1EBE5D]/10 text-[#1EBE5D]">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Direct Phone & WhatsApp
                  </p>
                  <p className="font-display text-xl font-semibold text-primary-deep">
                    {CONTACT.phoneDisplay}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Prefer to speak to us? Call or send a WhatsApp message.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(btn.whatsapp, "text-xs py-2 px-4")}
                >
                  <WhatsAppIcon />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:+${CONTACT.phoneIntl}`}
                  className={cn(btn.outline, "text-xs py-2 px-4")}
                >
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  <span>Call us</span>
                </a>
              </div>
            </div>

            {/* Office & Email Details */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-2xs space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary-deep">Email Address</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-0.5 block break-all text-primary hover:underline text-xs"
                  >
                    {CONTACT.email}
                  </a>
                  <p className="text-muted-foreground mt-0.5">{CONTACT.responseGuarantee}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary-deep">Postal address</p>
                  <p className="text-muted-foreground mt-0.5">
                    {CONTACT.postalAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary-deep">Principal place of operation</p>
                  <p className="text-muted-foreground mt-0.5">
                    {CONTACT.location}
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    Service delivery: in person by arrangement; online and digital services where suitable.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary-deep">Official public operating hours</p>
                  <p className="text-muted-foreground mt-0.5">
                    {CONTACT.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* What to Expect Process Box */}
            <div className="rounded-lg border border-border/80 bg-secondary/50 p-6 space-y-3">
              <h4 className="font-display text-sm font-semibold text-primary-deep">
                What happens after you enquire
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Step 1:</strong> We aim to review and respond to your enquiry within 24 business hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Step 2:</strong> Where necessary, a short conversation to clarify your requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Step 3:</strong> A quotation with the scope, fee and timeline. Work begins only after you approve.</span>
                </li>
              </ul>
            </div>

          </aside>

          {/* Right Column: Comprehensive Enquiry Form */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="mb-6">
              <span className="eyebrow">Website enquiry form</span>
              <h2 className="mt-1 font-display text-2xl font-normal text-primary-deep">
                Tell us what you need
              </h2>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Provide as much detail as possible to help us assess your needs. Fields marked with an asterisk (*) are required.
              </p>
            </div>

            <EnquiryForm key={service} defaultService={service ?? ""} />
          </div>

        </div>
      </section>
    </>
  );
}
