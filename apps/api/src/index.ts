import "dotenv/config";

import cors from "cors";
import express from "express";

import { errorHandler } from "./errors/error-handler";
import { getAuthRoutes } from "./routes/auth/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", getAuthRoutes());
app.use(errorHandler);

const port = Number(process.env.API_PORT ?? 8080);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
