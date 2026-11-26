import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { btn } from "./ui";

/** A standard page section with consistent spacing. */
export function Section({
  children,
  tone = "plain",
  className,
}: {
  children: ReactNode;
  tone?: "plain" | "soft";
  className?: string;
}) {
  return (
    <section className={cn(tone === "soft" && "border-y border-border/60 bg-secondary/40")}>
      <div className={cn("container-site py-12 sm:py-16 lg:py-20", className)}>{children}</div>
    </section>
  );
}

export function Ticks({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5 text-sm leading-relaxed text-foreground/85", className)}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("max-w-3xl space-y-4 text-base leading-relaxed text-foreground/85", className)}>{children}</div>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-xl font-normal text-primary-deep">{children}</h3>;
}

export function EnquireLink({ label, service }: { label: string; service?: string }) {
  return (
    <Link to="/contact" {...(service ? { search: { service } } : {})} className={cn(btn.primary)}>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
