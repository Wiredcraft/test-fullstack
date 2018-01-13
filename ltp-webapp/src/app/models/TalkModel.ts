import { observable } from 'mobx'
import UserModel from './UserModel'

export class TalkModel {
  id: string

  @observable
  public title: string

  @observable
  public description: string

  @observable
  public score: number

  public author: UserModel
  public createdAt: string
  public likedByCurrentUser = false

  constructor (id: string, title: string, description: string, author?: UserModel, createdAt?: string, score = 0) {
    this.id = id
    this.title = title
    this.description = description
    this.author = author
    this.createdAt = createdAt
    this.score = score
  }
}

export default TalkModel
