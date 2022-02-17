import { makeObservable, observable, action } from 'mobx';
import { localStorageService } from '../../services';
import { StringUtils } from '../../utils';
class UIStore {
  // Hack news list
  hasLogined: boolean = !StringUtils.isBlank(localStorageService.authToken);
  constructor() {
    makeObservable(this, {
      hasLogined: observable,
      setHasLogined: action,
    });
  }
  setHasLogined = (v: boolean) => {
    this.hasLogined = v;
  };
}

export const uiStore = new UIStore();
