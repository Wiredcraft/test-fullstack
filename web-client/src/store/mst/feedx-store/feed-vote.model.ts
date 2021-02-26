import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { ItemBaseModel } from "store/mst/item-base.model";
import { FeedModel } from "./feed.model";
import { PublicProfileModel } from "./public-profile.model";

export const FeedVoteModel = types.compose(
  ItemBaseModel,
  types.model({
    userId: types.reference(PublicProfileModel),
    feedId: types.reference(FeedModel),
  })
);

/**
 * Mobx Instance: FeedVote Item
 */
export interface FeedVote extends Instance<typeof FeedVoteModel> {}

/**
 * Mobx Snapshots: FeedVote Item
 */
export interface FeedVoteSnapshotOut
  extends SnapshotOut<typeof FeedVoteModel> {}
export interface FeedVoteSnapshotIn extends SnapshotIn<typeof FeedVoteModel> {}
