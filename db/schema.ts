import { sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessionSchema = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userSchema.id),
  expiresAt: timestamp("expiresAt").notNull(),
});

export const userSchema = pgTable("user", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  googleId: text("googleId").unique(),
  avatarUrl: text("avatarUrl"),
  name: text("name"),
  email: text("email"),
});
