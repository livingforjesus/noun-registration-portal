import "dotenv/config";

import cors from "cors";
import express from "express";

import { db } from "@registration-portal/db";
import { sql } from "drizzle-orm";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api" });
});

app.get("/health/db", async (_req, res) => {
  try {
    await db.execute(sql`select 1`);
    res.json({ ok: true, db: "postgres" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    res.status(500).json({ ok: false, message });
  }
});

const port = Number(process.env.API_PORT ?? 8080);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
