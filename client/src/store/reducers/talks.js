import { unionBy } from 'lodash/array'
import {
    FETCH_TALKS,
    FETCH_TALKS_SUCCESS,
    FETCH_TALKS_FAIL,
    UPVOTE_TALK,
    UPVOTE_TALK_SUCCESS,
    UPVOTE_TALK_FAIL,
    CREATE_TALK,
    CREATE_TALK_SUCCESS,
    CREATE_TALK_FAIL,
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
        case UPVOTE_TALK:
        case CREATE_TALK:
            return { ...state, loading: true, error: false }
        case FETCH_TALKS_FAIL:
        case UPVOTE_TALK_FAIL:
        case CREATE_TALK_FAIL:
            return { ...state, loading: false, error: true }
        case FETCH_TALKS_SUCCESS:
            return { ...initialState, list: action.payload }
        case UPVOTE_TALK_SUCCESS:
            return { ...state, list: unionBy([action.payload], state.list, '_id') }
        case CREATE_TALK_SUCCESS:
            return { ...state, list: [...state.list, action.payload] }
        default:
            return state
    }
}
