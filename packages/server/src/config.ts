import fs from "fs";
import { z } from "zod";

import { parse } from "./validate";

const Config = z.object({
  databaseURL: z.string(),
});

const configText = fs
  .readFileSync(process.env.CONFIG_FILE ?? process.cwd() + "/config.json")
  .toString();

export const config = parse(Config, JSON.parse(configText), (e) => e);
