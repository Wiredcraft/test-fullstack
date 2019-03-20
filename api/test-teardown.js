import { app } from "./main";
import pool from "./db";

export default async () => {
  app.server.close();
  await pool.end();
};
