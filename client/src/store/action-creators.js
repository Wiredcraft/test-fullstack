import axios from 'axios'
import {
    FETCH_TALKS,
    FETCH_TALKS_SUCCESS,
    FETCH_TALKS_FAIL,
} from './action-types'

export const fetchTalks = () => {
    return async dispatch => {
        dispatch({ type: FETCH_TALKS })
        try {
            const { data: { talks } } = await axios.get('/api/talks')
            dispatch({ type: FETCH_TALKS_SUCCESS, payload: talks })
        } catch(_) {
            dispatch({ type: FETCH_TALKS_FAIL })
        }
    }
}
