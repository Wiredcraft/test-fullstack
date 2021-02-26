import { AbstractApiService } from "store/api-service";
import { MobxRootStateModel, MobxRootStateSnapshotIn } from "./root-state";

export interface MobxEnvironment {
  setup: () => void;
  feedxApi: AbstractApiService;
  // navStateStore: AbstractKeyValueStore;
}

export interface MobxRootStateOptions {
  env: MobxEnvironment;
  onError: (e: any) => any;
  onSuccess: (...args: any[]) => any;
}

/**
 * Setup the root state.
 */
export async function setupMobxRootState({
  env,
  ...restOpts
}: MobxRootStateOptions) {
  const defaultInitRootStateData: MobxRootStateSnapshotIn = {};

  const rootState = MobxRootStateModel.create(defaultInitRootStateData, env);

  try {
    rootState.initFeedx();
    rootState.initAuthState();
  } catch (e) {
    console.log(e);
    // if there's any problems loading, then let's at least fallback to an empty store
    // instead of crashing.
    restOpts.onError(e);
  }

  restOpts.onSuccess(rootState);

  return rootState;
}
