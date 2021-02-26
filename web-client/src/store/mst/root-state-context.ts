import { createContext, useContext } from "react";
import { MobxRootState } from "./root-state";

const MobxRootStateContext = createContext<MobxRootState>({} as MobxRootState);

/**
 * The provider our root component will use to expose the root store
 */
export const MobxRootStateProvider = MobxRootStateContext.Provider;

/**
 * A hook that pages can use to gain access to our stores
 */
export const useMobxStates = () => useContext(MobxRootStateContext);
