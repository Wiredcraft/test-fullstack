import {
  ListTalk,
  ListTalkJSON,
  Talk,
  TalkJSON,
  CreateTalkParams,
  fromTalkJSON,
  fromListTalkJSON,
} from "types";

import { Query, formatQuerystring } from "./utils/querystring";

export async function fetchSameOrigin(input: RequestInfo, init?: RequestInit): Promise<Response> {
  return fetch(input, { ...init, credentials: "same-origin" });
}

function getSearch(q: Query): string {
  const s = formatQuerystring(q);
  if (s) return "?" + s;
  return "";
}

export async function readJSONResponse<T>(resp: Response): Promise<T> {
  if (resp.status >= 400) {
    throw new Error(`response status ${resp.status}: ${await resp.text()}`);
  }

  const contentType = resp.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`response is not JSON: ${contentType} ${await resp.text()}`);
  }

  try {
    const data = await resp.json();
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    throw new Error(`could not get JSON from response: ${message} ${await resp.text()}`);
  }
}

export async function createTalk(data: CreateTalkParams): Promise<Talk> {
  const resp = await fetch("/api/talks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const respData = await readJSONResponse<TalkJSON>(resp);
  return fromTalkJSON(respData);
}

export async function listTalks(page?: number): Promise<ListTalk[]> {
  const resp = await fetch(`/api/talks${getSearch({ page })}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await readJSONResponse<ListTalkJSON[]>(resp);
  return data.map(fromListTalkJSON);
}

export async function getTalk(id: string): Promise<Talk> {
  const resp = await fetch(`/api/talks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await readJSONResponse<TalkJSON>(resp);
  return fromTalkJSON(data);
}

export async function voteTalk(id: string): Promise<Talk> {
  const resp = await fetch(`/api/talks/${id}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await readJSONResponse<TalkJSON>(resp);
  return fromTalkJSON(data);
}
