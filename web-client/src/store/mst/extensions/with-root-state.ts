import { getRoot, IStateTreeNode } from "mobx-state-tree";
import { MobxRootStateModel } from "../root-state";

export const withRootState = (self: IStateTreeNode) => ({
  views: {
    get rootState() {
      return getRoot<typeof MobxRootStateModel>(self);
    },
  },
});
