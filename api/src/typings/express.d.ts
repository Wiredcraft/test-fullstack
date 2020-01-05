import { User } from "@prisma/photon";

declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<User, "password">; // jwt middleware sets req.user
  }
  interface Response {
    success: (result: unknown) => void;
    error: (
      reason: string,
      values?: { [x: string]: string },
      error?: any
    ) => void;
  }
}
