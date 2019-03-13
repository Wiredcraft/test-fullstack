import { useRef, useMemo } from "react";
import normalize, { denormalize } from "../lib/normalize";
import { useRouterState } from "../lib/router";
import { completeUrl } from "./util";
import useAppState from "./use-app-state";
import useFetch from "./use-fetch";
import { onGetSucceeded, onFetchFailed } from "./fetch-state";

export default (schema, parentSchema, id, name) => {
  const key = parentSchema
    ? `${schema.key}-${parentSchema.key}-${id}`
    : schema.key || name;

  const {
    entities,
    lists,
    reqs: { [key]: [loading, error] = [false, null] }
  } = useAppState();
  const { lastHistoryAction } = useRouterState();
  const loadingRef = useRef(false);

  const list = key in lists ? lists[key].items : null;

  const data = useMemo(
    () => {
      if (!list) return null;
      return denormalize(list, schema, entities);
    },
    [list]
  );

  useFetch((dispatch, fetch, reload) => {
    if (loadingRef.current) return;
    if (data && lastHistoryAction === "POP" && !reload) return;

    const url = parentSchema
      ? `/${parentSchema.key}/${encodeURIComponent(id)}/${schema.key}`
      : `/${schema.key || name}`;

    loadingRef.current = true;
    dispatch({ reqs: { [key]: [true, null] } });

    return fetch(completeUrl(url))
      .then(onGetSucceeded, onFetchFailed)
      .then(
        payload => {
          const { entities, result } = normalize(payload, schema);

          loadingRef.current = false;
          dispatch({
            entities,
            lists: {
              [key]: {
                items: result,
                drained: result.length < 20
              }
            },
            reqs: { [key]: [false, null] }
          });
        },
        err => {
          loadingRef.current = false;
          dispatch({ reqs: { [key]: [false, err] } });
        }
      );
  });

  return [data, loading, error];
};
