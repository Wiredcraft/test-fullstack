import {Constructor} from '@loopback/context';
import {Model, property} from '@loopback/repository';

export function AddTimeStampPropertiesMixin<T extends Constructor<Model>>(
  superClass: T
) {
  class MixedModel extends superClass {
    @property({
      type: 'date',
      default: () => new Date()
    })
    createdAt: Date;

    @property({
      type: 'date',
      default: () => new Date()
    })
    updatedAt: Date;
  }
  return MixedModel;
}
