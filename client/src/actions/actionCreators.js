import { 
  FETCH_TALKS,
  ADD_TALK,
  UPVOTE,
  HIDE_UPVOTE,
  UPDATE_INPUT_VALUE,
  UPDATE_ERRORS,
  UPDATE_FOCUSED,
  CLEAR_TALK
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
  axios.post('/api/new', newTalk)
    .catch(error => {
      console.log(error);
    });
  return {
    type: ADD_TALK,
    allTalks: moment(newTalk.publish).isSameOrBefore(moment()) ?
      [...allTalks, newTalk] :
      [...allTalks]
  }
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
