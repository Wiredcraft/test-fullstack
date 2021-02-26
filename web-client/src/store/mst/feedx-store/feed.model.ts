import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { ItemBaseModel } from "store/mst/item-base.model";
import { PublicProfileModel } from "./public-profile.model";

export const FeedModel = types.compose(
  ItemBaseModel,
  types.model({
    title: types.string,
    description: types.string,
    createdBy: types.reference(PublicProfileModel),
    voteCount: types.number,
  })
);

/**
 * Mobx Instance: Feed Item
 */
export interface Feed extends Instance<typeof FeedModel> {}

/**
 * Mobx Snapshots: Feed Item
 */
export interface FeedSnapshotOut extends SnapshotOut<typeof FeedModel> {}
export interface FeedSnapshotIn extends SnapshotIn<typeof FeedModel> {}
