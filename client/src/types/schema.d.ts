type Model<T> = Readonly<T>;

declare namespace Schema {
  type User = Model<{
    id: number;
    username: string;
  }>;

  type Talk = Model<{
    id: number;
    title: string;
    description: string;
    voted: number;
    ownerId: number;
    owner?: User;
    createdAt: string;
  }>;

  type Vote = Model<{
    id: number;
    active: boolean;
    talkId: number;
    ownerId: number;
    createdAt: string;
  }>;
}
