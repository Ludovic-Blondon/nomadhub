import "server-only";

import { eq, desc, and } from "drizzle-orm";
import { notFound } from "next/navigation";

import { RoomWithRelations } from "@/types";
import { db } from "@/db";
import { room } from "@/db/schemas";

export async function getRoomsByAuthor(
  authorId: string,
): Promise<RoomWithRelations[]> {
  if (!authorId || authorId.trim() === "") {
    return [];
  }

  const rooms = await db.query.room.findMany({
    where: eq(room.authorId, authorId),
    with: {
      author: true,
      reviews: true,
      medias: true,
    },
    orderBy: [desc(room.createdAt)],
  });

  return rooms;
}

export async function getRoomByIdAndAuthor(roomId: string, authorId: string) {
  if (!roomId || roomId.trim() === "" || !authorId || authorId.trim() === "") {
    return notFound();
  }

  const result = await db.query.room.findFirst({
    where: and(eq(room.id, roomId), eq(room.authorId, authorId)),
    with: {
      author: true,
      medias: true,
      reviews: {
        with: {
          author: true,
        },
        orderBy: (reviews) => [desc(reviews.createdAt)],
      },
    },
  });

  if (!result) {
    return notFound();
  }

  return result;
}

export async function deleteRoom(
  roomId: string,
  authorId: string,
): Promise<{ success: boolean; mediaPaths: string[] }> {
  if (!roomId || roomId.trim() === "" || !authorId || authorId.trim() === "") {
    return { success: false, mediaPaths: [] };
  }

  try {
    // D'abord, récupérer les médias pour avoir leurs chemins
    const roomWithMedias = await db.query.room.findFirst({
      where: and(eq(room.id, roomId), eq(room.authorId, authorId)),
      with: {
        medias: true,
      },
    });

    if (!roomWithMedias) {
      return { success: false, mediaPaths: [] };
    }

    const mediaPaths = roomWithMedias.medias?.map((media) => media.path) || [];

    // Ensuite, supprimer la chambre (les médias seront supprimés par cascade)
    const result = await db
      .delete(room)
      .where(and(eq(room.id, roomId), eq(room.authorId, authorId)))
      .returning();

    return {
      success: result.length > 0,
      mediaPaths,
    };
  } catch {
    return { success: false, mediaPaths: [] };
  }
}

export async function updateRoom(
  roomId: string,
  authorId: string,
  data: {
    title: string;
    description: string;
    price: number;
    city: string;
    neighborhood: string;
  },
): Promise<RoomWithRelations | null> {
  if (!roomId || roomId.trim() === "" || !authorId || authorId.trim() === "") {
    return null;
  }

  try {
    const updatedRoom = await db
      .update(room)
      .set({
        title: data.title,
        description: data.description,
        price: data.price,
        city: data.city,
        neighborhood: data.neighborhood,
        updatedAt: new Date(),
      })
      .where(and(eq(room.id, roomId), eq(room.authorId, authorId)))
      .returning();

    if (updatedRoom.length === 0) {
      return null;
    }

    // Récupérer la room mise à jour avec toutes ses relations
    const result = await db.query.room.findFirst({
      where: eq(room.id, roomId),
      with: {
        author: true,
        medias: true,
        reviews: {
          with: {
            author: true,
          },
          orderBy: (reviews) => [desc(reviews.createdAt)],
        },
      },
    });

    return result || null;
  } catch {
    return null;
  }
}
