import axios from 'axios'
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
} from './action-types'

export const fetchTalks = () =>
    async dispatch => {
        dispatch({ type: FETCH_TALKS })
        try {
            const { data: { talks } } = await axios.get('/api/talks')
            dispatch({ type: FETCH_TALKS_SUCCESS, payload: talks })
        } catch (_) {
            dispatch({ type: FETCH_TALKS_FAIL })
        }
    }

export const upvoteTalk = (id) =>
    async dispatch => {
        dispatch({ type: UPVOTE_TALK })
        try {
            const { data } = await axios.put(`/api/talks/${id}/upvote`)
            dispatch({ type: UPVOTE_TALK_SUCCESS, payload: data })
        } catch (_) {
            dispatch({ type: UPVOTE_TALK_FAIL })
        }
    }

export const createTalk = (payload = {}) =>
    async dispatch => {
        dispatch({ type: CREATE_TALK })
        try {
            const { data } = await axios.post('/api/talks', payload)
            dispatch({ type: CREATE_TALK_SUCCESS, payload: data })
        } catch (_) {
            dispatch({ type: CREATE_TALK_FAIL })
        }
    }
