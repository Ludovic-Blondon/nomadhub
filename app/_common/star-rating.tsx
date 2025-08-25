"use client";

import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { StarRatingProps } from "@/types";

export function StarRating({ value, className }: StarRatingProps) {
  const fullCount = Math.floor(value);
  const hasHalf = value - fullCount >= 0.5;

  return (
    <div
      aria-label={`Note de ${value} sur 5`}
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const full = i < fullCount;
        const half = !full && i === fullCount && hasHalf;

        return (
          <div key={i} className="relative h-5 w-5">
            <Star className="absolute inset-0 h-5 w-5 stroke-current text-muted-foreground opacity-40" />
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 overflow-hidden text-yellow-500",
                full ? "w-full" : half ? "w-1/2" : "w-0",
              )}
            >
              <Star className="h-5 w-5 fill-current stroke-current" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
