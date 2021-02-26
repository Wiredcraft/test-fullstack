import { setupMobxRootState } from "store/mst";
import { createMobxEnvironment } from "./environment";

export async function configRootStore() {
  const mobxEnv = await createMobxEnvironment();
  return await setupMobxRootState({
    env: mobxEnv,
    onError: (e) => {
      console.log("error while creating the mobx state:", e);
    },
    onSuccess: (...args) => {
      console.log("successfully created mobx state:", ...args);
    },
  });
}
