import Immutable from 'immutable';

import RootActions from '../actions/RootActions';

const DEFAULT_APP_STATE = {
    status: ''
};

function app(state, action) {
    const currentState = state || Immutable.Map(DEFAULT_APP_STATE);
    switch (action.type) {
        case RootActions.Keys.InitializeApp:
            return currentState.merge(action.args);
        case RootActions.Keys.InitializeAppCompleted:
            return currentState.merge(action.args);
        default:
            return currentState;
    }
}

module.exports = app;
