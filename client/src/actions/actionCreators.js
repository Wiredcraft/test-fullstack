import { FETCH_TALKS, ADD_TALK, UPVOTE, HIDE_UPVOTE } from './actionTypes'
import axios from 'axios'
import moment from 'moment'

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
  const newTalk = {...talk, rating: 0, id: id, date: moment().format('L')}
  axios.post('/api/new', newTalk)
    .catch(error => {
      console.log(error);
    });
  return {
    type: ADD_TALK,
    allTalks: [...allTalks, newTalk]
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
