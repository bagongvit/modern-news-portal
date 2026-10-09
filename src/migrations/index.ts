import * as migration_20260929_082539_initial_schema from "./20260929_082539_initial_schema";
import * as migration_20260930_031817_add_reporter_workflow from "./20260930_031817_add_reporter_workflow";
import * as migration_20260930_072130_article_featured_image_upload from "./20260930_072130_article_featured_image_upload";

export const migrations = [
  {
    up: migration_20260929_082539_initial_schema.up,
    down: migration_20260929_082539_initial_schema.down,
    name: "20260929_082539_initial_schema",
  },
  {
    up: migration_20260930_031817_add_reporter_workflow.up,
    down: migration_20260930_031817_add_reporter_workflow.down,
    name: "20260930_031817_add_reporter_workflow",
  },
  {
    up: migration_20260930_072130_article_featured_image_upload.up,
    down: migration_20260930_072130_article_featured_image_upload.down,
    name: "20260930_072130_article_featured_image_upload",
  },
];
