export const fetchTalks = () => {
  return {
    type: 'FETCH_TALK',
  }
}

export const addTalk = data => {
  return {
    type: 'ADD_TALK',
    data,
  }
}

export const voteForTalk = id => {
  return {
    type: 'VOTE_FOR_TALK',
    id,
  }
}
