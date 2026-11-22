import type { CONTACT as ContactDefaults, Service } from "@/lib/site";
import type { SiteSettings } from "./schemas";

/** Defaults from the code, overridden by whatever the admin saved. Pure, so it works on server and client. */
export function mergeContact(defaults: typeof ContactDefaults, settings: SiteSettings): typeof ContactDefaults {
  const out = { ...defaults };
  for (const [key, value] of Object.entries(settings.contact)) {
    if (typeof value === "string" && value.trim() !== "") {
      (out as Record<string, string>)[key] = value;
    }
  }
  return out;
}

export function mergeServices(defaults: Service[], settings: SiteSettings): Service[] {
  return defaults
    .filter((s) => settings.services[s.slug]?.hidden !== true)
    .map((s) => {
      const o = settings.services[s.slug];
      if (!o) return s;
      return {
        ...s,
        title: o.title ?? s.title,
        summary: o.summary ?? s.summary,
        audience: o.audience ?? s.audience,
        deliverables: o.deliverables && o.deliverables.length > 0 ? o.deliverables : s.deliverables,
      };
    });
}
