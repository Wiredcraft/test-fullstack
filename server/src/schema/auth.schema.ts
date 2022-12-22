import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export type RefreshInput = z.infer<typeof refreshSchema>;
