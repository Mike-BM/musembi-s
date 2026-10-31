import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send, CheckCircle2, ShieldCheck, MessageSquare, Mail, Phone } from "lucide-react";
import { SERVICES, CONTACT, whatsappLink } from "@/lib/site";
import { Field, Input, inputCls, btn } from "./ui";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone or WhatsApp number").max(20),
  academicLevel: z.string().optional(),
  service: z.string().min(1, "Please select the service required"),
  timeline: z.string().optional(),
  message: z.string().trim().min(10, "Please provide a short description of your project or requirements").max(2500),
  contactMethod: z.enum(["WhatsApp", "Email", "Phone"]),
});

export type Enquiry = z.infer<typeof schema>;

function deliver(e: Enquiry) {
  const body = [
    `*NEW CONSULTATION ENQUIRY*`,
    `--------------------------------`,
    `*Client Name:* ${e.name}`,
    `*Email:* ${e.email}`,
    `*Phone / WhatsApp:* ${e.phone}`,
    e.academicLevel ? `*Academic / Career Stage:* ${e.academicLevel}` : null,
    `*Service Requested:* ${e.service}`,
    e.timeline ? `*Timeline / Deadline:* ${e.timeline}` : null,
    `*Preferred Contact:* ${e.contactMethod}`,
    `\n*Project Details & Scope:*`,
    e.message,
  ].filter(Boolean).join("\n");

  if (e.contactMethod === "WhatsApp") {
    window.open(whatsappLink(body), "_blank", "noopener");
  } else {
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Consultation Enquiry: ${e.service} — ${e.name}`)}&body=${encodeURIComponent(body)}`;
  }
}

export function EnquiryForm({
  defaultService = "",
  submitLabel = "Submit Consultation Enquiry",
}: {
  defaultService?: string;
  submitLabel?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<Enquiry["contactMethod"]>("WhatsApp");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget));
    const res = schema.safeParse({ ...data, contactMethod: method });

    if (!res.success) {
      setErrors(Object.fromEntries(res.error.issues.map((i) => [String(i.path[0]), i.message])));
      toast.error("Please fill in all required fields accurately.");
      return;
    }

    setErrors({});
    deliver(res.data);
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

        <Field label="Academic or Professional Stage" id="academicLevel">
          <select id="academicLevel" name="academicLevel" defaultValue="" className={inputCls}>
            <option value="" disabled>Select your stage</option>
            <option value="Postgraduate (Masters)">Postgraduate (Masters)</option>
            <option value="Doctoral / PhD Candidate">Doctoral / PhD Candidate</option>
            <option value="Undergraduate Student">Undergraduate Student</option>
            <option value="Faculty / Academic Researcher">Faculty / Academic Researcher</option>
            <option value="Working Professional / Executive">Working Professional / Executive</option>
            <option value="Educational Institution / NGO">Educational Institution / NGO</option>
          </select>
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

        <Field label="Anticipated Timeline" id="timeline">
          <select id="timeline" name="timeline" defaultValue="" className={inputCls}>
            <option value="" disabled>Select project timeline</option>
            <option value="Urgent (Within 7 days)">Urgent (Within 7 days)</option>
            <option value="Standard (2 to 4 weeks)">Standard (2 to 4 weeks)</option>
            <option value="Long-term (Semester / Multi-month)">Long-term (Semester / Multi-month)</option>
            <option value="Flexible / Initial Enquiry">Flexible / Initial Enquiry</option>
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field 
            label="Project Description & Specific Requirements *" 
            id="message"
            hint="Min. 10 characters"
          >
            <textarea 
              id="message" 
              name="message" 
              rows={4} 
              className={inputCls} 
              placeholder="Briefly describe your topic, chapter stage, word count, referencing style (APA, Harvard, etc.), or specific objectives." 
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
              Academic Integrity & Confidentiality
            </p>
            <p className="leading-relaxed">
              All manuscripts, proposal drafts, and data remain strictly confidential. We offer editorial, structural, and methodological mentoring; we uphold institutional academic integrity standards and do not produce work intended for dishonest submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
