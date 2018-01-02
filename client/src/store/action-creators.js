import axios from 'axios'
import {
    FETCH_TALKS,
    FETCH_TALKS_SUCCESS,
    FETCH_TALKS_FAIL,
    UPVOTE_TALK,
} from './action-types'

export const fetchTalks = () =>
    async dispatch => {
        dispatch({ type: FETCH_TALKS })
        try {
            const { data: { talks } } = await axios.get('/api/talks')
            dispatch({ type: FETCH_TALKS_SUCCESS, payload: talks })
        } catch(_) {
            dispatch({ type: FETCH_TALKS_FAIL })
        }
    }

export const upvoteTalk = (id) =>
    async dispatch => {
        const { data } = await axios.put(`/api/talks/${id}/upvote`)
        dispatch({ type: UPVOTE_TALK, payload: data })
    }
