import {
  AlarmClockCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
} from "lucide-react";

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

export const STATUS_MAP = {
  pending: {
    label: "En attente",
    Icon: Clock,
    dotClass: "bg-amber-500",
    bgClass: "bg-amber-500/10 hover:bg-amber-500/15",
    textClass: "text-amber-700 dark:text-amber-400",
    borderClass: "border-amber-500/20",
  },
  confirmed: {
    label: "Confirmée",
    Icon: AlarmClockCheck,
    dotClass: "bg-emerald-500",
    bgClass: "bg-emerald-500/10 hover:bg-emerald-500/15",
    textClass: "text-emerald-700 dark:text-emerald-400",
    borderClass: "border-emerald-500/20",
  },
  cancelled: {
    label: "Annulée",
    Icon: Ban,
    dotClass: "bg-orange-500",
    bgClass: "bg-orange-500/10 hover:bg-orange-500/15",
    textClass: "text-orange-700 dark:text-orange-400",
    borderClass: "border-orange-500/20",
  },
  completed: {
    label: "Terminée",
    Icon: CheckCircle2,
    dotClass: "bg-green-500",
    bgClass: "bg-green-500/10 hover:bg-green-500/15",
    textClass: "text-green-700 dark:text-green-400",
    borderClass: "border-green-500/20",
  },
  rejected: {
    label: "Refusée",
    Icon: XCircle,
    dotClass: "bg-red-500",
    bgClass: "bg-red-500/10 hover:bg-red-500/15",
    textClass: "text-red-700 dark:text-red-400",
    borderClass: "border-red-500/20",
  },
};
