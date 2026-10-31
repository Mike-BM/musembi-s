import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { PageHero, WhatsAppIcon, btn } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CONTACT, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Contact Us & Request Consultation — Musembi S. Educational Consultancy" },
      { name: "description", content: "Contact Musembi S. Educational Consultancy in Nairobi, Kenya. Call or WhatsApp 0794 191 690, email info.musembisconsultancy@gmail.com, or submit an enquiry." },
      { property: "og:title", content: "Contact Musembi S. Educational Consultancy" },
      { property: "og:description", content: "Request an academic consultation, research review, or institutional training." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="Contact & Consultation"
        title="Discuss your research, academic project, or training needs."
        intro="Reach us directly by phone, WhatsApp, or email, or submit a detailed consultation enquiry below. All communications remain strictly confidential."
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
                Connect directly with the consultancy for quick turnaround enquiries or urgent deadlines.
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
                  <span>Call Office</span>
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
                  <p className="font-semibold text-primary-deep">Location & Service Modes</p>
                  <p className="text-muted-foreground mt-0.5">
                    {CONTACT.location}
                  </p>
                  <p className="text-muted-foreground mt-0.5">
                    Virtual consultations conducted via Google Meet, Zoom, and WhatsApp. In-person meetings in Nairobi by appointment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-border/50">
                <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary-deep">Consultation Hours</p>
                  <p className="text-muted-foreground mt-0.5">
                    {CONTACT.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* What to Expect Process Box */}
            <div className="rounded-lg border border-border/80 bg-secondary/50 p-6 space-y-3">
              <h4 className="font-display text-sm font-semibold text-primary-deep">
                What to Expect After Inquiring
              </h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Step 1:</strong> Initial review of your project scope and deadlines within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Step 2:</strong> Brief scoping dialogue to confirm deliverables and academic guidelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  <span><strong>Step 3:</strong> Transparent timeline and engagement plan with direct consultant support.</span>
                </li>
              </ul>
            </div>

          </aside>

          {/* Right Column: Comprehensive Enquiry Form */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-soft">
            <div className="mb-6">
              <span className="eyebrow">Service Enquiry</span>
              <h2 className="mt-1 font-display text-2xl font-normal text-primary-deep">
                Tell us about your requirements
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
