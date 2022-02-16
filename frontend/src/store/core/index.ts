import { BaseState } from './types';

function initBaseState<T, ErrType = string>(): BaseState<T, ErrType> {
  return {
    ids: [],
    all: {},
    touched: false,
    loading: false,
    errors: []
  };
}

function getRecords<T>(state: BaseState<T>, ids: (number | string)[]): T[] {
  return ids.map((id) => state.all[id]);
}

function getRecord<T>(state: BaseState<T>, id: string | number): T {
  return state.all[id];
}

function mapRecords<T>(state: BaseState<T>): T[] {
  return getRecords(state, state.ids);
}

function isLoading<T>(state: BaseState<T>): boolean {
  return state.loading && state.touched && !state.errors.length;
}

function isLoaded<T>(state: BaseState<T>): boolean {
  return !state.loading && state.touched && !state.errors.length;
}

function hasError<T>(state: BaseState<T>): boolean {
  return !state.loading && state.touched && !!state.errors.length;
}

export { initBaseState, getRecords, getRecord, mapRecords, isLoading, isLoaded, hasError };
