const engine = require('store/src/store-engine');
const storages = [
  require('store/storages/localStorage'),
  require('store/storages/cookieStorage'),
];
const plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire'),
];

export const store = engine.createStore(storages, plugins);

export const LIMIT = 15;
