import { useRef, useMemo } from "react";
import normalize, { denormalize } from "../lib/normalize";
import { useRouterState } from "../lib/router";
import { completeUrl } from "./util";
import useAppState from "./use-app-state";
import useFetch from "./use-fetch";
import { onTryGetSucceeded, onFetchFailed } from "./fetch-state";

export default (schema, id) => {
  const key = `${schema.key}-${id}`;
  const {
    entities,
    reqs: { [key]: [loading, error] = [false, null] }
  } = useAppState();
  const { lastHistoryAction } = useRouterState();
  const loadingRef = useRef(false);

  const entity = schema.key in entities ? entities[schema.key][id] : null;

  const data = useMemo(() => {
    if (!entity) return null;
    return denormalize(entity, schema, entities);
  }, [entity]);

  useFetch((dispatch, fetch, reload) => {
    if (loadingRef.current) return;
    if (data && lastHistoryAction === "POP" && !reload) return;

    loadingRef.current = true;
    dispatch({ reqs: { [key]: [true, null] } });

    return fetch(completeUrl(`/${schema.key}/${encodeURIComponent(id)}`))
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
