import { Link } from "@tanstack/react-router";
import type { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site";

const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
export const btn = {
  primary: cn(base, "bg-primary text-primary-foreground hover:bg-primary-deep shadow-soft hover:shadow-lift"),
  gold: cn(base, "bg-gold text-primary-deep hover:brightness-105 shadow-soft hover:shadow-lift"),
  outline: cn(base, "border border-primary/25 text-primary hover:border-primary hover:bg-secondary"),
  outlineLight: cn(base, "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"),
  whatsapp: cn(base, "bg-whatsapp text-whatsapp-foreground hover:brightness-95 shadow-soft hover:shadow-lift"),
};

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4 fill-current", className)}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2C2.2 6.6 6.6 2.2 12 2.2s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
  );
}

export function WhatsAppButton({ text, label = "Chat on WhatsApp", className }: { text?: string; label?: string; className?: string }) {
  return (
    <a href={whatsappLink(text)} target="_blank" rel="noopener noreferrer" className={cn(btn.whatsapp, className)}>
      <WhatsAppIcon /> {label}
    </a>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = "left", light }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; align?: "left" | "center"; light?: boolean }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", light && "text-gold")}>{eyebrow}</p>}
      <h2 className={cn("mt-3 font-display text-3xl font-medium leading-tight md:text-4xl", light ? "text-primary-foreground" : "text-primary-deep")}>{title}</h2>
      <span className={cn("gold-rule mt-5", align === "center" && "mx-auto")} />
      {intro && <p className={cn("mt-5 text-base leading-relaxed md:text-lg", light ? "text-primary-foreground/75" : "text-muted-foreground")}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-primary-deep text-primary-foreground">
      <Motif className="absolute -right-24 -top-24 h-[28rem] w-[28rem] opacity-20" />
      <div className="container-site relative py-20 md:py-28">
        <p className="eyebrow text-gold animate-rise">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.1] md:text-6xl animate-rise">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 animate-rise">{intro}</p>}
      </div>
    </section>
  );
}

/** Concentric arcs motif inspired by the blue & gold logo. */
export function Motif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="96" className="stroke-gold" strokeWidth="1" />
      <circle cx="100" cy="100" r="76" className="stroke-primary-foreground/40" strokeWidth="1" strokeDasharray="2 6" />
      <path d="M30 130 A75 75 0 0 1 170 130" className="stroke-gold" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="100" r="46" className="stroke-primary-foreground/30" strokeWidth="1" />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground", className)}>
      <span className="font-display text-lg font-semibold">M</span>
      <span className="absolute inset-0 rounded-full ring-2 ring-gold ring-offset-2 ring-offset-transparent" />
    </span>
  );
}

export function CtaBand({ title = "Ready to take the next step?", text = "Whether you need academic support, research guidance, professional writing, mentorship, or training, we are here to help.", button = "Contact Us" }: { title?: string; text?: string; button?: string }) {
  return (
    <section className="container-site py-20 md:py-28">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-14 text-primary-foreground md:px-16 md:py-20">
        <Motif className="absolute -bottom-32 -right-20 h-96 w-96 opacity-25" />
        <div className="relative max-w-2xl">
          <span className="gold-rule" />
          <h2 className="mt-6 font-display text-3xl font-medium md:text-5xl">{title}</h2>
          <p className="mt-5 text-lg text-primary-foreground/80">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className={btn.gold}>{button}</Link>
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-primary-deep">{label}</label>
      {children}
    </div>
  );
}
export const inputCls = "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";
export function Input(props: ComponentProps<"input">) { return <input {...props} className={cn(inputCls, props.className)} />; }
