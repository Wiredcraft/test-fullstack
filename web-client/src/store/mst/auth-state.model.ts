import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import {
  ApiServiceActionToken,
  CreateSessionPayload,
  FetchProfilePayload,
} from "store/api-service/actions";
import { withEnvironment } from "./extensions/with-environment";
import { withStatus } from "./extensions/with-status";
import {
  PublicProfile,
  PublicProfileModel,
} from "./feedx-store/public-profile.model";

/**
 * Mobx Model: AuthState State Domain
 */
export const AuthStateModel = types
  .model("AuthState")
  .props({
    isAuthenticated: false,
    profile: types.maybeNull(types.reference(PublicProfileModel)),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views((self) => ({
    // getRepetitionCount(delightId) {
    //   let count = 0;
    //   for (const v of self.daylights.values()) v.inherits.get(delightId) && count++;
    //   return count;
    // }
  }))
  .actions((self) => ({
    // Lifecycle hooks
    // ==================================================
    afterAttach: () => {},

    // mutations
    // ==================================================
    setProfile(profile: PublicProfile) {
      self.profile = profile;
    },
    setIsAuthticated(state: boolean) {
      self.isAuthenticated = state;
    },

    // api actions
    // ==================================================
    createSession(payload: CreateSessionPayload) {
      self.setStatus("pending");
      self
        .dispatchApiAction(ApiServiceActionToken.CREATE_SESSION, payload)
        .then((res) => {
          if (res.kind === "OK" && res.data) {
            this.setProfile(res.data);
          } else {
            self.resolveFetchErrorResponse(res);
          }
          self.setStatus("idle");
        });
    },
    fetchProfile(payload: FetchProfilePayload) {
      self.setStatus("pending");
      self
        .dispatchApiAction(ApiServiceActionToken.FETCH_PROFILE, payload)
        .then((res) => {
          if (res.kind === "OK" && res.data) {
            this.setProfile(res.data);
          } else {
            self.resolveFetchErrorResponse(res);
          }
          self.setStatus("idle");
        });
    },
  }));

/**
 * Mobx Model: AuthState State
 */
export interface AuthState extends Instance<typeof AuthStateModel> {}

/**
 * Mobx Snapshot: AuthState State
 */
export interface AuthStateSnapshotOut
  extends SnapshotOut<typeof AuthStateModel> {}
export interface AuthStateSnapshotIn
  extends SnapshotIn<typeof AuthStateModel> {}
