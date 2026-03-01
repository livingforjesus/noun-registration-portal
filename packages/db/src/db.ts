import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

let pool: Pool | null = null;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to initialize the database client");
  }

  pool = new Pool({ connectionString });
  return pool;
}

export const db = drizzle(getPool(), { schema });
export type DatabaseClient = typeof db;
