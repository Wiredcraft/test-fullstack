import { BaseState } from './types';

function initBaseState<T>(): BaseState<T> {
  return {
    ids: [],
    all: {},
    status: 'idle',
    error: null
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
  return state.status === 'loading';
}

function isLoaded<T>(state: BaseState<T>): boolean {
  return state.status === 'succeeded';
}

function hasError<T>(state: BaseState<T>): boolean {
  return !!state.error;
}

export { initBaseState, getRecords, getRecord, mapRecords, isLoading, isLoaded, hasError };
