// import {
//   flow,
//   getEnv,
//   Instance,
//   SnapshotIn,
//   SnapshotOut,
//   types,
// } from "mobx-state-tree";
// import { NAVIGATION_STATE_ROOT_KEY } from "../kv-store";
// import { MobxEnvironment } from "../setup-root-state";

// export const NavStateModel = types
//   .model("NavStateModel", {})
//   .actions((self) => ({
//     afterCreate() {
//       console.log("navState created");
//     },
//     init: flow(function* () {
//       const { navStateStore } = getEnv<MobxEnvironment>(self);
//       // <- note the star, this is a generator function!
//       // self.state = "pending";
//       try {
//         // ... yield can be used in async/await style
//         self = yield navStateStore.load(NAVIGATION_STATE_ROOT_KEY);
//       } catch (error) {
//         // ... including try/catch error handling
//         console.error("Failed to fetch projects", error);
//         // self.state = "error";
//       }
//     }),
//   }));

// /**
//  * The NavState instance.
//  */
// export interface NavState extends Instance<typeof NavStateModel> {}

// /**
//  * The data of a NavState.
//  */
// export interface NavStateSnapshotOut
//   extends SnapshotOut<typeof NavStateModel> {}
// export interface NavStateSnapshotIn extends SnapshotIn<typeof NavStateModel> {}
