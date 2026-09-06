import { createMiddleware } from "hono/factory";
import { createAuth } from "../lib/auth";
import type { Env } from "../index";

export const requireAuth = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    const auth = createAuth(c.env);
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("session", session);
    await next();
  }
);
