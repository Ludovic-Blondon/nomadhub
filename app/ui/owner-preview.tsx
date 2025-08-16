import { StarRating } from "./star-rating";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OwnerPreview() {
  return (
    <div className="flex justify-between flex-row gap-2">
      <div className="flex flex-row gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-sm flex items-center text-gray-500">John Doe</div>
      </div>

      <div>
        <StarRating value={4.5} />
      </div>
    </div>
  );
}
