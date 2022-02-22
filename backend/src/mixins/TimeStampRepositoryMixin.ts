import {Constructor} from '@loopback/context';
import {Count, DataObject, Entity, EntityCrudRepository, Options, Where} from '@loopback/repository';

export function TimeStampRepositoryMixin<
  E extends Entity & {createdAt?: Date; updatedAt?: Date},
  ID,
  R extends Constructor<EntityCrudRepository<E, ID>>
>(repository: R) {
  class MixedRepository extends repository {
    async create(entity: DataObject<E>, options?: Options): Promise<E> {
      entity.createdAt = new Date();
      entity.updatedAt = new Date();
      return super.create(entity, options);
    }

    async updateAll(
      data: DataObject<E>,
      where?: Where<E>,
      options?: Options,
    ): Promise<Count> {
      data.updatedAt = new Date();
      return super.updateAll(data, where, options);
    }

    async replaceById(
      id: ID,
      data: DataObject<E>,
      options?: Options,
    ): Promise<void> {
      data.updatedAt = new Date();
      return super.replaceById(id, data, options);
    }
  }
  return MixedRepository;
}
