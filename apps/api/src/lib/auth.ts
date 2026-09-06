import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "@repo/db";
import type { Env } from "../index";

export function createAuth(env: Env) {
  const db = createDb(env.DATABASE_URL);

  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: {
      enabled: true,
    }
  });
}
