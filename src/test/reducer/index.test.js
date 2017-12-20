import { submitNewTalk, vote, NEW_TALK, VOTE } from '../../actions/index.js'
import { LightingTalks } from '../../reducers/index'

describe('/reducer', () => {
  it('should return correct LightingTalks data', () => {
    const action = {
      type: NEW_TALK,
      data: {
        title: 'title',
        description: 'description',
        username: 'username'
      }
    }
    const newState1 = LightingTalks([], action)
    const newState2 = LightingTalks(newState1, action)
    expect(newState1[0].id).not.toBe(newState2[1].id)
    expect(newState1[0].isVoted).toBeFalsy()
    expect(newState2).toContain(newState1[0])
  })

  it('should update VOTE', () => {
    const newTalkAction = {
      type: NEW_TALK,
      data: {
        title: 'title',
        description: 'description',
        username: 'username'
      }
    }

    const voteAction = {
      type: VOTE,
      index: 0
    }

    const newState1 = LightingTalks([], newTalkAction)
    const newState2 = LightingTalks(newState1, voteAction)
    expect(newState1[0].id).toBe(newState2[0].id)
    expect(newState1[0].voteCount).not.toBe(newState2[0].voteCount)
  })
})