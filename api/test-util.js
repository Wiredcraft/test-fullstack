import fetch, { Headers } from "node-fetch";

const { PORT = 4000 } = process.env;
let token = null;

export const request = async (url, method = "GET", json) => {
  const headers = new Headers();

  if (token) headers.set("Cookie", token);

  const options = { method, headers };

  if (json) {
    headers.set("Content-Type", "application/json");
    options.body = JSON.stringify(json);
  }

  const res = await fetch(`http://localhost:${PORT}${url}`, options);

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    token = setCookie.split(";")[0];
  }

  if (res.status === 204) return [res, null];

  return [res, await res.json()];
};

export const logout = () => {
  token = null;
};
