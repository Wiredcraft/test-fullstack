import {LOGIN, LOGOUT} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case LOGIN:
        case LOGOUT:
            return {...state, ...{ user: action.payload }};
        default:
            return state;
    }
}
