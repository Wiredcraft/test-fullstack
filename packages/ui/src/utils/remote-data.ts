export enum Kind {
  NotAsked = "notasked",
  Loading = "loading",
  Success = "success",
  Failure = "failure",
}

export interface NotAsked {
  kind: Kind.NotAsked;
}

export interface Loading {
  kind: Kind.Loading;
}

export interface Failure<E> {
  kind: Kind.Failure;
  error: E;
}

export interface Success<D> {
  kind: Kind.Success;
  data: D;
}

export type RemoteData<E, D> = NotAsked | Loading | Failure<E> | Success<D>;

export const remoteDataNotAsked: NotAsked = { kind: Kind.NotAsked };
export const remoteDataLoading: Loading = { kind: Kind.Loading };
export const remoteDataFailure = <E extends any>(error: E): Failure<E> => ({
  kind: Kind.Failure,
  error,
});
export const remoteDataSuccess = <D extends any>(data: D): Success<D> => ({
  kind: Kind.Success,
  data,
});
export const remoteDataMap = <D1, D2>(
  remote: RemoteData<any, D1>,
  fn: (_: D1) => D2
): RemoteData<any, D2> => {
  if (remote.kind === Kind.NotAsked) return remoteDataNotAsked;
  if (remote.kind === Kind.Loading) return remoteDataLoading;
  if (remote.kind === Kind.Failure) return remoteDataFailure(remote.error);
  return remoteDataSuccess(fn(remote.data));
};
