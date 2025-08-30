"use client";

import { StarRating } from "../../../../_common/star-rating";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  const initials = review.author.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const date = new Date(review.createdAt).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar>
            {review.author.avatarUrl && (
              <AvatarImage
                alt={review.author.name}
                src={review.author.avatarUrl}
              />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-medium">{review.author.name}</div>
            <div className="text-xs text-muted-foreground">{date}</div>
          </div>
          <div className="ml-auto">
            <StarRating value={review.rating} />
          </div>
        </div>

        {review.title && <div className="font-semibold">{review.title}</div>}
        <p className="text-sm leading-relaxed">{review.body}</p>
      </CardContent>
    </Card>
  );
}
