import { FETCH_TALKS } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_TALKS:
            return [...action.payload.data];
        default:
            return state;
    }
};
