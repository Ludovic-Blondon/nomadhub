// app/reservation/_components/filters-client.tsx
"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export default function FiltersClient({
  role,
  scope,
}: {
  role: "guest" | "host";
  scope: "active" | "past";
}) {
  const pathname = usePathname();
  const sp = useSearchParams();

  function hrefFor(next: Partial<{ role: string; scope: string }>) {
    const q = new URLSearchParams(sp.toString());

    // toujours forcer les 2 clés
    q.set("role", (next.role ?? role) as string);
    q.set("scope", (next.scope ?? scope) as string);

    return `${pathname}?${q.toString()}`;
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-2">
      <div className="flex items-center justify-between gap-2">
        {/* Segmented rôle */}
        <div className="inline-flex rounded-xl border p-1">
          <Link
            aria-pressed={role === "guest"}
            className={`px-3 py-2 rounded-lg text-sm ${
              role === "guest"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50"
            }`}
            href={hrefFor({ role: "guest" })}
            scroll={false}
          >
            Voyageur
          </Link>
          <Link
            aria-pressed={role === "host"}
            className={`px-3 py-2 rounded-lg text-sm ${
              role === "host"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50"
            }`}
            href={hrefFor({ role: "host" })}
            scroll={false}
          >
            Hôte
          </Link>
        </div>

        {/* Chips scope */}
        <div className="flex items-center gap-2">
          <Link
            aria-pressed={scope === "active"}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
              scope === "active"
                ? "border-primary/60 bg-primary/10"
                : "hover:bg-muted/40"
            }`}
            href={hrefFor({ scope: "active" })}
            scroll={false}
          >
            Actives
          </Link>
          <Link
            aria-pressed={scope === "past"}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
              scope === "past"
                ? "border-primary/60 bg-primary/10"
                : "hover:bg-muted/40"
            }`}
            href={hrefFor({ scope: "past" })}
            scroll={false}
          >
            Historique
          </Link>
        </div>
      </div>
    </div>
  );
}
