import { submitNewTalk, vote, NEW_TALK, VOTE } from '../../actions/index.js'
import { LightingTalks } from '../../reducers/index'

describe('/reducer', () => {
  it('should return loading status', () => {
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
})