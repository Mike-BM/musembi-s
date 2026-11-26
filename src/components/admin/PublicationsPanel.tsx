import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { adminRemoveUpload, adminSavePublications, adminUploadFile } from "@/lib/portal/api";
import { PUBLICATION_CATEGORIES, publicationSchema } from "@/lib/portal/schemas";
import { INITIAL_PUBLICATIONS, type Publication } from "@/lib/site";
import { Field, btn, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { Modal, Notice, PanelHeader, errMsg, moveItem, splitCommas } from "./shared";

type Draft = Omit<Publication, "topics" | "subject" | "level" | "audience"> & { topics: string; subject: string; level: string; audience: string };

const today = () => new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

const blank = (): Draft => ({
  id: `pub-${Date.now().toString(36)}`,
  title: "",
  category: "Training Manual",
  publishedDate: today(),
  readTimeOrPages: "",
  fileFormat: "PDF",
  fileSize: "",
  description: "",
  topics: "",
  subject: "",
  level: "",
  audience: "",
  downloadUrl: "",
});

const toDraft = (p: Publication): Draft => ({ ...p, topics: p.topics.join(", "), subject: p.subject ?? "", level: p.level ?? "", audience: p.audience ?? "", downloadUrl: p.downloadUrl ?? "" });

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(new Error("Could not read that file."));
    r.readAsDataURL(file);
  });
}

