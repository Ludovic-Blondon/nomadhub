ALTER TABLE "booking" DROP CONSTRAINT "booking_room_id_room_id_fk";
--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_room_id_room_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."room"("id") ON DELETE set null ON UPDATE no action;