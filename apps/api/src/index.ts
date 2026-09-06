import { Hono } from "hono";
import { cors } from "hono/cors";
import { mediaRouter } from "./routes/media";
import { createAuth } from "./lib/auth";

export interface Env {
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

export type Variables = {
  session: any;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>()
  .use("*", cors())
  .route("/api/admin/media", mediaRouter);

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

app.get("/", (c) => c.text("Jauhariandev API is running"));

export type AppType = typeof app;
export default app;
