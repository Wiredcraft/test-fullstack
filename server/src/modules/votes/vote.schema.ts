import { z } from 'zod';

export const createVoteSchema = z.object({
  body: z.object({
    talkId: z.number({
      required_error: 'Field `talkId` is required',
    }),
  }),
});

export type CreateVoteInput = z.infer<typeof createVoteSchema>;

export const updateVoteSchema = z.object({
  body: z.object({
    id: z.number({
      required_error: 'Field `id` is required',
    }),
    active: z.boolean({
      required_error: 'Field `active` is required',
    }),
  }),
});

export type UpdateVoteInput = z.infer<typeof updateVoteSchema>;

export const queryVoteSchema = z.object({
  query: z.object({
    talkId: z.string({ required_error: 'Field `talkId` is required' }).regex(/\d+/),
    ownerId: z.string({ required_error: 'Field `ownerId` is required' }).regex(/\d+/),
  }),
});

export type QueryVoteInput = z.infer<typeof queryVoteSchema>;
