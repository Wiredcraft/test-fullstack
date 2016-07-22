import Immutable from 'immutable';
import { combineReducers } from 'redux';

import AppReducer from './AppReducer';
import UIReducer from './UIReducer';

let combineImmutableReducers = reducers => {
    return (state, action) => Immutable.Map(reducers(
        Immutable.Map.isMap(state) ? state.toObject() : state, action
    ));
};

// combine all your reducers here
const reducers = combineReducers({
    // add reducers here
    app: AppReducer,
    ui: UIReducer
})

module.exports = combineImmutableReducers(reducers);

