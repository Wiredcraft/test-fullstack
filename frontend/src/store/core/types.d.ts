export interface EntityMap<T> {
  [key: string]: T;
}

export interface BaseState<T> {
  ids: Array<number | string>;
  all: EntityMap<T>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface BasePageState<T> extends BaseState<T> {
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
