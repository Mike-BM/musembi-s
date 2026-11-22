import { deleteCookie, getCookie, getRequest, setCookie } from "@tanstack/react-start/server";
import { env } from "./github.server";

/**
 * Admin login. One admin account, password kept in the hosting environment (never in the code).
 * The session is a signed, expiring cookie: it cannot be made up by a visitor.
 */
const COOKIE = "msc_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours
const encoder = new TextEncoder();

function secret(): string | null {
  const explicit = env("ADMIN_SESSION_SECRET");
  if (explicit && explicit.length >= 16) return explicit;
  const pw = env("ADMIN_PASSWORD");
  if (pw && pw.length >= 8) return `derived:${pw}`;
  return null;
}

export function authConfigured(): boolean {
  return secret() !== null && Boolean(env("ADMIN_PASSWORD"));
}

const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64url = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4)), (c) => c.charCodeAt(0));

const hmacKey = (key: string, usage: KeyUsage[]) =>
  crypto.subtle.importKey("raw", encoder.encode(key), { name: "HMAC", hash: "SHA-256" }, false, usage);

async function makeToken(user: string): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  const payload = b64url(encoder.encode(JSON.stringify({ u: user, exp: Math.floor(Date.now() / 1000) + MAX_AGE })));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(key, ["sign"]), encoder.encode(payload)));
  return `${payload}.${b64url(sig)}`;
}

async function tokenValid(token: string | undefined): Promise<boolean> {
  try {
    const key = secret();
    if (!token || !key) return false;
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const ok = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(key, ["verify"]),
      unb64url(sig) as BufferSource,
      encoder.encode(payload),
    );
    if (!ok) return false;
    const data = JSON.parse(new TextDecoder().decode(unb64url(payload))) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

/** Constant-time comparison so response time never hints at how much of a guess was right. */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const key = await hmacKey(`cmp:${secret() ?? "x"}`, ["sign"]);
  const [x, y] = await Promise.all([
    crypto.subtle.sign("HMAC", key, encoder.encode(a)),
    crypto.subtle.sign("HMAC", key, encoder.encode(b)),
  ]);
  const xa = new Uint8Array(x);
  const ya = new Uint8Array(y);
  let diff = 0;
  for (let i = 0; i < xa.length; i++) diff |= (xa[i] ?? 0) ^ (ya[i] ?? 0);
  return diff === 0;
}

export async function isAdmin(): Promise<boolean> {
  return tokenValid(getCookie(COOKIE));
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

export async function attemptLogin(username: string, password: string): Promise<boolean> {
  const expectedUser = env("ADMIN_USERNAME") ?? "admin";
  const expectedPass = env("ADMIN_PASSWORD");
  if (!expectedPass || !secret()) return false;
  const userOk = await safeEqual(username, expectedUser);
  const passOk = await safeEqual(password, expectedPass);
  if (!(userOk && passOk)) return false;
  const token = await makeToken(username);
  if (!token) return false;
  setCookie(COOKIE, token, {
    httpOnly: true,
    secure: new URL(getRequest().url).protocol === "https:",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export function logout() {
  deleteCookie(COOKIE, { path: "/" });
}

/** Best-effort client IP (Cloudflare, then standard proxy headers). */
export function clientIp(): string {
  const h = getRequest().headers;
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") ?? "").split(",")[0]?.trim() ||
    "unknown"
  );
}

const buckets = new Map<string, { count: number; resetAt: number }>();
/** Simple per-instance limiter: true = allowed. A speed bump against guessing and spam, not a hard wall. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= max;
}
export const clearRateLimit = (key: string) => buckets.delete(key);
