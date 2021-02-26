import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserEntitySubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  /**
   * Some values are `nullable` for insertion, but `unique` at the same time, they conflict.
   *
   * Should assign a default no-null initial value for them if no inputs for:
   *
   * - githubId
   * - wechatId
   * - phone
   * - etc.
   *
   * @param {InsertEvent<User>} event
   * @memberof UserEntitySubscriber
   */
  beforeInsert(event: InsertEvent<User>) {
    // This step can be safely ignored with Postgres
    // const timestamp = new Date().getTime();
    // const defaultNoNullString = `default_${timestamp}`;
    // event.entity.githubId = event.entity.githubId || defaultNoNullString;
    // event.entity.wechatId = event.entity.wechatId || defaultNoNullString;
    // event.entity.phone = event.entity.phone || defaultNoNullString;
  }
}
