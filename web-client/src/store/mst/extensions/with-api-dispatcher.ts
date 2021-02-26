import { getEnv, IStateTreeNode } from "mobx-state-tree";
import { MobxEnvironment } from "../setup";

export const withApiDispatchers = (self: IStateTreeNode) => ({
  views: {
    get environment() {
      return getEnv<MobxEnvironment>(self);
    },
    // dispatch api action
    get dispatchApiAction() {
      const apiInstance = getEnv<MobxEnvironment>(self).feedxApi;
      // don't mess up with `this`!
      return apiInstance.dispatch.bind(apiInstance);
    },
  },
});
