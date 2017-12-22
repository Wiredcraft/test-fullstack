export const NEW_TALK = 'NEW_TALK'
export const VOTE = 'VOTE'

export const submitNewTalk = (data) => ({
  type: NEW_TALK,
  data
})

export const vote = (index) => ({
  type: VOTE,
  index
})


