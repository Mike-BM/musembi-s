import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, CheckCircle2, ShieldCheck, MessageSquare, Mail, Phone } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { useSite } from "@/lib/portal/context";
import { submitEnquiry } from "@/lib/portal/api";
import { Field, Input, inputCls, btn } from "./ui";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone or WhatsApp number").max(20),
  academicLevel: z.string().min(1, "Please tell us who you are enquiring as"),
  service: z.string().min(1, "Please select the service required"),
  delivery: z.string().min(1, "Please choose your preferred delivery"),
  timeline: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Please provide a short description of your project or requirements").max(2500),
  contactMethod: z.enum(["WhatsApp", "Email", "Phone"]),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm that you have read the Privacy Notice" }) }),
});

export type Enquiry = z.infer<typeof schema>;

function deliver(e: Enquiry, contactEmail: string, whatsappLink: (text?: string) => string) {
  const body = [
    `*NEW ENQUIRY*`,
    `--------------------------------`,
    `*Client Name:* ${e.name}`,
    `*Email:* ${e.email}`,
    `*Phone / WhatsApp:* ${e.phone}`,
    `*Enquiring as:* ${e.academicLevel}`,
    `*Service Requested:* ${e.service}`,
    `*Preferred Delivery:* ${e.delivery}`,
    e.timeline ? `*Preferred Deadline / Dates:* ${e.timeline}` : null,
    `*Preferred Contact:* ${e.contactMethod}`,
    `\n*Needs and expected outcome:*`,
    e.message,
  ].filter(Boolean).join("\n");

  if (e.contactMethod === "WhatsApp") {
    window.open(whatsappLink(body), "_blank", "noopener");
  } else {
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Enquiry: ${e.service} — ${e.name}`)}&body=${encodeURIComponent(body)}`;
  }
}

export function EnquiryForm({
  defaultService = "",
  submitLabel = "Submit Enquiry",
}: {
  defaultService?: string;
  submitLabel?: string;
}) {
  const { contact: CONTACT, services: SERVICES, whatsapp } = useSite();
  const saveEnquiry = useServerFn(submitEnquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<Enquiry["contactMethod"]>("WhatsApp");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget));
    const res = schema.safeParse({ ...data, contactMethod: method, consent: data["consent"] === "on" });

    if (!res.success) {
      setErrors(Object.fromEntries(res.error.issues.map((i) => [String(i.path[0]), i.message])));
      toast.error("Please fill in all required fields accurately.");
      return;
    }

    setErrors({});
    // Keep a record in the admin portal. This never blocks or breaks the WhatsApp / email hand-off.
    void saveEnquiry({ data: { ...res.data, website: String(data["website"] ?? "") } }).catch(() => undefined);
    deliver(res.data, CONTACT.email, whatsapp);
    setSubmitted(true);
    toast.success("Thank you. Your enquiry is prepared and opening now.");
    ev.currentTarget.reset();
  }

  const err = (k: string) => errors[k] && (
    <p className="mt-1 text-xs text-destructive font-medium" role="alert">
      {errors[k]}
    </p>
  );

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        {/* Honeypot for spam bots: hidden from people, so only automated forms fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <Field label="Full Name *" id="name">
          <Input 
            id="name" 
            name="name" 
            autoComplete="name" 
            placeholder="e.g. Dr. Jane Mwangi / Peter Ochieng" 
            required 
          />
          {err("name")}
        </Field>

        <Field label="Email Address *" id="email">
          <Input 
            id="email" 
            name="email" 
            type="email" 
            autoComplete="email" 
            placeholder="e.g. name@university.ac.ke" 
            required 
          />
          {err("email")}
        </Field>

        <Field label="Phone / WhatsApp Number *" id="phone">
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            autoComplete="tel" 
            placeholder="e.g. 0794 191 690 / +254..." 
            required 
          />
          {err("phone")}
        </Field>

        <Field label="I am enquiring as *" id="academicLevel">
          <select id="academicLevel" name="academicLevel" defaultValue="" className={inputCls} required>
            <option value="" disabled>Select one</option>
            {["Learner/Student", "Parent/Guardian", "Educator", "Researcher", "Professional", "Institution/Organisation", "Other"].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err("academicLevel")}
        </Field>

        <Field label="Service Required *" id="service">
          <select 
            id="service" 
            name="service" 
            defaultValue={defaultService} 
            className={inputCls}
            required
          >
            <option value="" disabled>Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / General Consultation">Other / General Consultation</option>
          </select>
          {err("service")}
        </Field>

        <Field label="Preferred Delivery *" id="delivery">
          <select id="delivery" name="delivery" defaultValue="" className={inputCls} required>
            <option value="" disabled>Select delivery</option>
            <option value="Online">Online</option>
            <option value="In person">In person</option>
            <option value="Either">Either</option>
          </select>
          {err("delivery")}
        </Field>

        <Field label="Preferred deadline or proposed dates" id="timeline">
          <Input id="timeline" name="timeline" maxLength={100} placeholder="e.g. 15 December 2026, or flexible" />
        </Field>

        <div className="sm:col-span-2">
          <Field 
            label="Brief description of your needs and expected outcome *" 
            id="message"
            hint="Min. 10 characters"
          >
            <textarea 
              id="message" 
              name="message" 
              rows={4} 
              className={inputCls} 
              placeholder="Describe the service you need, your objectives and anything we should know to review your request." 
              required
            />
            {err("message")}
          </Field>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-xs font-semibold uppercase tracking-wider text-primary-deep mb-2.5">
            Preferred Follow-up Channel
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {(["WhatsApp", "Email", "Phone"] as const).map((m) => (
              <button 
                type="button" 
                key={m} 
                onClick={() => setMethod(m)} 
                aria-pressed={method === m}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-colors cursor-pointer",
                  method === m 
                    ? "border-primary bg-primary text-white" 
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                {m === "WhatsApp" && <MessageSquare className="h-3.5 w-3.5" />}
                {m === "Email" && <Mail className="h-3.5 w-3.5" />}
                {m === "Phone" && <Phone className="h-3.5 w-3.5" />}
                <span>{m}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
            <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--primary)]" />
            <span>
              I have read the{" "}
              <Link to="/privacy" target="_blank" className="font-semibold text-primary underline underline-offset-4">Privacy Notice</Link>{" "}
              and agree that Musembi S. Educational Consultancy may use my details to respond to this enquiry. *
            </span>
          </label>
          {err("consent")}
        </div>

        <div className="sm:col-span-2 pt-2">
          <button 
            type="submit" 
            className={cn(btn.primary, "w-full sm:w-auto py-3 px-8")}
          >
            <Send className="h-4 w-4" /> 
            <span>{submitLabel}</span>
          </button>
        </div>
      </form>

      {/* Trust & Academic Ethics Banner */}
      <div className="rounded-md border border-border/80 bg-secondary/40 p-4 text-xs text-muted-foreground">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-primary-deep">
              Confidentiality and academic integrity
            </p>
            <p className="leading-relaxed">
              We handle your information with care and use it only to respond to your enquiry and deliver agreed services. We provide ethical academic support and do not complete examinations or produce work for dishonest submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
