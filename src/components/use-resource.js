import { useContext, useRef, useMemo } from "react";
import normalize, { denormalize } from "../lib/normalize";
import { useRouterState } from "../lib/router";
import { completeUrl } from "./util";
import { State } from "./app-state";
import useFetch from "./use-fetch";
import {
  Auth,
  onGetSucceeded,
  onTryGetSucceeded,
  onFetchFailed
} from "./fetch-state";

export const useUser = () => {
  const {
    user,
    reqs: { user: [, error] = [false, null] }
  } = useContext(State);

  useFetch((dispatch, fetch) => {
    if (user || error) return;
    return fetch(completeUrl("/user"), { credentials: "include" })
      .then(onGetSucceeded, onFetchFailed)
      .then(
        user => dispatch({ user: user.name }),
        err => dispatch({ user: false, reqs: { user: [false, err] } })
      );
  });

  return [user, error && error[0] !== Auth ? error : null];
};

export const useItem = (schema, id) => {
  const key = `${schema.key}-${id}`;
  const {
    entities,
    reqs: { [key]: [loading, error] = [false, null] }
  } = useContext(State);
  const { lastHistoryAction } = useRouterState();
  const loadingRef = useRef(false);

  const entity = schema.key in entities ? entities[schema.key][id] : null;

  const data = useMemo(() => {
    if (!entity) return null;
    return denormalize(entity, schema, entities);
  }, [entity]);

  useFetch((dispatch, fetch, reload) => {
    if (loadingRef.current) return;
    if (lastHistoryAction === "POP" && !reload && (data || error)) return;

    loadingRef.current = true;
    dispatch({ reqs: { [key]: [true, null] } });

    return fetch(completeUrl(`/${schema.key}/${encodeURIComponent(id)}`), {
      credentials: "include"
    })
      .then(onTryGetSucceeded, onFetchFailed)
      .then(
        payload => {
          const { entities } = normalize(payload, schema);
          loadingRef.current = false;
          dispatch({ entities, reqs: { [key]: [false, null] } });
        },
        err => {
          loadingRef.current = false;
          dispatch({ reqs: { [key]: [false, err] } });
        }
      );
  });

  return [data, loading, error];
};

export const useList = (schema, parentSchema, id, name) => {
  const key = parentSchema
    ? `${schema.key}-${parentSchema.key}-${id}`
    : schema.key || name;

  const {
    entities,
    lists,
    reqs: { [key]: [loading, error] = [false, null] }
  } = useContext(State);
  const { lastHistoryAction } = useRouterState();
  const loadingRef = useRef(false);

  const list = key in lists ? lists[key].items : null;

  const data = useMemo(() => {
    if (!list) return null;
    return denormalize(list, schema, entities);
  }, [list]);

  useFetch((dispatch, fetch, reload) => {
    if (loadingRef.current) return;
    if (lastHistoryAction === "POP" && !reload && (data || error)) return;

    const url = parentSchema
      ? `/${parentSchema.key}/${encodeURIComponent(id)}/${schema.key}`
      : `/${schema.key || name}`;

    loadingRef.current = true;
    dispatch({ reqs: { [key]: [true, null] } });

    return fetch(completeUrl(url), { credentials: "include" })
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
