import { useState, useEffect } from "react";

import {
  RemoteData,
  remoteDataSuccess,
  remoteDataFailure,
  remoteDataLoading,
  remoteDataNotAsked,
  Kind,
} from "../../utils/remote-data";

interface ResourceLoaderProps<T> {
  resource: Promise<T>;
  renderLoading?: () => React.ReactElement | null;
  renderFailure?: (err: Error) => React.ReactElement | null;
  renderData?: (data: T) => React.ReactElement | null;
  onSuccess?: (data: T) => void;
  onError?: (err: Error) => void;
}

export function ResourceLoader<T>(props: ResourceLoaderProps<T>): React.ReactElement | null {
  const {
    resource,
    onSuccess,
    onError,
    renderLoading = defaultRenderLoading,
    renderFailure = defaultRenderFailure,
    renderData = () => {
      return null;
    },
  } = props;

  const [state, setState] = useState<RemoteData<any, T>>(remoteDataNotAsked);

  useEffect(() => {
    setState(remoteDataLoading);

    let canceled = false;
    resource
      .then(
        (data) => {
          if (canceled) return;
          onSuccess && onSuccess(data);
          return remoteDataSuccess(data);
        },
        (err) => {
          if (canceled) return;
          onError && onError(err as Error);
          return remoteDataFailure(err);
        }
      )
      .then((nextState) => {
        if (!nextState) return;
        setState(nextState);
      })
      .catch(console.error);

    return () => {
      canceled = true;
    };
  }, [resource, onSuccess, onError]);

  if (state.kind === Kind.NotAsked) {
    return null;
  }

  if (state.kind === Kind.Loading) {
    return renderLoading();
  }

  if (state.kind === Kind.Failure) {
    return renderFailure(state.error);
  }

  return renderData(state.data);
}

export function defaultRenderLoading() {
  return <span>loading..</span>;
}

export function defaultRenderFailure(err: Error) {
  console.error(err);
  return <pre>Oops! Something went wrong.</pre>;
}
