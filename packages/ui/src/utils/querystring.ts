export interface Query {
  [_: string]: number | undefined | string | string[];
}

export function formatQuerystring(search: Query): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        params.append(key, v);
      }
    } else {
      params.append(key, value.toString());
    }
  }
  return params.toString();
}
