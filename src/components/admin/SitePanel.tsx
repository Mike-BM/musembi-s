import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { EyeOff, Pencil, RotateCcw } from "lucide-react";
import { adminSaveSettings } from "@/lib/portal/api";
import { contactSchema, serviceOverrideSchema, type ServiceOverride, type SiteSettings } from "@/lib/portal/schemas";
import { CONTACT, SERVICES } from "@/lib/site";
import { Switch } from "@/components/ui/switch";
import { Field, btn, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { IconBtn } from "./PublicationsPanel";
import { Modal, Notice, PanelHeader, errMsg, splitLines } from "./shared";

type ContactDraft = Record<keyof typeof CONTACT, string>;
const CONTACT_FIELDS: { key: keyof typeof CONTACT; label: string; hint?: string }[] = [
  { key: "phoneDisplay", label: "Phone (as displayed)", hint: "e.g. +254 794 191 690" },
  { key: "phoneIntl", label: "WhatsApp number", hint: "Digits only with country code, e.g. 254794191690" },
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "postalAddress", label: "Postal address" },
  { key: "availability", label: "Availability / hours" },
  { key: "responseGuarantee", label: "Response promise" },
];

export function SitePanel({ initial, storageConfigured }: { initial: SiteSettings; storageConfigured: boolean }) {
  const qc = useQueryClient();
  const saveFn = useServerFn(adminSaveSettings);
  const [settings, setSettings] = useState<SiteSettings>(initial);
  const [contact, setContact] = useState<ContactDraft>(() => ({ ...(CONTACT as ContactDraft), ...(initial.contact as Partial<ContactDraft>) }));
  const [contactError, setContactError] = useState<string | null>(null);
  const [svcSlug, setSvcSlug] = useState<string | null>(null);
  const [svc, setSvc] = useState({ title: "", summary: "", audience: "", deliverables: "" });
  const [svcError, setSvcError] = useState<string | null>(null);

  const persist = useMutation({
    mutationFn: (next: SiteSettings) => saveFn({ data: next }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "content"] }),
  });

  async function commit(next: SiteSettings, okMsg: string) {
    const prev = settings;
    setSettings(next);
    try {
      await persist.mutateAsync(next);
      toast.success(okMsg);
      return true;
    } catch (e) {
      setSettings(prev);
      toast.error(errMsg(e));
      return false;
    }
  }

  async function saveContact() {
    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      const i = parsed.error.issues[0];
      setContactError(i ? `${String(i.path[0] ?? "")}: ${i.message}` : "Please check the details.");
      return;
    }
    setContactError(null);
    await commit({ ...settings, contact: parsed.data }, "Contact details saved");
  }

  function openService(slug: string) {
    const base = SERVICES.find((s) => s.slug === slug)!;
    const o = settings.services[slug] ?? {};
    setSvcSlug(slug);
    setSvc({
      title: o.title ?? base.title,
      summary: o.summary ?? base.summary,
      audience: o.audience ?? base.audience,
      deliverables: (o.deliverables?.length ? o.deliverables : base.deliverables).join("\n"),
    });
    setSvcError(null);
  }

  async function saveService() {
    if (!svcSlug) return;
    const base = SERVICES.find((s) => s.slug === svcSlug)!;
    const next: ServiceOverride = { ...(settings.services[svcSlug] ?? {}) };
    const lines = splitLines(svc.deliverables);
    // Only store what differs from the built-in text.
    if (svc.title.trim() !== base.title) next.title = svc.title.trim(); else delete next.title;
    if (svc.summary.trim() !== base.summary) next.summary = svc.summary.trim(); else delete next.summary;
    if (svc.audience.trim() !== base.audience) next.audience = svc.audience.trim(); else delete next.audience;
    if (lines.join("\n") !== base.deliverables.join("\n")) next.deliverables = lines; else delete next.deliverables;
    const parsed = serviceOverrideSchema.safeParse(next);
    if (!parsed.success) {
      setSvcError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    const services = { ...settings.services };
    if (Object.keys(parsed.data).length === 0) delete services[svcSlug];
    else services[svcSlug] = parsed.data;
    if (await commit({ ...settings, services }, "Service saved")) setSvcSlug(null);
  }

  async function toggleHidden(slug: string, hidden: boolean) {
    const services = { ...settings.services };
    const cur: ServiceOverride = { ...(services[slug] ?? {}) };
    if (hidden) cur.hidden = true; else delete cur.hidden;
    if (Object.keys(cur).length === 0) delete services[slug];
    else services[slug] = cur;
    await commit({ ...settings, services }, hidden ? "Service hidden from website" : "Service visible again");
  }

  async function resetService(slug: string) {
    if (!window.confirm("Reset this service to the original wording?")) return;
    const services = { ...settings.services };
    const hidden = services[slug]?.hidden;
    delete services[slug];
    if (hidden) services[slug] = { hidden: true };
    await commit({ ...settings, services }, "Service reset");
  }

  const setC = (k: keyof ContactDraft, v: string) => setContact((c) => ({ ...c, [k]: v }));

  return (
    <div className="space-y-10">
      {!storageConfigured && <Notice tone="warn">Storage is not connected yet, so changes cannot be saved. See ADMIN_SETUP.md.</Notice>}

      <section>
        <PanelHeader title="Contact details" intro="Used in the header, footer, contact page and every WhatsApp button across the website." />
        <div className="grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2">
          {CONTACT_FIELDS.map((f) => (
            <Field key={f.key} label={f.label} id={`c-${f.key}`} {...(f.hint ? { hint: f.hint } : {})}>
              <input id={`c-${f.key}`} className={inputCls} value={contact[f.key]} onChange={(e) => setC(f.key, e.target.value)} />
            </Field>
          ))}
          <div className="flex flex-wrap items-center justify-end gap-3 sm:col-span-2">
            {contactError && (
              <p role="alert" className="mr-auto text-sm font-medium text-destructive">
                {contactError}
              </p>
            )}
            <button
              type="button"
              className={cn(btn.outline, "py-2 text-xs")}
              onClick={() => {
                setContact({ ...(CONTACT as ContactDraft) });
                setContactError(null);
              }}
            >
              Restore originals
            </button>
            <button type="button" className={cn(btn.primary, "py-2 text-xs")} disabled={persist.isPending || !storageConfigured} onClick={() => void saveContact()}>
              Save contact details
            </button>
          </div>
        </div>
      </section>

      <section>
        <PanelHeader title="Services" intro="Edit the wording of a service or hide it from the website. Resetting brings back the original text." />
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {SERVICES.map((s) => {
            const o = settings.services[s.slug];
            const edited = !!o && Object.keys(o).some((k) => k !== "hidden");
            const hidden = o?.hidden === true;
            return (
              <li key={s.slug} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm font-semibold text-primary-deep", hidden && "line-through opacity-60")}>{o?.title ?? s.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.category}
                    {edited && " · edited"}
                    {hidden && " · hidden"}
                  </p>
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <EyeOff className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Hide</span>
                  <Switch checked={hidden} disabled={!storageConfigured || persist.isPending} onCheckedChange={(v) => void toggleHidden(s.slug, v)} aria-label={`Hide ${s.title}`} />
                </label>
                {edited && (
                  <IconBtn label="Reset to original" onClick={() => void resetService(s.slug)}>
                    <RotateCcw className="h-4 w-4" />
                  </IconBtn>
                )}
                <IconBtn label="Edit" onClick={() => openService(s.slug)}>
                  <Pencil className="h-4 w-4" />
                </IconBtn>
              </li>
            );
          })}
        </ul>
      </section>

      <Modal open={svcSlug !== null} onClose={() => setSvcSlug(null)} title="Edit service" wide>
        <div className="space-y-4">
          <Field label="Title" id="s-title">
            <input id="s-title" className={inputCls} value={svc.title} onChange={(e) => setSvc({ ...svc, title: e.target.value })} />
          </Field>
          <Field label="Summary" id="s-sum">
            <textarea id="s-sum" rows={4} className={inputCls} value={svc.summary} onChange={(e) => setSvc({ ...svc, summary: e.target.value })} />
          </Field>
          <Field label="Who it is for" id="s-aud">
            <textarea id="s-aud" rows={2} className={inputCls} value={svc.audience} onChange={(e) => setSvc({ ...svc, audience: e.target.value })} />
          </Field>
          <Field label="What you deliver" id="s-del" hint="One per line">
            <textarea id="s-del" rows={6} className={inputCls} value={svc.deliverables} onChange={(e) => setSvc({ ...svc, deliverables: e.target.value })} />
          </Field>
          {svcError && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {svcError}
            </p>
          )}
          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <button type="button" className={cn(btn.outline, "py-2 text-xs")} onClick={() => setSvcSlug(null)}>
              Cancel
            </button>
            <button type="button" className={cn(btn.primary, "py-2 text-xs")} disabled={persist.isPending || !storageConfigured} onClick={() => void saveService()}>
              {persist.isPending ? "Saving..." : "Save service"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
