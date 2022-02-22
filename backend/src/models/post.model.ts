import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import { AddTimeStampPropertiesMixin } from '../mixins/AddTimeStampPropertiesMixin';
import {User} from './user.model';
import {Vote} from './vote.model';

@model()
export class Post extends AddTimeStampPropertiesMixin(Entity) {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    index: {
      unique: true,
    },
    length: 200,
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  desc: string;

  @property({
    type: 'number',
    default: 0,
  })
  voteCount: number

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Vote)
  votes: Vote[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Post>) {
    super(data);
  }
}

export interface PostRelations {
  // describe navigational properties here
  hasVote: boolean,
}

export type PostWithRelations = Post & PostRelations;
