import configureStore from './configureStore';

const store = configureStore();

export const getStore = (): any => {
  return store;
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
