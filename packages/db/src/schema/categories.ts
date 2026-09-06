import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { posts } from "./posts";

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));
