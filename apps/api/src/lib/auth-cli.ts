import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "@repo/db";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const db = createDb(process.env.DATABASE_URL!);

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
