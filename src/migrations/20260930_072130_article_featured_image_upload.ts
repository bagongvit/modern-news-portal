import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" ALTER COLUMN "featured_image_url" DROP NOT NULL;
  ALTER TABLE "articles" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "articles_featured_image_idx" ON "articles" USING btree ("featured_image_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DROP CONSTRAINT "articles_featured_image_id_media_id_fk";
  
  DROP INDEX "articles_featured_image_idx";
  ALTER TABLE "articles" ALTER COLUMN "featured_image_url" SET NOT NULL;
  ALTER TABLE "articles" DROP COLUMN "featured_image_id";`);
}
