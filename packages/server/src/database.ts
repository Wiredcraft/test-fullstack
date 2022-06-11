import { Prisma, PrismaClient } from "@prisma/client";

import { config } from "./config";

export type PrismaTransaction = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;

export const prisma = new PrismaClient({
  datasources: { db: { url: config.databaseURL } },
});
