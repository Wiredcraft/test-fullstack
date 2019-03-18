import * as crypto from "crypto";
import { parse, serialize } from "cookie";
import { sign, unsign } from "cookie-signature";
import db from "../db";

const userReg = /^\w{3,}$/;
const SECRET = process.env.TEST_FULLSTACK_SECRET;

if (!SECRET) {
  throw new Error(
    "`TEST_FULLSTACK_SECRET` env variable needed for cookie signature."
  );
}

const sha256Sum = str =>
  crypto
    .createHash("sha256")
    .update(str)
    .digest("hex");

const setAuthCookie = (res, username) => {
  res.setHeader(
    "Set-Cookie",
    serialize("user", sign(username, SECRET), {
      httpOnly: true,
      maxAge: 3600 * 24 * 30
    })
  );
};

export const createUser = async (req, res, query, form) => {
  const { name, password } = form;

  if (!name || !password) {
    res.statusCode = 400;
    return { name: !name ? "Name Required" : "Password Required" };
  }

  if (!userReg.test(name)) {
    res.statusCode = 400;
    return { name: "Invalid Name" };
  }

  if (password.length < 6) {
    res.statusCode = 400;
    return { name: "Invalid Password" };
  }

  const result = await db.query(
    `insert into users (name, password) values ($1, '${sha256Sum(password)}')` +
      " on conflict do nothing",
    [name]
  );

  if (!result.rowCount) {
    res.statusCode = 400;
    return { name: "Name Conflict" };
  }

  setAuthCookie(res, name);
  res.statusCode = 201;
  return { name };
};

export const login = async (req, res, query, form) => {
  const { name, password } = form;

  if (!password || !name) {
    res.statusCode = 400;
    return;
  }

  const result = await db.query(
    "select 1 from users where name = $1 and password = $2",
    [name, sha256Sum(password)]
  );

  if (!result.rowCount) {
    res.statusCode = 400;
    return;
  }

  setAuthCookie(res, name);
};

export const logout = (req, res) => {
  res.setHeader("Set-Cookie", "user=");
};

export const parseReqUser = next => async (req, res) => {
  const { cookie } = req.headers;

  if (cookie) {
    let { user } = parse(cookie);

    if (user) {
      user = unsign(user, SECRET);
      req.user = user; // username or `false`
    }
  }

  await next(req, res);
};

export const read = (req, res) => {
  if (!req.user) {
    res.statusCode = 401;
    return;
  }
  return { name: req.user };
};
