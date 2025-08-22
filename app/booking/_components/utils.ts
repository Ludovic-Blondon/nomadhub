import { AlarmClockCheck, CheckCircle2, Clock, XCircle } from "lucide-react";

import { BookingStatus } from "@/types";

export const dateFmtFR = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
export const eurFmt = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatDate(dateString: string) {
  const d = new Date(
    dateString + (dateString.length === 10 ? "T00:00:00" : ""),
  );

  return dateFmtFR.format(d);
}

export const STATUS_MAP: Record<
  BookingStatus,
  {
    label: string;
    badgeClass: string;
    variant: "default" | "secondary" | "destructive";
    Icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
  }
> = {
  pending: {
    label: "En attente de confirmation par l'hôte",
    variant: "secondary",
    badgeClass:
      "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    Icon: Clock,
    iconClass: "text-amber-600",
  },
  confirmed: {
    label: "Confirmée",
    variant: "default",
    badgeClass:
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    Icon: AlarmClockCheck,
    iconClass: "text-green-600",
  },
  cancelled: {
    label: "Annulée",
    variant: "destructive",
    badgeClass: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    Icon: XCircle,
    iconClass: "text-red-600",
  },
  completed: {
    label: "Terminée",
    variant: "default",
    badgeClass:
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    Icon: CheckCircle2,
    iconClass: "text-green-600",
  },
};
