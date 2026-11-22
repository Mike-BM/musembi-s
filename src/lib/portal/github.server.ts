/**
 * Storage for the admin portal: JSON and files kept on a dedicated git branch of this repository
 * (default "portal-data"), read and written through the GitHub API.
 *
 * Why a separate branch: saving on the main branch would rebuild the live site on every enquiry.
 * The branch holds only data, never code.
 */
const API = "https://api.github.com";

export function env(name: string): string | undefined {
  try {
    const v = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[name];
    return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
  } catch {
    return undefined;
  }
}

export class ConflictError extends Error {}
export class StorageError extends Error {}

function cfg() {
  return {
    token: env("GITHUB_TOKEN"),
    repo: env("GITHUB_REPO") ?? "Mike-BM/musembi-s",
    branch: env("PORTAL_BRANCH") ?? "portal-data",
  };
}

export function storageConfigured(): boolean {
  return Boolean(cfg().token);
}

function gh(path: string, init: RequestInit = {}, accept = "application/vnd.github+json") {
  const { token } = cfg();
  if (!token) throw new StorageError("Storage is not connected: GITHUB_TOKEN is missing.");
  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: accept,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "musembi-admin-portal",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
  });
}

const encodePath = (p: string) => p.split("/").map(encodeURIComponent).join("/");

function toBase64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}
const fromBase64 = (b64: string) => Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0));
export const utf8ToBase64 = (s: string) => toBase64(new TextEncoder().encode(s));
const base64ToUtf8 = (b64: string) => new TextDecoder().decode(fromBase64(b64));

let branchReady: Promise<void> | null = null;

/** Creates the data branch from the default branch the first time something is saved. */
async function ensureBranch(): Promise<void> {
  if (!branchReady) {
    branchReady = (async () => {
      const { repo, branch } = cfg();
      const have = await gh(`/repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`);
      if (have.ok) return;
      if (have.status !== 404) throw new StorageError(`Could not check the data branch (${have.status}).`);
      const info = await gh(`/repos/${repo}`);
      if (!info.ok) throw new StorageError(`Could not open the repository (${info.status}). Check GITHUB_TOKEN and GITHUB_REPO.`);
      const { default_branch } = (await info.json()) as { default_branch: string };
      const base = await gh(`/repos/${repo}/git/ref/heads/${encodeURIComponent(default_branch)}`);
      if (!base.ok) throw new StorageError(`Could not read the ${default_branch} branch (${base.status}).`);
      const baseJson = (await base.json()) as { object: { sha: string } };
      const created = await gh(`/repos/${repo}/git/refs`, {
        method: "POST",
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseJson.object.sha }),
      });
      if (!created.ok && created.status !== 422) {
        throw new StorageError(`Could not create the data branch (${created.status}). The token needs Contents: read & write.`);
      }
    })().catch((e) => {
      branchReady = null;
      throw e;
    });
  }
  return branchReady;
}

type Cached = { at: number; value: { content: string; sha: string } | null };
const cache = new Map<string, Cached>();
const CACHE_MS = 15_000;

export async function readText(path: string, opts: { fresh?: boolean } = {}) {
  const hit = cache.get(path);
  if (!opts.fresh && hit && Date.now() - hit.at < CACHE_MS) return hit.value;
  const { repo, branch } = cfg();
  const res = await gh(`/repos/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(branch)}`);
  let value: Cached["value"] = null;
  if (res.status === 404) {
    value = null;
  } else if (!res.ok) {
    throw new StorageError(`Could not read ${path} (${res.status}).`);
  } else {
    const json = (await res.json()) as { content?: string; sha: string; encoding?: string };
    value = { content: base64ToUtf8(json.content ?? ""), sha: json.sha };
  }
  cache.set(path, { at: Date.now(), value });
  return value;
}

async function putFile(path: string, contentBase64: string, sha: string | undefined, message: string) {
  await ensureBranch();
  const { repo, branch } = cfg();
  const res = await gh(`/repos/${repo}/contents/${encodePath(path)}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: contentBase64, branch, ...(sha ? { sha } : {}) }),
  });
  if (res.status === 409 || res.status === 422) throw new ConflictError(`Conflict saving ${path}`);
  if (!res.ok) throw new StorageError(`Could not save ${path} (${res.status}).`);
  cache.delete(path);
  return ((await res.json()) as { content: { sha: string } }).content.sha;
}

/** Read-modify-write with automatic retry when two saves collide. */
export async function updateJson<T>(
  path: string,
  fallback: T,
  mutate: (current: T) => T | Promise<T>,
  message: string,
): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const file = await readText(path, { fresh: true });
    const current = file ? (JSON.parse(file.content) as T) : fallback;
    const next = await mutate(current);
    try {
      await putFile(path, utf8ToBase64(JSON.stringify(next, null, 2) + "\n"), file?.sha, message);
      return next;
    } catch (e) {
      if (!(e instanceof ConflictError) || attempt === 4) throw e;
      await new Promise((r) => setTimeout(r, 150 + Math.random() * 300));
    }
  }
  throw new StorageError("Could not save after several attempts. Please try again.");
}

export async function listDir(path: string): Promise<string[]> {
  const { repo, branch } = cfg();
  const res = await gh(`/repos/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(branch)}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new StorageError(`Could not list ${path} (${res.status}).`);
  const items = (await res.json()) as Array<{ name: string; type: string }>;
  return Array.isArray(items) ? items.filter((i) => i.type === "file").map((i) => i.name) : [];
}

export async function putBinary(path: string, bytes: Uint8Array, message: string) {
  await putFile(path, toBase64(bytes), undefined, message);
}

export async function readBinary(path: string): Promise<ArrayBuffer | null> {
  const { repo, branch } = cfg();
  const res = await gh(
    `/repos/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(branch)}`,
    {},
    "application/vnd.github.raw+json",
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new StorageError(`Could not read ${path} (${res.status}).`);
  return res.arrayBuffer();
}

export async function deleteFile(path: string, message: string) {
  const file = await readText(path, { fresh: true });
  if (!file) return;
  const { repo, branch } = cfg();
  const res = await gh(`/repos/${repo}/contents/${encodePath(path)}`, {
    method: "DELETE",
    body: JSON.stringify({ message, sha: file.sha, branch }),
  });
  cache.delete(path);
  if (!res.ok && res.status !== 404) throw new StorageError(`Could not delete ${path} (${res.status}).`);
}
