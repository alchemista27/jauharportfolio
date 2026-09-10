import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { createDb } from "@repo/db";
import { pages } from "@repo/db/src/schema";
import { updatePageSchema } from "@repo/types";
import { requireAuth } from "../middleware/auth";
import type { Env } from "../index";

export const pagesPublicRouter = new Hono<{ Bindings: Env }>()
  .get("/:slug", async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const slug = c.req.param("slug");
    
    const pageRecord = await db.query.pages.findFirst({
      where: eq(pages.slug, slug),
    });
    
    if (!pageRecord) {
      return c.json({ error: "Page not found" }, 404);
    }
    
    return c.json(pageRecord);
  });

export const pagesAdminRouter = new Hono<{ Bindings: Env }>()
  .use("*", requireAuth)
  .put("/:slug", zValidator("json", updatePageSchema), async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const slug = c.req.param("slug");
    const data = c.req.valid("json");
    
    const [updatedPage] = await db.update(pages)
      .set({
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
      })
      .where(eq(pages.slug, slug))
      .returning();
      
    if (!updatedPage) {
      return c.json({ error: "Page not found" }, 404);
    }
    
    return c.json(updatedPage);
  });
