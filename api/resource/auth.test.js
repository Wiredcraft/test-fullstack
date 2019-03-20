import { Client } from "pg";
import { request } from "../test-util";

const client = new Client();
const name = "auth_test_user_0";
const password = "shadow";

beforeAll(async () => {
  await client.connect();
});

afterAll(async () => {
  await client.query(`delete from users where name = '${name}'`);
  await client.end();
});

test.each`
  errorCode        | name    | password
  ${"Bad Request"} | ${null} | ${null}
  ${"Bad Request"} | ${name} | ${password}
`(
  "POST /login response 400 Bad Request on all errors",
  async ({ name, password }) => {
    const [res, json] = await request("/login", "POST", { name, password });

    expect(res.status).toBe(400);
    expect(json).toEqual({ name: "Bad Request" });
  }
);

test("POST /users 201 with user data", async () => {
  const [res, json] = await request("/users", "POST", { name, password });

  expect(res.status).toBe(201);
  expect(json.name).toBe(name);
});

test("user are logged in after created", async () => {
  const [res, json] = await request("/user");

  expect(res.ok).toBe(true);
  expect(json.name).toBe(name);
});

test("POST /login 204", async () => {
  const [res] = await request("/login", "POST", { name, password });

  expect(res.status).toBe(204);

  const [userRes, json] = await request("/user");

  expect(userRes.ok).toBe(true);
  expect(json.name).toEqual(name);
});

test.each`
  name                  | password    | errorCode
  ${null}               | ${password} | ${"Name Required"}
  ${" "}                | ${password} | ${"Name Required"}
  ${"Aa"}               | ${password} | ${"Invalid Name"}
  ${name}               | ${password} | ${"Name Conflict"}
  ${"auth_test_user_1"} | ${null}     | ${"Password Required"}
  ${"auth_test_user_1"} | ${" "}      | ${"Password Required"}
  ${"auth_test_user_1"} | ${"12345"}  | ${"Invalid Password"}
`(
  "POST /users 400 with error code `$errorCode`",
  async ({ name, password, errorCode }) => {
    let [res, json] = await request("/users", "POST", { name, password });

    expect(res.status).toBe(400);
    expect(json).toEqual({ name: errorCode });
  }
);
