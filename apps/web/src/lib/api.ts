import { hc } from "hono/client";
import type { AppType } from "@repo/types";

// Base URL will be configured via environment variables
export const api = hc<AppType>("http://localhost:8787/");
