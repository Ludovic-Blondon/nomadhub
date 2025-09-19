import { pgTable, text, integer, timestamp, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { user } from "./auth";

export const room = pgTable("room", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  city: text("city").notNull(),
  neighborhood: text("neighborhood").notNull(),
  rating: real("rating").notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const review = pgTable("review", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  rating: real("rating").notNull(),
  title: text("title"),
  body: text("body").notNull(),
  roomId: text("room_id").references(() => room.id, {
    onDelete: "cascade",
  }),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const booking = pgTable("booking", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  status: text("status").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  roomId: text("room_id").references(() => room.id, {
    onDelete: "set null",
  }),
  guestId: text("guest_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const media = pgTable("media", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  originalName: text("original_name").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull() /*.unique()*/, // temporary disable unique constraint
  mimeType: text("mime_type").notNull(),
  roomId: text("room_id").references(() => room.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Relations pour la table room
export const roomRelations = relations(room, ({ one, many }) => ({
  author: one(user, {
    fields: [room.authorId],
    references: [user.id],
  }),
  reviews: many(review),
  bookings: many(booking),
  medias: many(media),
}));

// Relations pour la table review
export const reviewRelations = relations(review, ({ one }) => ({
  room: one(room, {
    fields: [review.roomId],
    references: [room.id],
  }),
  author: one(user, {
    fields: [review.authorId],
    references: [user.id],
  }),
}));

// Relations pour la table booking
export const bookingRelations = relations(booking, ({ one }) => ({
  room: one(room, {
    fields: [booking.roomId],
    references: [room.id],
  }),
  guest: one(user, {
    fields: [booking.guestId],
    references: [user.id],
  }),
}));

// Relations pour la table media
export const mediaRelations = relations(media, ({ one }) => ({
  room: one(room, {
    fields: [media.roomId],
    references: [room.id],
  }),
}));

// Relations pour la table user (à ajouter dans votre fichier auth ou ici)
export const userRelations = relations(user, ({ many }) => ({
  ownedRooms: many(room, { relationName: "author" }),
  reviews: many(review, { relationName: "author" }),
  bookings: many(booking, { relationName: "guest" }),
}));
