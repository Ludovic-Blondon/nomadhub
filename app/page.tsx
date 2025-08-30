import HomeCard from "@/app/_components/home-card";
import { getRooms } from "@/lib/repositories/room";

export default async function Home() {
  const rooms = await getRooms();

  return (
    <div className="gap-2 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {rooms.map((item) => (
        <HomeCard key={item.id} item={item} />
      ))}
    </div>
  );
}
