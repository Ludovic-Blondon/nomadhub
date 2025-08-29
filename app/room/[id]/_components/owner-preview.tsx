import { StarRating } from "../../../_common/star-rating";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Room } from "@/types";

export default function OwnerPreview({ bargain }: { bargain: Room }) {
  return (
    <div className="flex justify-between flex-row gap-2">
      <div className="flex flex-row gap-2">
        <Avatar>
          <AvatarImage src={bargain.author.avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-sm flex items-center text-gray-500">
          {bargain.author.name}
        </div>
      </div>

      <div>
        <StarRating value={bargain.rating} />
      </div>
    </div>
  );
}
