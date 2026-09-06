import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const media = pgTable("media", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
