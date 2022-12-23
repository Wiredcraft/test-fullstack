import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Field `username` is required',
    }),
    password: z.string({
      required_error: 'Field `password` is required',
    }),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export type RefreshInput = z.infer<typeof refreshSchema>;
