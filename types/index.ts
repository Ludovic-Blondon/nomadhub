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
};

export type StarRatingProps = {
  value: number;
  className?: string;
};
