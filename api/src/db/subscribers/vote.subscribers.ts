import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';

import { Talk } from '../../talks/entities/talk.entity';
import { Vote } from '../../talks/entities/vote.entity';

@EventSubscriber()
export class VoteSubscriber implements EntitySubscriberInterface<Vote> {
  listenTo() {
    return Vote;
  }

  async afterInsert(event: InsertEvent<Vote>): Promise<any> {
    await event.manager
      .getRepository(Talk)
      .manager.increment(Talk, { id: event.entity.talk.id }, 'voteCount', 1);
  }

  async beforeRemove(event: RemoveEvent<Vote>): Promise<any> {
    await event.manager
      .getRepository(Talk)
      .manager.decrement(Talk, { id: event.entity.talk.id }, 'voteCount', 1);
  }
}
