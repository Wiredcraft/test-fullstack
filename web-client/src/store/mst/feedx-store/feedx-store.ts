import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import {
  ApiServiceActionToken,
  FetchFeedsPayload,
} from "store/api-service/actions";
import { withEnvironment } from "../extensions/with-environment";
import { withStatus } from "../extensions/with-status";
import { FeedVoteModel } from "./feed-vote.model";
import { Feed, FeedModel } from "./feed.model";
import { PublicProfileModel } from "./public-profile.model";

export enum FeedListFilterDateRangeToken {
  ALL = "ALL",
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
}

export interface FeedListDateRange {
  start?: Date;
  end?: Date;
}

/**
 * Mobx Model: Daylight State Domain
 */
export const FeedxStoreModel = types
  .model("FeedxStore")
  .props({
    lastUpdated: types.maybeNull(types.Date),
    feeds: types.optional(types.map(FeedModel), {}),
    profiles: types.optional(types.map(PublicProfileModel), {}),
    votes: types.optional(types.map(FeedVoteModel), {}),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views((self) => ({
    trendingFeeds(dateRange = FeedListFilterDateRangeToken.ALL) {
      const feed = self.feeds.get("1ds");
      console.log({ feed });
      return [];
    },
    // newFeeds() {},
  }))
  .actions((self) => ({
    // Lifecycle hooks
    // ==================================================
    // null

    // mutations
    // ==================================================
    setLastUpdated() {
      self.lastUpdated = new Date();
    },
    setFeeds(feeds: Feed[] = []) {
      for (const feed of feeds) {
        self.feeds.set(feed.id, feed);
      }
    },

    // actions
    // ==================================================
    fetchFeeds(payload: FetchFeedsPayload) {
      self.setStatus("pending");
      // self.environment.feedxApi.dispatch()
      console.log("fetching feeds");
      self
        .dispatchApiAction(ApiServiceActionToken.FETCH_FEEDS, payload)
        .then((res) => {
          if (res?.kind === "OK") {
            this.setFeeds(res.data?.feeds);
          } else {
            self.resolveFetchErrorResponse(res);
          }
          this.setLastUpdated();
          self.setStatus("idle");
        });
    },
  }));

/**
 * Mobx Model: Daylight State
 */
export interface FeedxStore extends Instance<typeof FeedxStoreModel> {}

/**
 * Mobx Snapshot: Daylight State
 */
export interface FeedxStoreSnapshotOut
  extends SnapshotOut<typeof FeedxStoreModel> {}
export interface FeedxStoreSnapshotIn
  extends SnapshotIn<typeof FeedxStoreModel> {}
