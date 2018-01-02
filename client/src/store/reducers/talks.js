import { unionBy } from 'lodash/array'
import {
    FETCH_TALKS,
    FETCH_TALKS_SUCCESS,
    FETCH_TALKS_FAIL,
    UPVOTE_TALK,
} from '../action-types'

const initialState = {
    list: [],
    loading: false,
    error: false,
}

Object.freeze(initialState)

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TALKS:
            return { ...state, loading: true, error: false }
        case FETCH_TALKS_SUCCESS:
            return { ...initialState, list: action.payload }
        case FETCH_TALKS_FAIL:
            return { ...state, loading: false, error: true }
        case UPVOTE_TALK:
            return { ...state, list: unionBy([action.payload], state.list, '_id') }
        default:
            return state
    }
}
