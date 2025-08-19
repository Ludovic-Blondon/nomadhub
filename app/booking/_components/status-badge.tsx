import { STATUS_MAP } from "./utils";

import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/types";

export function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_MAP[status];

  return (
    <Badge
      aria-label={`Statut: ${cfg.label}`}
      className={cfg.badgeClass}
      variant={cfg.variant}
    >
      {cfg.label}
    </Badge>
  );
}
