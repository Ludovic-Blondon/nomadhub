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

/**
 * Formate une date en français
 * @param date - Date à formater
 * @returns Date formatée en français (ex: "15 janvier 2025")
 */
export function formatDate(date: Date): string {
  return dateFmtFR.format(date);
}

/**
 * Calcule le nombre de nuits entre deux dates
 * @param start - Date de début
 * @param end - Date de fin
 * @returns Nombre de nuits (minimum 0)
 */
export function nightsBetween(start: Date, end: Date): number {
  const diffTime = end.getTime() - start.getTime();

  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
