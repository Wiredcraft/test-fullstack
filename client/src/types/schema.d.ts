type Model<T> = Readonly<T>;

declare namespace Schema {
  type Talk = Model<{
    id: number;
    title: string;
    description: string;
    voted: number;
    ownerId: number;
    createdAt: string;
  }>;
}
