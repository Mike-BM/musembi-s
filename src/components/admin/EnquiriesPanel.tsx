import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Download, Mail, MessageSquare, Phone, RefreshCw, Search, Trash2 } from "lucide-react";
import { adminDeleteEnquiry, adminListEnquiries, adminUpdateEnquiry } from "@/lib/portal/api";
import { ENQUIRY_STATUSES, ENQUIRY_STATUS_LABEL, type EnquiryRecord, type EnquiryStatus } from "@/lib/portal/schemas";
import { Field, btn, inputCls } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { Modal, Notice, PanelHeader, errMsg, waNumber } from "./shared";

const STATUS_STYLE: Record<EnquiryStatus, string> = {
  new: "bg-amber-100 text-amber-900 border-amber-200",
  in_progress: "bg-blue-100 text-blue-900 border-blue-200",
  done: "bg-emerald-100 text-emerald-900 border-emerald-200",
  spam: "bg-slate-100 text-slate-600 border-slate-200",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-KE", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function csvCell(v: string | undefined) {
  const s = (v ?? "").replace(/"/g, '""');
  return `"${s}"`;
}

function exportCsv(rows: EnquiryRecord[]) {
  const head = ["Date", "Status", "Name", "Email", "Phone", "Stage", "Service", "Timeline", "Contact method", "Message", "Notes"];
  const lines = rows.map((r) =>
    [fmt(r.createdAt), ENQUIRY_STATUS_LABEL[r.status], r.name, r.email, r.phone, r.academicLevel, r.service, r.timeline, r.contactMethod, r.message, r.notes]
      .map(csvCell)
      .join(","),
  );
  const blob = new Blob([[head.map(csvCell).join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function EnquiriesPanel({ storageConfigured }: { storageConfigured: boolean }) {
  const qc = useQueryClient();
  const list = useServerFn(adminListEnquiries);
  const update = useServerFn(adminUpdateEnquiry);
  const remove = useServerFn(adminDeleteEnquiry);

  const query = useQuery({ queryKey: ["admin", "enquiries"], queryFn: () => list(), enabled: storageConfigured });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState<EnquiryStatus>("new");
  const [notes, setNotes] = useState("");

  const rows = useMemo(() => query.data ?? [], [query.data]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const s of ENQUIRY_STATUSES) c[s] = rows.filter((r) => r.status === s).length;
    return c;
  }, [rows]);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (filter === "all" || r.status === filter) &&
        (!q || [r.name, r.email, r.phone, r.service, r.message].some((f) => f.toLowerCase().includes(q))),
    );
  }, [rows, search, filter]);

  const current = rows.find((r) => r.id === openId) ?? null;

  const save = useMutation({
    mutationFn: () => update({ data: { id: openId!, status, notes } }),
    onSuccess: () => {
      toast.success("Enquiry updated");
      setOpenId(null);
      void qc.invalidateQueries({ queryKey: ["admin", "enquiries"] });
    },
    onError: (e) => toast.error(errMsg(e)),
  });
  const del = useMutation({
    mutationFn: () => remove({ data: { id: openId! } }),
    onSuccess: () => {
      toast.success("Enquiry deleted");
      setOpenId(null);
      void qc.invalidateQueries({ queryKey: ["admin", "enquiries"] });
    },
    onError: (e) => toast.error(errMsg(e)),
  });

  function open(r: EnquiryRecord) {
    setOpenId(r.id);
    setStatus(r.status);
    setNotes(r.notes);
  }

  return (
    <div>
      <PanelHeader
        title="Enquiries"
        intro="Every consultation request from the website form is saved here, even if the visitor never finishes sending it on WhatsApp or email."
        actions={
          <>
            <button type="button" className={cn(btn.outline, "py-2 text-xs")} onClick={() => void query.refetch()} disabled={!storageConfigured}>
              <RefreshCw className={cn("h-3.5 w-3.5", query.isFetching && "animate-spin")} /> Refresh
            </button>
            <button type="button" className={cn(btn.outline, "py-2 text-xs")} onClick={() => exportCsv(shown)} disabled={shown.length === 0}>
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          </>
        }
      />

      {!storageConfigured && (
        <Notice tone="warn">
          Storage is not connected yet, so new enquiries are not being saved. Add <strong>GITHUB_TOKEN</strong> in your hosting settings
          (see ADMIN_SETUP.md). Enquiries still reach you by WhatsApp or email in the meantime.
        </Notice>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input className={cn(inputCls, "pl-9")} placeholder="Search name, email, phone, service or message" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...ENQUIRY_STATUSES] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === s ? "border-primary bg-primary text-white" : "border-border bg-card text-muted-foreground hover:border-primary/50",
              )}
            >
              {s === "all" ? "All" : ENQUIRY_STATUS_LABEL[s]} ({counts[s] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {query.isError && <Notice tone="warn">{errMsg(query.error)}</Notice>}
      {query.isLoading && storageConfigured && <p className="py-10 text-center text-sm text-muted-foreground">Loading enquiries...</p>}

      {!query.isLoading && shown.length === 0 && storageConfigured && !query.isError && (
        <div className="rounded-lg border border-dashed border-border bg-card py-14 text-center text-sm text-muted-foreground">
          {rows.length === 0 ? "No enquiries yet. They will appear here as visitors use the contact form." : "No enquiries match your search."}
        </div>
      )}

      {shown.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <ul className="divide-y divide-border">
            {shown.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => open(r)} className="flex w-full flex-col gap-1.5 px-4 py-3.5 text-left transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-4">
                  <span className={cn("w-fit rounded border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wider", STATUS_STYLE[r.status])}>
                    {ENQUIRY_STATUS_LABEL[r.status]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-primary-deep">{r.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.service}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{r.contactMethod}</span>
                  <span className="text-xs text-muted-foreground sm:w-40 sm:text-right">{fmt(r.createdAt)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal open={current !== null} onClose={() => setOpenId(null)} title={current?.name ?? "Enquiry"} description={current ? `Received ${fmt(current.createdAt)}` : undefined} wide>
        {current && (
          <div className="space-y-5">
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {(
                [
                  ["Email", current.email],
                  ["Phone / WhatsApp", current.phone],
                  ["Service", current.service],
                  ["Stage", current.academicLevel || "-"],
                  ["Timeline", current.timeline || "-"],
                  ["Preferred contact", current.contactMethod],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 break-words text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">Message</p>
              <p className="mt-1 whitespace-pre-line break-words rounded-md border border-border bg-secondary/30 p-3 text-sm">{current.message}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a className={cn(btn.whatsapp, "py-2 text-xs")} href={`https://wa.me/${waNumber(current.phone)}`} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a className={cn(btn.outline, "py-2 text-xs")} href={`mailto:${current.email}?subject=${encodeURIComponent(`Re: ${current.service}`)}`}>
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
              <a className={cn(btn.outline, "py-2 text-xs")} href={`tel:+${waNumber(current.phone)}`}>
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Status" id="enq-status">
                <select id="enq-status" className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as EnquiryStatus)}>
                  {ENQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {ENQUIRY_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Private notes" id="enq-notes" hint="Only you can see these">
                  <textarea id="enq-notes" rows={3} maxLength={4000} className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Quote sent, follow up on Friday..." />
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive hover:underline"
                disabled={del.isPending}
                onClick={() => {
                  if (window.confirm("Delete this enquiry permanently?")) del.mutate();
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
              <div className="flex gap-2">
                <button type="button" className={cn(btn.outline, "py-2 text-xs")} onClick={() => setOpenId(null)}>
                  Cancel
                </button>
                <button type="button" className={cn(btn.primary, "py-2 text-xs")} disabled={save.isPending} onClick={() => save.mutate()}>
                  {save.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
