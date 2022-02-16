export interface EntityMap<T> {
  [key: string]: T;
}

export interface BaseState<T, ErrType = string> {
  ids: Array<number | string>;
  all: EntityMap<T>;
  loading: boolean;
  touched: boolean;
  errors: ErrType[];
}
