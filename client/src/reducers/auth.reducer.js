import {LOGIN, LOGOUT, CHECK_SESSION} from '../actions/types';

export default (state  = {}, action = { type: null }) => {
    switch(action.type) {
        case LOGIN:
        case LOGOUT:
        case CHECK_SESSION:
            return {...state, ...{ user: action.payload }};
        default:
            return state;
    }
}
