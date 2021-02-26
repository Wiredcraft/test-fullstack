import {
  EventSubscriber,
  EntitySubscriberInterface,
  RemoveEvent,
} from 'typeorm';
import { UserFeedVote } from './user-feed-vote.entity';

@EventSubscriber()
export class FeedVoteSubscriber
  implements EntitySubscriberInterface<UserFeedVote> {
  listenTo() {
    return UserFeedVote;
  }

  beforeRemove(event: RemoveEvent<UserFeedVote>) {
    console.log(event.entity);
  }
}
