import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
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
      .manager.increment(Talk, { id: event.entity.talkId }, 'voteCount', 1);
  }
}
