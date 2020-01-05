import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { RequestHandler } from "express";
import photon from "../photon";
import { BCRYPT_SALT, JWT_SECRET } from "../constants/auth";
import Errors from "../constants/error";

const jwtOptions: SignOptions = {
  expiresIn: "7d"
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { password, name } = req.body;
    const encryptedPassword = await bcrypt.hash(password, BCRYPT_SALT);
    const { password: _, ...userPayload } = await photon.users.create({
      data: {
        name,
        password: encryptedPassword
      }
    });
    const token = jwt.sign(userPayload, JWT_SECRET, jwtOptions);
    res.success({
      user: userPayload,
      token
    });
  } catch (error) {
    if (error?.code === "P2002" && error?.meta?.fieldName === "User.name") {
      res.error(Errors.USER_ALREADY_EXIST, {
        name: req.body.name
      });
    }
    res.error(Errors.UNKNOWN, undefined, error);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { name, password: plaintPassword } = req.body;
    const user = await photon.users.findOne({
      where: {
        name
      }
    });
    if (!user) {
      res.error(Errors.NO_USER, {
        name
      });
      return;
    }
    const { password: encryptedPassword, ...userPayload } = user;
    const match = await bcrypt.compare(plaintPassword, encryptedPassword);
    if (!match) {
      res.error(Errors.WRONG_PASSWORD);
      return;
    }
    const token = jwt.sign(userPayload, JWT_SECRET, jwtOptions);
    res.success({
      user: userPayload,
      token
    });
  } catch (error) {
    res.error(Errors.UNKNOWN, undefined, error);
  }
};
