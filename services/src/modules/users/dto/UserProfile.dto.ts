import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { BaseTimeStamp } from 'src/common/base-timestamp.entity';
import { User } from '../entities/user.entity';

// General
// UserProfileAuthtIntermediate > UserProfileAccessToken ~= UserProfilePrivate > UserProfilePublic
export class UserOmitExactTimestampProperty extends OmitType(User, [
  'timestamp',
]) {}
export type GeneralUserProfile = Partial<UserOmitExactTimestampProperty> & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserFields = (keyof UserOmitExactTimestampProperty)[];

const TIMESTAMP_FIELDS = ['craetedAt', 'updatedAt'];

// public profile, safe for all users
// ==============================================================
export const USER_PROFILE_KEYS_PUBLIC = [
  'name',
  // 'roles'
] as UserFields;
// key paths for query builders
export const USER_PROFILE_KEYS_QB_PUBLIC = [
  'user.name',
  // 'user.roles',
] as const;

export class UserProfilePublic
  extends IntersectionType(
    PickType(UserOmitExactTimestampProperty, USER_PROFILE_KEYS_PUBLIC),
    PickType(BaseTimeStamp, ['createdAt']),
  )
  implements GeneralUserProfile {}

// profile in the access token, http only
// ==============================================================
export const USER_PROFILE_KEYS_ACCESS_TOKEN = [
  'id',
  'name',
  'email',
  'phone',
  // 'roles'
] as const;
// key paths for query builders
export const USER_PROFILE_KEYS_QB_ACCESS_TOKEN = [
  'user.id',
  'user.name',
  'user.email',
  'user.phone',
  // 'user.roles',
] as const;

export class UserProfileAccessToken
  extends PickType(
    UserOmitExactTimestampProperty,
    USER_PROFILE_KEYS_ACCESS_TOKEN,
  )
  implements GeneralUserProfile {
  constructor(user: GeneralUserProfile) {
    super();
    for (const field of [
      ...USER_PROFILE_KEYS_ACCESS_TOKEN,
      ...TIMESTAMP_FIELDS,
    ]) {
      this[field] = user[field];
    }
  }
}

// DANGEROUS, only lives intermediately for authentication purpose
// ==============================================================
export const USER_PROFILE_KEYS_AUHT_INTERMEDIATE = [
  'id',
  'name',
  // 'roles',
  'passwordHash',
] as const;
// key paths for query builders
export const USER_PROFILE_KEYS_QB_AUHT_INTERMEDIATE = [
  'user.id',
  'user.name',
  // 'user.roles',
  'user.passwordHash',
] as const;

/**
 * Intermediate user profile, with the hashed password returned, definitely won't be returned by the api
 *
 * @export
 * @class UserProfileAuthtIntermediate
 * @extends {PickType(UserOmitExactTimestampProperty, USER_PROFILE_KEYS_AUHT_INTERMEDIATE)}
 * @implements {GeneralUserProfile}
 */
export class UserProfileAuthtIntermediate
  extends PickType(
    UserOmitExactTimestampProperty,
    USER_PROFILE_KEYS_AUHT_INTERMEDIATE,
  )
  implements GeneralUserProfile {
  constructor(user: GeneralUserProfile) {
    super();
    for (const field of [
      ...USER_PROFILE_KEYS_AUHT_INTERMEDIATE,
      ...TIMESTAMP_FIELDS,
    ]) {
      this[field] = user[field];
    }
  }
}
