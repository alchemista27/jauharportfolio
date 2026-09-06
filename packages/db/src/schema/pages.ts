import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const pages = pgTable("pages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
