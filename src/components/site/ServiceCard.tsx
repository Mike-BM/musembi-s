import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServiceCard({ 
  service, 
  index, 
  compact = false 
}: { 
  service: Service; 
  index?: number;
  compact?: boolean;
}) {
  const Icon = service.icon;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 sm:p-7 shadow-2xs transition-all duration-200 hover:border-primary/30 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-secondary text-primary border border-border/60 transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded">
            {service.category}
          </span>
          {index !== undefined && (
            <span className="font-mono text-xs text-gold font-medium">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-5 font-display text-lg font-normal tracking-tight text-primary-deep group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        {service.summary}
      </p>

      {!compact && service.deliverables && service.deliverables.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-[0.7rem] font-bold uppercase tracking-wider text-primary/80 mb-2">
            Key Deliverables
          </p>
          <ul className="space-y-1.5 text-xs text-foreground/80">
            {service.deliverables.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/40">
        <span className="text-xs text-muted-foreground line-clamp-1 max-w-[65%]">
          {service.audience}
        </span>
        <Link 
          to="/contact" 
          search={{ service: service.title }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-deep transition-colors"
        >
          <span>Enquire</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
