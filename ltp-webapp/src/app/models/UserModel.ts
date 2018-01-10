import { observable } from 'mobx'

export class UserModel {
  @observable public username: string
  @observable public email: string
  @observable public password: string
}
export default UserModel
