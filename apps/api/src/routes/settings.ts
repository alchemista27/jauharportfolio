import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { createDb } from "@repo/db";
import { settings } from "@repo/db/src/schema";
import { updateSettingSchema } from "@repo/types";
import { requireAuth } from "../middleware/auth";
import type { Env } from "../index";

export const settingsPublicRouter = new Hono<{ Bindings: Env }>()
  .get("/:key", async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const key = c.req.param("key");
    
    const settingRecord = await db.query.settings.findFirst({
      where: eq(settings.key, key),
    });
    
    if (!settingRecord) {
      return c.json({ error: "Setting not found" }, 404);
    }
    
    return c.json(settingRecord);
  });

export const settingsAdminRouter = new Hono<{ Bindings: Env }>()
  .use("*", requireAuth)
  .put("/:key", zValidator("json", updateSettingSchema), async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const key = c.req.param("key");
    const data = c.req.valid("json");
    
    const [updatedSetting] = await db.insert(settings)
      .values({
        key,
        value: data.value,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: settings.key,
        set: {
          value: data.value,
          updatedAt: new Date(),
        }
      })
      .returning();
      
    return c.json(updatedSetting);
  });
