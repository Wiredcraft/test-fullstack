import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { RequestHandler } from "express";
import { BCRYPT_SALT, JWT_SECRET } from "../../constants/auth";
import Errors from "../../constants/error";

const jwtOptions: SignOptions = {
  expiresIn: "7d"
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { password, name } = req.body;
    const encryptedPassword = await bcrypt.hash(password, BCRYPT_SALT);
    const { password: _, ...userPayload } = {
      name,
      password: encryptedPassword
    };
    const token = jwt.sign(userPayload, JWT_SECRET, jwtOptions);
    res.success({
      user: userPayload,
      token
    });
  } catch (e) {
    res.error(Errors.UNKNOWN);
  }
};

export const login: RequestHandler = async (req, res) => {
  res.success({
    user: {},
    token: ""
  });
};
