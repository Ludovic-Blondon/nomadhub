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
  reviews: Review[];
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
  author: { name: string; avatarUrl?: string };
  tags?: string[];
};

export type ReviewSummary = {
  average: number;
  total: number;
  counts: Record<1 | 2 | 3 | 4 | 5, number>;
};
