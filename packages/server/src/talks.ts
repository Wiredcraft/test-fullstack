import { z } from "zod";
import Koa from "koa";
import { ListTalkJSON, TalkJSON } from "types";

import { parse } from "./validate";
import { prisma } from "./database";

const CreateTalkRequestBody = z.object({
  email: z.string(),
  title: z.string(),
  description: z.string(),
});

export async function createTalk(ctx: Koa.Context): Promise<void> {
  const { email, title, description } = parse(CreateTalkRequestBody, ctx.request.body);

  const talk = await prisma.talk.create({
    data: {
      title,
      description,
      author: {
        connectOrCreate: {
          where: { email },
          create: { email },
        },
      },
    },
    include: {
      author: true,
    },
  });

  const body: TalkJSON = { ...talk, createdAt: talk.created_at.toISOString() };
  ctx.body = body;
}

const ListTalksQuery = z.object({
  page: z
    .string()
    .default("0")
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v)),
});
const PAGE_COUNT = 20;

export async function listTalks(ctx: Koa.Context): Promise<void> {
  const { page } = parse(ListTalksQuery, ctx.request.query);
  const talks = await prisma.talk.findMany({
    skip: page * PAGE_COUNT,
    take: PAGE_COUNT,
    orderBy: [{ votes: "desc" }, { title: "asc" }],
    select: {
      id: true,
      title: true,
      votes: true,
      created_at: true,
      author: true, // FIXME leaks author's email
    },
  });
  const body: ListTalkJSON[] = talks.map((t) => ({ ...t, createdAt: t.created_at.toISOString() }));
  ctx.body = body;
}

export async function getTalk(ctx: Koa.Context): Promise<void> {
  const id = ctx.params.id;
  const talk = await prisma.talk.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
  if (!talk) return;

  const body: TalkJSON = { ...talk, createdAt: talk.created_at.toISOString() };
  ctx.body = body;
}

export async function voteTalk(ctx: Koa.Context): Promise<void> {
  const id = ctx.params.id;
  const talk = await prisma.talk.update({
    where: { id },
    data: { votes: { increment: 1 } },
    include: {
      author: true,
    },
  });
  if (!talk) return;

  const body: TalkJSON = { ...talk, createdAt: talk.created_at.toISOString() };
  ctx.body = body;
}
