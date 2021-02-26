import { create } from "apisauce";
import { ApiService } from "services/api";
import { __DEV__ } from "utils/is-dev.constant";
import { MobxEnvironment } from "../store/mst";
import apiActions from "./api/actions";

if (__DEV__) {
  // ReactotronDev = Reactotron;
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment implements MobxEnvironment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
    }
    this.feedxApi = new ApiService({
      baseURL: "http://127.0.0.1:30200/api",
      withCredentials: true, // for cookie based authentication
      timeout: 3000,
    });
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
    }
    this.feedxApi.setup(create, apiActions);
  }

  feedxApi: ApiService;
  // navStateStore: KeyValueStoreImpl;
}

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createMobxEnvironment(): Promise<MobxEnvironment> {
  const env = new Environment();
  await env.setup();
  return env;
}
