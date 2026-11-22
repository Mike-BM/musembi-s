import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Article, Publication } from "@/lib/site";
import {
  ENQUIRY_STATUSES,
  articlesSchema,
  enquiryInputSchema,
  publicationsSchema,
  settingsSchema,
} from "./schemas";
import { attemptLogin, authConfigured, clearRateLimit, clientIp, isAdmin, logout, rateLimit, requireAdmin } from "./auth.server";
import {
  MAX_UPLOAD_BYTES,
  addEnquiry,
  deleteEnquiry,
  listEnquiries,
  loadPortalContent,
  removeUpload,
  saveArticles,
  savePublications,
  saveSettings,
  storeUpload,
  updateEnquiry,
} from "./content.server";
import { storageConfigured } from "./github.server";

const adminOnly = createMiddleware({ type: "function" }).server(async ({ next }) => {
  await requireAdmin();
  return next();
});

/** Turn storage/GitHub failures into a readable message instead of a crash page. */
async function guard<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("Portal error", e);
    const message = e instanceof Error ? e.message : "Something went wrong";
    throw new Error(message);
  }
}

// ---------------- Public ----------------

export const getPortalContent = createServerFn({ method: "GET" }).handler(async () => loadPortalContent());

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => enquiryInputSchema.parse(d))
  .handler(async ({ data }) => {
    // Honeypot or too many submissions: pretend success so bots move on, store nothing.
    if (data.website) return { saved: true };
    if (!rateLimit(`enquiry:${clientIp()}`, 5, 10 * 60 * 1000)) return { saved: false };
    if (!storageConfigured()) return { saved: false };
    try {
      await addEnquiry(data);
      return { saved: true };
    } catch (e) {
      // The visitor still reaches you through WhatsApp / email, so never show an error here.
      console.error("Could not save enquiry", e);
      return { saved: false };
    }
  });

// ---------------- Admin session ----------------

export const adminSession = createServerFn({ method: "GET" }).handler(async () => ({
  authenticated: await isAdmin(),
  authConfigured: authConfigured(),
  storageConfigured: storageConfigured(),
}));

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ username: z.string().max(200), password: z.string().max(500) }).parse(d))
  .handler(async ({ data }) => {
    if (!authConfigured()) {
      return { ok: false as const, error: "Admin login is not set up yet. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET to the hosting settings." };
    }
    const key = `login:${clientIp()}`;
    if (!rateLimit(key, 5, 15 * 60 * 1000)) {
      return { ok: false as const, error: "Too many attempts. Please wait 15 minutes and try again." };
    }
    if (await attemptLogin(data.username, data.password)) {
      clearRateLimit(key);
      return { ok: true as const };
    }
    return { ok: false as const, error: "Invalid username or password." };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  logout();
  return { ok: true };
});

// ---------------- Admin data ----------------

export const adminGetContent = createServerFn({ method: "GET" })
  .middleware([adminOnly])
  .handler(async () => guard(() => loadPortalContent()));

export const adminSaveSettings = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) => settingsSchema.parse(d))
  .handler(async ({ data }) => guard(async () => (await saveSettings(data), { ok: true })));

export const adminSaveArticles = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) => articlesSchema.parse(d))
  .handler(async ({ data }) => guard(async () => (await saveArticles(data as Article[]), { ok: true })));

export const adminSavePublications = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) => publicationsSchema.parse(d))
  .handler(async ({ data }) => guard(async () => (await savePublications(data as Publication[]), { ok: true })));

export const adminListEnquiries = createServerFn({ method: "GET" })
  .middleware([adminOnly])
  .handler(async () => guard(() => listEnquiries()));

export const adminUpdateEnquiry = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) =>
    z.object({ id: z.string().max(40), status: z.enum(ENQUIRY_STATUSES).optional(), notes: z.string().max(4000).optional() }).parse(d),
  )
  .handler(async ({ data }) =>
    guard(async () => {
      const { id, ...patch } = data;
      await updateEnquiry(id, patch);
      return { ok: true };
    }),
  );

export const adminDeleteEnquiry = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) => z.object({ id: z.string().max(40) }).parse(d))
  .handler(async ({ data }) => guard(async () => (await deleteEnquiry(data.id), { ok: true })));

export const adminUploadFile = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) =>
    z
      .object({
        name: z.string().min(1).max(200),
        // base64 text is ~4/3 the size of the file
        base64: z.string().min(1).max(Math.ceil((MAX_UPLOAD_BYTES * 4) / 3) + 16),
      })
      .parse(d),
  )
  .handler(async ({ data }) =>
    guard(async () => {
      const bytes = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
      return storeUpload(data.name, bytes);
    }),
  );

export const adminRemoveUpload = createServerFn({ method: "POST" })
  .middleware([adminOnly])
  .inputValidator((d: unknown) => z.object({ url: z.string().max(300) }).parse(d))
  .handler(async ({ data }) => guard(async () => (await removeUpload(data.url), { ok: true })));
