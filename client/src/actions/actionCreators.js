import { FETCH_TALKS, ADD_TALK } from './actionTypes'
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
  const newTalk = {...talk, rating: 0, id: Math.max(...allTalks.map(t => t.id)) + 1}
  axios.post('/api', newTalk)
    .catch(error => {
      console.log(error);
    });
  return {
    type: ADD_TALK,
    allTalks: [...allTalks, newTalk]
  }
}
