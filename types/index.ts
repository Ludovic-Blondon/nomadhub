import { SVGProps } from "react";
import { InferSelectModel } from "drizzle-orm";

import { room, user, review, media, booking } from "@/db/schemas";

export type BookingWithRelations = InferSelectModel<typeof booking> & {
  room: RoomWithRelations;
  guest: InferSelectModel<typeof user>;
};

export type RoomWithRelations = InferSelectModel<typeof room> & {
  author: InferSelectModel<typeof user>;
  reviews: InferSelectModel<typeof review>[];
  medias: InferSelectModel<typeof media>[];
};

export type ReviewWithRelations = InferSelectModel<typeof review> & {
  author: InferSelectModel<typeof user>;
};
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type StarRatingProps = {
  value: number;
  className?: string;
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "rejected";

export type Role = "guest" | "host";
export type Scope = "active" | "past";

// Generic action state for form submissions
export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string>;
  values?: Record<string, any>;
  data?: any;
};
