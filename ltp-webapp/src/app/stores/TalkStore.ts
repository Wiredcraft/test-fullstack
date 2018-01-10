import { TalkModel } from '../models'
import { observable } from 'mobx'

export class TalkStore {
  @observable
  public talks: Array<TalkModel>

  constructor (fixtures: TalkModel[]) {
    this.talks = fixtures
  }
}

export default TalkStore
