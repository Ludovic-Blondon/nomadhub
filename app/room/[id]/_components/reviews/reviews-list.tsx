"use client";

import { ReviewCard } from "./review-card";

import { Review } from "@/types";

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Aucun avis pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  );
}
