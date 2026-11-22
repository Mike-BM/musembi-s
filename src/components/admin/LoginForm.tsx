import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Lock } from "lucide-react";
import { adminLogin } from "@/lib/portal/api";
import { Field, Input, btn } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.jpeg";

export function LoginForm({ authConfigured, onSuccess }: { authConfigured: boolean; onSuccess: () => void }) {
  const login = useServerFn(adminLogin);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const res = await login({ data: { username: String(form.get("username") ?? ""), password: String(form.get("password") ?? "") } });
      if (res.ok) onSuccess();
      else setError(res.error);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-7 shadow-soft">
        <div className="flex flex-col items-center text-center">
          <img src={logoImg} alt="" className="h-14 w-14 rounded-full object-cover" />
          <h1 className="mt-4 font-display text-2xl text-primary-deep">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Musembi S. Educational Consultancy</p>
        </div>

        {!authConfigured && (
          <p className="mt-5 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950">
            Login is not set up yet. Add <strong>ADMIN_PASSWORD</strong> and <strong>ADMIN_SESSION_SECRET</strong> in your hosting
            settings, then redeploy.
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Username" id="username">
            <Input id="username" name="username" autoComplete="username" defaultValue="admin" required />
          </Field>
          <Field label="Password" id="password">
            <Input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
          </Field>
          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy} className={cn(btn.primary, "w-full")}>
            <Lock className="h-4 w-4" /> {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <a href="/" className="mt-5 block text-center text-xs text-muted-foreground hover:text-primary">
          ← Back to website
        </a>
      </div>
    </div>
  );
}
