import { cookies } from "next/headers";

import { coerceRole, coerceScope } from "./reservations";

export async function getPreference() {
  const raw = (await cookies()).get("reservations:pref")?.value;

  if (!raw) return {};
  try {
    const p = JSON.parse(raw);

    return {
      role: p.role ? coerceRole(p.role) : undefined,
      scope: p.scope ? coerceScope(p.scope) : undefined,
    };
  } catch {
    return {};
  }
}
