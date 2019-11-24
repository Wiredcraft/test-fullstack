
import { init } from '@rematch/core';
import * as models from './models';

const cacheList = ['posts'];
const stateCache = sessionStorage.getItem('store-rematch');
const initialState = (stateCache && JSON.parse(stateCache)) || {};
 
const store = init({
  models: {
    ...models
  },
  redux: {
    initialState: initialState
  }
});
 
store.subscribe(() => {
  const state = store.getState();
  let stateData = {};
 
  Object.keys(state).forEach(item => {
    if (cacheList.includes(item)) stateData[item] = state[item];
  });
 
  sessionStorage.setItem('store-rematch', JSON.stringify(stateData));
});
 
export default store;
