import { Role, Scope } from "./type";

export function coerceRole(v?: string): Role {
  return v === "host" ? "host" : "guest";
}
export function coerceScope(v?: string): Scope {
  return v === "past" ? "past" : "active";
}

export const defaults = { role: "guest" as Role, scope: "active" as Scope };
