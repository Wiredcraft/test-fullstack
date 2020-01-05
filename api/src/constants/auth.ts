import bcrypt from "bcrypt";

export const BCRYPT_SALT_ROUNDS = 10;
export const BCRYPT_SALT = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);

export const JWT_SECRET = "this-is-a-secret"; // TODO: read from env;
