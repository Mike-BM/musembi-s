import { Link } from "@tanstack/react-router";
import type { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { whatsappLink, CONTACT } from "@/lib/site";
import { Phone, Mail, ArrowRight } from "lucide-react";
import logoImg from "@/assets/logo.jpeg";

const baseBtn = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

export const btn = {
  primary: cn(baseBtn, "bg-primary text-primary-foreground hover:bg-primary-deep shadow-xs active:translate-y-[1px]"),
  gold: cn(baseBtn, "bg-gold text-primary-deep font-semibold hover:brightness-95 shadow-xs active:translate-y-[1px]"),
  outline: cn(baseBtn, "border border-primary/25 bg-transparent text-primary-deep hover:border-primary hover:bg-secondary active:translate-y-[1px]"),
  outlineLight: cn(baseBtn, "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 active:translate-y-[1px]"),
  whatsapp: cn(baseBtn, "bg-[#1EBE5D] text-white hover:bg-[#18A952] shadow-xs active:translate-y-[1px] font-medium"),
  text: "inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-deep underline-offset-4 hover:underline cursor-pointer",
};

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4 fill-current shrink-0", className)}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2C2.2 6.6 6.6 2.2 12 2.2s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
  );
}

export function WhatsAppButton({ 
  text, 
  label = "Chat on WhatsApp", 
  className 
}: { 
  text?: string; 
  label?: string; 
  className?: string 
}) {
  return (
    <a 
      href={whatsappLink(text)} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={cn(btn.whatsapp, className)}
      aria-label={`Open WhatsApp conversation: ${label}`}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow flex items-center gap-2", align === "center" && "justify-center", light ? "text-gold" : "text-primary/80")}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className={cn("mt-2.5 font-display text-2xl font-normal tracking-tight sm:text-3xl lg:text-4xl leading-[1.2]", light ? "text-primary-foreground" : "text-primary-deep")}>
        {title}
      </h2>
      <span className={cn("gold-rule mt-4", align === "center" && "mx-auto")} />
      {intro && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-primary-foreground/80 font-normal" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative border-b border-border/40 bg-primary-deep text-primary-foreground">
      <div className="container-site relative py-16 sm:py-20 lg:py-24">
        <p className="eyebrow text-gold/90 animate-rise flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
        <h1 className="mt-3.5 max-w-3xl font-display text-3xl font-normal leading-[1.18] sm:text-4xl lg:text-5xl animate-rise text-white">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 animate-rise">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

/** Official brand logo mark component using the genuine emblem */
export function LogoMark({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn(
      "relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-md border p-1 shadow-2xs transition-colors",
      light ? "bg-white border-gold/40" : "bg-white border-border/80",
      className
    )}>
      <img
        src={logoImg}
        alt="Musembi S. Educational Consultancy Logo"
        className="h-full w-full object-contain"
        width={100}
        height={100}
      />
    </span>
  );
}

export function CtaBand({
  title = "Ready to discuss your project or academic goals?",
  text = "Whether you are preparing a research thesis, refining a grant proposal, or seeking one-to-one mentorship, we provide tailored guidance grounded in academic integrity.",
  button = "Request a Consultation",
}: {
  title?: string;
  text?: string;
  button?: string;
}) {
  return (
    <section className="container-site py-16 sm:py-20 lg:py-24">
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary-deep px-6 py-12 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">
        <div className="relative max-w-2xl">
          <span className="gold-rule" />
          <h2 className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/contact" className={btn.gold}>
              {button} <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton text="Hello, I would like to book an educational consultation." />
          </div>
          <p className="mt-5 text-xs text-white/60">
            Direct enquiries: <a href={`tel:+${CONTACT.phoneIntl}`} className="underline hover:text-gold">{CONTACT.phoneDisplay}</a> · <a href={`mailto:${CONTACT.email}`} className="underline hover:text-gold">{CONTACT.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Field({ label, id, hint, children }: { label: string; id: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-primary-deep">
          {label}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export const inputCls = "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs";

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}
