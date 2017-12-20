import { submitNewTalk, vote, NEW_TALK, VOTE } from '../../actions/index.js'

describe('/actions', () => {
  describe('ligthing talk', () => {

    it('should create an action to new talk', () => {
      const data = {
        title: 'title',
        description: 'description',
        username: 'username'
      };
      const action = submitNewTalk(data)
      expect(action.data).toEqual(data)
      expect(action.type).toBe(NEW_TALK)
    })

    it('should create an action to vote', () => {
      const index = 1
      const action = vote(index)
      expect(action.index).toBe(index)
      expect(action.type).toBe(VOTE)
    })
  })
})