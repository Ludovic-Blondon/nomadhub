import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Bargain = {
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

export type BargainLight = {
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

export type UserFull = {
  firstname: string;
  lastname: string;
  email: string;
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
  bargain: Bargain;
  guest: User;
};
