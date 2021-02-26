import { PickType } from '@nestjs/swagger';
import { EntityPaginationQuery } from 'src/common/EntGetManyPagenation.query';
import { Feed } from '../entities/feed.entity';

export class FeedGetManyQuery extends EntityPaginationQuery {}

export const FEED_KEYS_GET_MANY = [
  'id',
  'title',
  'description',
  'createdBy',
] as const;
// key paths for query builders
export const FEED_KEYS_QB_GET_MANY = [
  'feed.id',
  'feed.title',
  'feed.description',
  'feed.createdBy',
] as const;

export class FeedGetManyItem
  extends PickType(Feed, FEED_KEYS_GET_MANY)
  implements Partial<Feed> {
  voteCount: number;
}

export class FeedGetManyResponse {
  feeds: FeedGetManyItem[];
  total: number;
}
