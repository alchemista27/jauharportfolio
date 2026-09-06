import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { createDb } from "@repo/db";
import { media } from "@repo/db/src/schema";
import { requireAuth } from "../middleware/auth";
import { uploadImage, deleteImage } from "../lib/cloudinary";
import type { Env } from "../index";

export const mediaRouter = new Hono<{ Bindings: Env }>()
  // Require auth for all media admin routes
  .use("*", requireAuth)
  
  // GET /api/admin/media
  .get("/", async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const mediaList = await db.query.media.findMany({
      orderBy: [desc(media.createdAt)],
    });
    return c.json(mediaList);
  })
  
  // POST /api/admin/media
  .post("/", async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const formData = await c.req.parseBody();
    const file = formData["file"];
    
    if (!file || typeof file === 'string') {
      return c.json({ error: "No file uploaded" }, 400);
    }
    
    const arrayBuffer = await file.arrayBuffer();
    
    // Upload to Cloudinary
    try {
      const uploadResult = await uploadImage(
        c.env, 
        arrayBuffer, 
        file.type, 
        "media" // folder inside portofolio/
      );
      
      // Save metadata to DB
      const [newMedia] = await db.insert(media).values({
        filename: file.name,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        mimeType: file.type,
        size: file.size,
        width: uploadResult.width,
        height: uploadResult.height,
      }).returning();
      
      return c.json(newMedia, 201);
    } catch (error) {
      console.error("Upload error:", error);
      return c.json({ error: "Failed to upload image" }, 500);
    }
  })
  
  // DELETE /api/admin/media/:id
  .delete("/:id", async (c) => {
    const db = createDb(c.env.DATABASE_URL);
    const id = parseInt(c.req.param("id"));
    
    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }
    
    const mediaRecord = await db.query.media.findFirst({
      where: eq(media.id, id),
    });
    
    if (!mediaRecord) {
      return c.json({ error: "Media not found" }, 404);
    }
    
    try {
      // Delete from Cloudinary
      await deleteImage(c.env, mediaRecord.publicId);
      
      // Delete from DB
      await db.delete(media).where(eq(media.id, id));
      
      return c.json({ success: true });
    } catch (error) {
      console.error("Delete error:", error);
      return c.json({ error: "Failed to delete image" }, 500);
    }
  });
