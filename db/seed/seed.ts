/* eslint-disable no-console */

import { promises as fs } from "fs";
import path from "path";

import { count, eq } from "drizzle-orm";

import { db } from "..";
import { user, room, media, review, booking } from "../schemas";

import { rooms } from "./_data/rooms";
import { images } from "./_data/images";
import { reviews } from "./_data/reviews";
import { bookings } from "./_data/bookings";

import { auth } from "@/lib/auth";

// Configuration constants
const MAX_IMAGES_PER_ROOM = 5;
const MAX_REVIEWS_PER_ROOM = 3;
const UUID_PREFIX_LENGTH = 6;

export const seed = async () => {
  try {
    await insertUser();
    await insertRoom();
    await insertBooking();
  } catch (error) {
    console.error(error);
  }
};

const insertBooking = async () => {
  const [nbOfBookings] = await db.select({ count: count() }).from(booking);

  console.log(`nb of bookings: ${nbOfBookings.count}`);

  if (nbOfBookings.count > 0) {
    console.error("Bookings already seeded");
  }

  const guest = await db.query.user.findFirst({
    where: eq(user.email, "guest@nomadhub.com"),
  });

  if (!guest) {
    console.error("Guest not found");
  }

  const rooms = await db.select().from(room);

  if (!rooms) {
    console.error("Rooms not found");
  }

  for (const _booking of bookings) {
    await db.insert(booking).values({
      ..._booking,
      startDate: new Date(_booking.startDate),
      endDate: new Date(_booking.endDate),
      roomId: rooms[Math.floor(Math.random() * rooms.length)].id,
      guestId: guest?.id!,
    });
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

  const guest = await db.query.user.findFirst({
    where: eq(user.email, "guest@nomadhub.com"),
  });

  if (!guest) {
    console.error("Guest not found");

    return;
  }

  for (const _room of rooms) {
    try {
      const [row] = await db
        .insert(room)
        .values({ ..._room, authorId: host?.id })
        .returning({ insertedId: room.id });

      console.log(row?.insertedId);

      if (row?.insertedId) {
        // Sélectionner des images aléatoires depuis le tableau images
        const shuffledImages = [...images].sort(() => Math.random() - 0.5);
        const selectedImages = shuffledImages.slice(0, MAX_IMAGES_PER_ROOM);

        // Créer les copies avec des paths uniques
        const roomImages = await Promise.all(
          selectedImages.map(async (image) => {
            // Générer un préfixe aléatoire court
            const prefix = crypto.randomUUID().slice(0, UUID_PREFIX_LENGTH);

            // Nouveau nom avec préfixe
            const newName = `${prefix}_${image.name}`;

            // Construire le nouveau path : /images/{roomId}/{prefix}_{originalName}
            const newPath = `/images/${row.insertedId}/${newName}`;

            // Chemins des fichiers
            const sourcePath = path.join(process.cwd(), "public", image.path);
            const destDir = path.join(
              process.cwd(),
              "public",
              "images",
              row.insertedId,
            );
            const destPath = path.join(destDir, newName);

            // Créer le répertoire de destination s'il n'existe pas
            await fs.mkdir(destDir, { recursive: true });

            // Copier le fichier physique
            await fs.copyFile(sourcePath, destPath);

            return {
              ...image,
              name: newName,
              path: newPath,
              roomId: row.insertedId,
            };
          }),
        );

        // Insérer les images en base de données
        for (const roomImage of roomImages) {
          await db.insert(media).values(roomImage);
        }

        console.log(
          `Inserted ${roomImages.length} images for room ${row.insertedId}`,
        );

        // Sélectionner des reviews aléatoires depuis le tableau reviews
        const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5);
        const selectedReviews = shuffledReviews.slice(0, MAX_REVIEWS_PER_ROOM);

        // Créer les reviews avec guest.id et roomId
        const roomReviews = selectedReviews.map((reviewData) => ({
          ...reviewData,
          authorId: guest.id,
          roomId: row.insertedId,
        }));

        // Insérer les reviews en base de données
        for (const roomReview of roomReviews) {
          await db.insert(review).values(roomReview);
        }

        console.log(
          `Inserted ${roomReviews.length} reviews for room ${row.insertedId}`,
        );
      }
    } catch (error) {
      console.error(`Failed to seed room: ${_room.title}`, error);
    }
  }
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
