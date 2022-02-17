import { makeObservable, observable, action } from 'mobx';
import { AddLightingTalkRequest, LightingTalk, VoteLightingTalkRequest } from '../../models';
import { lightingTalkService } from '../../services';
class LightingTalkStore {
  // Hack news list
  lightingTalk: LightingTalk[] = [];
  constructor() {
    makeObservable(this, {
      lightingTalk: observable,
      setLightingTalk: action,
      fetchLightingTalk: action,
    });
  }

  setLightingTalk(value: LightingTalk[]) {
    this.lightingTalk = value;
  }

  /**
   * Fetch lighting talk data
   */
  fetchLightingTalk = async () => {
    const result = await lightingTalkService.fetchLightingTalks();
    this.setLightingTalk(result);
  };

  /**
   * Add lighting talk
   * @param request
   * @returns
   */
  addLightingTalk = async (request: AddLightingTalkRequest) => {
    return lightingTalkService.addLightingTalk(request).then(async (res) => {
      this.lightingTalk.push(res);
    });
  };

  /**
   * Vote lighting talk
   * @param request
   */
  voteLightingTalk = async (request: VoteLightingTalkRequest) => {
    return lightingTalkService.voteLightingTalk(request);
  };
}

export const lightingTalkStore = new LightingTalkStore();
