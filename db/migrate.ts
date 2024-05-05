import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const migrationClient = postgres(process.env.POSTGRES_URL, {
  max: 1,
});
const db = drizzle(migrationClient);

migrate(db, { migrationsFolder: "./migrations" })
  .then(() => {
    console.log("✅ Migrations complete");
    migrationClient.end();
  })
  .catch((error) => {
    console.error("❌ Error running migrations", error);
    migrationClient.end();
  });
