import { observable } from 'mobx'

export class UserModel {
  @observable public username: string
  @observable public email: string
  @observable public password: string

  constructor (username: string, email: string) {
    this.username = username
    this.email = email
  }
}
export default UserModel
