import { observable } from 'mobx'
import UserModel from './UserModel'

export class TalkModel {
  id: number

  @observable
  public title: string

  @observable
  public description: string

  @observable
  public score: number

  public author: UserModel
  public createdAt: string

  constructor (title: string, description: string) {
    this.title = title
    this.description = description
  }
}

export default TalkModel
