import { action, observable } from 'mobx'
import { UserModel } from '../models'

export class UserStore {
  @observable
  public currentUser: UserModel

  @action
  login = (loginInfo: Partial<UserModel>) => {
    // TODO: login logic
  }

  @action
  register = (userInfo: Partial<UserModel>) => {
    // TODO: register logic
  }
}
