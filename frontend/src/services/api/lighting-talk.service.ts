import { ApiService } from '..';
import { AddLightingTalkRequest, LightingTalk, RawObject, VoteLightingTalkRequest } from '../../models';

class LightingTalkService extends ApiService {
  /**
   * Fetch lighting talk data by id
   * @returns
   */
  fetchLightingTalkByID(id: number): Promise<LightingTalk> {
    return this.get(LightingTalk, `/lighting-talk/${id}`, {});
  }

  /**
   * Fetch lighting talk list
   * @returns
   */
  fetchLightingTalks(): Promise<LightingTalk[]> {
    return this.getList(LightingTalk, `/lighting-talk`, {});
  }

  /**
   * Add lighting talk
   * @returns
   */
  addLightingTalk(request: AddLightingTalkRequest): Promise<LightingTalk> {
    return this.post(LightingTalk, `/lighting-talk`, request);
  }

  /**
   * Vote lighting talk
   * @returns
   */
  voteLightingTalk(request: VoteLightingTalkRequest): Promise<RawObject<number>> {
    return this.put(RawObject, `/lighting-talk/vote`, request);
  }
}

export const lightingTalkService = new LightingTalkService();
