import { db, sessionSchema, userSchema } from "@db";
import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { InferSelectModel } from "drizzle-orm";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionSchema, userSchema);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (databaseUserAttributes) => databaseUserAttributes,
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<InferSelectModel<typeof userSchema>, "id">;
  }
}
