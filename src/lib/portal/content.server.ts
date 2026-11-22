import type { Article, Publication } from "@/lib/site";
import {
  EMPTY_SETTINGS,
  ENQUIRY_ID,
  articlesSchema,
  enquiryRecordSchema,
  publicationsSchema,
  settingsSchema,
  type EnquiryInput,
  type EnquiryRecord,
  type EnquiryStatus,
  type PortalContent,
  type SiteSettings,
} from "./schemas";
import { deleteFile, listDir, putBinary, readBinary, readText, storageConfigured, updateJson } from "./github.server";

const SETTINGS = "content/settings.json";
const ARTICLES = "content/articles.json";
const PUBLICATIONS = "content/publications.json";

async function readValidated<T>(path: string, parse: (raw: unknown) => T | null): Promise<T | null> {
  try {
    const file = await readText(path);
    if (!file) return null;
    return parse(JSON.parse(file.content));
  } catch (e) {
    console.error(`Portal content read failed for ${path}`, e);
    return null;
  }
}

/** Never throws: if storage is down or empty, the public site falls back to its built-in content. */
export async function loadPortalContent(): Promise<PortalContent> {
  if (!storageConfigured()) return { settings: EMPTY_SETTINGS, articles: null, publications: null };
  const [settings, articles, publications] = await Promise.all([
    readValidated(SETTINGS, (r) => {
      const p = settingsSchema.safeParse(r);
      return p.success ? p.data : null;
    }),
    readValidated(ARTICLES, (r) => {
      const p = articlesSchema.safeParse(r);
      return p.success ? (p.data as Article[]) : null;
    }),
    readValidated(PUBLICATIONS, (r) => {
      const p = publicationsSchema.safeParse(r);
      return p.success ? (p.data as Publication[]) : null;
    }),
  ]);
  return { settings: settings ?? EMPTY_SETTINGS, articles, publications };
}

export async function saveSettings(settings: SiteSettings) {
  await updateJson<SiteSettings>(SETTINGS, EMPTY_SETTINGS, () => settings, "Portal: update site settings");
}
export async function saveArticles(articles: Article[]) {
  await updateJson<Article[]>(ARTICLES, [], () => articles, "Portal: update articles");
}
export async function savePublications(publications: Publication[]) {
  await updateJson<Publication[]>(PUBLICATIONS, [], () => publications, "Portal: update publications");
}

// ---------- Enquiries (one file per month keeps saves small and collisions rare) ----------

const shardPath = (month: string) => `enquiries/${month}.json`;

function newId(now: Date): string {
  const month = now.toISOString().slice(0, 7);
  return `${month}-${crypto.randomUUID().replace(/-/g, "").slice(0, 8)}`;
}

export async function addEnquiry(input: EnquiryInput): Promise<EnquiryRecord> {
  const now = new Date();
  const { website: _honeypot, ...rest } = input;
  const record: EnquiryRecord = {
    ...rest,
    id: newId(now),
    createdAt: now.toISOString(),
    status: "new",
    notes: "",
  };
  await updateJson<EnquiryRecord[]>(
    shardPath(record.id.slice(0, 7)),
    [],
    (list) => [record, ...list],
    `Portal: new enquiry from ${record.name.slice(0, 40)}`,
  );
  return record;
}

export async function listEnquiries(monthsBack = 12): Promise<EnquiryRecord[]> {
  const names = (await listDir("enquiries"))
    .filter((n) => /^\d{4}-\d{2}\.json$/.test(n))
    .sort()
    .reverse()
    .slice(0, monthsBack);
  const shards = await Promise.all(
    names.map(async (n) => {
      const file = await readText(`enquiries/${n}`, { fresh: true });
      if (!file) return [] as EnquiryRecord[];
      const parsed = enquiryRecordSchema.array().safeParse(JSON.parse(file.content));
      return parsed.success ? parsed.data : [];
    }),
  );
  return shards.flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateEnquiry(id: string, patch: { status?: EnquiryStatus | undefined; notes?: string | undefined }) {
  if (!ENQUIRY_ID.test(id)) throw new Error("Invalid enquiry id");
  await updateJson<EnquiryRecord[]>(
    shardPath(id.slice(0, 7)),
    [],
    (list) =>
      list.map((e) =>
        e.id === id
          ? {
              ...e,
              ...(patch.status ? { status: patch.status } : {}),
              ...(patch.notes !== undefined ? { notes: patch.notes.slice(0, 4000) } : {}),
              updatedAt: new Date().toISOString(),
            }
          : e,
      ),
    "Portal: update enquiry",
  );
}

export async function deleteEnquiry(id: string) {
  if (!ENQUIRY_ID.test(id)) throw new Error("Invalid enquiry id");
  await updateJson<EnquiryRecord[]>(
    shardPath(id.slice(0, 7)),
    [],
    (list) => list.filter((e) => e.id !== id),
    "Portal: delete enquiry",
  );
}

// ---------- Uploaded files (publications) ----------

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const FILE_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export const fileExt = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";
export const contentTypeFor = (name: string) => FILE_TYPES[fileExt(name)];

export async function storeUpload(originalName: string, bytes: Uint8Array): Promise<{ url: string; size: number; ext: string }> {
  const ext = fileExt(originalName);
  if (!FILE_TYPES[ext]) throw new Error("File type not allowed. Use PDF, Word, PowerPoint, Excel or an image.");
  if (bytes.length === 0 || bytes.length > MAX_UPLOAD_BYTES) throw new Error("File must be under 4 MB.");
  const base = originalName
    .replace(/\.[^.]+$/, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";
  const name = `${Date.now().toString(36)}-${base}.${ext}`;
  await putBinary(`files/${name}`, bytes, "Portal: upload file");
  return { url: `/files/${name}`, size: bytes.length, ext };
}

export async function fetchUpload(name: string) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/.test(name) || !contentTypeFor(name)) return null;
  const body = await readBinary(`files/${name}`);
  return body ? { body, type: contentTypeFor(name)! } : null;
}

export async function removeUpload(url: string) {
  const m = /^\/files\/([A-Za-z0-9][A-Za-z0-9._-]{0,120})$/.exec(url);
  if (m?.[1]) await deleteFile(`files/${m[1]}`, "Portal: delete file");
}
