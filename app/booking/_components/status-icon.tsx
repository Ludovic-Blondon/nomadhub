import { STATUS_MAP } from "./utils";

import { BookingStatus } from "@/types";

export function StatusIcon({ status }: { status: BookingStatus }) {
  const { Icon, iconClass } = STATUS_MAP[status];

  return <Icon aria-hidden className={`w-4 h-4 ${iconClass}`} />;
}
