import { z } from 'zod';

export const createTalkSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Field `title` is required',
    }),
    description: z.string({
      required_error: 'Field `description` is required',
    }),
  }),
});

export type CreateTalkInput = z.infer<typeof createTalkSchema>;

export const queryTalksSchema = z.object({
  body: z.object({
    skip: z.number().positive('Field `skip` should be positive').optional(),
    take: z.number().positive('Field `take` should be positive').optional(),
    orderBy: z
      .object({
        voted: z.enum(['asc', 'desc']),
      })
      .optional(),
  }),
});

export type QueryTalksInput = z.infer<typeof queryTalksSchema>;
