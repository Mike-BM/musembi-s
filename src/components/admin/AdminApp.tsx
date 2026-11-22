import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { BookOpen, ExternalLink, FileText, Inbox, LogOut, Settings } from "lucide-react";
import { adminGetContent, adminLogout } from "@/lib/portal/api";
import { cn } from "@/lib/utils";
import { EnquiriesPanel } from "./EnquiriesPanel";
import { PublicationsPanel } from "./PublicationsPanel";
import { ArticlesPanel } from "./ArticlesPanel";
import { SitePanel } from "./SitePanel";
import { Notice, errMsg } from "./shared";
import logoImg from "@/assets/logo.jpeg";

const TABS = [
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "publications", label: "Publications", icon: FileText },
  { id: "articles", label: "Articles", icon: BookOpen },
  { id: "site", label: "Site & Services", icon: Settings },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function AdminApp({ storageConfigured }: { storageConfigured: boolean }) {
  const router = useRouter();
  const qc = useQueryClient();
  const logout = useServerFn(adminLogout);
  const getContent = useServerFn(adminGetContent);
  const [tab, setTab] = useState<TabId>("enquiries");

  // Loaded once; panels keep their own working copy so edits are never overwritten mid-typing.
  const content = useQuery({
    queryKey: ["admin", "content"],
    queryFn: () => getContent(),
    enabled: storageConfigured,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  async function signOut() {
    await logout().catch(() => undefined);
    qc.clear();
    await router.invalidate();
  }

  const needsContent = tab !== "enquiries";
  const ready = !storageConfigured || content.data !== undefined;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <img src={logoImg} alt="" className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base text-primary-deep">Admin Portal</p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">Musembi S. Educational Consultancy</p>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
            <ExternalLink className="h-3.5 w-3.5" /> <span className="hidden sm:inline">View site</span>
          </a>
          <button type="button" onClick={() => void signOut()} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:border-primary/50">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary-deep",
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {tab === "enquiries" && <EnquiriesPanel storageConfigured={storageConfigured} />}

        {needsContent && content.isError && <Notice tone="warn">{errMsg(content.error)}</Notice>}
        {needsContent && !ready && !content.isError && <p className="py-16 text-center text-sm text-muted-foreground">Loading...</p>}

        {needsContent && ready && (
          <>
            {tab === "publications" && <PublicationsPanel initial={content.data?.publications ?? null} storageConfigured={storageConfigured} />}
            {tab === "articles" && <ArticlesPanel initial={content.data?.articles ?? null} storageConfigured={storageConfigured} />}
            {tab === "site" && (
              <SitePanel initial={content.data?.settings ?? { contact: {}, services: {} }} storageConfigured={storageConfigured} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
