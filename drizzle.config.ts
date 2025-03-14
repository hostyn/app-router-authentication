import type { Config } from "drizzle-kit";
export default {
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
} satisfies Config;
