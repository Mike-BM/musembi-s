import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { SERVICES, CONTACT, whatsappLink } from "@/lib/site";
import { Field, Input, inputCls, btn } from "./ui";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a phone number").max(20),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Please add a short message").max(2000),
  contactMethod: z.enum(["Email", "Phone", "WhatsApp"]),
});
export type Enquiry = z.infer<typeof schema>;

/**
 * Delivery hook: replace this with a backend/email call later.
 * For now it opens the visitor's WhatsApp or email app with the enquiry pre-filled.
 */
function deliver(e: Enquiry) {
  const body = `Enquiry: ${e.service}\nName: ${e.name}\nEmail: ${e.email}\nPhone: ${e.phone}\nPreferred contact: ${e.contactMethod}\n\n${e.message}`;
  if (e.contactMethod === "WhatsApp") window.open(whatsappLink(body), "_blank", "noopener");
  else window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enquiry: ${e.service}`)}&body=${encodeURIComponent(body)}`;
}

export function EnquiryForm({ defaultService = "", submitLabel = "Submit Enquiry" }: { defaultService?: string; submitLabel?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<Enquiry["contactMethod"]>("WhatsApp");

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget));
    const res = schema.safeParse({ ...data, contactMethod: method });
    if (!res.success) {
      setErrors(Object.fromEntries(res.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    deliver(res.data);
    toast.success("Thank you — your enquiry is ready to send.");
    ev.currentTarget.reset();
  }

  const err = (k: string) => errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name" id="name"><Input id="name" name="name" autoComplete="name" placeholder="Your full name" />{err("name")}</Field>
      <Field label="Email" id="email"><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />{err("email")}</Field>
      <Field label="Phone Number" id="phone"><Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="07xx xxx xxx" />{err("phone")}</Field>
      <Field label="Service Required" id="service">
        <select id="service" name="service" defaultValue={defaultService} className={inputCls}>
          <option value="" disabled>Select a service</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          <option value="Other / Not sure">Other / Not sure</option>
        </select>
        {err("service")}
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" id="message"><textarea id="message" name="message" rows={5} className={inputCls} placeholder="Tell us briefly what you need and any deadlines." />{err("message")}</Field>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-semibold text-primary-deep">Preferred Contact Method</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["WhatsApp", "Email", "Phone"] as const).map((m) => (
            <button type="button" key={m} onClick={() => setMethod(m)} aria-pressed={method === m}
              className={cn("rounded-full border px-5 py-2 text-sm font-medium transition", method === m ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:border-primary/50")}>
              {m}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <button type="submit" className={btn.primary}><Send className="h-4 w-4" /> {submitLabel}</button>
      </div>
    </form>
  );
}
