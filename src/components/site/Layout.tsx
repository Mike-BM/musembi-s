import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, SERVICES, whatsappLink } from "@/lib/site";
import { LogoMark, btn, WhatsAppButton } from "./ui";
import logoImg from "@/assets/logo.jpeg";

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
    <Link 
      to="/" 
      className="group flex items-center gap-3 transition-opacity hover:opacity-95" 
      aria-label="Musembi S. Educational Consultancy — home"
    >
      <div className={cn(
        "relative h-11 w-11 shrink-0 overflow-hidden rounded-md border p-1 shadow-2xs transition-colors",
        light ? "bg-white border-gold/40" : "bg-white border-border/80"
      )}>
        <img
          src={logoImg}
          alt="Musembi S. Educational Consultancy Logo"
          className="h-full w-full object-contain"
          width={120}
          height={120}
        />
      </div>
      <span className="flex flex-col">
        <span className={cn(
          "font-display text-base font-semibold leading-tight tracking-tight",
          light ? "text-white" : "text-primary-deep"
        )}>
          Musembi S.
        </span>
        <span className={cn(
          "text-[0.66rem] font-bold uppercase tracking-[0.14em]",
          light ? "text-gold" : "text-primary/80"
        )}>
          Educational Consultancy
        </span>
        <span className={cn(
          "text-[0.58rem] font-medium tracking-tight hidden sm:block",
          light ? "text-white/70" : "text-muted-foreground"
        )}>
          Unlocking Potential, Shaping Futures
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [routerState.location.pathname]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-xs transition-colors">
      <div className="container-site flex h-18 items-center justify-between">
        <Brand />

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-7 lg:flex">
          <div className="flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="relative px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary-deep"
                activeProps={{
                  className: "text-primary-deep font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-gold",
                }}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-border/80">
            <a
              href={`tel:+${CONTACT.phoneIntl}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary-deep"
              aria-label="Call consultancy phone"
            >
              <Phone className="h-3.5 w-3.5 text-gold" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
            <Link
              to="/contact"
              className={cn(btn.primary, "px-4 py-2 text-xs uppercase tracking-wider font-semibold")}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary-deep hover:bg-secondary lg:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Accessible Mobile Menu */}
      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-card lg:hidden animate-rise">
          <nav aria-label="Mobile Navigation" className="container-site flex flex-col py-5 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="flex items-center justify-between border-b border-border/50 py-3 text-base font-medium text-foreground hover:text-primary"
                activeProps={{ className: "text-primary font-semibold text-primary-deep" }}
              >
                <span>{n.label}</span>
                <ArrowRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
            <div className="pt-4 pb-2 space-y-3">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={cn(btn.primary, "w-full justify-center py-3")}
              >
                Get Started / Enquire
              </Link>
              <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <a href={`tel:+${CONTACT.phoneIntl}`} className="flex items-center gap-1.5 hover:text-primary-deep">
                  <Phone className="h-3.5 w-3.5 text-gold" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-primary-deep">
                  <Mail className="h-3.5 w-3.5 text-gold" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-primary-deep text-white">
      <div className="container-site grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        {/* Col 1: Identity */}
        <div>
          <Brand light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
            Dedicated to advancing scholarly research, empowering learners through personalized mentorship, and upholding rigorous standards in professional documentation.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <WhatsAppButton className="w-fit" text="Hello Musembi S. Educational Consultancy, I would like to speak regarding your services." />
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Navigation</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-white/70 transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Key Focus Areas */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Focus Areas</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link to="/services" className="hover:text-white transition-colors">Research Support & Theses</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Academic Writing & Editing</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Proposal & Concept Notes</Link></li>
            <li><Link to="/training" className="hover:text-white transition-colors">1-on-1 Academic Mentorship</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">English ↔ Kiswahili Translation</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">CV & Professional Profiles</Link></li>
          </ul>
        </div>

        {/* Col 4: Contact & Office */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Contact Office</p>
          <ul className="mt-4 space-y-3.5 text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              <div>
                <a href={`tel:+${CONTACT.phoneIntl}`} className="hover:text-white transition-colors font-medium">
                  {CONTACT.phoneDisplay}
                </a>
                <p className="text-xs text-white/60">Phone & WhatsApp direct</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              <div>
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white transition-colors font-medium">
                  {CONTACT.email}
                </a>
                <p className="text-xs text-white/60">{CONTACT.responseGuarantee}</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              <div>
                <span className="font-medium">{CONTACT.location}</span>
                <p className="text-xs text-white/60">Virtual sessions & by appointment</p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              <div>
                <span className="text-xs text-white/70">{CONTACT.availability}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p className="font-display text-sm italic text-gold/90">
            Together, we learn. Together, we grow.
          </p>
          <p>
            © {new Date().getFullYear()} Musembi S. Educational Consultancy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
