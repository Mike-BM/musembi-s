import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { adminSaveArticles } from "@/lib/portal/api";
import { ARTICLE_CATEGORIES, articleSchema } from "@/lib/portal/schemas";
import { ARTICLES, type Article } from "@/lib/site";
import { Field, btn, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { IconBtn } from "./PublicationsPanel";
import { Modal, Notice, PanelHeader, errMsg, moveItem, slugify, splitLines } from "./shared";

type Draft = Omit<Article, "highlights"> & { highlights: string };

const today = () => new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const blank = (): Draft => ({
  slug: "",
  category: "Research Methodology",
  title: "",
  excerpt: "",
  readTime: "5 min read",
  publishedDate: today(),
  highlights: "",
});

export function ArticlesPanel({ initial, storageConfigured }: { initial: Article[] | null; storageConfigured: boolean }) {
  const qc = useQueryClient();
  const saveFn = useServerFn(adminSaveArticles);
  const [list, setList] = useState<Article[]>(initial ?? ARTICLES);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const persist = useMutation({
    mutationFn: (next: Article[]) => saveFn({ data: next }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["admin", "content"] }),
  });

  async function commit(next: Article[], okMsg: string) {
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

  async function submit() {
    if (!draft) return;
    const parsed = articleSchema.safeParse({ ...draft, highlights: splitLines(draft.highlights) });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    const value = parsed.data as Article;
    if (list.some((a, i) => a.slug === value.slug && i !== editing)) {
      setFormError("Another article already uses that web address (slug). Change the title or slug.");
      return;
    }
    const next = editing === null ? [value, ...list] : list.map((a, i) => (i === editing ? value : a));
    if (await commit(next, editing === null ? "Article added" : "Article updated")) setDraft(null);
  }

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <div>
      <PanelHeader
        title="Articles & guides"
        intro="The article at the top is the Featured Editorial Guide on the Resources page. Use the arrows or the star to reorder."
        actions={
          <button
            type="button"
            className={cn(btn.primary, "py-2 text-xs")}
            disabled={!storageConfigured}
            onClick={() => {
              setEditing(null);
              setDraft(blank());
              setSlugTouched(false);
              setFormError(null);
            }}
          >
            <Plus className="h-3.5 w-3.5" /> Add article
          </button>
        }
      />
      {!storageConfigured && <Notice tone="warn">Storage is not connected yet, so changes cannot be saved. See ADMIN_SETUP.md.</Notice>}
      {initial === null && storageConfigured && (
        <Notice>These are the built-in sample articles. Saving any change here publishes your own list and replaces them.</Notice>
      )}

      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card py-14 text-center text-sm text-muted-foreground">No articles yet.</div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {list.map((a, i) => (
            <li key={a.slug} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-primary-deep">
                  {i === 0 && <span className="mr-2 rounded bg-gold/20 px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-primary-deep">Featured</span>}
                  {a.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {a.category} · {a.publishedDate} · {a.readTime}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {i > 0 && (
                  <IconBtn label="Make featured" onClick={() => void commit(moveItem(list, i, 0), "Featured article changed")}>
                    <Star className="h-4 w-4" />
                  </IconBtn>
                )}
                <IconBtn label="Move up" onClick={() => void commit(moveItem(list, i, i - 1), "Order saved")} disabled={i === 0}>
                  <ArrowUp className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Move down" onClick={() => void commit(moveItem(list, i, i + 1), "Order saved")} disabled={i === list.length - 1}>
                  <ArrowDown className="h-4 w-4" />
                </IconBtn>
                <IconBtn
                  label="Edit"
                  onClick={() => {
                    setEditing(i);
                    setDraft({ ...a, highlights: a.highlights.join("\n") });
                    setSlugTouched(true);
                    setFormError(null);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </IconBtn>
                <IconBtn
                  label="Delete"
                  danger
                  onClick={() => {
                    if (window.confirm(`Delete "${a.title}"?`)) void commit(list.filter((_, idx) => idx !== i), "Article deleted");
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </IconBtn>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={draft !== null} onClose={() => setDraft(null)} title={editing === null ? "Add article" : "Edit article"} wide>
        {draft && (
          <div className="space-y-4">
            <Field label="Title" id="art-title">
              <input
                id="art-title"
                className={inputCls}
                value={draft.title}
                maxLength={200}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!slugTouched) set("slug", slugify(e.target.value));
                }}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category" id="art-cat">
                <select id="art-cat" className={inputCls} value={draft.category} onChange={(e) => set("category", e.target.value as Draft["category"])}>
                  {ARTICLE_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Web address (slug)" id="art-slug">
                <input
                  id="art-slug"
                  className={inputCls}
                  value={draft.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                />
              </Field>
              <Field label="Date shown" id="art-date">
                <input id="art-date" className={inputCls} value={draft.publishedDate} onChange={(e) => set("publishedDate", e.target.value)} />
              </Field>
              <Field label="Read time" id="art-read">
                <input id="art-read" className={inputCls} value={draft.readTime} onChange={(e) => set("readTime", e.target.value)} />
              </Field>
            </div>
            <Field label="Summary" id="art-excerpt">
              <textarea id="art-excerpt" rows={4} className={inputCls} value={draft.excerpt} maxLength={800} onChange={(e) => set("excerpt", e.target.value)} />
            </Field>
            <Field label="Key takeaways" id="art-hl" hint="One per line">
              <textarea id="art-hl" rows={5} className={inputCls} value={draft.highlights} onChange={(e) => set("highlights", e.target.value)} />
            </Field>
            {formError && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {formError}
              </p>
            )}
            <div className="flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" className={cn(btn.outline, "py-2 text-xs")} onClick={() => setDraft(null)}>
                Cancel
              </button>
              <button type="button" className={cn(btn.primary, "py-2 text-xs")} disabled={persist.isPending} onClick={() => void submit()}>
                {persist.isPending ? "Saving..." : "Save article"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
