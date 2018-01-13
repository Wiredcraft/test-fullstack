import { TalkModel } from '../models'
import { action, observable } from 'mobx'

export class TalkStore {
  @observable
  public talks: Array<TalkModel>

  constructor (fixtures?: TalkModel[]) {
    if (Boolean(fixtures)) {
      this.talks = fixtures
    } else {
      this.talks = []
    }
  }

  @action
  public likeTalk (talkId: string) {
    this.talks = this.talks.map(talk => {
      if (talk.id === talkId) {
        talk.score += 1
        talk.likedByCurrentUser = true
      }
      return talk
    }).sort((talk1, talk2) => {
      return talk2.score - talk1.score
    })
  }
}

export default TalkStore
