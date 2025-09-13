import { StarRating } from "../../../_common/star-rating";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoomWithRelations } from "@/types";

export default function OwnerPreview({ room }: { room: RoomWithRelations }) {
  return (
    <div className="flex justify-between flex-row gap-2">
      <div className="flex flex-row gap-2">
        <Avatar>
          <AvatarImage src={room.author.image || undefined} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-sm flex items-center text-gray-500">
          {room.author.name}
        </div>
      </div>

      <div>
        <StarRating value={room.rating} />
      </div>
    </div>
  );
}
