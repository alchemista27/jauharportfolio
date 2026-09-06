import { pgTable, text, timestamp, integer, boolean, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { categories } from "./categories";

export const posts = pgTable("posts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featureImageUrl: text("feature_image_url"),
  categoryId: integer("category_id").references(() => categories.id),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (t) => ({
  categoryIdx: index("post_category_idx").on(t.categoryId),
  publishedIdx: index("post_published_idx").on(t.isPublished),
  slugIdx: index("post_slug_idx").on(t.slug),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));
