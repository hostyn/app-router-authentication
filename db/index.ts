import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const db = drizzlePostgres(postgres(process.env.POSTGRES_URL));

export * from "./schema";