const prettySize = (n: number) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export function PublicationsPanel({ initial, storageConfigured }: { initial: Publication[] | null; storageConfigured: boolean }) {
  const qc = useQueryClient();
  const saveFn = useServerFn(adminSavePublications);
  const uploadFn = useServerFn(adminUploadFile);
  const removeFn = useServerFn(adminRemoveUpload);
  const fileRef = useRef<HTMLInputElement>(null);

  const [list, setList] = useState<Publication[]>(initial ?? INITIAL_PUBLICATIONS);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const persist = useMutation({
    mutationFn: (next: Publication[]) => saveFn({ data: next }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "content"] }),
  });

  async function commit(next: Publication[], okMsg: string) {
    const prev = list;
    setList(next);
    try {
      await persist.mutateAsync(next);
      toast.success(okMsg);
      return true;
    } catch (e) {
      setList(prev);
      toast.error(errMsg(e));
      return false;
    }
  }

  function openNew() {
    setEditing(null);
    setDraft(blank());
    setFormError(null);
  }
  function openEdit(i: number) {
    setEditing(i);
    setDraft(toDraft(list[i]!));
    setFormError(null);
  }

  async function submit() {
    if (!draft) return;
    const candidate = {
      ...draft,
      topics: splitCommas(draft.topics),
      subject: draft.subject.trim() || undefined,
      level: draft.level.trim() || undefined,
      audience: draft.audience.trim() || undefined,
    };
    const parsed = publicationSchema.safeParse(candidate);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    const value = parsed.data as Publication;
    const next = editing === null ? [value, ...list] : list.map((p, i) => (i === editing ? value : p));
    if (await commit(next, editing === null ? "Publication added" : "Publication updated")) setDraft(null);
  }

  async function remove(i: number) {
    const p = list[i]!;
    if (!window.confirm(`Remove "${p.title}" from the website?`)) return;
    const ok = await commit(
      list.filter((_, idx) => idx !== i),
      "Publication removed",
    );
    if (ok && p.downloadUrl?.startsWith("/files/")) void removeFn({ data: { url: p.downloadUrl } }).catch(() => undefined);
  }

  async function onFile(file: File | undefined) {
    if (!file || !draft) return;
    setUploading(true);
    setFormError(null);
    try {
      const res = await uploadFn({ data: { name: file.name, base64: await fileToBase64(file) } });
      setDraft((d) =>
        d ? { ...d, downloadUrl: res.url, fileFormat: res.ext.toUpperCase(), fileSize: prettySize(res.size) } : d,
      );
      toast.success("File uploaded");
    } catch (e) {
      setFormError(errMsg(e));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <div>
      <PanelHeader
        title="Publications & resources"
        intro="Training manuals, scholarly articles and newsletters shown in the Publications Repository on the Resources page. Changes appear on the website within seconds."
        actions={
          <button type="button" className={cn(btn.primary, "py-2 text-xs")} onClick={openNew} disabled={!storageConfigured}>
            <Plus className="h-3.5 w-3.5" /> Add publication
          </button>
        }
      />
      {!storageConfigured && <Notice tone="warn">Storage is not connected yet, so changes cannot be saved. See ADMIN_SETUP.md.</Notice>}
      {initial === null && storageConfigured && (
        <Notice>These are the built-in sample publications. Saving any change here publishes your own list and replaces them.</Notice>
      )}

      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card py-14 text-center text-sm text-muted-foreground">
          No publications yet. Add the first one.
        </div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {list.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary-deep">{p.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {p.category} · {p.publishedDate} · {p.downloadUrl ? `${p.fileFormat} ${p.fileSize}` : "No file (visitors request access)"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <IconBtn label="Move up" onClick={() => void commit(moveItem(list, i, i - 1), "Order saved")} disabled={i === 0}>
                  <ArrowUp className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Move down" onClick={() => void commit(moveItem(list, i, i + 1), "Order saved")} disabled={i === list.length - 1}>
                  <ArrowDown className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Edit" onClick={() => openEdit(i)}>
                  <Pencil className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Delete" onClick={() => void remove(i)} danger>
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={draft !== null} onClose={() => setDraft(null)} title={editing === null ? "Add publication" : "Edit publication"} wide>
        {draft && (
          <div className="space-y-4">
            <Field label="Title" id="pub-title">
              <input id="pub-title" className={inputCls} value={draft.title} onChange={(e) => set("title", e.target.value)} maxLength={200} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Type" id="pub-cat">
                <select id="pub-cat" className={inputCls} value={draft.category} onChange={(e) => set("category", e.target.value as Draft["category"])}>
                  {PUBLICATION_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Date shown" id="pub-date">
                <input id="pub-date" className={inputCls} value={draft.publishedDate} onChange={(e) => set("publishedDate", e.target.value)} />
              </Field>
            </div>
            <Field label="Description" id="pub-desc">
              <textarea id="pub-desc" rows={3} className={inputCls} value={draft.description} onChange={(e) => set("description", e.target.value)} maxLength={900} />
            </Field>
            <Field label="Topics" id="pub-topics" hint="Separate with commas">
              <input id="pub-topics" className={inputCls} value={draft.topics} onChange={(e) => set("topics", e.target.value)} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Subject" id="pub-subject" hint="Optional">
                <input id="pub-subject" className={inputCls} value={draft.subject} onChange={(e) => set("subject", e.target.value)} placeholder="e.g. Kiswahili" />
              </Field>
              <Field label="Education level" id="pub-level" hint="Optional">
                <input id="pub-level" className={inputCls} value={draft.level} onChange={(e) => set("level", e.target.value)} placeholder="e.g. Junior School" />
              </Field>
              <Field label="Audience" id="pub-aud" hint="Optional">
                <input id="pub-aud" className={inputCls} value={draft.audience} onChange={(e) => set("audience", e.target.value)} placeholder="e.g. Teachers" />
              </Field>
            </div>

            <div className="rounded-md border border-border bg-secondary/30 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Downloadable file</p>
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={(e) => void onFile(e.target.files?.[0])}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className={cn(btn.outline, "py-2 text-xs")} disabled={uploading} onClick={() => fileRef.current?.click()}>
                  <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading..." : "Upload file (max 4 MB)"}
                </button>
                {draft.downloadUrl && (
                  <button type="button" className="text-xs text-destructive hover:underline" onClick={() => set("downloadUrl", "")}>
                    Remove link
                  </button>
                )}
              </div>
              <div className="mt-3">
                <Field label="Or paste a link" id="pub-url" hint="Leave empty to make visitors enquire for access">
                  <input id="pub-url" className={inputCls} value={draft.downloadUrl ?? ""} onChange={(e) => set("downloadUrl", e.target.value)} placeholder="https://..." />
                </Field>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <Field label="Format" id="pub-fmt">
                  <input id="pub-fmt" className={inputCls} value={draft.fileFormat} onChange={(e) => set("fileFormat", e.target.value)} />
                </Field>
                <Field label="Size" id="pub-size">
                  <input id="pub-size" className={inputCls} value={draft.fileSize} onChange={(e) => set("fileSize", e.target.value)} />
                </Field>
                <Field label="Pages / read time" id="pub-pages">
                  <input id="pub-pages" className={inputCls} value={draft.readTimeOrPages} onChange={(e) => set("readTimeOrPages", e.target.value)} placeholder="24 pages" />
                </Field>
              </div>
            </div>

            {formError && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {formError}
              </p>
            )}
            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" className={cn(btn.outline, "py-2 text-xs")} onClick={() => setDraft(null)}>
                Cancel
              </button>
              <button type="button" className={cn(btn.primary, "py-2 text-xs")} disabled={persist.isPending || uploading} onClick={() => void submit()}>
                {persist.isPending ? "Saving..." : "Save publication"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function IconBtn({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30",
        danger ? "hover:text-destructive" : "hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
