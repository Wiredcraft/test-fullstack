import { Client } from "pg";
import { request, logout } from "../test-util";

const client = new Client();
const cleanups = [];
let talkId;

beforeAll(async () => {
  await client.connect();

  const name = "talks_test_user_0";

  await request("/users", "POST", { name, password: "shadow" });
  cleanups.push(async () => {
    await client.query(`delete from users where name = '${name}'`);
  });
});

afterAll(async () => {
  cleanups.reverse(); // Prevent PostgreSQL foreign key violations.
  for (let fn of cleanups) await fn();
  await client.end();
});

const title = "a";
const description = "a";
const longTitle = Array(201)
  .fill("a")
  .join("");

test.each`
  title        | description    | errorCode
  ${null}      | ${description} | ${"Title Required"}
  ${" "}       | ${description} | ${"Title Required"}
  ${longTitle} | ${description} | ${"Title Length"}
  ${title}     | ${null}        | ${"Content Required"}
  ${title}     | ${" "}         | ${"Content Required"}
`(
  "POST /talks 400 with error code `$errorCode`",
  async ({ title, description, errorCode }) => {
    const [res, json] = await request("/talks", "POST", { title, description });

    expect(res.status).toBe(400);
    expect(json).toEqual({ name: errorCode });
  }
);

test("POST /talks 201 with data", async () => {
  const [res, json] = await request("/talks", "POST", { title, description });

  expect(res.status).toBe(201);
  expect("id" in json).toBe(true);

  talkId = json.id;

  cleanups.push(async () => {
    await client.query(`delete from talks where id = ${talkId}`);
  });
});

test("GET /talks shouldn't contain description", async () => {
  const [res, json] = await request("/talks");

  expect("description" in json[0]).toBe(false);
});

test("PUT /talks/:id/vote 400 if user is creator", async () => {
  const [res] = await request(`/talks/${talkId}/vote`, "PUT");
  expect(res.status).toBe(400);
});

test("PUT /talks/:id/vote 404 if talk doesn't exist", async () => {
  const [res] = await request(`/talks/42424242/vote`, "PUT");
  expect(res.status).toBe(404);
});

test("PUT /talks/:id/vote 204 and update talk.rating and talk.voted", async () => {
  const name = "talks_test_user_1";

  await request("/users", "POST", { name, password: "shadow" });
  cleanups.push(async () => {
    await client.query(`delete from users where name = '${name}'`);
  });

  const [res] = await request(`/talks/${talkId}/vote`, "PUT");
  expect(res.status).toBe(204);

  const [, json] = await request(`/talks/${talkId}`);
  expect(json.rating).toBe(1);
  expect(json.voted).toBe(true);
});

test("PUT /talks/:id/vote 204 and keep talk.rating untouched on vote again", async () => {
  const [res] = await request(`/talks/${talkId}/vote`, "PUT");
  expect(res.status).toBe(204);

  const [, json] = await request(`/talks/${talkId}`);
  expect(json.rating).toBe(1);
});

test("DELETE /talks/:id/vote 204 and update talk.rating", async () => {
  const [res] = await request(`/talks/${talkId}/vote`, "DELETE");
  expect(res.status).toBe(204);

  const [, json] = await request(`/talks/${talkId}`);
  expect(json.rating).toBe(0);
});

test("DELETE /talks/:id/vote 204 and keep talk.rating untouched on delete again", async () => {
  const [res] = await request(`/talks/${talkId}/vote`, "DELETE");
  expect(res.status).toBe(204);

  const [, json] = await request(`/talks/${talkId}`);
  expect(json.rating).toBe(0);
});

test("POST /talks 401 if not logged in", async () => {
  logout();
  const [res] = await request("/talks", "POST");
  expect(res.status).toBe(401);
});

test("PUT /talks/:id/vote 401 if not logged in", async () => {
  const [res] = await request(`/talks/${talkId}/vote`, "PUT");
  expect(res.status).toBe(401);
});
