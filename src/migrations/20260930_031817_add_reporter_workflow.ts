import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" ALTER COLUMN "status" SET DEFAULT 'draft';
  ALTER TABLE "comments" ALTER COLUMN "status" SET DEFAULT 'pending';
  ALTER TABLE "articles" ADD COLUMN "reporter_id" integer;
  ALTER TABLE "authors" ADD COLUMN "user_id" integer;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "articles_reporter_idx" ON "articles" USING btree ("reporter_id");
  CREATE UNIQUE INDEX "authors_user_idx" ON "authors" USING btree ("user_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DROP CONSTRAINT "articles_reporter_id_users_id_fk";
  
  ALTER TABLE "authors" DROP CONSTRAINT "authors_user_id_users_id_fk";
  
  DROP INDEX "articles_reporter_idx";
  DROP INDEX "authors_user_idx";
  ALTER TABLE "articles" ALTER COLUMN "status" SET DEFAULT 'published';
  ALTER TABLE "comments" ALTER COLUMN "status" SET DEFAULT 'approved';
  ALTER TABLE "articles" DROP COLUMN "reporter_id";
  ALTER TABLE "authors" DROP COLUMN "user_id";`);
}
