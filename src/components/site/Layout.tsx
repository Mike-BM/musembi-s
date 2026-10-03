import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site";
import { LogoMark, btn, WhatsAppButton } from "./ui";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/training", label: "Training" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

function Brand({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Musembi S. Educational Consultancy — home">
      <LogoMark />
      <span className="leading-tight">
        <span className={cn("block font-display text-base font-semibold", light ? "text-primary-foreground" : "text-primary-deep")}>Musembi S.</span>
        <span className={cn("block text-[0.68rem] font-semibold uppercase tracking-[0.16em]", light ? "text-gold" : "text-accent-foreground")}>Educational Consultancy</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("sticky top-0 z-50 border-b transition-all duration-300", scrolled ? "border-border bg-background/90 backdrop-blur-md shadow-soft" : "border-transparent bg-background")}>
      <div className={cn("container-site flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20")}>
        <Brand />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
              activeProps={{ className: "text-primary-deep font-semibold" }}>{n.label}</Link>
          ))}
          <Link to="/contact" className={cn(btn.primary, "ml-3 py-2.5")}>Get Started</Link>
        </nav>
        <button className="rounded-lg p-2 text-primary-deep lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t bg-background lg:hidden animate-rise">
          <div className="container-site flex flex-col py-4">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
                className="border-b py-3 text-base font-medium text-foreground" activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className={cn(btn.primary, "mt-5")}>Get Started</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Empowering learners, educators, researchers, professionals, and institutions through excellence, innovation, mentorship, and lifelong learning.
          </p>
          <WhatsAppButton className="mt-6" />
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-primary-foreground/75 transition hover:text-primary-foreground">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li><a href={`tel:+${CONTACT.phoneIntl}`} className="flex items-center gap-3 text-primary-foreground/75 hover:text-primary-foreground"><Phone className="h-4 w-4 text-gold" />{CONTACT.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 break-all text-primary-foreground/75 hover:text-primary-foreground"><Mail className="h-4 w-4 shrink-0 text-gold" />{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-site flex flex-col items-start justify-between gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <p className="font-display text-base italic text-gold">Together, we learn. Together, we grow.</p>
          <p>© {new Date().getFullYear()} Musembi S. Educational Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
