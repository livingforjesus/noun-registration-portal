import { hash } from "bcryptjs";
import { sql } from "drizzle-orm";

import { db } from "./db";
import { staff } from "./schema";
import { execSync } from "child_process";

const DEFAULT_STAFF_PASSWORD = "Password@123";

const seedStaff = [
  {
    id: "00001",
    firstName: "Victor",
    lastName: "Oshimen",
    email: "victor.oshimen@noun.edu.ng",
    roles: ["faculty"] as const,
  },
  {
    id: "00002",
    firstName: "Vision",
    lastName: "Onyeaku",
    email: "vision.onyeaku@noun.edu.ng",
    roles: ["faculty"] as const,
  },
];

const pushDatabaseSchema = () => {
  execSync(
    `bun --cwd $(git rev-parse --show-toplevel)/packages/db drizzle-kit push --force --config=drizzle.config.ts`
  );
};

const seedDb = async () => {
  await db.execute(sql`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
  pushDatabaseSchema();

  const seededStaff = await Promise.all(
    seedStaff.map(async (staffMember) => ({
      ...staffMember,
      password: await hash(DEFAULT_STAFF_PASSWORD, 10),
      roles: [...staffMember.roles],
    }))
  );

  await db.insert(staff).values(seededStaff);

  console.log(
    "Seed completed. Staff logins: 00001, 00002 with password=Password@123"
  );
};

await seedDb();
