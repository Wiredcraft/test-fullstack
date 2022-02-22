import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Post} from './post.model';
import {User} from './user.model';

@model()
export class Vote extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Post)
  postId: number;

  @belongsTo(() => User)
  userId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vote>) {
    super(data);
  }
}

export interface VoteRelations {
  // describe navigational properties here
}

export type VoteWithRelations = Vote & VoteRelations;
