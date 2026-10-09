import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Articles } from "./collections/Articles";
import { Categories } from "./collections/Categories";
import { Authors } from "./collections/Authors";
import { Tags } from "./collections/Tags";
import { Comments } from "./collections/Comments";
import { Newsletters } from "./collections/Newsletters";
import { Media } from "./collections/Media";
import { SiteSettings } from "./globals/SiteSettings";
import { BreakingNews } from "./globals/BreakingNews";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = process.env.PAYLOAD_SECRET;
const databaseURI = process.env.DATABASE_URI;

if (!payloadSecret || payloadSecret.length < 32) {
  throw new Error("PAYLOAD_SECRET must be set to a value of at least 32 characters.");
}

if (!databaseURI) {
  throw new Error("DATABASE_URI must be set to connect Payload to PostgreSQL.");
}

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    components: {
      actions: ["../src/components/admin/AdminHeaderActions#AdminHeaderActions"],
      beforeDashboard: ["../src/components/admin/AdminNewsroomDashboard#AdminNewsroomDashboard"],
      beforeNavLinks: ["../src/components/admin/AdminSidebarHeader#AdminSidebarHeader"],
      afterNavLinks: ["../src/components/admin/AdminSidebarFooter#AdminSidebarFooter"],
      graphics: {
        Icon: "../src/components/admin/AdminBrandIcon#AdminBrandIcon",
        Logo: "../src/components/admin/AdminBrandLogo#AdminBrandLogo",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Articles, Categories, Authors, Tags, Comments, Newsletters, Media],
  globals: [SiteSettings, BreakingNews],
  editor: lexicalEditor(),
  sharp,
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, "../src/types/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseURI,
    },
  }),
});
