import { sign, verify } from "jsonwebtoken";

const { JWT_EXPIRES_IN: expiresIn, JWT_PRIVATE_KEY } = process.env;

export const createToken = (email: string): string => sign({ email }, JWT_PRIVATE_KEY || '', { expiresIn });

export const checkToken = (token: string) => verify(token, JWT_PRIVATE_KEY || '');