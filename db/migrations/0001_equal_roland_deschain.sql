ALTER TABLE "booking" DROP CONSTRAINT "booking_room_id_room_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" DROP CONSTRAINT "booking_guest_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "media" DROP CONSTRAINT "media_room_id_room_id_fk";
--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_room_id_room_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_guest_id_user_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE cascade ON UPDATE no action;