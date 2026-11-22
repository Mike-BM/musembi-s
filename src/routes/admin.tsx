import { createFileRoute, useRouter } from "@tanstack/react-router";
import { adminSession } from "@/lib/portal/api";
import { AdminApp } from "@/components/admin/AdminApp";
import { LoginForm } from "@/components/admin/LoginForm";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Portal" }, { name: "robots", content: "noindex, nofollow, noarchive" }],
  }),
  loader: () => adminSession(),
  // Never reuse a cached login state.
  staleTime: 0,
  gcTime: 0,
  component: AdminPage,
});

function AdminPage() {
  const session = Route.useLoaderData();
  const router = useRouter();
  if (!session.authenticated) {
    return <LoginForm authConfigured={session.authConfigured} onSuccess={() => void router.invalidate()} />;
  }
  return <AdminApp storageConfigured={session.storageConfigured} />;
}
