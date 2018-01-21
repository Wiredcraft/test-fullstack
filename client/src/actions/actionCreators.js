import { 
  FETCH_TALKS,
  ADD_TALK,
  UPVOTE,
  HIDE_UPVOTE,
  UPDATE_INPUT_VALUE,
  UPDATE_ERRORS,
  UPDATE_FOCUSED,
  CLEAR_TALK,
  SHOW_SUCCESS_MSG,
  HIDE_SUCCESS_MSG
} from './actionTypes'
import moment from 'moment'
import axios from 'axios'

export function fetchTalks() {
  return (dispatch) => 
    axios.get('/api/talks')
      .then(response => {
        const talks = response.data.talks
        dispatch({
          type: FETCH_TALKS,
          talks: talks
        })
      })
      .catch(error => {
        console.log(error);
      });
}

export function addTalk(allTalks, talk) {
  const id = allTalks.length === 0 ? 1 : Math.max(...allTalks.map(t => t.id)) + 1
  const newTalk = {
    ...talk,
    rating: 0,
    id: id,
    publish: talk.publish
  }
  return (dispatch) => 
    axios.post('/api/new', newTalk)
      .then(response =>
        dispatch({
          type: ADD_TALK,
          allTalks: moment(newTalk.publish).isSameOrBefore(moment()) ?
            [...allTalks, newTalk] :
            [...allTalks],
          isMessageVisible: true
        }),
        dispatch((showSuccessMsg(talk.publish))),
        dispatch((clearTalk()))
      ) 
      .catch(error => {
        console.log(error);
      });
}

export function upvote(allTalks, id, upvoted) {
  const requestedIndex = allTalks.findIndex(t => t.id === id)
  const upvotedTalk = {...allTalks[requestedIndex], rating: allTalks[requestedIndex].rating + 1}
  const updatedTalks = [...allTalks]
  updatedTalks[requestedIndex] = upvotedTalk
  axios.post('/api/upvote', {id: id})
    .catch(error => {
      console.log(error);
    });
  return {
    type: UPVOTE,
    allTalks: updatedTalks
  }
}

export function hideUpvoted(upvoted, id) {
  return {
    type: HIDE_UPVOTE,
    upvoted: [...upvoted, id]
  }
}

export function updateInputValue(newTalk) {  
  return {
    type: UPDATE_INPUT_VALUE,
    newTalk: newTalk
  }
}

export function updateErrors(errors) {
  return {
    type: UPDATE_ERRORS,
    errors: errors
  }
}

export function updateFocused(field) {
  return {
    type: UPDATE_FOCUSED,
    field: field
  }
}

export function clearTalk() {
  return {
    type: CLEAR_TALK
  }
}

export function showSuccessMsg(date) {
  window.scrollTo(0,0)
  return {
    type: SHOW_SUCCESS_MSG,
    date: date
  }
}

export function hideSuccessMsg() {
  return {
    type: HIDE_SUCCESS_MSG
  }
}
