import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const PublicProfileModel = types.model("PublicProfile").props({
  name: types.identifier,
  createdAt: types.maybeNull(types.Date),
  updatedAt: types.maybeNull(types.Date),
  email: types.maybeNull(types.string),
});

/**
 * Mobx Instance: PublicProfile Item
 */
export interface PublicProfile extends Instance<typeof PublicProfileModel> {}

/**
 * Mobx Snapshots: PublicProfile Item
 */
export interface PublicProfileSnapshotOut
  extends SnapshotOut<typeof PublicProfileModel> {}
export interface PublicProfileSnapshotIn
  extends SnapshotIn<typeof PublicProfileModel> {}
