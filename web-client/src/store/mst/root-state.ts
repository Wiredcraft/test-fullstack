import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { AuthStateModel } from "./auth-state.model";
import { FeedxStoreModel } from "./feedx-store/feedx-store";

/**
 * The MobxRootStateModel model.
 */
export const MobxRootStateModel = types
  .model("MobxRootStateModel", {
    feedxStore: types.maybeNull(FeedxStoreModel),
    authState: types.maybeNull(AuthStateModel),
  })
  .actions((self) => {
    return {
      // Lifecycle hooks
      // afterCreate() {
      //   console.log("created MobxRootStateModel");
      // },

      initFeedx() {
        self.feedxStore = FeedxStoreModel.create();
      },

      initAuthState() {
        self.authState = AuthStateModel.create();
        self.authState.fetchProfile({ votes: false, posts: false });
      },
    };
  });

/**
 * The MobxRootState instance.
 */
export interface MobxRootState extends Instance<typeof MobxRootStateModel> {}

/**
 * The data of a MobxRootState.
 */
export interface MobxRootStateSnapshotOut
  extends SnapshotOut<typeof MobxRootStateModel> {}
export interface MobxRootStateSnapshotIn
  extends SnapshotIn<typeof MobxRootStateModel> {}
