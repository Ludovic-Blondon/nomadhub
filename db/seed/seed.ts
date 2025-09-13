import { count, eq } from "drizzle-orm";

import { db } from "..";
import { user, room } from "../schemas";

import { rooms } from "./_data/rooms";

import { auth } from "@/lib/auth";

export const seed = async () => {
  const author = await db.query.user.findFirst({
    where: eq(user.email, "ludovicblondon@gmail.com"),
  });

  if (!author) {
    throw new Error("Author not found");
  }

  console.log(`author id: ${author?.id}`, `author email: ${author?.email}`);

  try {
    await insertUser();
    await insertRoom();
  } catch (error) {
    console.error(error);
  }
};

const insertRoom = async () => {
  const [nbOfRooms] = await db.select({ count: count() }).from(room);

  console.log(`nb of rooms: ${nbOfRooms.count}`);

  if (nbOfRooms.count > 0) {
    console.error("Rooms already seeded");

    return;
  }

  const host = await db.query.user.findFirst({
    where: eq(user.email, "host@nomadhub.com"),
  });

  if (!host) {
    console.error("Host not found");

    return;
  }

  rooms.forEach(async (_room) => {
    const [row] = await db
      .insert(room)
      .values({ ..._room, authorId: host?.id })
      .returning({ insertedId: room.id });

    console.log(row?.insertedId);

    // select 5 random images from the images array
    // you should cp the 5 images because path is unique in db
    // add a prefix to image name but keep the original name
    // the path should be generate randomly like this /images/roomId/prefix_imageName.jpg
    // insert it in db with the room id
  });
};

const insertUser = async () => {
  const [nbOfHost] = await db
    .select({ count: count() })
    .from(user)
    .where(eq(user.email, "host@nomadhub.com"));

  console.log(`nb of host: ${nbOfHost.count}`);

  if (nbOfHost.count > 0) {
    console.error("Host already seeded");
  } else {
    await auth.api.signUpEmail({
      body: {
        email: "host@nomadhub.com",
        password: "password",
        name: "Host Nomadhub",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Host+Nomadhub",
      },
    });
  }

  const [nbOfGuest] = await db
    .select({ count: count() })
    .from(user)
    .where(eq(user.email, "guest@nomadhub.com"));

  console.log(`nb of guest: ${nbOfGuest.count}`);

  if (nbOfGuest.count > 0) {
    console.error("Guest already seeded");
  } else {
    await auth.api.signUpEmail({
      body: {
        email: "guest@nomadhub.com",
        password: "password",
        name: "Guest Nomadhub",
        image: "https://api.dicebear.com/7.x/initials/svg?seed=Guest+Nomadhub",
      },
    });
  }
};
