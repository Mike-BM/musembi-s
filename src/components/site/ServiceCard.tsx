import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/site";

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <Link to="/contact" search={{ service: service.title }}
      className="group relative flex h-full flex-col rounded-xl border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-lg bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>
        {index !== undefined && <span className="font-display text-sm text-gold">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-6 text-lg font-bold leading-snug text-primary-deep">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
