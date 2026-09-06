import { Hono } from "hono";
import { cors } from "hono/cors";

export interface Env {
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>()
  .use("*", cors());
  
// Empty routes for now
app.get("/", (c) => c.text("Jauhariandev API is running"));

export type AppType = typeof app;
export default app;
