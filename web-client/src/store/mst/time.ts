// import { getEnv, onSnapshot } from "mobx-state-tree";
// import { NAVIGATION_STATE_ROOT_KEY, SECURE_STATE_ROOT_KEY } from "src/kv-store";
// import { NavStateSnapshotOut } from "./nav-state.model";
// import { useMobxStates } from "./root-state-context";
// import { SecureStateSnapshotOut } from "./secure-state.model";
// import { MobxEnvironment } from "./setup-root-state";

// const { navState, secureState } = useMobxStates();

// onSnapshot<NavStateSnapshotOut>(navState, (snapshot) =>
//   getEnv<MobxEnvironment>(navState).navStateStore.save(
//     NAVIGATION_STATE_ROOT_KEY,
//     snapshot
//   )
// );
// onSnapshot<SecureStateSnapshotOut>(secureState, (snapshot) =>
//   getEnv<MobxEnvironment>(secureState).navStateStore.save(
//     SECURE_STATE_ROOT_KEY,
//     snapshot
//   )
// );

// var states = [];
// var currentFrame = -1;

// // onSnapshot(rootStore, (snapshot) => {
// //   if (currentFrame === states.length - 1) {
// //     currentFrame++;
// //     states.push(snapshot);
// //   }
// // });

// // export function previousState() {
// //   if (currentFrame === 0) return;
// //   currentFrame--;
// //   applySnapshot(rootStore, states[currentFrame]);
// // }

// // export function nextState() {
// //   if (currentFrame === states.length - 1) return;
// //   currentFrame++;
// //   applySnapshot(rootStore, states[currentFrame]);
// // }
