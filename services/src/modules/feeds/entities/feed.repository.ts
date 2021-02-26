import {
  AbstractRepository,
  EntityRepository,
  getConnectionManager,
} from 'typeorm';
import { Feed } from './feed.entity';

@EntityRepository(Feed)
export class FeedRepository extends AbstractRepository<Feed> {
  async findOneById(id: string): Promise<Feed> {
    try {
      return this.repository.findOne(id);
    } catch (error) {
      // throw new BadRequestException(`news with ${id} not found.`);
    }
  }
}
