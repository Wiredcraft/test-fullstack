import Immutable from 'immutable';

import CommonActions from '../actions/CommonActions';

const DEFAULT_UI_STATE = {
    busy: false
};

function ui(state, action) {
    const currentState = state || Immutable.Map(DEFAULT_UI_STATE);
    switch (action.type) {
        case CommonActions.Keys.Busy:
            return state.merge({"busy": true});
        case CommonActions.Keys.BusyCompleted:
            return state.merge({"busy": false});
        default:
            return currentState;
    }
}

module.exports = ui;
