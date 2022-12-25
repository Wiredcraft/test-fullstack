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
  query: z.object({
    where: z
      .object({
        my: z.boolean().optional(),
      })
      .optional(),
    skip: z.string().regex(/\d+/).optional(),
    // .positive('Field `skip` should be positive')
    take: z.string().regex(/\d+/).optional(),
    // .positive('Field `take` should be positive'),
    orderBy: z
      .object({
        createdAt: z.enum(['asc', 'desc']).optional(),
        voted: z.enum(['asc', 'desc']).optional(),
      })
      .optional(),
  }),
});

export type QueryTalksInput = z.infer<typeof queryTalksSchema>;
