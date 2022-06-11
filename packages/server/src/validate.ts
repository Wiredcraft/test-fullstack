import { z, ZodType } from "zod";

import { HttpError } from "./errors";

export const stringToNumber = z
  .string()
  .transform((v) => Number(v))
  .refine((v) => !isNaN(v));

export const optionalStringToBoolean = z
  .string()
  .default("")
  .transform((v) => v === "true" || v === "1");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-explicit-any
export const singleToArray = <T>(zType: ZodType<T, any, unknown>) =>
  zType.or(z.array(zType)).transform((v) => (Array.isArray(v) ? v : [v]));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parse<T>(
  zType: ZodType<T, any, unknown>,
  o: unknown,
  newError: (error: z.ZodError<unknown>) => Error = newHttpError
): T {
  const result = zType.safeParse(o);
  if (result.success) return result.data;
  throw newError(result.error);
}

function newHttpError(error: z.ZodError<unknown>): Error {
  return new HttpError(400, "Invalid input", error.issues);
}
