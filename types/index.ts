import { SVGProps } from "react";
import { InferSelectModel } from "drizzle-orm";

import { room, user, review, media } from "@/db/schemas";

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

export type Room = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  city: string;
  neighborhood: string;
  rating: number;
  reviews?: Review[];
  author: User;
};

export type RoomLight = {
  id: number;
  city: string;
  neighborhood: string;
  img: string;
  price: string;
};

export type User = {
  name: string;
  avatarUrl?: string;
};

export type StarRatingProps = {
  value: number;
  className?: string;
};

export type Review = {
  id: string;
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
  author: User;
  tags?: string[];
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "rejected";

export type Booking = {
  id: number;
  status: BookingStatus;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  room: Room;
  guest: User;
};
